const express = require('express');
const router = express.Router();
const {signUp, login, getUser, resetPassword} = require('../controllers/userController');
const userAuth = require('../middleware/auth');


router.post('/signup',signUp);

router.post('/login', login);

router.get('/', userAuth, getUser);

router.post('/resetPass', resetPassword );


module.exports = router;