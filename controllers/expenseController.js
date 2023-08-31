const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize = require('../config/database');
const AWS = require('aws-sdk');
const Downloads = require('../models/downloadfile');
const { response } = require('express');
const dotenv = require('dotenv').config();

exports.addExpense = async (req, res) => {
    const { expenseAmount, description, category } = req.body;
    const transaction = await sequelize.transaction(); // Start a new transaction

    try {
        if (!expenseAmount || !category) {
            return res.status(400).json({ msg: "expense amount and category are required fields" });
        }

        const expense = await Expense.create({
            expenseAmount,
            description,
            category,
            userId: req.user.id,
        }, { transaction }); // Pass the transaction to the create method

        const user = await User.findByPk(req.user.id, { transaction }); // Pass the transaction to findByPk
        user.totalExpenses = user.totalExpenses + Number(expenseAmount);
        await user.save({ transaction }); // Pass the transaction to save

        // If everything is successful, commit the transaction
        await transaction.commit();

        return res.json(expense);
    } catch (err) {
        // If an error occurs, rollback the transaction
        await transaction.rollback();
        return res.status(500).json({ error: err.message });
    }
};

exports.getExpense = async (req,res)=>{
    try{
        const expenses = await Expense.findAll({where: {userId: req.user.id}});
        return res.json(expenses);
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
}

exports.deleteExpense = async (req,res)=>{
    const id = req.params.expenseId;
    try{
        const expenseToBeDeleted = await Expense.findByPk(id);
        if(!expenseToBeDeleted){
            return res.status(404).json({msg: "expense not found"});
        }
        const user = await User.findByPk(req.user.id);
        user.totalExpenses = user.totalExpenses - Number(expenseToBeDeleted.expenseAmount);
        await user.save();
        await expenseToBeDeleted.destroy();
        return res.json({msg: "expense deleted successfully"});
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
}

exports.editExpense = async (req,res)=>{
    const id = req.params.expenseId;
    const {expenseAmount, description, category} = req.body;
    try{
        const expenseToBeUpdated = await Expense.findByPk(id);
        if(!expenseToBeUpdated){
            return res.status(404).json({msg: "expense not found"});
        }
        if(expenseAmount) expenseToBeUpdated.expenseAmount = expenseAmount;
        if(description) expenseToBeUpdated.description = description;
        if(category) expenseToBeUpdated.category = category;

        const updatedExpense = await expenseToBeUpdated.save();
        return res.json(updatedExpense);
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
}


exports.downloadFile = async (req,res)=>{
    try{
        const filename = `expense${req.user.id}/${new Date()}.txt`
        const expenses = await Expense.findAll({where : {userId : req.user.id}});
        const stringyfiedExpenses = JSON.stringify(expenses);

        let S3bucket = new AWS.S3({
            accessKeyId : process.env.S3ACCESS_KEY,
            secretAccessKey : process.env.S3ACCESS_SECRET
        })

        var params = {
            Bucket : process.env.BUCKET,
            Key : filename,
            Body : stringyfiedExpenses,
            ACL : "public-read"
        }

        S3bucket.upload(params, async (err,response)=>{
            if(err){
                console.log(err);
                return ;
            }
           const file = await Downloads.create({url : response.Location, userId : req.user.id});
           return res.json({url : response.Location}); 
        })
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
}   