const { Router } = require('express');
const {
  rendersigninForm,
  signup,
  rendersignupForm,
  signin,
  logout,
} = require('../controllers/users.controller');
const router = Router();

router.get('/users/signup', rendersignupForm);

router.post('/users/signup', signup);

router.get('/users/signin', rendersigninForm);

router.post('/users/signin', signin);

router.get('/users/logout', logout);

module.exports = router;
