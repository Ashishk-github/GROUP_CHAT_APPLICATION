const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');
const User = require('../models/user');
const Chat=require('../models/chats');

exports.token=async (req,res) => {
    const user=req.user;
    id=parseInt(user.id);
    let dbUser=await User.findOne({where:{email:user.email}});
    if(!dbUser) dbUser= await User.create({name:user.displayName,email:user.email,phno:1});
    // console.log(dbUser);
    const token=`${jwt.sign(dbUser.id, process.env.TOKEN_SECRET)}`;
    res.send(`<body onload="{
        console.log(1);
        localStorage.setItem('token','${token}');
        localStorage.setItem('groupSelected','0');
        localStorage.setItem('groups','[]');
        localStorage.setItem('Members','[]');
        location.href='http://localhost:3000/chat.html'
    }"></body>`);
}