const express = require('express');
const router = express.Router();
const Product = require('../models/Product')
//importar las funcione del controllador d productos
const ProductController = require('../controllers/productController');

// Rutas publicas
// router.get('/', ProductController.showProducts.);


// Ruta para mostrar productos filtrados por categoría
router.get('/categories/:category', ProductController.showProductsByCategory);

//rutas por Id
router.get('/products/:productId', ProductController.showProductById);

//ruta para mostrar todos los productosraiz(home)
router.get('/', ProductController.showProductsByCategory); 

module.exports = router;