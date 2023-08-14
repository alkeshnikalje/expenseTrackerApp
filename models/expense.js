const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Expense = sequelize.define('expenses',{
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },

    expenseAmount : {
        type : Sequelize.INTEGER,
        allowNull : false
    },

    description : {
        type : Sequelize.STRING

    },

    category : {
        type : Sequelize.STRING,
        allowNull : false
    }
})

module.exports = Expense;