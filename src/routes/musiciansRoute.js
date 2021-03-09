
const express = require('express');
const router = express.Router();

const musiciansController = require('../app/controllers/MusiciansController');

router.get('/', musiciansController.index);

module.exports = router;
