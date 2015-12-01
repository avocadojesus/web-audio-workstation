### Tiqtok API
Welcome to the Tiqtok API! Our stack is primarily built on a collection of services defined and governed by layers. Those layers are currently defined as follows:

1. <b>Security</b>  - preceeds any route processing. A nice place for XSS filtering, basic input validation, etc...
2. <b>Router</b> - interprets request based on URL and HTTP verb, parses input vars and redirects to a controller.
3. <b>Controller</b> - a gateway sitting between routes and models - primarily responsible for:  
  a.) authenticating user (using an authentication service)  
  b.) performing an action  
  c.) returning a response (using a response service)
4. <b>Model</b> - gateway between controller and database. Responsible for:  
  a.) type validation against input  
  b.) performing a database action  
  c.) returning a database object

### Installing Vagrant

1. Make an Atlas account: visit https://atlas.hashicorp.com/ and setup a new account; remember your 2. username and password!
3. Install Vagrant: visit http://www.vagrantup.com/downloads.html and install the correct version
4. Install VirtualBox for your OS: visit https://www.virtualbox.org/wiki/Downloads and install the correct version for your host OS. Eg., if you use OSX, install the Virtualbox for OSX Hosts

### Quick Start

We are using vagrant to handle our local deployment. Launching vagrant will spin up a virtual box on your machine, load it with ubuntu 14, install node, nginx, etc, and run all other necessary provisioning to get TiqTok up and running.

```bash
git clone https://gitlab.com/tiqtok-resources/tiqtok-api.git
cd tiqtok-api
vagrant up
vagrant ssh
cd /vagrant
node index.js
```

Once vagrant is complete, you can navigate to
```bash
http://localhost:8787
```
to see the tiqtok api in action.

### Testing
```bash
npm install -g mocha
mocha
```