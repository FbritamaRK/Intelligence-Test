@echo off
title Simulasi Tes Ketelitian Data
cls
echo ==============================================================
echo    Memulai Server Simulasi Tes Ketelitian Data (via NPM)
echo ==============================================================
echo.
npm run dev
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [!] Terjadi kesalahan saat menjalankan npm.
    echo Pastikan Node.js dan npm sudah terpasang, lalu coba jalankan: npm install
    pause
)
