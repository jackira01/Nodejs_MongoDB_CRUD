const helpers = {};

//esta funcion o helpers protege que los usuarios no registrados no accedan a determinada ruta
helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'Not authorized. please login.');
    res.redirect('/users/signin');
  }
};

module.exports = helpers;
