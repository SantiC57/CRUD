const {Sequelize} = require('sequelize'); 

const sequelize = new Sequelize(
    'Recetas',
    'root',
    'admin123',{
        host:'localhost',
        dialect:'mysql'
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