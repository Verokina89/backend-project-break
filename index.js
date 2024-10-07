const express = require('express');
const app = express();
const { dbConnection } = require('./config/db');
const methodOverride = require('method-override');
const productRoutes = require('./routes/productRoutes');
const dotenv = require('dotenv');
//carga variables de entorno
dotenv.config(); 

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  
app.use(express.static('public')); // Para servir archivos estáticos como CSS e imágenes
app.use(methodOverride('_method')); // Para soportar PUT y DELETE en formularios

//Conexión a la base de datos MongoDB
dbConnection();

//Ruta de productos
app.use('/', productRoutes);

// Ruta  ignorar favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));

//iniciar servidor
const PORT = process.env.PORT ?? 4500;
app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}/dashboard`);
});
