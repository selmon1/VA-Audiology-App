#!/bin/bash
curl localhost:3333
echo
source login.sh

echo -en '\Creating Dummy Patient\n'
curlHeaders localhost:3333/patient -d "patientId=700&deceased=false&patientNotes=Interted Notes"

echo -en '\nShould Succeed\n'
curlHeaders localhost:3333/patient/700 -X DELETE

echo -en '\nInvalid ID\n'
curlHeaders localhost:3333/patient/1000 -X DELETE

echo -en '\nInvalid Parameter\n'
curlHeaders localhost:3333/patient/id=7 -X DELETE

