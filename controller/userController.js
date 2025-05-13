const User = require('../models/user');
const Recipes = require('../models/recipes');
const bcrypt = require('bcrypt');

// Verificar si existe un usuario con el email proporcionado
exports.checkUserEmail = async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ message: 'El correo electrónico es requerido' });
    }
    
    const existingUser = await User.findOne({ where: { email } });
    
    return res.json({ exists: !!existingUser });
  } catch (err) {
    console.error('Error al verificar email:', err);
    return res.status(500).json({ message: 'Error al verificar el email' });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Verificar que se proporcionen todos los campos requeridos
    if (!email || !password) {
      return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }
    
    // Buscar al usuario por email
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ 
        message: 'Usuario no encontrado',
        userExists: false
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
      return res.status(401).json({message: 'Contraseña incorrecta'});
    }
    
    
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
    
    
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: userResponse,
      
    });
    
  } catch (err) {
    console.error('Error en inicio de sesión:', err);
    res.status(500).json({ message: 'Error en el servidor al intentar iniciar sesión' });
  }
};



exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }
    
    const existingUser = await User.findOne({ where: { email } });
    
    if (existingUser) {
      return res.status(409).json({ message: 'Este correo ya está registrado' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const nuevoUsuario = await User.create({
      name,
      email,
      password: hashedPassword
    });
    
      const userResponse = {
      id: nuevoUsuario.id,
      name: nuevoUsuario.name,
      email: nuevoUsuario.email,
      createdAt: nuevoUsuario.createdAt,
      updatedAt: nuevoUsuario.updatedAt
    };
    
    res.status(201).json(userResponse);
  } catch (err) {
    console.error('Error al crear usuario:', err);
    res.status(400).json({ message: err.message });
  }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const usuarios = await User.findAll({
      attributes: { exclude: ['password'] } // No devolver contraseñas en listados
    });
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  const bcrypt = require("bcrypt");
  const users = await User.findAll();

  for (const user of users) {
  if (!user.password.startsWith("$2b$")) {
    const hashed = await bcrypt.hash(user.password, 10);
    user.password = hashed;
    await user.save();
  }
}

};

exports.getUserRecipes = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
      include: {
        model: Recipes,
        as: 'recetas'
      },
      attributes: { exclude: ['password'] } // No devolver la contraseña
    });
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    res.status(200).json(user.recetas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const usuario = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] } // No devolver la contraseña
    });
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const usuario = await User.findByPk(req.params.id);
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    // Si se está cambiando el email, verificar que no exista otro usuario con ese email
    if (email && email !== usuario.email) {
      const existingEmail = await User.findOne({ where: { email } });
      
      if (existingEmail) {
        return res.status(409).json({ message: 'Este correo ya está en uso por otro usuario' });
      }
      usuario.email = email;
    }

    
    // Actualizar campos
    if (name) usuario.name = name;
    if (password) {
      // Hashear la nueva contraseña
      const saltRounds = 10;
      usuario.password = await bcrypt.hash(password, saltRounds);
    }
    
    await usuario.save();
    
    // Devolver el usuario actualizado sin la contraseña
    const userResponse = {
      id: usuario.id,
      name: usuario.name,
      email: usuario.email,
      createdAt: usuario.createdAt,
      updatedAt: usuario.updatedAt
    };
    
    res.json(userResponse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const usuario = await User.findByPk(req.params.id);
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    await usuario.destroy();
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};