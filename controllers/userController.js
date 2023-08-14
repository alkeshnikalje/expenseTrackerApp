const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (req,res)=>{
    const {name,email,password} = req.body;
    try{
        if(!name || !email || !password){
            return res.status(400).json({msg : "all fields are required"});
        }
        const user = await User.findOne({where : {
            email
        }});

        if(user){
            return res.status(403).json({msg : "user already exits with this email"});
        }
        const hashedPass = await bcrypt.hash(password,10);
        const Newuser = await User.create({name,email,password : hashedPass});
        return res.json({msg : "signup successfull", Newuser});
    }
    catch(err){
        return res.status(500).json({error : err.message});
    }
}


exports.login = async (req,res)=>{

}