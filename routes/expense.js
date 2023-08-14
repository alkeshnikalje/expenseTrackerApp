const express = require('express');
const router = express.Router();
const {addExpense, getExpense} = require('../controllers/expenseController');
const userAuth = require('../middleware/auth');

router.post('/', userAuth, addExpense);

router.get('/',userAuth,getExpense);



module.exports = router;