const User = require('../models/user');
const Groups = require('../models/groups');

exports.addMembers=async(req,res)=>{
    try {
        if(!Groups.isAdmin(req.user,req.body.gid)) return res.status(401).json({success:false});
        const group=await Groups.findById(req.body.gid);
        const addMember=await Groups.addUser.call(group,req.body.id);
        res.json(addMember);

    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

exports.showMembers=async(req,res)=>{
    try{
        if(!Groups.isAdmin(req.user,req.body.gid)) return res.status(401).json({success:false});
        const group=await Groups.findById(req.body.gid);
        res.json(group.members) ;
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
        mem[req.body.id.toString()]=true;
        const update=await Groups.updateAdmin.call(group,mem);
        res.json(update);
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}