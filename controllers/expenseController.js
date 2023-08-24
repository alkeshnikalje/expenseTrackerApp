const Expense = require('../models/expense');
const User = require('../models/user');



exports.addExpense = async (req,res)=>{
    const {expenseAmount, description, category} = req.body;
    try{
        if(!expenseAmount || !category){
            return res.status(400).json({msg: "expense amount and category is a required field"});
        }
        const expense = await Expense.create({
            expenseAmount,
            description,
            category,
            userId : req.user.id,
        });
        const user = await User.findByPk(req.user.id);
        user.totalExpenses = user.totalExpenses + Number(expenseAmount);
        await user.save();
        return res.json(expense);
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
}

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