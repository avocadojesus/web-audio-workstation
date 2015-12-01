var path = require('path');

module.exports = {
  run: function (app) {
    require('./routes/users')(app);

    app.get('/', function(req, res) {
      console.log(__dirname)
      res.sendFile(path.join(__dirname, '../views/socket-test.html'));
    })
  }
};
