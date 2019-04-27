import connect from './db';
import * as errors from './errors';
import config from './config';
const crypto = require('crypto');
const bcrypt = require('bcrypt');

//bytes in a session key
const keySize = 8;
//should be extremely unlikely to generate two keys with the same id; retry when you do, up to this many times
const maxKeygenRetries = 20;
//session keys expire after 1 hour unused
const keyMaxIdle = 60 * 60 * 1000
//session keys can't be renewed after 14 hours
const keyMaxAge = 14 * 60 * 60 * 1000

// Authentication function: return user id if authorized; otherwise throw an exception
export function alwaysPermitted(request) {
  return null;
}

export async function hash(password: string):Promise<string> {
    const rounds = config.passwordHashing.rounds;
    const salt = await bcrypt.genSalt(rounds);
    //hash output includes the salt and rounds
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export async function matchesHash(password: string, hash: string):Promise<boolean> {
    return bcrypt.compare(password, hash);
}

export async function randomSessionId(db):Promise<string> {
    for (let i = 0; i < maxKeygenRetries; i++) {
        //need a cryptographically secure random number, not Math.random()
        const key = crypto.randomBytes(keySize).toString('hex');
        //could minimize the number of db calls by first retrieving all keys
        //but the liklihood of collision is so low that we expect to only make one db call
        //instead ensure the call performance is at worst O(log(n)) rather than O(n) with this design
        const matches = await db.query('SELECT SessionKeyId FROM SessionKeys WHERE SessionKeyId = $1', [key]);
        if (matches.rows.length === 0) {
            return key;
        }
    }
    throw new errors.APIError("Failed to generate a unique session ID after " + maxKeygenRetries + " tries.");
}

function isSessionExpired(times:{createdtime: number, lastusedtime: number}):boolean {
    const currentTime = Date.now();
    return currentTime - times.createdtime > keyMaxAge || currentTime - times.lastusedtime > keyMaxIdle;
}

//Delete all expired session keys for the user
//Perhaps this should be redesigned as a periodically-run function that affects all users
export async function clearStaleKeys(db, userId: number) {
    const currentTime = Date.now();
    const oldestCreation = currentTime - keyMaxAge;
    const oldestUsage = currentTime - keyMaxIdle;
    return db.query('DELETE FROM SessionKeys WHERE UserId = $1 AND (CreatedTime < $2 OR LastUsedTime < $3)', [userId, oldestCreation, oldestUsage]);
}

//Can be passed as the `authenticate` parameter of `handler`. Ensured that the user is logged in as who they say they are.
export async function authenticate(request) {
    const sessionId = request.get('X-SESSION-ID');
    //TODO ensure IDs are in fact integers
    if (sessionId === undefined) {
        throw new errors.AuthenticationFailure('You must provide a session ID with the X-SESSION-ID header');
    }
    //requiring user ID prevents odds of random guessing session ID from increasing with number of users
    const userId = request.get('X-USER-ID');
    if (userId === undefined) {
        throw new errors.AuthenticationFailure('You must provide a user ID with the X-USER-ID header');
    }
    const db = connect();
    const timesFound = await db.query('SELECT CreatedTime, LastUsedTime FROM SessionKeys WHERE SessionKeyId = $1 AND UserId = $2', [sessionId, userId]);
    if (timesFound.rows.length !== 1 || isSessionExpired(timesFound.rows[0])) {
        throw new errors.AuthenticationExpired('Your login session has expired.');
    }
    const currentTime = Date.now();
    db.query('UPDATE SessionKeys SET LastUsedTime = $1 WHERE SessionKeyId = $2 AND UserId = $3', [currentTime, sessionId, userId]);
    return userId;
}

//Returns a function to be passed as the `authenticate` parameter of `handler`. Requires the user to be logged in and have the specified role.
export function mustHaveRole(role) {
    return async function(request) {
        //theoretically, these two checks could be done simultaneously for performance
        const userId = await authenticate(request);
        const db = connect();
        const actualRole = await db.query('SELECT Type FROM Authority WHERE AuthorityId = $1');
        if (actualRole !== role) {
            throw new errors.PermissionFailure('You do not have permission to perform this action. You are ' + actualRole + '; you must be ' + role);
        }
        return userId;
    };
}
