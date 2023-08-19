const usersCtrl = {};
const User = require('../models/User');
const passport = require('passport');

usersCtrl.rendersignupForm = (req, res) => {
  res.render('users/signup');
};

usersCtrl.signup = async (req, res) => {
  const errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: 'password do not match' });
  }
  if (password.length < 6) {
    errors.push({ text: 'passwords must be at least 6 characters' });
  }
  if (errors.length > 0) {
    res.render('users/signup', {
      errors,
      name,
      email,
    });
  } else {
    const emailUser = await User.findOne({ email });
    if (emailUser) {
      req.flash('error_msg', 'The email is already in use.');
      res.redirect('/users/signup');
    } else {
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'You are register');
      res.redirect('/users/signin');
    }
  }
};

usersCtrl.rendersigninForm = (req, res) => {
  res.render('users/signin');
};

usersCtrl.signin = passport.authenticate('local', {
  failureRedirect: '/users/signin',
  successRedirect: '/notes',
  failureFlash: true,
});

usersCtrl.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success_msg', 'You are Log Out now.');
    res.redirect('/users/signin');
  });
};

module.exports = usersCtrl;
