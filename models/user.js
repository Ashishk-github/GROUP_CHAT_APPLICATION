const {getDb}=require('../util/database');
const mongodb=require('mongodb');
const ObjectId = mongodb.ObjectId;
class User {
  constructor(name,email,password,phno,groups){
    this.name=name;
    this.email=email;
    this.password=password;
    this.phno=phno;
    this.groups=groups;
  }

  save(){
    const db=getDb();
    // console.log(this);
    return db.collection('user')
    // .insertOne({name:this.name,email:this.email,password:this.password,phno:this.phno});
    .insertOne(this)
    // .then(result=>console.log(result))
    .catch(err=>console.log(err));
    // console.log(res)
  }
  static addGroup(gid,uid){
    const db=getDb();
    // console.log(this);
    return db.collection('user')
    // .insertOne({name:this.name,email:this.email,password:this.password,phno:this.phno});
    .updateOne({_id:new ObjectId(uid)},{ $push : {groups:gid}})
    // .then(result=>console.log(result))
    .catch(err=>console.log(err));
    // console.log(res)
  }
  static findUser(email){
    const db=getDb();
      return db
      .collection('user')
      .findOne({email:email})
      .then(user=>{
        // console.log(user);
        return user;
      })
      .catch(err=>console.log(err));
  }
  static findById(id){
    const db=getDb();
      return db
      .collection('user')
      .findOne({_id:new ObjectId(id)})
      .then(user=>{
        // console.log(user);
        return user;
      })
      .catch(err=>console.log(err));
  }
  static getGroups(user){
    const db=getDb();
      return db
      .collection('user')
      .findOne({_id:user._id})
      .then(user=>{
        // console.log(user);
        return user.groups;
      })
      .catch(err=>console.log(err));
  }
}




// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');
// const User=sequelize.define('user',{
//     id: {
//         type: Sequelize.BIGINT,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//       },
//     name: Sequelize.STRING,
//     email: Sequelize.STRING,
//     phno:Sequelize.STRING,
//     password:Sequelize.STRING,
// });
module.exports=User;

