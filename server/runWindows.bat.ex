:: Install NodeJS and Git. Git must be added to the windows %PATH%
@echo off
start "Mongo Server" /MIN mongod --dbpath ..\mongodb &
start "Main Server" nodemon server.js &
sleep 3
start http://127.0.0.1:4711
