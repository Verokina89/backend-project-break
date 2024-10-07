const express = require('express');
const router = express.Router();

//importar las funcione del controllador d productos
const { showProducts, showProductById, 
    showNewProduct, createProduct, 
    showEditProduct, updateProduct, 
    deleteProduct 
} = require('../controllers/productController'); //Se reliza un destructuring para extraer varias funciones del controlador. Para simplificar y no tener que escribir 'ProductsControllers' en cada ruta

//rutas del dashboard (necesita la autenticación del bonus)
router.get('/dashboard', showProducts); //

//ruta muestra productos (usuarios)
router.get('/', showProducts);
router.get('/:productId', showProductById);

//rutas del dashboard (gestión de productos)
router.get('/dashboard/new', showNewProduct); //muestra un formulario(vista) para agregar un producto nuevo
router.post('/dashboard', createProduct); //crea un producto nuevo en la base de datos
router.get('/dashboard/:productId/edit', showEditProduct); //Formulario para editar un producto
router.put('/dashboard/:productId', updateProduct); //actualiza un producto por su ID
router.delete('/dashboard/:productId/delete', deleteProduct); //elimina un producto por su ID


module.exports = router;
