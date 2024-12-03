const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const bookingRoutes = require('./routes/bookingRoutes');
const clientRoutes = require('./routes/clientRoutes');

app.use(cors());
app.use(bodyParser.json()); // Permite recibir JSON en las peticiones

// Rutas
app.use('/clients', clientRoutes); // Ruta para manejar clientes
app.use('/bookings', bookingRoutes); // Ruta para manejar reservas

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
});

