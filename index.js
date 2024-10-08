const express = require('express')
const dotenv = require('dotenv')
const PORT = process.env.PORT || 4500;
const { dbConnection } = require('./config/db')
const methodOverride = require('method-override')
const productRoutes = require('./routes/productRoutes')

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

//Ruta de productos
app.use('/', productRoutes)
app.use('/dashboard', productRoutes)

// // Ruta  ignorar favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204))

app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}/`)
});
