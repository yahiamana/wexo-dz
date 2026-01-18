@echo off
echo ===================================================
echo   CRITICAL REPAIR: STOPPING SERVER & DOWNGRADING
echo ===================================================
echo.
echo 1. PLEASE MAKE SURE YOU HAVE STOPPED 'npm run dev' (Ctrl+C)
echo.
timeout /t 3

echo Stopping all Node.js processes to unlock files...
taskkill /F /IM node.exe
timeout /t 2 /nobreak >nul

echo.
echo Reinstalling Dependencies (Downgrading Tailwind)...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
call npm install --legacy-peer-deps

echo.
echo Cleaning Next.js Cache...
if exist .next rmdir /s /q .next
if exist node_modules\.cache rmdir /s /q node_modules\.cache

echo.
echo Regenerating Prisma Client...
call npx prisma generate

echo.
echo Updating Database Schema...
call npm run db:push

echo.
echo Seeding Database...
call npm run db:seed

echo.
echo ==============================================
echo   REPAIR COMPLETE!
echo   You can now run 'npm run dev' to start the server.
echo ==============================================
pause
