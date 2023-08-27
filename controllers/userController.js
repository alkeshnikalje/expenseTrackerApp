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
    const {email, password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({msg : "all fields are required"});
        }
        const user = await User.findOne({where : {email}});
        if(!user){
            return res.status(404).json({msg : "user not found. Please signup"});
        }
        const passMatch = await bcrypt.compare(password, user.password);
        if(!passMatch){
            return res.status(401).json({msg : "password incorrect"});
        }
        const token = jwt.sign({id : user.id},process.env.SECRET);
        return res.json({msg : "logged in successfully", token});
    }
    catch(err){
        return res.status(500).json({error : err.message});
    }
}

exports.getUser = async (req,res)=>{
    try{
        const user = await User.findByPk(req.user.id);
        if(!user){
            return res.status(404).json({msg: "user not found"});
        }
        return res.json(user);
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
}


exports.resetPassword = async (req,res)=>{
    const {resetToken, password} = req.body;
    try{
        const user = await User.findOne({where: { resetToken }});
        if(!user){
            return res.status(400).json({msg: "link expired or something went wrong"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword
        user.resetToken = null;
        await user.save();

        return res.status(200).json({ msg: 'Password reset successful' });
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
}