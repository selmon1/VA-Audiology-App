set -x
curl localhost:3333
:
curl localhost:3333/login -d "username=fake&password=wrong"
:
curl localhost:3333/login -d "username=Audio1&password=wrong"
:
res=`curl localhost:3333/login -d "username=Audio1&password=password1"`
:
key=`echo $res | cut -d '"' -f 12`
