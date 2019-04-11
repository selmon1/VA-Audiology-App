//
// Main entrypoint for traffic to our webserver.
//
//

// Imports
import express = require('express');
import bodyParser = require('body-parser');

// Globals
const app = express() //Creates express app object
const port = 3000


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

// GET endpoint for the root
app.get('/', (request, response) => {
    response.json({ info: 'Postgress, Express, Angular, Node server reached. Greetings from Team E'})
})

// Set app to listen on a given port
app.listen(port, () => {
    console.log(`Starting VA App on port ${port}.`)
})
