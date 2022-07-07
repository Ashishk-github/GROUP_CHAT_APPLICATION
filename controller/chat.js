const User = require('../models/user');
const Chat = require('../models/chats');

exports.getChats=async(req,res)=>{
    try {
        userId=req.user.id;
        const chat=await Chat.findAll();
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