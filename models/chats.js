const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const Chat=sequelize.define('chat',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    name: Sequelize.STRING,
    msg:{
      type: Sequelize.TEXT,
      allowNull: false,
    },
    image:{
      type:Sequelize.BOOLEAN,
      defaultValue:false
    }
});
module.exports=Chat;