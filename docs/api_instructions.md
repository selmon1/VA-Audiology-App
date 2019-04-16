# API Running Instructions

## Requirements:
* Postman (Or some other local api handler)
* Postgress DB server up and running. (Refer to Bar's slides for getting up and running)
  * Current Configuration is {host: 'localhost', username: 'postgres', password: 'postgres', port: 5432} _This configuration is manually placed in user.ts. However immediate goal is to push into config file to be held OFF the repository._

## Steps to run
* Open terminal in api folder.
* Run script: 'npm install pgp'
* Run script *node app.ts*
  * _A very important TODO is to fully convert the api folder into its own npm environment_
* *Note:* If everything ran correctly the terminal should produce the message _Starting VA App on port 3333_
* To Test if api is running correctly. Make an api call using Postman to the URL _"http://localhost:3333/appointments"_. If everything has been configured correctly, then the json message should be sent in response: {"status": "success", "data": [] }

# API Setup Instructions
 1. Add app.RESTCOMMAND() above the app.get('/', ...) to the file app.ts. 
    * It will follow the syntax: app.RESTCOMMAND('URL_PATH', require('CALLED_HANDLER_FILE_PATH')). 
    * See the example: for the getAllAppointmetns api.
 2. Copy the appointments.ts code and modify the handler() function.
    * The db.each simply runs a text query. _This might be eventually implemented within the db class_.
