var bodyParser = require('body-parser');

module.exports = {
  run: function(app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
  }
}
