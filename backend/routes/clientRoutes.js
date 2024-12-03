const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const authenticate = require('../middleware/authMiddleware'); // Asegúrate de que esta ruta sea correcta

const router = express.Router();

// Ruta a la base de datos
const dbPath = path.join(__dirname, '../database/db.sqlite');
const db = new sqlite3.Database(dbPath);

// Ruta para crear un nuevo cliente
// Comentamos temporalmente el middleware de autenticación para depurar
router.post('/', authenticate, (req, res) => { // Si deseas habilitar la autenticación, descomenta esto.
  const { name, phone, email } = req.body;

  // Validar que los campos sean proporcionados
  if (!name || !phone || !email) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  // Insertar el nuevo cliente en la base de datos
  const query = 'INSERT INTO clients (name, phone, email) VALUES (?, ?, ?)';
  db.run(query, [name, phone, email], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Error al crear el cliente', error: err.message });
    }

    // Retornar el ID del nuevo cliente creado
    res.status(201).json({ message: 'Cliente creado exitosamente', clientId: this.lastID });
  });
});

// Ruta para obtener todos los clientes
router.get('/', authenticate, (req, res) => {
  const query = 'SELECT * FROM clients';
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener los clientes', error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;
