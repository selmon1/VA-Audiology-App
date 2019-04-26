# API Running Instructions

## Requirements:
* Postman _(Or some other local api handler)_
* Postgress DB server up and running. (Refer to Bar's slides for getting this up and running)
   * Current Configuration is `{host: 'localhost', username: 'postgres', password: 'postgres', port: 5432}` 
   * _This configuration is currently manually configured in db.ts. However an immediate goal is to push into config file to be held OFF the repository._

## Install
* Open terminal in api folder.
* Run script: `npm install`
* Copy `creds.example` to `creds.ts`, then edit `creds.ts` to have valid database credentials.

## Running
* To compile and run the API server, execute `npm run dev` in the terminal. The api handler should automatically spin up.
   * *Note:* If everything ran correctly the terminal should produce the message _Starting VA App on port 3333_
   * To Test if api is running correctly. Make an api call using Postman to the URL _"http://localhost:3333/appointments"_. If everything has been configured correctly, then the json message should be sent in response: {"status": "success", "data": [] }
* Dev Calls: It is possible to run the build command sepperately.
   * To run the compiler, execute `npm run tsc` in the terminal.
   * To run a build without any fresh compilation, Execute `npm run server` in the terminal

# Creating a new API Endpoint
1. Add app.*httpVerb*() near the app.get('/', ...) to the file app.ts (to be rearranged logically later).
    * It will follow the syntax: `import *path*Endpoint from *yourFile*; app.*httpVerb*('*path*', *path*Endpoint).`
    * See the example: for the getAllAppointmetns api.
 2. Copy the appointments.ts code and modify the handler() function.
    * The db.each simply runs a text query. _This might be eventually implemented within the db class_.
    * If you are modifying the database, make sure to create a transation using db.tx
