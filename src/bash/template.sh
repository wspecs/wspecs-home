#!/bin/bash

echo 'Restarting {appName}... '
echo 'Logs: /var/log/apps/{appName}.log'
echo 'Running at: {base}'
if [ $1 = 'prod' ]
then
  kill -9 {pid}
  date >> /var/log/apps/{appName}.log
  node {appName} $1 >> /var/log/apps/{appName}.log
else
  ps -ef | grep '{appName} dev' | awk '{print $2}'
fi
