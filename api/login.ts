import handler from './handler';
import connect from './db';
import * as auth from './authenticate';
import * as errors from './errors';
import { Client } from 'pg';

const messageNoMatch = 'Username and Password do not match';

export default handler(async (req) => {
    // TODO update to new DB usage, with transaction
    errors.requireParams(req.body, ['username', 'password']);
    return await connect(async (db: Client) => {
        const userFound = await db.query('SELECT AuthorityId, Password, authoritytype FROM Authority WHERE UserName = $1', [req.body.username]);
        if (userFound.rows.length !== 1) {
            // potential timing attack determines whether a username is valid
            // waste some time to make the attack more difficult
            // unfortunately this is probably not the exact right amount of time, so the attack may still work (hopefully it's at least slower)
            // but valid usernames are not extremely valuable and probably can be determined by other means anyway (eg. a matching email address)
            await auth.hash('dummyData');
            throw new errors.AuthenticationExpired(messageNoMatch);
        }
        const hash = userFound.rows[0].password;
        if (! await auth.matchesHash(req.body.password, hash)) {
            throw new errors.AuthenticationExpired(messageNoMatch);
        }

        const userId = userFound.rows[0].authorityid;
        const authoritytype = userFound.rows[0].authoritytype;
        auth.clearStaleKeys(db, userId);
        const sessionId = await auth.beginSession(db, userId);
        return {
            user: userId,
            session: sessionId,
            authorityType: authoritytype,
        };
    });
});
