import handler from '../handler';
import withConnection from '../db';
import * as auth from '../authenticate';
import * as errors from '../errors';
import { Client } from 'pg';
import { PatientResponse } from '../../api-objects/patientResponse';


// Expects username, password, authorityName, and authorityType
// Returns the created account (NOT including the created Password)
export default handler(async (req, userId) => {
    errors.requireParams(req.body, ['deceased', 'patientNotes', 'email', 'firstName', 'lastName']);
    let createPatient = req.body;
    // let deceased = req.body.deceased;
    // let patientNotes = req.body.patientNotes;

    return withConnection(async (db: Client) => {
        const createdPatient = await db.query('INSERT INTO patient (deceased, patientnotes, email, firstName, lastName) VALUES ($1, $2, $3, $4, $5) RETURNING *', [createPatient.deceased, createPatient.patientNotes, createPatient.email, createPatient.firstName, createPatient.lastName]);
        return createdPatient.rows[0] as PatientResponse;
    });
}, auth.authenticate);
