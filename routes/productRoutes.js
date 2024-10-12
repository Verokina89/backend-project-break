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

// // Rutas para mostrar productos agrupados por categoría
// router.get('/products/camisetas', ProductController.showProductsByCategory('Camisetas'));
// router.get('/products/sweters', ProductController.showProductsByCategory('Sweters'));
// router.get('/products/accesorios', ProductController.showProductsByCategory('Accesorios'));

//rutas por Id
router.get('/products/:productId', ProductController.showProductById);


module.exports = router;
