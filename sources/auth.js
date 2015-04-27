var basicAuth = require('basic-auth')
  , config = require('./config/environment')
;

exports.control = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var control = basicAuth(req);

  console.log(control);

  if (!control || control.pass != config.security) {
    return unauthorized(res);
  }
  else {
    return next();
  }
};
