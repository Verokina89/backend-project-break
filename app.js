const express = require('express')
const dotenv = require('dotenv')
const { dbConnection } = require('./config/db')
const methodOverride = require('method-override')
const path = require('path')
const admin = require('firebase-admin')
const {serviceAccount} = require('./config/firebase')
dotenv.config()  //carga variables de entorno
// const cookieParser = require('cookie-parser')
// const cors = require("cors")
//Conexión a la base de datos MongoDB
dbConnection()

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const app = express()
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes')  //importa rutas admin (dashboard)


//Middlewares
// app.use(cors())
app.use(express.json())  
app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser())
app.use(express.static(path.join(__dirname,"public")));  //servir archivos estaticos como  HTML,CSS, js e imágenes

app.use(methodOverride('_method')) //soportar PUT y DELETE en formularios

//Ruta publica
app.use('/', productRoutes)
// Rutas de admin (dashboard)
app.use('/dashboard', authRoutes)


const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}/`)
});
