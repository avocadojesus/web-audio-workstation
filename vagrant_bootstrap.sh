#!/usr/bin/env bash

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
    proxy_pass http://localhost:1337;
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


# install node packages
sudo curl -sL https://deb.nodesource.com/setup_0.12 | sudo sh
sudo apt-get -y install nodejs
# mkdir /home/vagrant/node_modules
# ln -s /home/vagrant/node_modules/ /vagrant/node_modules
sudo npm install -g npm

# sudo ln -s /usr/bin/nodejs /usr/bin/node
sudo npm install -g gulp
sudo npm install -g forever
sudo npm install -g sails
sudo npm install -g mocha

# remove apache
sudo apt-get -y remove apache2

# own /var/log with vagrant (for readz)
sudo chown -R vagrant:root /var/log

# install dependancies
cd /vagrant
npm install

# MySQL setup
echo "Configuring MySQL..."
if [ ! -f /var/log/databasesetup ];
then
    # Setup database
    echo "CREATE USER 'waw'@'%' IDENTIFIED BY 'zzzz'" | mysql -uroot -prootpass
    echo "CREATE DATABASE waw" | mysql -uroot -prootpass
    echo "GRANT ALL ON waw.* TO 'waw'@'%'" | mysql -uroot -prootpass

    # Set flag file
    touch /var/log/databasesetup

    # Restart service
    sudo service mysql restart
fi

echo "Welcome to the CODEZONEEEEE!"
echo "mysql host: http://localhost:8788"
echo "mysql username: waw"
echo "mysql password: zzzz"
echo "mysql database: waw"
echo "url: http://localhost:8787"
