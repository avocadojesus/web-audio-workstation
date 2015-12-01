exports.apiError = function(req, res, next) {
  res.error = function(status, msg) {
    res.status(status).json({
      error: msg
    });
  };

  next();
}

exports.apiSuccess = function(req, res, next) {
  res.success = function(msg) {
    res.status(200).json({
      payload: msg
    });
  };

  next();
}
