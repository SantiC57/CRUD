const User = require('../models/user');
const Recipes = require('../models/recipes');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
      const nuevoUsuario = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      res.status(201).json(nuevoUsuario);
    } catch (err) {
      res.status(400).json({ mensaje: err.message });
    }
  };
  

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const usuarios = await User.findAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

exports.getUserRecipes = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId,{
      include : {
        model: Recipes,
        as: 'recetas'
      }
    })
    if (!user){
      return res.status(404).json({message: ' Usuario no encontrado'});
    }
    res.status(200).json(user.recetas)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const usuario = await User.findByPk(req.params.id);
    if (!usuario)
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const usuario = await User.findByPk(req.params.id);
    if (!usuario)
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    usuario.name = name;
    usuario.email = email;
    usuario.password = password;
    await usuario.save();

    res.json(usuario);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const usuario = await User.findByPk(req.params.id);
    if (!usuario)
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    await usuario.destroy();
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};
