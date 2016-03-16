#!/bin/bash

echo 'Restarting wspecs-home... '
echo 'Logs: /var/log/apps/wspecs-home.log'
echo 'Running at: http://wspecs.com/'
if [ $1 = 'prod' ]
then
  kill -9 1376
  date >> /var/log/apps/wspecs-home.log
  node wspecs-home $1 >> /var/log/apps/wspecs-home.log
else
  ps -ef | grep 'wspecs-home dev' | awk '{print $2}'
fi
