const User = require('../models/user');
const Chat = require('../models/chats');

exports.getChats=async(req,res)=>{
    try {
        userId=req.user.id;
        const chat=await chat.findAll();
        res.json({chat,status:200});
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}
