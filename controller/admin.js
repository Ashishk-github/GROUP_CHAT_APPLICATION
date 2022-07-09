const User = require('../models/user');
const Chat = require('../models/chats');
const Groups = require('../models/groups');
// const Admin = require('../models/admin');
const {Op}=require('sequelize');

exports.addMembers=async(req,res)=>{
    try {
        const member_id=+req.query.id;
        const groupId=req.query.gid;
        const member=await User.findByPk(member_id);
        const user=await User.findByPk(req.user.id);
        const group=await user.getGroups({where:{id:groupId}});
        if(!group[0].admin===user.id) return res.sendStatus(401);
        console.log(group[0].admin===user.id);
        const newuser=await group[0].addUser(member);
        res.json({newuser,group,status:200});
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}