@echo off
title CAPACITY CONNECT - SIH Prototype Launcher
cls
echo ===================================================================
echo   CAPACITY CONNECT - Digital Capacity Building & LMS Portal
echo   Smart India Hackathon (SIH 2026) Prototype Launcher
echo ===================================================================
echo.
echo Starting local web server...

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    python run_server.py
) else (
    echo Python was not detected in PATH.
    echo Launching index.html directly in your default browser...
    start "" index.html
)
pause
