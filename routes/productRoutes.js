const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
//importar las funcione del controllador d productos
const ProductController = require('../controllers/productController');
const authController = require('../controllers/authController');
const authenticated = require('../middlewares/authMiddleware');
// Rutas publicas
// router.get('/', ProductController.showProducts.);
//ruta para mostrar todos los productosraiz(home)
router.get('/', ProductController.showProductsByCategory); 

// Ruta para mostrar productos filtrados por categoría
router.get('/category/:category', ProductController.showProductsByCategory);

//rutas por Id
router.get('/products/:productId', ProductController.showProductById);

//ruta register-login
router.get('/register', authController. );
router.post('/register', authController. );

router.get('/login', authController. );
router.post('/login', authController.);

router.post('/logout', authController. );

module.exports = router;