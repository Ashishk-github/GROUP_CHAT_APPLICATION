const {getDb}=require('../util/database');
const mongodb=require('mongodb');
const ObjectId = mongodb.ObjectId;
class Group {
  constructor(name,members,chats){
    this.name=name;
    this.members=members;
    // this.admin=admin;
    this.chats=chats
  }

  save(){
    const db=getDb();
    // console.log(this);
    return db.collection('group')
    .insertOne(this)
    // .then(result=>console.log(result))
    .catch(err=>console.log(err));
    // console.log(res)
  }
  static async addUser(phno){
    try {
      const db=getDb();
      // console.log(id);
      const mem=this.members;
      const person=await db.collection('user').findOne({phno:phno});
      // console.log(person._id.toString(),'aaaa')
      mem[person._id.toString()]=false;
      // console.log(mem);
      return db.collection('group')
      .updateOne({_id:this._id},{ $set : {members:mem}})
      // .then(result=>console.log(result))
      // .catch(err=>console.log(err));
      // console.log(res)
    } catch (error) {
      console.log(error);
    }
  }
  static async removeMember(gid,id){
    try {
      const db=getDb();
      const group=await Group.findById(gid);
      let mem= group.members;
      delete mem[id];
      const update=await db.collection('group').updateOne({_id:new ObjectId(gid)},{ $set : {members:mem}})
      return update;
    } catch (error) {
      console.log(error)
    }
    // console.log(res)
  }
  static async updateAdmin(mem){
    try {
      const db=getDb();
      const update=await db.collection('group').updateOne({_id:this._id},{ $set : {members:mem}})
      return update;
    } catch (error) {
      console.log(error)
    }
  }
  static async postChatt(gid,msg,user){
    const db=getDb();
    const userId=user._id.toString();
    const name=user.name;
      return db
      .collection('group')
      .updateOne({_id:new ObjectId(gid)},{$push:{chats:{userId:userId,name:name,msg:msg}}})
      .then(group=>{
        // console.log(user);
        return group;
      })
      .catch(err=>console.log(err));
  }
  static findById(id){
    const db=getDb();
      return db
      .collection('group')
      .findOne({_id:new ObjectId(id)})
      .then(user=>{
        // console.log(user);
        return user;
      })
      .catch(err=>console.log(err));
  }
  static isAdmin(user,gid){
    const db=getDb();
      return db
      .collection('group')
      .findOne({_id:new ObjectId(gid)})
      .then(group=>{
        // console.log(group.members[user._id.toString()]);
        return group.members[user._id.toString()];
      })
      .catch(err=>console.log(err));
  }
}



// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');
// const Groups=sequelize.define('group',{
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//       },
//     name: Sequelize.STRING,
//     admin:Sequelize.INTEGER
// });
module.exports=Group;