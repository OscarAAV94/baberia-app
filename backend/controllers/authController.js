const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

// Crear conexión con la base de datos SQLite
const db = new sqlite3.Database('./backend/database/db.sqlite', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conexión a la base de datos establecida');
  }
});

// Controlador de login
exports.login = (req, res) => {
  const { username, password } = req.body;

  // Buscar usuario en la base de datos
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error al buscar el usuario' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Comparar las contraseñas usando bcrypt
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Error al comparar las contraseñas' });
      }
      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Generar un token JWT si las credenciales son correctas
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h', // El token expira en 1 hora
      });

      // Devolver el token al usuario
      res.json({ message: 'Login exitoso', token });
    });
  });
};

// Controlador de logout
exports.logout = (req, res) => {
  // Para un logout simple, simplemente retornamos un mensaje
  res.json({ message: 'Logout exitoso' });
};
