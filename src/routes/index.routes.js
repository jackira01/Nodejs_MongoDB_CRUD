const { Router } = require('express');
const {renderAbout, renderIndex} = require('../controllers/index.controller')
const router = Router();

router.get('/', renderIndex);

router.get('/about', renderAbout);

module.exports = router;
