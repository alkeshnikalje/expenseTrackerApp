const express = require('express');
const router = express.Router();
const {addExpense, getExpense, deleteExpense, editExpense, downloadFile, getByPagination} = require('../controllers/expenseController');
const userAuth = require('../middleware/auth');

router.post('/', userAuth, addExpense);

router.get('/',userAuth,getExpense);

router.delete('/:expenseId', userAuth, deleteExpense);

router.patch('/:expenseId', userAuth, editExpense);

router.get('/download', userAuth, downloadFile);

router.get('/pagination', userAuth, getByPagination);

module.exports = router;