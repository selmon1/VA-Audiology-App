#!/bin/bash
curl localhost:3333
echo
source login.sh
oldKey=$key
loginWith "$(curlHeaders localhost:3333/changePassword -d "oldPassword=password1&newPassword=improvedPassword")"
echo Should succeed
curlHeaders localhost:3333/heartbeat
echo Should expire
curlEcho localhost:3333/heartbeat -H "X-USER-ID: 111" -H "X-SESSION-ID: $oldKey"
login improvedPassword
loginWith "$(curlHeaders localhost:3333/changePassword -d "oldPassword=improvedPassword&newPassword=password1")"
echo Should succeed
curlHeaders localhost:3333/heartbeat 
echo Missing params
curlHeaders localhost:3333/changePassword -d "newPassword=password1" 
echo Missing params
curlHeaders localhost:3333/changePassword -d "oldPassword=password1" 
echo No match
curlHeaders localhost:3333/changePassword -d "oldPassword=wrong&newPassword=evil" 
echo No headers
curlEcho localhost:3333/changePassword -d "oldPassword=password1&newPassword=evil"

