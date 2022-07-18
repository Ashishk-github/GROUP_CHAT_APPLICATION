const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const GroupMem=sequelize.define('groupmembers',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    admin:{
      type:Sequelize.BOOLEAN,
      defaultValue:false
    }
});
module.exports=GroupMem;