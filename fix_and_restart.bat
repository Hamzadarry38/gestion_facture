@echo off
echo ========================================
echo   MRY Database Fix Script
echo ========================================
echo.

echo Step 1: Stopping all Node and Electron processes...
taskkill /F /IM electron.exe 2>nul
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo Step 2: Copying fresh database files...
copy /Y "test_data\invoices.db" "%APPDATA%\gestion-factures\invoices.db"
copy /Y "test_data\invoices_chaimae.db" "%APPDATA%\gestion-factures\invoices_chaimae.db"
copy /Y "test_data\multi.db" "%APPDATA%\gestion-factures\multi.db"

echo.
echo Step 3: Verifying files...
dir "%APPDATA%\gestion-factures\*.db"

echo.
echo ========================================
echo   Files copied successfully!
echo   Now you can restart the application.
echo ========================================
echo.
pause
