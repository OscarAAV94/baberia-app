const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');  // Verifica que esta ruta sea correcta

// Ruta protegida que requiere autenticación
router.post('/booking', authenticateToken, (req, res) => {
    // Lógica para realizar una reserva
    res.send('Reserva realizada');
});

module.exports = router;
