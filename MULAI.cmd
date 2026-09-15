@echo off
cd /d "%~dp0"
if not exist node_modules call npm ci
if errorlevel 1 exit /b 1
call npm run build
if errorlevel 1 exit /b 1
echo Buka http://127.0.0.1:4173 lalu pilih Coba versi demo.
call npm run preview -- --port 4173 --strictPort
