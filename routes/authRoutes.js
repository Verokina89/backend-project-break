const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Verifica que esta ruta sea correcta

// ---> van dentro de authRouts ---->//rutas del dashboard, lista de productos que pueden gstionarse(necesita la autenticación del bonus, es decir, rutas de admin)
router.get('/dashboard', authController.showDashboard); //Mostrar el dashboard con los productos


router.get('/new', authController.showNewProduct); // Mostrar formulario de nuevo producto

router.post('/create', authController.createProduct); // Crear nuevo producto

// router.get('/dashboard/:productId/edit', ProductController.showEditProduct); // Mostrar formulario de edición

// router.put('/dashboard/:productId', ProductController.updateProduct); // Actualizar producto

// router.delete('/dashboard/:productId/delete', ProductController.deleteProduct); // Eliminar producto


module.exports = router;
