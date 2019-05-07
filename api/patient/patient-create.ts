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
        try {
            const createdPatient = await db.query('INSERT INTO patient (patientid, deceased, patientnotes) VALUES ($1, $2, $3) RETURNING *', [patientId, deceased, patientNotes]);
            return createdPatient.rows[0] as PatientResponse;
        } catch (error) {
            if (error.message.includes('duplicate key value violates unique constraint "patient_pkey"')) {
                throw new errors.DuplicateInsertion('DUPLICATE INSERTION: Attmpted to insert a client that already exists')
            }
            throw error;
        }
    });
}, auth.authenticate);
