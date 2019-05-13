#!/bin/bash
curl localhost:3333
echo
source login.sh
echo -en '\nShould Succeed\n'
curlHeaders localhost:3333/patient/1/notes -d "notes=The new notes for patient 1 from patientCreate.sh"

echo -en '\nConfirmation Updated Succeeded\n'
curlHeaders localhost:3333/appointments?id=1

echo -en '\nResetting Patient notes\n'
curlHeaders localhost:3333/patient/1/notes -d "notes=THE NOTES ARE NOW RESET"

echo -en '\nConfirmation Updated Succeeded\n'
curlHeaders localhost:3333/appointments?id=1

echo -en '\nMissing Arguement\n'
curlHeaders localhost:3333/patient/1/notes -d ""

echo -en '\nInvalid Arguments\n'
curlHeaders localhost:3333/patient/1/notes -d "Badnotes=The new notes for patient 1 from patientCreate.sh"

echo -en '\nInvalid ID\n'
curlHeaders localhost:3333/patient/10000/notes -d "Badnotes=The new notes for patient 1 from patientCreate.sh"
