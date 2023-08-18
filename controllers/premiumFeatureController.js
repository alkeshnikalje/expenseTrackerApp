const User = require('../models/user');
const Expense = require('../models/expense');
const Sequelize = require('sequelize');

exports.showLeaderBoard = async (req,res)=>{
    try{
        const data = await User.findAll({
            attributes: [
                "name",
                [Sequelize.fn('SUM', Sequelize.col('Expenses.expenseAmount')), 'total']
            ],
            include : [
                {
                model: Expense,
                attributes: []
                }
            ],
            group: ['Users.id'],
            order: [[Sequelize.literal('total'), 'DESC']]
        });
        return res.json(data);
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
}