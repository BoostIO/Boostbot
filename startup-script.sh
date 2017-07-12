if ! [[ $(ps aux | grep [n]ode) ]];then
  (node server.js >> logfile.log) &
fi
