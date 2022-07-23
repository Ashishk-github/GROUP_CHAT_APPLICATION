const User = require('../models/user');
const Groups = require('../models/groups');
const { ObjectId } = require('mongodb');

exports.addMembers=async(req,res)=>{
    try {
        if(!Groups.isAdmin(req.user,req.body.gid)) return res.status(401).json({success:false});
        const group=await Groups.findById(req.body.gid);
        console.log(req.body.gid)
        const addMember=await Groups.addUser.call(group,req.body.phno);
        res.json(addMember);
        
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

exports.showMembers=async(req,res)=>{
    try{
        if(!Groups.isAdmin(req.user,req.body.gid)) return res.status(401).json({success:false});
        // console.log(req.body.gid)
        const group=await Groups.findById(req.body.gid);
        let array=Object.keys(group.members);
        // console.log(array);
        array=array.map((a)=>new ObjectId(a));
        const groupMembers=await User.find(array);
        res.json(groupMembers) ;
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

exports.removeMembers=async(req,res)=>{
    try{
        if(!Groups.isAdmin(req.user,req.body.gid)) return res.status(401).json({success:false});
        const remove=await Groups.removeMember(req.body.gid,req.body.id);
        res.json(remove);
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

exports.makeAdmin=async(req,res)=>{
    try{
        if(!Groups.isAdmin(req.user,req.body.gid)) return res.status(401).json({success:false});
        const group=await Groups.findById(req.body.gid);
        const mem=group.members;
        console.log(req.body.id);
        mem[req.body.id.toString()]=true;
        const update=await Groups.updateAdmin.call(group,mem);
        res.json(update);
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}