const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./barberia.db', (err) => {
  if (err) {
    console.error('Error al conectar con SQLite:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
  }
});

module.exports = db;
