#!/bin/bash
curl localhost:3333
source login.sh
set -x
curl localhost:3333/login -d "username=Audio1"
:
curl localhost:3333/login -d "username=fake&password=wrong"
:
curl localhost:3333/login -d "username=Audio1&password=wrong"
:
curl localhost:3333/heartbeat
:
curl localhost:3333/heartbeat -H "X-SESSION-ID: $key"
:
curl localhost:3333/heartbeat -H "X-USER-ID: 111"
:
curl localhost:3333/heartbeat -H "X-USER-ID: 54321" -H "X-SESSION-ID: 4321"
:
curl localhost:3333/heartbeat -H "X-USER-ID: 222" -H "X-SESSION-ID: $key"
: