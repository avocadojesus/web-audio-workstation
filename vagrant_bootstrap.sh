#!/usr/bin/env bash

# collect environment vars from /.waw/environment.json file
DB_HOST=`cat /.waw/env.json | python -c 'import json, sys; print json.load(sys.stdin)["DB_HOST"]'`
DB_USERNAME=`cat /.waw/env.json | python -c 'import json, sys; print json.load(sys.stdin)["DB_USERNAME"]'`
DB_PASSWORD=`cat /.waw/env.json | python -c 'import json, sys; print json.load(sys.stdin)["DB_PASSWORD"]'`
DB_NAME=`cat /.waw/env.json | python -c 'import json, sys; print json.load(sys.stdin)["DB_NAME"]'`

# update / upgrade
sudo apt-get update
sudo apt-get -y upgrade
sudo apt-get purge g++
sudo apt-get install build-essential
sudo apt-get install g++
sudo apt-get install make
sudo apt-get install gcc
sudo apt-get install libssl-dev

# install mysql and give password to installer
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password password rootpass"
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password_again password rootpass"
sudo apt-get -y install mysql-server

# install git and nginx
sudo apt-get -y install git
sudo apt-get -y install nginx

# setup hosts file
VHOST="
server {
  listen       80;
  server_name  localhost;

  location / {
    proxy_pass http://localhost:8069;
    proxy_http_version 1.1;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host \$host;
    proxy_cache_bypass \$http_upgrade;
  }
}


"

echo "${VHOST}" > /etc/nginx/sites-enabled/default
sudo service nginx restart

# update nginx config
sudo sed -i 's/user www-data/user vagrant/g' /etc/nginx/nginx.conf
sudo sed -i 's/sendfile on;/sendfile off;/g' /etc/nginx/nginx.conf

# make database.json file
DB_JSON="
{
  \"dev\":
  {
    \"host\": \"$DB_HOST\",
    \"user\": \"$DB_USERNAME\",
    \"password\": \"$DB_PASSWORD\",
    \"database\": \"$DB_NAME\",
    \"driver\": \"mysql\",
    \"multipleStatements\": true
  }
}
"
touch /vagrant/database.json
echo $DB_JSON > /vagrant/database.json

# install node packages
sudo curl -sL https://deb.nodesource.com/setup_0.12 | sudo sh
sudo apt-get -y install nodejs
# mkdir /home/vagrant/node_modules
# ln -s /home/vagrant/node_modules/ /vagrant/node_modules
sudo npm install -g npm
# sudo ln -s /usr/bin/nodejs /usr/bin/node
sudo npm install -g gulp
sudo npm install -g forever
sudo npm install -g db-migrate
sudo npm install -g db-migrate-mysql
sudo npm install -g mocha

# remove apache
sudo apt-get -y remove apache2

# own /var/log with vagrant (for readz)
sudo chown -R vagrant:root /var/log

# install dependancies
cd /vagrant
sudo npm install --unsafe-perm --no-bin-links

# MySQL setup
echo "Configuring MySQL..."
if [ ! -f /var/log/databasesetup ];
then
    # Setup database
    echo "CREATE USER '$DB_USERNAME'@'%' IDENTIFIED BY '$DB_PASSWORD'" | mysql -uroot -prootpass
    echo "CREATE DATABASE $DB_NAME" | mysql -uroot -prootpass
    echo "GRANT ALL ON $DB_NAME.* TO '$DB_USERNAME'@'%'" | mysql -uroot -prootpass

    # Set flag file
    touch /var/log/databasesetup

    # Restart service
    sudo service mysql restart
fi

# run migration
db-migrate up

echo "Welcome to Tiqtok!"
echo "mysql host: http://localhost:8788"
echo "mysql username: $DB_USERNAME"
echo "mysql password: $DB_PASSWORD"
echo "mysql database: $DB_NAME"
echo "url: http://localhost:8787"
