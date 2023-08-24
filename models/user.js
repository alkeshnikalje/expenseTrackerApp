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
        unique : true,
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
    }
})

module.exports = User;