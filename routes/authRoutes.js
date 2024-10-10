const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Verifica que esta ruta sea correcta
const ProductController = require('../controllers/productController');

//rutas del dashboard, lista de productos que pueden gstionarse(necesita la autenticación del bonus, es decir, rutas de admin) 
//Mostrar el dashboard con los productos     PENDING RUTAS DE LOGOUD
router.get('/', authController.showDashboard); 

//dvelve el formulario del nuevo producto
router.get('/new', authController.showNewProduct); 

//crea el nuevo producto
router.post('/create', authController.createProduct);

//devuel el detalle de un producto en el dashboard
router.get('/:productId', authController.showDashboardById); 

//Actualizar producto
router.put('/:productId', authController.updateProduct); 

//muestra un formulario para editar el producto selecionado
router.get('/:productId/edit', authController.showEditProduct); 


// // Eliminar producto
router.delete('/:productId/delete', authController.deleteProduct); 

module.exports = router;
