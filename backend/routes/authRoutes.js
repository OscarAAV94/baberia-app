const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const router = express.Router();
const dbPath = path.join(__dirname, "../database/db.sqlite");
const db = new sqlite3.Database(dbPath);

const JWT_SECRET = process.env.JWT_SECRET;

// Registro de usuarios
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.run(query, [name, email, hashedPassword], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error al registrar usuario", error: err.message });
    }
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login exitoso", token });
  });
});

module.exports = router;

