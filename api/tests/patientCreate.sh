#!/bin/bash
curl localhost:3333
echo
source login.sh
oldKey=$key
echo -en '\nShould Succeed\n'
loginWith "$(curlHeaders localhost:3333/patient -d "patientId=100000&deceased=false&patientNotes=Interted Notes")"

echo -en '\nDuplicate Insertion\n'
loginWith "$(curlHeaders localhost:3333/patient -d "patientId=100000&deceased=false&patientNotes=Interted Notes")"

echo -en '\nMissing Arguement\n'
loginWith "$(curlHeaders localhost:3333/patient -d "patientNotes=Interted Notes")"

echo -en '\nInvalid Arguments\n'
loginWith "$(curlHeaders localhost:3333/patient -d "patientId=555555&deceased=false&patientNotes=Interted Notes")"
