#!/bin/bash
curlEcho() {
    echo "curl $@" >&2
    curl "$@" 2>/dev/null
    echo
}
loginWith() {
    echo $1
    key=`echo $1 | cut -d '"' -f 12`
    curlEcho localhost:3333/heartbeat -H "X-USER-ID: 111" -H "X-SESSION-ID: $key"
}
login() {
    loginWith "$(curlEcho localhost:3333/login -d "username=Audio1&password=$1")"
}
curlHeaders() {
    curlEcho -H "X-USER-ID: 111" -H "X-SESSION-ID: $key" "$@"
}
login password1
