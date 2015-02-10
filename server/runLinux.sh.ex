#!/bin/bash
mkdir mongodb/
xterm -hold -e mongod --dbpath mongodb/ &
xterm -hold -e ./../node_modules/nodemon/bin/nodemon.js server.js &