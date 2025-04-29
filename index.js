const express = require('express');
const sequelize = require('./src/database');
const userRoutes = require('./routes/userRoutes');
const recipesRoutes = require('./routes/recipesRoutes');
const cors = require ('cors');


const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());
app.use('/api', userRoutes,recipesRoutes);

sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(port, () => {
      console.log(`Servidor funcionando en el puerto ${port}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });
