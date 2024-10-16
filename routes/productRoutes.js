const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
//importar las funcione del controllador d productos
const ProductController = require('../controllers/productController');
const authController = require('../controllers/authController');

// Rutas publicas
// router.get('/', ProductController.showProducts.);
//ruta para mostrar todos los productosraiz(home)
router.get('/', ProductController.showProductsByCategory); 

// Ruta para mostrar productos filtrados por categoría
router.get('/category/:category', ProductController.showProductsByCategory);

//rutas por Id
router.get('/products/:productId', ProductController.showProductById);

//ruta register-login
router.get('/register', ProductController.register );
router.post('/register', ProductController.registerUser);

router.get('/login', ProductController.login);
router.post('/login', ProductController.loginUser);

router.post('/logout', ProductController.logoutUser);

module.exports = router;