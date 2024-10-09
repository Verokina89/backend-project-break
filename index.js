const express = require('express')
const dotenv = require('dotenv')
const PORT = process.env.PORT || 4500;
const { dbConnection } = require('./config/db')
const methodOverride = require('method-override')
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes')  //importa rutas admin (dashboard)
// const path = require('path')

const app = express()
//carga variables de entorno
dotenv.config()

//Middlewares
app.use(express.json())  
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public')) //servir archivos estaticos como CSS e imágenes
app.use(methodOverride('_method')) //soportar PUT y DELETE en formularios

//Conexión a la base de datos MongoDB
dbConnection()

//Ruta publica
app.use('/', productRoutes)
// Rutas de admin (dashboard)
app.use('/dashboard', authRoutes)


app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}/`)
});
