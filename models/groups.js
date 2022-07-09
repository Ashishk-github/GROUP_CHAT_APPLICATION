const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const Groups=sequelize.define('group',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    name: Sequelize.STRING,
    admin:Sequelize.INTEGER
});
module.exports=Groups;