//PACKAGES
const path=require('path')
const cron=require('node-cron');
const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
const cors=require('cors')
const bodyParser=require('body-parser');
const sequelize = require('./util/database');

//MODELS
const User=require('./models/user');
const Chat=require('./models/chats');
const Groups=require('./models/groups');
// const ArchivedChat=require('./models/a-chat');
const GroupMem=require('./models/group members');

//ROUTES
const signRoutes=require('./routes/sign');
const userRoutes=require('./routes/user');
const groupRoutes=require('./routes/groups');
const adminRoutes=require('./routes/admin');
const googleRoutes=require('./routes/google');

//cron-job
// cron.schedule('0 0 * * *',async()=>{
//     const chats=await Chat.findAll();
//     await ArchivedChat.create(chats);
//     await chats.destroy();
// })

//ROUTER
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(signRoutes);
app.use('/auth',googleRoutes);
app.use(userRoutes);
app.use(groupRoutes);
app.use(adminRoutes);
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,`frontend`,`${req.url}`));
})

//Relations
User.belongsToMany(Groups,{through:GroupMem});
Groups.belongsToMany(User,{through:GroupMem});
Chat.belongsTo(Groups);
Groups.hasMany(Chat);
Chat.belongsTo(User);
User.hasMany(Chat);
// ArchivedChat.belongsTo(Groups);
// Groups.hasMany(ArchivedChat);
// Chat.belongsTo(ArchivedChat);
// User.hasMany(ArchivedChat);

sequelize
.sync()
// .sync({force:true})
.then(result=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
})