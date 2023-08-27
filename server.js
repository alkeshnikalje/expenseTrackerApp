const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config()
const sequelize = require('./config/database');
const User = require('./models/user');
const Expense = require('./models/expense');
const userRounter = require('./routes/user');
const expenseRouter = require('./routes/expense');
const Order = require('./models/order');
const purchaseRouter = require('./routes/purchase');
const premiumRouter = require('./routes/premiumFeature');
const forgotPassRouter = require('./routes/forgotpass');

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/user',userRounter);
app.use('/api/user/expenses', expenseRouter);
app.use('/api', purchaseRouter);
app.use('/api/user',premiumRouter); 
app.use('/api/user', forgotPassRouter);

User.hasMany(Expense);

User.hasMany(Order);


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









