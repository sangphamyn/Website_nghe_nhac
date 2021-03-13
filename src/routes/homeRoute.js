const express = require('express');
const router = express.Router();

const songsController = require('../app/controllers/SongsController');
router.post('/:id', songsController.destroy);
router.get('/', songsController.index);

module.exports = router;
