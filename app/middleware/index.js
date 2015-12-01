var responseMiddleware = require('./response');

module.exports = {
  run: function(app) {
    app.use(responseMiddleware.apiError);
    app.use(responseMiddleware.apiSuccess);
  }
}
