const {Sequelize} = require('sequelize'); 
const {DB_HOST,DB_USER,DB_PASSWORD,DB_NAME,DB_PORT,DB_DIALECT} = require ('../config.js'); 

const sequelize = new Sequelize(process.env.DATABASE_URL,{
        dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // necesario si usas Railway y su base de datos
    }
  },
  logging: false
 })

sequelize.authenticate()
    .then(() => {
        console.log('Conectado a la base de datos')
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err)
    })
;

module.exports = sequelize; 