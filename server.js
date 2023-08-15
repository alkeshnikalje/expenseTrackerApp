const express = require('express');
const cors = require('cors');
const dotevn = require('dotenv').config()
const sequelize = require('./config/database');
const User = require('./models/user');
const Expense = require('./models/expense');
const userRounter = require('./routes/user');
const expenseRouter = require('./routes/expense');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/user',userRounter);
app.use('/api/user/expenses', expenseRouter);


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









