const express = require('express');
const router = express.Router();
const {getFiles} = require('../controllers/filesController');
const userAuth = require('../middleware/auth');

router.get('/files', userAuth ,getFiles);

module.exports = router;