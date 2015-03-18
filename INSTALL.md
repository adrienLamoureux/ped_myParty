# Installation instructions

Go to release branch (git checkout release) for a local deployement 

## Configuration System

Install 
* nodejs
* mongodb
* git

### Windows

Add to the global variable on the windows system the path to the mongodb/bin folder

## Installation

npm install in ./

## Server and MongoDB execution

### For all systems

* mongod --dbpath ./mongodb/
* npm start ./

### Windows

To start server and MongoDB:
* go to ./server/ 
* remove .ex extension on the runWindows.bat.ex
* run runWindows.bat 

### Linux

To start server and MongoDB:
* go to ./server/ 
* remove .ex extension on the runLinux.sh.ex
* run runLinux.sh 