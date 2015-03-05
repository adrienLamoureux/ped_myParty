#!/bin/bash
xterm -hold -e mongod --dbpath ./../mongodb/ &
xterm -hold -e nodemon server.js &
