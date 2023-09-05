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
const Downloads = require('./models/downloadfile');
const fileRouter = require('./routes/files');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

// app.use(helmet({
//     contentSecurityPolicy: false,
//     crossOriginEmbedderPolicy: false,
// }
// ));

// const accessLogStream = fs.createWriteStream(
//     path.join(__dirname, "access.log"),
//     { flags: "a" }
//   );

//   app.use(morgan('combined', {stream: accessLogStream}));

app.use('/api/user',userRounter);
app.use('/api/user/expenses', expenseRouter);
app.use('/api', purchaseRouter);
app.use('/api/user',premiumRouter); 
app.use('/api/user', forgotPassRouter);
app.use('/api/user/expenses', fileRouter);


User.hasMany(Expense);

User.hasMany(Order);

User.hasMany(Downloads);


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









