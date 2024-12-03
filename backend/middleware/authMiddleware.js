const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extraer token del encabezado

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  // Verificar el token con la clave secreta
  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = decoded; // Guardar el usuario decodificado en la solicitud
    next(); // Continuar con la ejecución de la ruta
  });
};

module.exports = authenticate;
