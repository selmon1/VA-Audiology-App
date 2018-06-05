# NCRAR Tinnitus Research System
A web application built for the staffs of NCRAR to aid them in research and to better serve patients who are suffering from tinnitus.

Featuring the following frameworks:
> An Angular starter kit featuring
[Angular 4](https://angular.io),
[Ahead of Time Compile](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html), [Router](https://angular.io/docs/ts/latest/guide/router.html), [Forms](https://angular.io/docs/ts/latest/guide/forms.html),
[Http](https://angular.io/docs/ts/latest/guide/server-communication.html),
[Services](https://gist.github.com/gdi2290/634101fec1671ee12b3e#_follow_@AngularClass_on_twitter),
[Tests](https://angular.io/docs/ts/latest/guide/testing.html), [E2E](https://angular.github.io/protractor/#/faq#what-s-the-difference-between-karma-and-protractor-when-do-i-use-which-)),
[Karma](https://karma-runner.github.io/),
[Protractor](https://angular.github.io/protractor/),
[Jasmine](https://github.com/jasmine/jasmine),
[Istanbul](https://github.com/gotwarlost/istanbul),
[TypeScript](http://www.typescriptlang.org/),
[@types](https://www.npmjs.com/~types),
[TsLint](http://palantir.github.io/tslint/),
[Codelyzer](https://github.com/mgechev/codelyzer),
[Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html), and
[Webpack 2](http://webpack.github.io/) by [AngularClass](https://angularclass.com).


## Getting Started

The following instruction will show you how to get the project running in your local environment for development and testing.

### Prerequisites
* [NodeJs LTS and Npm](https://nodejs.org/en/download/)
* [Git Bash](https://git-scm.com/downloads) for MacOS or  [TortoiseGit](https://tortoisegit.org/download/) for Windows

#### Optional TypeScript-aware editor

* [Webstorm 10](https://www.jetbrains.com/webstorm/download/)
* [Atom](https://atom.io/) with [TypeScript plugin](https://atom.io/packages/atom-typescript)

### Setting up Angular 4
After installing the Node.js and Npm you should be ready to clone our repository.
Open up Git Bash or Console and enter the following commands with administrator privilege
1. Clone the repo
```bash
# Make note of the directory location
git clone https://github.com/marissa-hagglund/VA-Audiology-Website.git
```
2. Go into the git repo directory
```bash
cd YOUR_REPO_LOCATION/VA-Audiology-Website
```
3. Install all the necessary packages with Npm
```bash
npm install -g node-pre-gyp
```
```bash
# This step may take longer
npm install
```
If you run into issues with node-sass when running "npm install" on MacOS,
try running this command first:
```bash
npm install node-sass
```

#### Starting the application locally
All the packages required for the project are now installed, you are now ready to run the application locally with the following commands:
```bash
# Be sure that you in the project directory first
npm start
```
Your default browser should open up the application. If not enter the following link into your browser.
```bash
http://localhost:3000/
```
#### Running Unit Tests
To run the unit tests, first change into your repo's directory and enter the following commands:
```bash
npm test
```
This will trigger lint to run first then all of the unit tests.
#### End-to-End Tests
Run protractor with the following commands
```bash
npm run protractor
```

## Configuration
Configuration files live in `config/` directory. We are currently using webpack, karma, and protractor for different stages of your application.  

### Adding external styling stylesheet
Any stylesheets (Sass or CSS) placed in the `src/styles` directory and imported into the project will automatically be compiled into an external `.css` and embedded in the production builds.

For example using Bootstrap as an external stylesheet:
1. Create a `styles.scss` file (name doesn't matter) in the `src/styles` directory.
2. Use `npm install` to install desired Bootstrap version
3. In `styles.scss` add `@import 'bootstrap/scss/bootstrap.scss';`
4. In `src/app/app.module.ts` add the import statements: `import '../styles/styles.scss';`

### Adding new components
New components can be added by using the following command:
```bash
ng generate component [your_compment_name]
```
This should generate all the necessary files in the `src\app\` folder.   
Be sure to add your component to `app.module.ts` file.   
Depending on the what you are working on, you will also need to add your component to the `declarations: [ ]` in `@NgModule`;

### Adding new module
New modules can be installed using Npm with the following command:   
```bash
npm install [package name]
```
Depending on the module, you may also need to add the module to `import: [ ]` and `export: [ ]` in `@NgModule`.   
You may still need to import in the module in the component that uses it.

## Contributing
Before creating Pull Request; all unit tests should be passing and coverage should be 100% and there should not be any lint errors.  After three the Pull Request has been approved by three people the it will be merged into master.

## Project Sponsor

<b>National Center for Rehabilitative Auditory Research (NCRAR) at the OHSU VA</b>   
Candice Manning    

<b>Portland State University Computers Science Department</b>   
Bart Massey

## Authors
Team Lead:
* Marissa Hagglund

Team Members:
* Jason Yu
* Joseph Remington
* Kaleb Striplin
* Sean Paterson
* Tutu Wei
* Zeyong Shan

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

<!--

Commenting these out for now until we know more about deployment

```bash
# WINDOWS only. In terminal as administrator
npm install -g node-pre-gyp

# install the repo with npm
npm install

# start the server
npm start

# use Hot Module Replacement
npm run server:dev:hmr
```
go to [http://0.0.0.0:3000](http://0.0.0.0:3000) or [http://localhost:3000](http://localhost:3000) in your browser

### server
```bash
# development
npm run server
# production
npm run build:prod
npm run server:prod
```

## Other commands

### build files
```bash
# development
npm run build:dev
# production (jit)
npm run build:prod
# AoT
npm run build:aot
```

### hot module replacement
```bash
npm run server:dev:hmr
```

### watch and build files
```bash
npm run watch
```

### run unit tests
```bash
npm run test
```

### watch and run our tests
```bash
npm run watch:test
```

### run end-to-end tests
```bash
# update Webdriver (optional, done automatically by postinstall script)
npm run webdriver:update
# this will start a test server and launch Protractor
npm run e2e
```

### continuous integration (run unit tests and e2e tests together)
```bash
# this will test both your JIT and AoT builds
npm run ci
```

### run Protractor's elementExplorer (for end-to-end)
```bash
npm run e2e:live
```

### build Docker
```bash
npm run build:docker
```

## Docker

To run project you only need host machine with **operating system** with installed **git** (to clone this repo)
and [docker](https://www.docker.com/) and thats all - any other software is not needed
(other software like node.js etc. will be automatically downloaded and installed inside docker container during build step based on dockerfile).

### Install docker

#### MacOS:

`brew cask install docker`

And run docker by Mac bottom menu> launchpad > docker (on first run docker will ask you about password)

#### Ubuntu:

```
sudo apt-get update
sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
sudo apt-add-repository 'deb https://apt.dockerproject.org/repo ubuntu-xenial main'
sudo apt-get update
apt-cache policy docker-engine
sudo apt-get install -y docker-engine
sudo systemctl status docker  # test:  shoud be ‘active’
```
And add your user to docker group (to avoid `sudo` before using `docker` command in future):
```
sudo usermod -aG docker $(whoami)
```
and logout and login again.

### Build image

Because *node.js* is big memory consumer you need 1-2GB RAM or virtual memory to build docker image
(it was successfully tested on machine with 512MB RAM + 2GB virtual memory - building process take 7min)

Go to main project folder. To build big (~280MB) image which has cached data and is able to **FAST** rebuild  
(this is good for testing or staging environment) type:

`docker build -t angular-starter .`

To build **SMALL** (~20MB) image without cache (so each rebuild will take the same amount of time as first build)
(this is good for production environment) type:

`docker build --squash="true" -t angular-starter .`

The **angular-starter** name used in above commands is only example image name.
To remove intermediate images created by docker on build process, type:

`docker rmi -f $(docker images -f "dangling=true" -q)`

### Run image

To run created docker image on [localhost:8080](localhost:8080) type (parameter `-p 8080:80` is host:container port mapping)

`docker run --name angular-starter -p 8080:80 angular-starter &`

And that's all, you can open browser and go to [localhost:8080](localhost:8080).

### Run image on sub-domain

If you want to run image as virtual-host on sub-domain you must setup [proxy](https://github.com/jwilder/nginx-proxy)
. You should install proxy and set sub-domain in this way:

 ```
 docker pull jwilder/nginx-proxy:alpine
 docker run -d -p 80:80 --name nginx-proxy -v /var/run/docker.sock:/tmp/docker.sock:ro jwilder/nginx-proxy:alpine
 ```

 And in your `/etc/hosts` file (linux) add line: `127.0.0.1 angular-starter.your-domain.com` or in yor hosting add
 folowing DNS record (wildchar `*` is handy because when you add new sub-domain in future, you don't need to touch/add any DNS record)

 ```
 Type: CNAME
 Hostname: *.your-domain.com
 Direct to: your-domain.com
 TTL(sec): 43200
 ```

And now you are ready to run image on subdomain by:

```
docker run -e VIRTUAL_HOST=angular-starter.your-domain.com --name angular-starter angular-starter &
```

### Login into docker container

`docker exec -t -i angular-starter /bin/bash`

## Netlify

You can quickly create a free site to get started using this
starter kit in production on [Netlify](https://www.netlify.com/):
-->
