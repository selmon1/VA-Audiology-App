#!/bin/bash
curl localhost:3333
echo
source login.sh
name="test$RANDOM"
echo -e '\nShould Succeed'
curlHeaders localhost:3333/accounts/create -d "username=$name&authorityName=TestAuthority&authorityType=2"

result=$(curlHeaders localhost:3333/accounts/resetPassword -d "username=$name")
echo $result
password=`echo $result | extractRootField data`
echo $password

echo
echo Should succeed
login $name $password
echo
echo Missing params
curlHeaders localhost:3333/accounts/resetPassword -d "foo=bar" 
echo
echo No such user
curlHeaders localhost:3333/accounts/resetPassword -d "username=NoSuchUser" 
echo
echo Should require authentication
curlEcho localhost:3333/accounts/resetPassword -d "username=$name" 
