const express = require('express');
const cors = require('cors');
const dotevn = require('dotenv').config()
const sequelize = require('./config/database');
const User = require('./models/user');
const Expense = require('./models/expense');
const userRounter = require('./routes/user');

const app = express();
app.use(express.json());

app.use('/api/user',userRounter);


User.hasMany(Expense);

sequelize.sync({alter : true})
.then(()=>{
    console.log('connection successfull');
})
.catch((err)=>{
    console.log(err);
})







app.listen(process.env.PORT,()=>{
    console.log(`server running`);
})









