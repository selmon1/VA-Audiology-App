//
// Main entrypoint for traffic to our webserver.
//
//

// Imports
const express = require('express')
const bodyParser = require('body-parser')

// Globals
const app = express() //Creates express app object
const port = 3333


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

import loginEndpoint from './login'
app.get('/login', loginEndpoint)

import appointmentsEndpoint from './appointments'
app.get('/appointments', appointmentsEndpoint);

import indexEndpoint from './index'
app.get('/', indexEndpoint)

// Set app to listen on a given port
app.listen(port, () => {
    console.log(`Starting VA App on port ${port}.`)
})
