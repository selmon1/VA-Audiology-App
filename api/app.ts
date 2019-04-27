//
// Main entrypoint for traffic to our webserver.
//
//

// Imports
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Globals
const app = express(); //Creates express app object
const port = 3333;

app.use(cors());
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

import heartbeatEndpoint from './heartbeat'
app.get('/heartbeat', heartbeatEndpoint)
import loginEndpoint from './login'
app.post('/login', loginEndpoint)

import appointmentsEndpoint from './appointments'
app.get('/appointments', appointmentsEndpoint);

import indexEndpoint from './index'
app.get('/', indexEndpoint)

// Set app to listen on a given port
app.listen(port, () => {
    console.log(`Starting VA App on port ${port}.`)
})
