set RUST_BACKTRACE=full

..\..\pi_pt\bin\pi_serv -m httpServer -p 80 -s ../dst -d ../dst -u ../src

pause;