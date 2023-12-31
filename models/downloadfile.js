const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Downloads = sequelize.define('downloads',{
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },

    url : {
        type : Sequelize.STRING
    }
})

module.exports = Downloads;