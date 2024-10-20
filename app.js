const express = require('express');
const dotenv = require('dotenv')
const { dbConnection } = require('./config/db');
const methodOverride = require('method-override');
const path = require('path');
const admin = require('firebase-admin');
const {serviceAccount} = require('./config/firebase');
const cookieParser = require('cookie-parser')
const cors = require("cors")
const swaggerUI = require('swagger-ui-express')
const docs = require('./docs/index')
dotenv.config()  //carga variables de entorno

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const app = express()
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes')  //importa rutas admin (dashboard)
const apiRoutes = ('./routes/apiProductsRoutes')

//Middlewares
app.use(cors())
app.use(express.json())  
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"public")));  //servir archivos estaticos como  HTML,CSS, js e imágenes

app.use(methodOverride('_method')) //soportar PUT y DELETE en formularios

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs))

//Ruta publica
app.use('/', productRoutes)
// Rutas de usuarios (dashboard)
app.use('/dashboard', authRoutes)
//ruta API
app.use('/apiproducts', apiRoutes)

//Conexión a la base de datos MongoDB
dbConnection()

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}/`)
});
