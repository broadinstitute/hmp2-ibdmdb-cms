# HMP2 - IBDMDB CMS

This project contains all the files that serve the IBDMDB CMS 
(viewable at https://www.ibdmdb.org). The CMS handles the main landing page 
for the project as well as the Protcols, Team and Admin pages.

The website is primarily written in Python making use of the Django/Mezzanine
framework alongside several Django plugins and a template that makes use of 
the Bootstrap CSS library.    

### Prerequisites

The following Python modules are required for the project:

* django 1.9.7
* mezzanine 4.1.0
* django-cloud-browser 0.3.0
* django-treenave 0.9.0
* gunicorn 19.7.1
* psycopg2 2.6.1

Additionally the following software should be installed to launch a production
copy of the website:

* nginx 1.10.2
* postgresql 9.2.18

It is recommended that the python virtualenv tool be used to create an isolated 
environment where the project can be installed too. 

* virtualenv >= 1.10.1

### Installing

Recommended installation of the website should be done by cloning the 
repository and creating a virtualenv to install all modules and binaries into. 

The virtualenv-related steps from the following installation steps may be 
omitted if virtualenv is not installed.

Once the repository has been cloned we can create a virtualenv in the projects
root directory.

```
virtualenv <PATH TO PROJECT DIRECTORY>

## Activate the virtualenv
source <PATH TO PROJECT DIRECTORY>/bin/activate
```

Next we proceed to install all required modules:

```
# Upgrade our pip library first to avoid any problems
pip install -U pip
pip install -r requirements.txt
```

Finally we start up the gunicorn server to serve the website

```
sh <PATH TO PROJECT DIRECTORY>/bin/gunicorn_start
```


## Deployment

The easiest way to deploy a production-ready copy of the website is to 
the pre-built RPM and deploy it onto a Centos/RHEL 7 server/VM.  

Provided that nginx and postgresql are installed centrally installation 
of the RPM should install all necessary configuration files for the website
to be brought up using systemd

The following set of instructions will assume either a Red Hat or Centos
based system since the RPM's are built for these distributions but following
the installation steps from the previous section alongside the following 
instrucitons should allow deployment on most distributions.

We'll need to install our pre-requesites of nginx and postgresql:

```
# Update our repository cache first
yum update

yum install nginx
yum install postgresql
```

We need to create a user and group that will run both the nginx and gunicorn
services when they are started.

```
groupadd broad

useradd -G broad ibdmdb
```

Next we'll want to install the project RPM:

```
sudo yum localinstall <PATH TO RPM FILE>
```

This will install the website files under the /local/ibdmdb directory and 
place all necessary configuration files in their necessary directories. 
Because configuration management is not in the scope of this project we'll
need to overwite the base nginx configuration file:

```
# Make a back-up just in case
cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak

# Create a symlink to our project config
ln -s /etc/nginx/nginx.ibdmdb-cms.conf /etc/nginx/nginx.conf

# Restart nginx
service nginx restart
```

The RPM also registers our gunicorn app with systemd so we can start it up 
very easily using the following command:

```
service gunicorn start
```

The final steps involve properly setting up the database required for the
project. First we start by creating a database and the proper user and roles

These steps assume that postgres has been configured properly and the admin 
account has been setup with a password. Instructions to do so can be found [here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-centos-7#installation).

```
psql -U postgres -W

# Create required role
postgres=# CREATE ROLE ibdmdb;

# Create user for project
postgres=# CREATE USER hmp2 WITH PASSWORD '<PASSWORD'>;

# Create database for project
postgres=# CREATE DATABASE mezzdb;

# Grant privileges to hmp2
postgres=# GRANT ALL PRIVILEGES ON DATABASE "mezzdb" to hmp2;
```

A copy of the database dump can be downloaded from the repository download page
and loaded using the pg_restore command:

```
pg_restore --verbose -d mezzdb -U postgres -W ./mezzdb_dump_170403.sql.tar

# Restart gunicorn to make sure all changes are registered
service gunicorn restart
```

## Authors

* **Keith Bayer** - *Initial work* 
* **Randall Schwager** - *Additions and Maintenance*
* **Cesar Arze** - *Maintenance*

## License

Copyright (c) 2017 Harvard School of Public Health

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
