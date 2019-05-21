import connect from './db';
import * as errors from './errors';
import config from './config';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { Client } from 'pg';

// should be extremely unlikely to generate two keys with the same id; retry when you do, up to this many times
const maxKeygenRetries = 20;

// maximum number of tries to generate a random character; extremely unlikely to be hit
const maxRandomCharRetries = 40;

// Authentication function: return user id if authorized; otherwise throw an exception
export function alwaysPermitted(request) {
    return null;
}

export async function hash(password: string): Promise<string> {
    const rounds = config.passwordHashing.rounds;
    const salt = await bcrypt.genSalt(rounds);
    // hash output includes the salt and rounds
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

//set password for user
export async function setPassword(db: Client, userId: number, password: string) {
    const hashed = await hash(password);
    await db.query('UPDATE Authority SET Password = $1 WHERE AuthorityId = $2', [hashed, userId]);
}

export async function matchesHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}

function randomChar(): string {
    const alphabet = config.randomPasswords.allowedCharacters;
    // ensure that all characters are equally likely to appear
    const maxAllowableRandomByte = 255 - (256 % alphabet.length);
    for (let retries = 0; retries < maxRandomCharRetries; retries++) {
        // could reduce the average number of random bytes produced by generating the whole password at once rather than one char at a time
        // but simplicity is more important than performance here
        const randomByte = crypto.randomBytes(1)[0];
        if (randomByte <= maxAllowableRandomByte) {
            return alphabet[randomByte % alphabet.length];
        }
    }
    throw new errors.APIError('Failed to generate a random password character after ' + maxRandomCharRetries + ' tries.');
}


export function randomPassword(): string {
    const len = config.randomPasswords.length;
    const result = new Array(len);
    for (let i = 0; i < len; i++) {
        result[i] = randomChar();
    }
    return result.join('');
}

async function randomSessionId(db): Promise<string> {
    for (let i = 0; i < maxKeygenRetries; i++) {
        // need a cryptographically secure random number, not Math.random()
        const key = crypto.randomBytes(config.sessionKeys.size).toString('hex');
        // could minimize the number of db calls by first retrieving all keys
        // but the liklihood of collision is so low that we expect to only make one db call
        // instead ensure the call performance is at worst O(log(n)) rather than O(n) with this design
        const matches = await db.query('SELECT SessionKeyId FROM SessionKeys WHERE SessionKeyId = $1', [key]);
        if (matches.rows.length === 0) {
            return key;
        }
    }
    throw new errors.APIError('Failed to generate a unique session ID after ' + maxKeygenRetries + ' tries.');
}

function isSessionExpired(times: { createdtime: number, lastusedtime: number }): boolean {
    const currentTime = Date.now();
    const inactive = currentTime - times.lastusedtime > config.sessionKeys.maxIdle;
    const tooOld = currentTime - times.createdtime > config.sessionKeys.maxAge;
    return inactive || tooOld;
}

// Delete all expired session keys for the user
// Perhaps this should be redesigned as a periodically-run function that affects all users
export async function clearStaleKeys(db, userId: number) {
    const currentTime = Date.now();
    const oldestCreation = currentTime - config.sessionKeys.maxAge;
    const oldestUsage = currentTime - config.sessionKeys.maxIdle;
    return db.query('DELETE FROM SessionKeys WHERE UserId = $1 AND (CreatedTime < $2 OR LastUsedTime < $3)', [userId, oldestCreation, oldestUsage]);
}

// Clear all keys for a user except this one
export async function clearAllKeys(db: Client, userId: number) {
    return db.query('DELETE FROM SessionKeys WHERE UserId = $1', [userId]);
}

// Creates a new login session for the user; returns session id
export async function beginSession(db: Client, userId: number) {
    const time = Date.now();
    const sessionId = await randomSessionId(db);
    // could have multiple simultaneous session IDs with the same user if they're using multiple browsers
    await db.query('INSERT INTO SessionKeys VALUES ($1, $2, $3, $4)', [sessionId, userId, time, time]);
    return sessionId;
}

// Can be passed as the `authenticate` parameter of `handler`. Ensured that the user is logged in as who they say they are.
export async function authenticate(request) {
    const sessionId = request.get('X-SESSION-ID');
    if (sessionId === undefined) {
        throw new errors.AuthenticationFailure('You must provide a session ID with the X-SESSION-ID header');
    }
    // requiring user ID prevents odds of random guessing session ID from increasing with number of users
    const userId = parseInt(request.get('X-USER-ID'), 10);
    if (isNaN(userId)) {
        throw new errors.AuthenticationFailure('You must provide a user ID with the X-USER-ID header');
    }
    return await connect(async (db) => {
        const timesFound = await db.query('SELECT CreatedTime, LastUsedTime FROM SessionKeys WHERE SessionKeyId = $1 AND UserId = $2', [sessionId, userId]);
        if (timesFound.rows.length !== 1 || isSessionExpired(timesFound.rows[0])) {
            throw new errors.AuthenticationExpired('Your login session has expired.');
        }
        const currentTime = Date.now();
        db.query('UPDATE SessionKeys SET LastUsedTime = $1 WHERE SessionKeyId = $2 AND UserId = $3', [currentTime, sessionId, userId]);
        return userId;
    })
}

// Returns a function to be passed as the `authenticate` parameter of `handler`. Requires the user to be logged in and have the specified role.
function mustHaveRole(role) {
    return async function (request) {
        // theoretically, these two checks could be done simultaneously for performance
        const userId = await authenticate(request);
        return await connect(async (db) => {
            const roleResult = await db.query('SELECT AuthorityType FROM Authority WHERE AuthorityId = $1', [userId]);
            if (roleResult.rows.length !== 1) {
                throw new errors.APIError('Unable to determine your role.');
            }
            const actualRole = roleResult.rows[0].authoritytype;
            if (actualRole !== role) {
                throw new errors.PermissionFailure('You do not have permission to perform this action. Your role is ' + roleNames[actualRole] + '; your role must be ' + roleNames[role] + '.');
            }
            return userId;
        });
    };
}

//Maps role names to their numbers
export const roles = {
    audiologist: 0,
    admin: 1,
};
//Maps role numbers to their names
const roleNames = (() => {
    var reverseMap = {};
    Object.entries(roles).forEach(entry => reverseMap[entry[1]] = entry[0]);
    return reverseMap;
})();

export const mustBeAdmin = mustHaveRole(roles.admin);
