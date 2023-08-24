const User = require('../models/user');
const Expense = require('../models/expense');
const Sequelize = require('sequelize');

exports.showLeaderBoard = async (req,res)=>{
    try{
        const data = await User.findAll({
            attributes: [
                "name",
                "totalExpenses"
            ],
            order: [[ 'totalExpenses', 'DESC']]
        });
        return res.json(data);
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
}