const User = require('../models/user');
const Chat = require('../models/chats');
const {Op}=require('sequelize');
const Groups = require('../models/groups');
const GroupMem = require('../models/group members');

exports.getChats=async(req,res)=>{
    try {
        const group_id=req.params.id; 
        const chat_id=req.query.id;
        const userId=req.user.id;
        // console.log(1)
        const user=await User.findByPk(userId);
        const group=await user.getGroups({where:{id:group_id}});
        // console.log(group);
        const chats=await group[0].getChats({where:{id:{
            [Op.gt]:chat_id
        }
        }});
        res.json(chats)
        
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}
exports.postChat=async(req,res)=>{
    try {
        const user=await User.findByPk(req.user.id);
        const groupId=req.body.groupId;
        const group=await Groups.findByPk(groupId);
        const image=req.body.image
        const chat=await group.createChat({name:user.name,msg:req.body.msg,groupId:groupId,image:image})
        // const ggg=await user.getGroups();
        // const chatss=await ggg[0].getChats();
        res.json({status:200});
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}
