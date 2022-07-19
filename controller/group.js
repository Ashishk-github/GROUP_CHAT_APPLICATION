const User = require('../models/user');
// const Chat = require('../models/chats');
const Groups = require('../models/groups');
// const Admin = require('../models/admin');
// const {Op}=require('sequelize');
// const GroupMem = require('../models/group members');

exports.create=async(req,res)=>{
    try {
        const user=await User.findById(req.user._id)
        const name=req.body.name;
        const userId=req.user._id.toString();
        const members={};
        members[userId]=true;
        const group=new Groups(name,members,[]);
        await group.save();
        await User.addGroup(group._id,user._id);
        res.json({group});

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

exports.showGroups=async(req,res)=>{
    try {
        const groups=await User.getGroups(req.user);
        res.json(groups);
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}
