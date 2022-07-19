// const Sequelize=require('sequelize');
// module.exports=new Sequelize(process.env.db_name,process.env.db_username,process.env.db_password,{
//     dialect:'mysql',
//     host:process.env.db_host
// })


const mongodb = require('mongodb');
const MongoClient=mongodb.MongoClient;
let _db;
const mongoConnect=async (callback)=>{
    try {
        const client = await MongoClient.connect(
            `mongodb+srv://${process.env.mongoname}:${process.env.mongopassword}@cluster0.nwdvon8.mongodb.net/?retryWrites=true&w=majority`
        )
            console.log('connected');
            _db = client.db();
            callback();
    } catch (error) {
        console.log(error)
    }
}

const getDb= ()=>{
    if(_db) return _db;
    throw 'No database found'
}
exports.mongoConnect=mongoConnect;
exports.getDb=getDb;