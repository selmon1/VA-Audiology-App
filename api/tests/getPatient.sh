#!/bin/bash
curl localhost:3333
echo
source login.sh
echo -en '\nGet All Existing Patients\n'
curlHeaders localhost:3333/patient

echo -en '\nGet a single patient\n'
curlHeaders localhost:3333/patient/1
