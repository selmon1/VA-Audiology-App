#!/bin/bash
curl localhost:3333
echo
source login.sh
echo -en '\nShould Succeed\n'
curlHeaders localhost:3333/patient/7 -X DELETE

echo -en '\nReplacing\n'
curlHeaders localhost:3333/patient -d "patientId=7&deceased=false&patientNotes=Interted Notes"

echo -en '\nInvalid ID\n'
curlHeaders localhost:3333/patient/7000 -X DELETE

echo -en '\nInvalid Parameter\n'
curlHeaders localhost:3333/patient/id=7 -X DELETE

