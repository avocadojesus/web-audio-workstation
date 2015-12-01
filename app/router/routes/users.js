var Controller = require('../../controllers/users');

module.exports = function(app) {
  app.get('/api/v1/users', function(req, res) {
    Controller.get(req, res);
  });

  app.post('/api/v1/users', function(req, res) {
    Controller.create(req, res);
  })

  app.post('/api/v1/users/login', function(req, res) {
    Controller.login(req, res);
  })
};
