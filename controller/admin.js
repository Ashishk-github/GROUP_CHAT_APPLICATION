const User = require('../models/user');
const Chat = require('../models/chats');
const Groups = require('../models/groups');
const GroupMem = require('../models/group members');
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

exports.showMembers=async(req,res)=>{
    try{
        const user=await User.findByPk(req.user.id);
        const group=await Groups.findByPk(req.body.gid);
        // console.log(group.admin!==user.id);
        if(group.admin!==user.id) {
            return res.sendStatus(401);
        }
        const members=await group.getUsers();
        let result=[]
        for(x of members) result.push({id:x.id,name:x.name,phno:x.phno,email:x.email});
        res.json(result);

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
        const [member]=await group.getUsers({where:{id:req.body.id}});
        const remove=await member.groupmembers.destroy();
        res.json(remove);

    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}