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

// -- ACCOUNTS --
import accountsGetEndpoint from './accountsGET';
app.get('/accounts', accountsGetEndpoint);
import accountCreate from './accounts/create';
app.post('/accounts/create', accountCreate);
import resetPassword from './accounts/resetPassword';
app.post('/accounts/resetPassword', resetPassword);

import appointmentsEndpoint from './appointments';
import appointmentsPostEndpoint from './appointmentsPOST';
app.get('/appointments', appointmentsEndpoint);
app.post('/appointments', appointmentsPostEndpoint);

// -- CLIENT ENDPOINTS START --

import patientGet from './patient/get';
// Handles a single patient query
app.get('/patient/:patientId', patientGet);
// Handles select all patients query
app.get('/patient', patientGet);

import patientPost from './patient/create';
app.post('/patient', patientPost);

import patientUpdateNotes from './patient/updateNotes';
app.post('/patient/*/notes', patientUpdateNotes);

import patientDelete from './patient/delete';
app.delete('/patient/:patientId', patientDelete);

// -- CLIENT ENDPOINTS END --

import indexEndpoint from './index';
app.get('/', indexEndpoint);

// Set app to listen on a given port
app.listen(port, () => {
    console.log(`Starting VA App on port ${port}.`)
})
