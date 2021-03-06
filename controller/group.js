const User = require('../models/user');
const Chat = require('../models/chats');
const Groups = require('../models/groups');
// const Admin = require('../models/admin');
const {Op}=require('sequelize');
const GroupMem = require('../models/group members');

exports.create=async(req,res)=>{
    try {
        const user=await User.findByPk(req.user.id)
        const name=req.body.name
        const group=await Groups.create({name:name,admin:user.id});
        // const group=await user.createGroup({name:name,admin:user.id});
        const groupinfo=await group.addUser(user);
        const admin=await GroupMem.findOne({where:{userId:user.id,groupId:group.id}})
        const update=await admin.update({admin:true});
        // console.log(update);
        res.json({groupinfo,group})

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

exports.showGroups=async(req,res)=>{
    try {
        const user=await User.findByPk(req.user.id)
        // console.log(user);
        const id=req.query.id
        const groups=await user.getGroups({
            where:{id:{
                [Op.gt]:id
            }}
        });
        res.json(groups);
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}
