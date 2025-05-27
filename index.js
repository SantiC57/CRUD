const express = require('express');
const sequelize = require('./src/database');
const userRoutes = require('./routes/userRoutes');
const recipesRoutes = require('./routes/recipesRoutes');
const cors = require ('cors');
const {port} = require ('./config.js'); 


const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/usuarios', userRoutes);
app.use('/api/recetas', recipesRoutes);


app.get('/api', (req, res) => {
  res.send(`
    <h1>Bienvenido a la API 🎉</h1>
    <p>Rutas disponibles:</p>
    <ul>
      <li><a href="/api/usuarios">/api/usuarios</a></li>
      <li><a href="/api/recetas">/api/recetas</a></li>
    </ul>
  `);
});


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
