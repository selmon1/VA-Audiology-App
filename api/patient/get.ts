import handler from '../handler';
import withConnection from '../db';
import * as auth from '../authenticate';
import { Client } from 'pg';

// Expects notes string
// Returns the created account (NOT including the created Password)
export default handler(async (request, userId) => {
    return withConnection(async (db: Client) => {
        let results;
        let patientId = request.params.patientId;
        if (!patientId) {
            results = await db.query('SELECT * FROM patient');
        } else 
        {
            results = await db.query('SELECT * FROM patient WHERE patientId = $1', [patientId]);
        }
        return results.rows;
    });
}, auth.authenticate);