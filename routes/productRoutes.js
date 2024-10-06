const express = require('express');
const router = express.Router();
const { showProducts, showProductById, showNewProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController'); //Se reliza un destructuring para extraer varias funciones del controlador. Para simplificar y no tener que escribir 'ProductsControllers' en cada ruta

// Rutas para los usuarios
router.get('/', showProducts);
router.get('/:productId', showProductById);

// Rutas del dashboard (necesita la autenticación del bonus)
router.get('/dashboard/new', showNewProduct); //muestra un formulario(vista) para agregar un producto nuevo
router.post('/dashboard', createProduct); //sirve para crear un producto nuevo en la base de datos
router.put('/dashboard/:productId', updateProduct); //actualiza un producto por su ID
router.delete('/dashboard/:productId/delete', deleteProduct); //elimina un producto por su ID

module.exports = router;
