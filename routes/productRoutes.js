const express = require('express');
const router = express.Router();
//importar las funcione del controllador d productos
const { showProducts, 
    showProductById, 
    showNewProduct, 
    createProduct, 
    showEditProduct, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController'); //Se reliza un destructuring para extraer varias funciones del controlador. Para simplificar y no tener que escribir 'ProductsControllers' en cada ruta

// Importar el middleware de autenticación (BONUS)
const { authMiddleware } = require('../middlewares/authMiddleware');

//ruta muestra productos (usuarios)
router.get('/', showProducts);
// Mostrar el detalle de un producto por su ID(usuarios)
router.get('/:productId', showProductById);


//rutas del dashboard, lista de productos que pueden gstionarse(necesita la autenticación del bonus, es decir, rutas de admin)
router.get('/dashboard', authMiddleware ,showProducts);
//rutas del dashboard para crear un producto(gestión de productos), que muestra un formulario(vista) para agregar un producto nuevo
router.get('/dashboard/new', authMiddleware ,showNewProduct); 
//crea un producto nuevo en la base de datos
router.post('/dashboard', authMiddleware ,createProduct); 
//Formulario para editar un producto
router.get('/dashboard/:productId/edit', authMiddleware ,showEditProduct); 
//actualiza un producto por su ID
router.put('/dashboard/:productId', authMiddleware ,updateProduct); 
//elimina un producto por su ID
router.delete('/dashboard/:productId/delete', authMiddleware ,deleteProduct); 


module.exports = router;
