#!/bin/sh
service nginx stop
sudo certbot renew > /var/log/letsencrypt/renew.log 2>&1
LE_STATUS=$?
service nginx start
if [ "$LE_STATUS" != 0 ]; then
    echo Automated renewal failed:
    cat /var/log/letsencrypt/renew.log
    exit 1
fi
