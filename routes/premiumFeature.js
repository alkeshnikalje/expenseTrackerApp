const express = require('express');
const router = express.Router();

const {showLeaderBoard} = require('../controllers/premiumFeatureController');
const userAuth = require('../middleware/auth');

router.get('/premiumFeature', userAuth ,showLeaderBoard);

module.exports = router;