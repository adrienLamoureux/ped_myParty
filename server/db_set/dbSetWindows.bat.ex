:: Install NodeJS and Git. Git must be added to the windows %PATH%
@echo off
start "Clear DB" node cleardb.js &
pause
start "Init User" node initUserDb.js &
pause
start "Init Event" node initEventDb.js &
pause
start "Init Image" node initImageDb.js &
pause
start "Init Command" node initCommandDb.js &
pause
start "Update Db" node updatedb.js &


