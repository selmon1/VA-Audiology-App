//
// Main entrypoint for traffic to our webserver.
//
//

// Imports
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Globals
const app = express(); // Creates express app object
const port = 3333;

app.use(cors());
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

import heartbeatEndpoint from './heartbeat';
app.get('/heartbeat', heartbeatEndpoint);
import loginEndpoint from './login';
app.post('/login', loginEndpoint);
import changePasswordEndpoint from './changePassword';
app.post('/changePassword', changePasswordEndpoint);

import appointmentsEndpoint from './appointments';
import appointmentsPostEndpoint from './appointmentsPOST';
app.get('/appointments', appointmentsEndpoint);
app.post('/appointments', appointmentsPostEndpoint);

// -- CLIENT ENDPOINTS START --
import patientPOSTEndpoint from './patient/patient-create';
app.post('/patient', patientPOSTEndpoint);

import patientUpdateNotes from './patient/patient-update-notes';
app.post('/patient/*/notes', patientUpdateNotes);
// -- CLIENT ENDPOINTS END --

import indexEndpoint from './index';
app.get('/', indexEndpoint);

// Set app to listen on a given port
app.listen(port, () => {
    console.log(`Starting VA App on port ${port}.`)
})
