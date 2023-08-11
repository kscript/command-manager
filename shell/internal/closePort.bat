@echo off
set port=%1
for /f "tokens=1-5" %%i in ('netstat -ano^|findstr ":%port%"') do (
  echo %%i %%j %%k %%l %%m %1
  taskkill /pid %%m /f
)
pause