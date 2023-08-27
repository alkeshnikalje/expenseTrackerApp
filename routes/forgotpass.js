const express = require('express');
const router = express.Router();
const {sendEmail} = require('../controllers/forgotPass');

router.post('/password/forgotpassword', sendEmail)

module.exports = router;