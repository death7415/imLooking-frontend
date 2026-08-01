@echo off
setlocal
set "PATH=C:\Users\700fps Garib Rath\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;%PATH%"
start http://127.0.0.1:5173/
call "C:\Users\700fps Garib Rath\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd" dev --host 127.0.0.1 --port 5173 --open
