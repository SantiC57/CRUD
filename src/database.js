const {Sequelize} = require('sequelize'); 
const {DB_HOST,DB_USER,DB_PASSWORD,DB_NAME,DB_PORT,DB_DIALECT} = require ('../config.js'); 


if (DATABASE_URL) {
    sequelize = new Sequelize(DATABASE_URL, {
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false
    });
}
else {
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
}

sequelize.authenticate()
    .then(() => {
        console.log('Conectado a la base de datos')
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err)
        console.error('Variables de entorno:');
        console.error('DB_HOST:', process.env.MYSQL_HOST || 'No definido');
        console.error('DB_USER:', process.env.MYSQL_USER || 'No definido');
        console.error('DB_NAME:', process.env.MYSQL_DATABASE || 'No definido');
        console.error('DATABASE_URL:', process.env.DATABASE_URL ? 'Definido' : 'No definido');
        process.exit(1);
    })
;

module.exports = sequelize; 