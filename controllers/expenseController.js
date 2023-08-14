const Expense = require('../models/expense');


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
            userId : req.user.id
        });
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