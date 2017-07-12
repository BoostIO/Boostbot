if ! [[ $(ps aux | grep "[n]ode server.js") ]];then
  (node server.js >> logfile.log) &
fi
