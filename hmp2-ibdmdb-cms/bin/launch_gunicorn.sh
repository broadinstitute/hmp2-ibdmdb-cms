#!/bin/bash

nohup gunicorn -c /local/ibdmdb/etc/gunicorn.conf hmp2.wsgi:application >> $(date '+%F.log') 2>&1 & 

