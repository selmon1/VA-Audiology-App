#!/bin/bash
curl localhost:3333
echo
source login.sh
echo -en '\nShould Succeed\n'
curlHeaders localhost:3333/patient -d "patientId=100001&deceased=false&patientNotes=Interted Notes"

echo -en '\nDuplicate Insertion\n'
curlHeaders localhost:3333/patient -d "patientId=100001&deceased=false&patientNotes=Interted Notes"

echo -en '\nMissing Arguement\n'
curlHeaders localhost:3333/patient -d "patientNotes=Interted Notes"

echo -en '\nInvalid Arguments\n'
curlHeaders localhost:3333/patient -d "BADpatientId=555555&deceased=false&patientNotes=Interted Notes"
