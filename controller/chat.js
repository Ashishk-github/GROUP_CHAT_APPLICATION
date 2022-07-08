const User = require('../models/user');
const Chat = require('../models/chats');
const {Op}=require('sequelize');

exports.getChats=async(req,res)=>{
    try {
        const chat_id=req.query.id;
        userId=req.user.id;
        const chat=await Chat.findAll({where:{
            id:{[Op.gt]:chat_id}
        }});
        if(chat.length===0) return res.json({status:200});
        res.json({chat,status:200});
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}
exports.postChat=async(req,res)=>{
    try {
        userId=req.user.id;
        const user=await User.findByPk(userId);
        // console.log(user,userId)
        const name=user.name;
        
        const msg=req.body.msg
        if(!msg) return res.json();
        const chat=await user.createChat({name,msg});
        res.json({chat,status:200});
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}