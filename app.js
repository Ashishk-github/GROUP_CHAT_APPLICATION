//PACKAGES
const path=require('path')
const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
const cors=require('cors')
const bodyParser=require('body-parser');
const sequelize = require('./util/database');

//MODELS
const User=require('./models/user');

//ROUTES
const signRoutes=require('./routes/sign');
const userRoutes=require('./routes/user');

//ROUTER
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(signRoutes);
app.use(userRoutes);
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,`frontend`,`${req.url}`));
})

sequelize
// .sync()
.sync({force:true})
.then(result=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
})