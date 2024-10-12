const express = require('express');
const router = express.Router();
const Product = require('../models/Product')
//importar las funcione del controllador d productos
const ProductController = require('../controllers/productController');
// Importar el middleware de autenticación (BONUS)
// const { authMiddleware } = require('../middlewares/authMiddleware');

// Rutas publicas                            PENDING RUTAS DE LOGIN
// router.get('/', ProductController.showProducts.);
router.get('/', ProductController.showProductsByCategory);


//ruta por categorias
//camisetas

//Sweters 

//Accesorios


//rutas por categorias: camisetas, sweters, accesoios y login

router.get('/products/:productId', ProductController.showProductById);


module.exports = router;
