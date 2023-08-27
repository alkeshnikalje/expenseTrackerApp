const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('users',{
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },

    name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    },
    isPremiumMember : {
        type : Sequelize.BOOLEAN,
        defaultValue: false
    },
    totalExpenses : {
        type : Sequelize.INTEGER
    },
    resetToken : {
        type : Sequelize.STRING,
        defaultValue : null
    }
})

module.exports = User;