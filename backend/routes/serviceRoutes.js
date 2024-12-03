const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();
const dbPath = path.join(__dirname, "../database/db.sqlite");
const db = new sqlite3.Database(dbPath);

// CRUD de Servicios
router.post("/", authenticate, (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  const query = "INSERT INTO services (name, price) VALUES (?, ?)";
  db.run(query, [name, price], function (err) {
    if (err) {
      return res.status(500).json({ message: "Error al crear el servicio", error: err.message });
    }
    res.status(201).json({ message: "Servicio creado exitosamente", serviceId: this.lastID });
  });
});

router.get("/", authenticate, (req, res) => {
  const query = "SELECT * FROM services";
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Error al obtener los servicios", error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;
