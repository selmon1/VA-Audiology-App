#!/bin/bash
curlEcho() {
    echo "curl $@" >&2
    curl "$@" 2>/dev/null
    echo
}
# Extract the value of the field named the first argument from JSON
extractField() {
    python -c "import json; import sys; print json.load(sys.stdin).get('data').get('$1')"
}
loginWith() {
    echo $1
    userId=`echo $1 | extractField user`
    key=`echo $1 | extractField session`
    curlEcho localhost:3333/heartbeat -H "X-USER-ID: $userId" -H "X-SESSION-ID: $key"
}
login() {
    loginWith "$(curlEcho localhost:3333/login -d "username=Audio1&password=$1")"
}
curlHeaders() {
    curlEcho -H "X-USER-ID: $userId" -H "X-SESSION-ID: $key" "$@"
}
login password1
