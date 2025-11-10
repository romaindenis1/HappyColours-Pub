@echo off
cd /d "%~dp0happycolours"

:: Ouvrir un terminal pour installer les dépendances
start cmd /k "npm i"

:: Lancer le serveur dans un autre terminal
start cmd /k "npm run dev"

:: Ouvrir VS Code dans ce dossier
start code .

:: Attendre 5 secondes puis ouvrir le navigateur par défaut
timeout /t 5 /nobreak >nul
start http://localhost:3000/

exit
