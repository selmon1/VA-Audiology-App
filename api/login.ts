import handler from './handler';
import connect from './db';
import * as auth from './authenticate';
import * as errors from './errors';

export default handler(async (req) => {
    const db = connect();
    //TODO update to new DB usage, with transaction
    errors.requireParams(req.body, ["username", "password"]);
    //TODO make sure everything is fine if the params are non-string (eg. object or array)
    const expectedHash = auth.hash(req.body.password);
    const idFound = await db.query('SELECT AuthorityId FROM Authority WHERE UserName = $1 AND Password = $2', [req.body.username, expectedHash]);
    if (idFound.rows.length !== 1) {
        throw new errors.AuthenticationExpired('Username and Password do not match');
    }
    const userId = idFound.rows[0].AuthorityId;
    auth.clearStaleKeys(userId);
    const time = undefined; //TODO current time
    const sessionId = auth.randomSessionID();
    //could have multiple simultaneous session IDs with the same user if they're using multiple browsers
    await db.query('INSERT INTO SessionKeys VALUES ($1, $2, $3, $4)', [sessionId, userId, time, time]);
    return {
        user: userId,
        session: sessionId
    };
});
