import handler from '../handler';
import withConnection from '../db';
import * as auth from '../authenticate';
import * as errors from '../errors';
import { Client } from 'pg';
import { PatientResponse } from '../../api-objects/PatientResponse';


// Expects username, password, authorityName, and authorityType
// Returns the created account (NOT including the created Password)
export default handler(async (req, userId) => {
    errors.requireParams(req.body, ['patientId', 'deceased', 'patientNotes']);
    let deceased = req.body.deceased;
    let patientNotes = req.body.patientNotes;
    let patientId = req.body.patientId;

    return withConnection(async (db: Client) => {

        const results = await db.query('SELECT * FROM patient WHERE patient.patinetid = $1', [patientId]);
        if (results.rowCount != 0) {
            throw new errors.DuplicateInsertion('DUPLICATE INSERTION: Attmpted to insert a client that already exists');
        }
        const createdPatient = await db.query('INSERT INTO patient (patientid, deceased, patientnotes) VALUES ($1, $2, $3) RETURNING *', [patientId, deceased, patientNotes]);
        return createdPatient.rows[0] as PatientResponse;
    });
}, auth.authenticate);
