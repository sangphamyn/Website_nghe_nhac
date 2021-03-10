
const express = require('express');
const router = express.Router();

const singersController = require('../app/controllers/SingersController');

router.get('/:slug', singersController.show);
router.get('/', singersController.index);

module.exports = router;
