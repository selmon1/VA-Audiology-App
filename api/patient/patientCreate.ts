import handler from '../handler';
import withConnection from '../db';
import * as auth from '../authenticate';
import * as errors from '../errors';
import { Client } from 'pg';
import { PatientCreateResponse } from '../../api-objects/patientCreateResponse';

// Expects 'username', 'password', 'authorityName', and 'authorityType'
// Returns the created account (NOT including the created Password)
export default handler(async (req, userId) => {
    errors.requireParams(req.body, ['patientId', 'deceased', 'patientNotes']);
    let deceased = req.body.deceased;
    let patientNotes = req.body.patientNotes;
    let patientId = req.body.patientId;

    return withConnection(async (db: Client) => {
        const createdPatient = await db.query('INSERT INTO patient (patientid, deceased, patientnotes) VALUES ($1, $2, $3) RETURNING *', [patientId, deceased, patientNotes]);
        if (createdPatient.rows.length !== 1) {
            throw new errors.APIError('Somehow failed to create New Account' + userId);
        }
        let patient: PatientCreateResponse = createdPatient.rows[0];

        return patient;
    });
}, auth.authenticate); 