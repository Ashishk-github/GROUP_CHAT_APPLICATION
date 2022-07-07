const bcrypt=require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
function generateAccessToken(id) {
  return jwt.sign(id, process.env.TOKEN_SECRET);
}

exports.signup=async (req,res)=>{
    try{
        const body=req.body;
        const name=body.name,phno=body.phno,email=body.email,pass=body.password;
        // console.log({name,email,phno,pass})
        const emailExist=await User.findOne({where:{email:email}});
        const phnoExist=await User.findOne({where:{phno:phno}});
        if(emailExist || phnoExist) return res.json({status:403})
        const password=await bcrypt.hash(pass,10);
        // console.log(password);
        const user=await User.create({name,email,phno,password});
        res.json({status:200})
    }catch(err){
        console.log(err);
        res.json({status:500});
    }
}
exports.login=async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
        const user=await User.findOne({where:{email:email}});
        if(!user) return res.json({status:404});
        const passwordMatch=await bcrypt.compare(password,user.password);
        if(passwordMatch) {
            const token=generateAccessToken(user.id);
            // console.log(token);
            res.json({token,status:200});
            // res.redirect(`/${token}`)
        }else{
            res.json({status:403});
        }
    } catch (err) {
        console.log(err);
        res.json({status:500});
    }
}