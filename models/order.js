const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define("order",{
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    pymendtId : Sequelize.STRING,
    orderId : Sequelize.STRING,
    status : Sequelize.STRING
})

module.exports = Order;