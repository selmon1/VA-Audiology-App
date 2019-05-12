import handler from '../handler';
import withConnection from '../db';
import * as auth from '../authenticate';
import * as errors from '../errors';
import { Client } from 'pg';

// Expects notes string
// Returns the created account (NOT including the created Password)
export default handler(async (req, userId) => {
    errors.requireParams(req.body, ['notes']);
    let notes: string = req.body.notes;
    //Parameter [0] exists due to syntax of call: `patient/{xyz}/notes`
    let patientId = req.params[0];
    return withConnection(async (db: Client) => {
        let results = await db.query('UPDATE patient SET patientnotes = $1 WHERE patientid = $2', [notes, patientId]);
        if (results.rowCount === 0) {
            throw new errors.BadParameter("No Patient exists with ID: " + patientId);
        }
        return { 'notes': notes };
    });
}, auth.authenticate);
