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
        type:DataTypes.STRING,
        allowNull:false
    },

    tiempo:{
        type: DataTypes.STRING,
        allowNull: false

    },
    categoria:{
        type: DataTypes.STRING,
        allowNull: false
    },
    coccion:{
        type: DataTypes.STRING,
        allowNull: true
    },

    usuarioId:{
        type:DataTypes.INTEGER,
        allowNull: false
    }

},{
    tableName: 'recetas'
})
module.exports = Recipes;