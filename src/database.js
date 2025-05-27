const {Sequelize} = require('sequelize'); 
const {DB_HOST,DB_USER,DB_PASSWORD,DB_NAME,DB_PORT,DB_DIALECT} = require ('../config.js'); 

const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD, {
        host: DB_HOST,
        dialect: 'mysql',
        port: DB_PORT,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging: false
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Conectado a la base de datos')
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err)
    })
;

module.exports = sequelize; 