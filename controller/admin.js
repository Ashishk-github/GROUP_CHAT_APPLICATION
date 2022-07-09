const User = require('../models/user');
const Chat = require('../models/chats');
const Groups = require('../models/groups');
// const Admin = require('../models/admin');
const {Op}=require('sequelize');

exports.addMembers=async(req,res)=>{
    try {
        const phno=+req.body.phno;
        const groupId=req.body.gid;
        const member=await User.findOne({where:{phno:phno}});
        if(!member) return res.sendStatus(404);
        const user=await User.findByPk(req.user.id);
        const group=await user.getGroups({where:{id:groupId}});
        if(!group[0].admin===user.id) return res.sendStatus(401);
        console.log(group[0].admin===user.id);
        const newuser=await group[0].addUser(member);
        res.json(newuser);
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

exports.removeMembers=async(req,res)=>{
    try{
        const user=await User.findByPk(req.user.id);
        const group=await Groups.findByPk(req.body.gid);
        if(!group.admin===user.id) return res.sendStatus(401);
        const [member]=await group.getUser({where:{userId:req.body.id}});
        const remove=await member.Groupmember.destroy();
        res.json(remove);

    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}