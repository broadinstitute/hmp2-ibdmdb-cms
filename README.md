To start the mezzanine application:

$ sudo -u ibdmdb /bin/bash
$ . /local/ibdmdb/SOURCE_THIS
$ . /local/ibdmdb/mezzanine/bin/activate
$ cd /local/ibdmdb/mezzanine/hmp2
# for config file with local socket:
$ gunicorn_django -c /local/ibdmdb/etc/gunicorn.conf
# for port:
$ gunicorn_django -w 2 -b 127.0.0.1:9090 &

# Why gunicorn -w 2 -b 127.0.0.1:9090 hmp2:app doesn't work - I'm not sure...
