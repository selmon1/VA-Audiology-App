import handler from './handler';
import connect from './db';
import * as auth from './authenticate';
import * as errors from './errors';

const messageNoMatch = 'Username and Password do not match';

export default handler(async (req) => {
    const db = connect();
    //TODO update to new DB usage, with transaction
    errors.requireParams(req.body, ["username", "password"]);
    const userFound = await db.query('SELECT AuthorityId, Password FROM Authority WHERE UserName = $1', [req.body.username]);
    if (userFound.rows.length !== 1) {
        //potential timing attack determines whether a username is valid
        //waste some time to make the attack more difficult
        //unfortunately this is probably not the exact right amount of time, so the attack may still work (hopefully it's at least slower)
        //but valid usernames are not extremely valuable and probably can be determined by other means anyway (eg. a matching email address)
        await auth.hash("dummyData");
        throw new errors.AuthenticationExpired(messageNoMatch);
    }
    const hash = userFound.rows[0].password;
    if (! await auth.matchesHash(req.body.password, hash)) {
        throw new errors.AuthenticationExpired(messageNoMatch);
    }

    const userId = userFound.rows[0].authorityid;
    auth.clearStaleKeys(db, userId);
    const time = Date.now();
    const sessionId = await auth.randomSessionId(db);
    //could have multiple simultaneous session IDs with the same user if they're using multiple browsers
    await db.query('INSERT INTO SessionKeys VALUES ($1, $2, $3, $4)', [sessionId, userId, time, time]);
    return {
        user: userId,
        session: sessionId,
    };
});
