import db from './db';
import * as errors from './errors';
// Authentication function: return user id if authorized; otherwise throw an exception
export function alwaysPermitted(request) {
  return null;
}

export function hash(password: string):string {
    //TODO choose a hash function
    return password + "Hashed";
}

export function randomSessionID():number {
    //TODO get a cryptographically secure RNG
    return 4;
}

function isSessionExpired(times) {
    //TODO
    return false;
}

//Delete all expired session keys for the user
export async function clearStaleKeys(userId: number) {
    //TODO
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
    //TODO throw expired if nothing found
    const times = await db.one('SELECT (CreatedTime, LastUsedTime) FROM SessionKeys WHERE SessionKeyId = $1 AND UserId = $2', [sessionId, userId]);
    if (isSessionExpired(times)) {
        throw new errors.AuthenticationExpired('Your login session has expired.');
    }
    const currentTime = null; //TODO
    db.none('UPDATE SessionKeys SET LastUsedTime = $1 WHERE SessionKeyId = $2 AND UserId = $3', [currentTime, sessionId, userId]);
    return userId;
}

//Returns a function to be passed as the `authenticate` parameter of `handler`. Requires the user to be logged in and have the specified role.
export function mustHaveRole(role) {
    return async function(request) {
        //theoretically, these two checks could be done simultaneously for performance
        const userId = await authenticate(request);
        const actualRole = await db.one('SELECT Type FROM Authority WHERE AuthorityId = $1');
        if (actualRole !== role) {
            throw new errors.PermissionFailure('You do not have permission to perform this action. You are ' + actualRole + '; you must be ' + role);
        }
        return userId;
    };
}
