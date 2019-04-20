//
// Main entrypoint for traffic to our webserver.
//
//

// Imports
import express from 'express';
import bodyParser from 'body-parser';

// Globals
const app = express() //Creates express app object
const port = 3333


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

// GET endpoint for the root
import appointmentsEndpoint from './appointments'
app.get('/appointments', appointmentsEndpoint);

import indexEndpoint from './index'
app.get('/', indexEndpoint)

// Set app to listen on a given port
app.listen(port, () => {
    console.log(`Starting VA App on port ${port}.`)
})
