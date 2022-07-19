const User = require('../models/user');
const Groups = require('../models/groups');

exports.getChats=async(req,res)=>{
    try {
        const group_id=req.params.id; 
        // const chat_id=req.query.id;
        // const userId=req.user.id;
        const group= await Groups.findById(group_id) 
        const chats=group.chats;
        res.json(chats)
        
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}
exports.postChat=async(req,res)=>{
    try {
        const groupId=req.body.groupId;
        const msg=req.body.msg;
        const group=await Groups.postChatt(groupId,msg,req.user);
        res.json({group,status:200});
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}
