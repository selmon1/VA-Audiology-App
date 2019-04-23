import handler from './handler';
import db from './db';
import * as auth from './authenticate';

export default handler(async (req) => {
    //TODO update to new DB usage, with transaction
    //TODO function to throw an error if parameters are missing
    //perhaps redesign to call when you retrieve the param
    requireParams(req.body, ["username", "password"]);
    //TODO make sure everything is fine if the params are non-string (eg. object or array)
    const expectedHash = auth.hash(req.body.password);
    //TODO if this returns no results, return 401
    const userId = await db.one('SELECT AuthorityId FROM Authority WHERE UserName = $1 AND Password = $2', [req.body.username, expectedHash])
    auth.clearStaleKeys(userId);
    const time = undefined; //TODO current time
    const sessionId = auth.randomSessionID();
    //could have multiple simultaneous session IDs with the same user if they're using multiple browsers
    await db.none('INSERT INTO SessionKeys VALUES ($1, $2, $3, $4)', [sessionId, userId, time, time]);
    return {
        user: userId,
        session: sessionId
    };
});
