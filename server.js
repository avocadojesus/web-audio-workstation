var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var securityLayer = require('./app/security');
var router = require('./app/router');
var middleware = require('./app/middleware');

io.on('connection', function(socket){
  socket.on('down', function() {
    console.log('down');
  });

  socket.on('up', function() {
    console.log('up');
  });

  socket.on('left', function() {
    console.log('left');
  });

  socket.on('right', function() {
    console.log('right');
  });
});

module.exports = {
  start: function(port) {
    middleware.run(app);
    securityLayer.run(app);
    router.run(app);
    app.set('view engine', 'jade');
    app.set('views', './app/views');
    http.listen(port);

    console.log('listening on ' + port)
  }
}
