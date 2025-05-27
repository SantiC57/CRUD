const express = require('express');
const sequelize = require('./src/database');
const userRoutes = require('./routes/userRoutes');
const recipesRoutes = require('./routes/recipesRoutes');
const cors = require('cors');
const {port} = require('./config.js'); 

const app = express();

app.use(cors());
app.use(express.json());

// ✅ AGREGAR: Ruta raíz para Railway
app.get('/', (req, res) => {
  res.send(`
    <h1>🍳 API CRUD de Recetas</h1>
    <p><strong>Estado:</strong> ✅ Funcionando correctamente</p>
    <p><strong>Versión:</strong> 1.0.0</p>
    <h2>Rutas disponibles:</h2>
    <ul>
      <li><a href="/api">/api</a> - Información de la API</li>
      <li><a href="/api/usuarios">/api/usuarios</a> - Gestión de usuarios</li>
      <li><a href="/api/recetas">/api/recetas</a> - Gestión de recetas</li>
      <li><a href="/health">/health</a> - Estado del servidor</li>
    </ul>
    <hr>
    <p><em>Desplegado en Railway 🚀</em></p>
  `);
});

// ✅ AGREGAR: Ruta de salud
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

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

// Rutas de la aplicación
app.use('/api/usuarios', userRoutes);
app.use('/api/recetas', recipesRoutes);

// ✅ CAMBIAR: Puerto dinámico para Railway
const PORT = process.env.PORT || port || 5000;

sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
    // ✅ CAMBIAR: Escuchar en todas las interfaces
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor funcionando en el puerto ${PORT}`);
      console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
    process.exit(1); // ✅ AGREGAR: Salir si hay error
  });