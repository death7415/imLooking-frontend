@echo off
setlocal
start http://127.0.0.1:8000/
"C:\Users\700fps Garib Rath\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" -m http.server 8000
