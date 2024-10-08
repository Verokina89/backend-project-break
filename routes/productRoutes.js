const express = require('express');
const router = express.Router();
//importar las funcione del controllador d productos
const ProductController = require('../controllers/productController');
// Importar el middleware de autenticación (BONUS)
const { authMiddleware } = require('../middlewares/authMiddleware');

// Rutas publicas
router.get('/', ProductController.showProducts);

// router.get('/:productId', ProductController.showProductById);

// //rutas del dashboard, lista de productos que pueden gstionarse(necesita la autenticación del bonus, es decir, rutas de admin)
// router.get('/dashboard', authMiddleware, ProductController.showProducts);
// router.get('/dashboard/new', authMiddleware, ProductController.showNewProduct);
// router.post('/dashboard/create', authMiddleware, ProductController.createProduct);
// router.get('/dashboard/:productId/edit', authMiddleware, ProductController.showEditProduct);
// router.put('/dashboard/:productId', authMiddleware, ProductController.updateProduct);
// router.delete('/dashboard/:productId/delete', authMiddleware, ProductController.deleteProduct);


module.exports = router;

// //rutas del dashboard, lista de productos que pueden gstionarse(necesita la autenticación del bonus, es decir, rutas de admin)
// router.get('/dashboard', authMiddleware ,showProducts);
// //rutas del dashboard para crear un producto(gestión de productos), que muestra un formulario(vista) para agregar un producto nuevo
// router.get('/dashboard/new', authMiddleware ,showNewProduct); 
// //crea un producto nuevo en la base de datos
// router.post('/dashboard', authMiddleware ,createProduct); 
// //Formulario para editar un producto
// router.get('/dashboard/:productId/edit', authMiddleware ,showEditProduct); 
// //actualiza un producto por su ID
// router.put('/dashboard/:productId', authMiddleware ,updateProduct); 
// //elimina un producto por su ID
// router.delete('/dashboard/:productId/delete', authMiddleware ,deleteProduct); 


