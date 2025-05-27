const {Sequelize} = require('sequelize'); 
const {DB_HOST,DB_USER,DB_PASSWORD,DB_NAME,DB_PORT} = require ('../config.js'); 

const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,{
        host:DB_HOST,
        dialect: 'mysql',
        port: DB_PORT,
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('Conectado a la base de datos')
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err)
    })
;

module.exports = sequelize; 