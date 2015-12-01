var express = require('express');
var app = express();
var securityLayer = require('./app/security');
var router = require('./app/router');
var middleware = require('./app/middleware');

module.exports = {
  start: function(port) {
    middleware.run(app);
    securityLayer.run(app);
    router.run(app);
    app.listen(port);
  }
}
