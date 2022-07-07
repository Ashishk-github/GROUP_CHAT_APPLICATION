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
        const password=await bcrypt.hash(pass,10);
        // console.log(password);
        const user=await User.create({name,email,phno,password});
        res.redirect('/login.html')
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}
exports.login=async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
        const user=await User.findOne({where:{email:email}});
        const passwordMatch=await bcrypt.compare(password,user.password);
        if(passwordMatch) {
            const token=generateAccessToken(user.id);
            // console.log(token);
            res.json(token);
            // res.redirect(`/${token}`)
        }else{
            res.sendStatus(403);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}