const User = require('../models/user');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

exports.sendEmail = async (req,res)=>{
    const email = req.body.email;
   try{
    if(!email){
        return res.status(400).json({msg: "email is required"});
    }
    const user = await User.findOne({where : {email}});
    if(!user){
        return res.status(404).json({msg: "user not found with this email"});
    }
    const randomString = randomstring.generate();
    user.resetToken = randomString;
    await user.save();

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reset Your Password',
        html: `<p>Click <a href="http://localhost:5500/frontend/resetPass/?token=${randomString}">here</a> to reset your password.</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error sending email:", error);
            return res.status(500).json({ msg: "Failed to send reset email" });
        } else {
            console.log("Email sent:", info.response);
            return res.status(200).json({ msg: "Reset email sent successfully" });
        }
    });

    }
   catch(err){
    return res.status(500).json({error: err.message});
   } 
}