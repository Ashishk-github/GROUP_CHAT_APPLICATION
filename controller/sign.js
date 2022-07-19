const bcrypt=require('bcrypt');
const User = require('../models/user');
// const Chat=require('../models/chats');
const jwt = require('jsonwebtoken');
function generateAccessToken(id) {
    // console.log(id.toString())
  return jwt.sign(id.toString(), process.env.TOKEN_SECRET);
}

exports.signup=async (req,res)=>{
    try{
        const body=req.body;
        const name=body.name,phno=body.phno,email=body.email,pass=body.password;
        // console.log({name,email,phno,pass})
        // const emailExist=await User.findOne({where:{email:email}});
        // const phnoExist=await User.findOne({where:{phno:phno}});
        // if(emailExist || phnoExist) return res.json({status:403})
        const password=await bcrypt.hash(pass,10);
        const user=new User(name,email,password,phno,[]);
        const result=await user.save();
        // console.log(user);
        // await User.create({name,email,phno,password,invites:{"invites":[]}});
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
        const user=await User.findUser(email);
        console.log(user);
        if(!user) return res.json({status:404});
        const passwordMatch=await bcrypt.compare(password,user.password);
        if(passwordMatch) {
            const token=generateAccessToken(user._id);
            // console.log(token);
            res.json({token,status:200});
        }else{
            res.json({status:403});
        }
    } catch (err) {
        console.log(err);
        res.json({status:500});
    }
}