const {DataTypes} = require('sequelize');  
const sequeliza = require('../src/database');
const Recipes = require('./recipes');

const User = sequeliza.define('User', {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'users'
})

User.hasMany(Recipes,{
    foreignKey: 'usuarioId',
    as: 'recetas'
});

module.exports = User;