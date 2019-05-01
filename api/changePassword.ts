import handler from './handler';
import withConnection from './db';
import * as auth from './authenticate';
import * as errors from './errors';
import { Client } from 'pg';

// Expects oldPassword and newPassword
// Returns user and new session
// This logs out all existing sessions; you must change your saved session id to this new id
export default handler(async (req, userId) => {
    errors.requireParams(req.body, ['oldPassword', 'newPassword']);
    return withConnection(async (db: Client) => {
        const userFound = await db.query('SELECT Password FROM Authority WHERE AuthorityId = $1', [userId]);
        if (userFound.rows.length !== 1) {
            throw new errors.APIError('Somehow failed to find an Authority entry for user ' + userId);
        }
        const hash = userFound.rows[0].password;
        if (! await auth.matchesHash(req.body.oldPassword, hash)) {
            throw new errors.BadParameter("Old password does not match.");
        }

        await auth.setPassword(db, userId, req.body.newPassword);
        await auth.clearAllKeys(db, userId);
        const sessionId = await auth.beginSession(db, userId);

        return {
            user: userId,
            session: sessionId,
        };
    });
}, auth.authenticate);
