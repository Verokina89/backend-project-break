const express = require('express');
const app = express();
const dbConnection = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const dotenv = require('dotenv');
dotenv.config();

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  
app.use(express.static('public')); // Para servir archivos estáticos como CSS e imágenes

//Ruta principal
app.use('/', productRoutes);

//Conexión a la base de datos
dbConnection();

//iniciar servidor
const PORT = process.env.PORT ?? 4500;
app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}/`);
});
