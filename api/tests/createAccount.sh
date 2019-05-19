#!/bin/bash
curl localhost:3333
echo
source login.sh
name="test$RANDOM"

echo -e '\nInsufficient permissions'
curlHeaders localhost:3333/accounts/create -d "username=$name&authorityName=TestAuthority&authorityType=1"

login Stat qwertyuiop

echo -e '\nShould Succeed'
result="$(curlHeaders localhost:3333/accounts/create -d "username=$name&authorityName=TestAuthority&authorityType=1")"
echo $result
password=`echo $result | extractField password`
echo $password

echo -e '\nShould Login'
login $name $password

echo -e '\nDuplicate Insertion'
curlHeaders localhost:3333/accounts/create -d "username=$name&authorityName=TestShouldFail&authorityType=0"

echo -e '\nMissing Argument'
curlHeaders localhost:3333/accounts/create -d "authorityName=TestShouldFail&authorityType=0"

