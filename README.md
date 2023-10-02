# MicroCODE's WebApp
A generic 3-Tier MERN Web App deployed in three (3) Docker Containers.

    * Frontend - the Web Browser Client
    * Backend - the Cloud based Server
    * Database - a MongoDB database for the Backend


## Description

This represents a generic React App that can create User Account, contril functionality by 'Role',
handle authentication--caution this example is simple 'oprn text' passwords.

This App was built from a new template I created for the MIT xPRO MERN course in 2021-2022.
The template allows me to built a full 3-Tier 'Dockerized' App and deploy it immediately to a
hosting service like DigitalOcean, AWS, or Azure.

The App template (GitHub Repo: MicroCODE-WebApp) inlcudes a full CI/CD pipleine
that utilizes a GitHib Action, Docker Hub, and three Containers.


## Getting Started

* General help with using Visual Studio Code to develop JavaScript...
```
https://code.visualstudio.com/Docs/languages/javascript
```

### Dependencies

* React
* Babel
* GitHub
* Docker
* Docker Hub
* DigitalOcean


### Installing

* Clone this repo

* Use "npm install" to load a simple HTTP Server for the project
```
npm install
```

* Use "docker compose up" command in the project folder to build and launch the App in three Containers.
```
docker compose up
```

* Navigate your Browser to...
```
localhost:3000
```

* Add test to "puppeteer.js" in the Server root folder.
* To execute tests, open a new Terminal Windows in the Server Root and execute...
```
node puppeteer
```



* Demonstration of app startup...

<p align="left"><img src=".\.github\images\app-startup.png" width="720" title="Server Startup..."></p>

* Example of app u.i...

<p align="left"><img src=".\.github\images\app-ui.png" width="720" title="App U.I..."></p>


## Help

This is an unsupported demonstation project.

## Terminology

| Word or Acronym	| Description/Definition                                |
|-------------------|-------------------------------------------------------|
|  NPM	            | Node Package Manager, actually “Node PM”, “Node pkgmakeinst” a system to deploy, install, and maintain NodeJS Apps. (PM was a BASH utility).
|  Template	        | A file used to start others to ensure code and documentation consistency.
|  MERN             | MongoDB, Express, React, Node JS.
|  MongoDB          | A ‘NoSQL’ database designed for Cloud applications, also referred to as a ‘Document Store’.
|  Express          | Express is *not* a database but rather an ‘extensible routing language’ for communication between a Client and a Server.
|  React            | A Web UI development system, a JavaScript library developed by Facebook and made public—and Open Source—since 2013.
|  Node JS          | A development stack that executes from a local file store—on a local Server—instead of from a network of remote servers on the Web.
|  Docker           | A system to ‘containerize’ software deployment akin to shipping containers.


## Authors

Contributors names and contact info

* Timothy J McGuire [@TimothyMcGuire](https://twitter.com/TimothyMcGuire)


## Version History

* 0.0
    * Coded using MicroCODE Templates and MITxPRO-DockerMERN.

## Future Development

* 0.1
    * Add microservices--additional Docker Containers--for AUTH, SMS, EMAIL and FILEs.


## License

This project is licensed under the MIT License - see the LICENSE.md file for details
