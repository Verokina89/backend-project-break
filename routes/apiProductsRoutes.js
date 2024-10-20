const express = require('express')
const router = express.Router()
const ApiProductsControllers = require('../controllers/apiProductsControllers')

//ruta de todos los productos
router.get('/', ApiProductsControllers.getShowProducts);   

//ruta para crear un nuevo producto
router.post('/create', apiProductsControllers.createProduct);   

//ruta de un producto por su ID
router.get('/:productId', apiProductsControllers.showProductById); 

//ruta de un producto Actualizado
router.put('/:productId', apiProductsControllers.updateProduct);  

//rut para eliminar un producto por ID
router.delete('/:productId', apiProductsControllers.deleteProduct); 

module.exports = router;