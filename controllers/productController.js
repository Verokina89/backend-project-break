const mongoose = require('mongoose')
const Product = require('../models/Product')
const { baseHtml, generateHtml, getProductCards, getNavBar, renderProductForm, productDetailsHtml } = require('../public/utils/html');


// Funciones del controlador de productos
const ProductController = {
    // Mostrar todos los productos
    showProducts: async (req, res) => {
        try {
            const products = await Product.find(); //obtiene todos productos
            if (products.length === 0) {
                return res.status(404).send('No existen productos disponibles');
            }
            const html = baseHtml + getProductCards(products); // Generar el HTML con las tarjetas de productos
            res.send(generateHtml(getNavBar() + html)); // Cerrar las etiquetas HTML de la base
        } catch (err) {
            console.error(err); //log de error
            res.status(500).send('Server Error');
        }
    },

    //mostra un producto por ID
    showProductById: async (req, res) => {
        // console.log("Entrando en showProductById");
        try {
            // Obtener el productId de los parámetros de la ruta
            const { productId } = req.params;
            console.log("ID:", productId);

            //buscar el producto por su ID y los obtiene de la bbdd
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).send('Product not found');
            }

            const html = `<div>${product.name} - ${product.price}</div>`;
            res.send(generateHtml(productDetailsHtml));
            // // con JSON:
            // res.json(product);
        } catch (err) {
            // Capturar cualquier error y devolver un error de servidor
            console.error(err);
            res.status(500).send('Server error');
        }
    },

    
};

module.exports = ProductController;
