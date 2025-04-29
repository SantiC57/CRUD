const {DataTypes} = require('sequelize');
const sequeliza = require('../src/database');


const Recipes = sequeliza.define('Recipes', {

    titulo:{
        type:DataTypes.STRING,
        allowNull:false
    },

    preparacion:{
        type:DataTypes.TEXT,
        allowNull:false
    },

    ingredientes:{
        type:DataTypes.TEXT,
        allowNull:false
    },

    imagen:{
        type:DataTypes.BLOB,
        allowNull:true
    },

    tiempo:{
        type: DataTypes.STRING,
        allowNull: false

    },

    usuarioId:{
        type:DataTypes.INTEGER,
        allowNull: false
    }

},{
    tableName: 'recetas'
})
module.exports = Recipes;