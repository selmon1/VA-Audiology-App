import handler from '../handler';
import withConnection from '../db';
import * as auth from '../authenticate';
import * as errors from '../errors';
import { Client } from 'pg';
import { AccountCreateResponse } from '../../api-objects/accountCreateResponse';

// Expects 'username', 'password', 'authorityName', and 'authorityType'
// Returns the created account (NOT including the created Password)
export default handler(async (req, userId) => {
    errors.requireParams(req.body, ['authorityId', 'username', 'password', 'authorityName', 'authorityType']);
    let authorityId = req.body.authorityId;
    let username = req.body.username;
    let password = await auth.hash(req.body.password);
    let authorityName = req.body.authorityName;
    let authorityType = req.body.authorityType;
    return withConnection(async (db: Client) => {
        const createdAccount = await db.query('INSERT INTO authority (authorityid, username, password, authorityname, authoritytype) VALUES ($1, $2, $3, $4, $5) RETURNING authorityid, username, authorityname, authoritytype', [authorityId, username, password, authorityName, authorityType]);
        if (createdAccount.rows.length !== 1) {
            throw new errors.APIError('Somehow failed to create New Account' + userId);
        }
        let account: AccountCreateResponse = createdAccount.rows[0];

        return account;
    });
}, auth.authenticate);