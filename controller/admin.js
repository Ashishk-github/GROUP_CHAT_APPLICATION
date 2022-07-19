const User = require('../models/user');
const Groups = require('../models/groups');

exports.addMembers=async(req,res)=>{
    try {
        if(!Groups.isAdmin(req.user,req.query.gid)) return res.status(401).json({success:false});
        const group=await Groups.findById(req.query.gid);
        const addMember=await Groups.addUser.call(group,req.query.id);
        res.json(addMember);

    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

exports.showMembers=async(req,res)=>{
    try{
        if(!Groups.isAdmin(req.user,req.query.gid)) return res.status(401).json({success:false});
        const group=await Groups.findById(req.query.gid);
        res.json(group.members) ;
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

exports.removeMembers=async(req,res)=>{
    try{
        if(!Groups.isAdmin(req.user,req.query.gid)) return res.status(401).json({success:false});
        const remove=await Groups.removeMember(req.query.gid,req.query.id);
        res.json(remove);
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

exports.makeAdmin=async(req,res)=>{
    try{
        if(!Groups.isAdmin(req.user,req.query.gid)) return res.status(401).json({success:false});
        const group=await Groups.findById(req.query.gid);
        const mem=group.members;
        mem[req.query.id.toString()]=true;
        const update=await Groups.updateAdmin.call(group,mem);
        res.json(update);
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}