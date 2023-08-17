const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/auth');
const {purchasePremium, updatePremium} = require('../controllers/purchaseController');

router.get('/premiumMembership', userAuth, purchasePremium);

router.post('/updateTransactionStatus', userAuth, updatePremium);



module.exports = router;