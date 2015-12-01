module.exports = {
  run: function (app) {
    require('./routes/users')(app);
  }
};
