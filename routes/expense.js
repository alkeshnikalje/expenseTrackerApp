const express = require('express');
const router = express.Router();
const {addExpense} = require('../controllers/expenseController');
const userAuth = require('../middleware/auth');

router.post('/', userAuth, addExpense);



module.exports = router;