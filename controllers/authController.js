// const mongoose = require('mongoose')
const Product = require('../models/Product')
const { baseHtml, generateHtml, getProductCards, getNavBar, renderProductForm, productDetailsHtml, showButtons, deleteFunction,groupByCategory, showProductButtons } = require('../public/utils/html');
const path = require('path')
const adminm = require('firebase-admin')
// const auth = admin-auth()

const authController = {
    showDashboard: async (req, res) => {
        try {
            // Obtener todos los productos de la base de datos
            const products = await Product.find();
            
            // Validar si existen productos
            if (!products || products.length === 0) {
                return res.status(404).send('No products found');
            }
    
            //genera las tarjetas de los productos para mostrar en el dashboard pasando true
            const productCards = getProductCards(products,true);
            // Crear el HTML completo con el navbar y las tarjetas de productos
            const html = generateHtml(`
                ${getNavBar()}
                ${productCards}
            `);
            // Enviar el HTML generado al cliente
            res.send(html);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error obtaining the products');
        }
    },

    dashboardById: async (req, res) => {
        // console.log("Entrando en showProductById");
        try {
            // Obtener el productId de los parámetros de la ruta
            const { productId }  = req.params;
            console.log("ID:", productId);
            //buscar el producto por su ID y los obtiene de la bbdd
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).send('Product not found');
            }
            const productCards = getProductCards([product], true);

            //HTML productos con los detalles,y los botones
            const html = generateHtml(`
                ${getNavBar()}
                ${productDetailsHtml(product)}
                ${productCards} 
            `);
            // Enviar el HTML generado al cliente
            res.send(html);
        } catch (err) {
            // Capturar cualquier error y devolver un error de servidor
            console.error(err);
            res.status(500).send('Server error');
        }
    },

    //devuelve el formulario de creación de producto
    showNewProduct: (req, res) => {
        res.send(generateHtml(renderProductForm())); // Renderizar formulario vacio
    },

    // // Crear un producto nuevo
    createProduct: async (req, res) => {
        try {
            const { name, price, description } = req.body;
    
            // Verificar que los campos esenciales estén presentes
            if (!name || !price || !description) {
                return res.status(400).send('All fields are required');
            }
    
            // Crear el nuevo producto
            const newProduct = new Product(req.body);
            await newProduct.save();
            //mensaje creacion del nuevo producto con exito
        res.status(200).json({
            message: 'Product created successfully',
            product: newProduct // Devuelve el producto creado
            })    
            // res.redirect(`/products/${newProduct._id}`);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    },

     //muestra el formulario de edit para producto existente
     showEditProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.productId);
            if (!product) {
                return res.status(404).send('Product not found');
            }
            //genera el formulario con los datos del producto existentes
            const html = generateHtml(renderProductForm(product));
            res.send(html);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },

    //actualiza el producto existente
    updateProduct: async (req, res) => {
        
        try {
            const { productId } = req.params;
            const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    
            // Verifica si se encontró el producto
            if (!updatedProduct) {
                res.status(404).json('Product not found'); // Envia respuesta 404 si no se encuentra
            }
            // Redirige solo si el producto fue encontrado y actualizado
            res.redirect('/dashboard/');
        } catch (err) {
            console.error(err);
            res.status(500).json('Server Error');
        }
    },
    

    // //elimina un producto
    deleteProduct: async (req, res) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).send('Product not found');
        }

        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
},

};

//Register


module.exports = authController;


/*
showDashboard: async (req, res) => {
        try {
            // Obtener todos los productos de la base de datos
            const products = await Product.find();
            
            // Validar si existen productos
            if (!products || products.length === 0) {
                return res.status(404).send('No products found');
            }
            //genera las tarjetas de productos agrupados por categria para mostrar en el dashboard pasando false
            const productCards = getProductCards(products, false);
            //HTML completo con navbar y las tarjetas de productos
            const html = generateHtml(`
                ${getNavBar()}
                ${productCards}
            `);
            //muestra HTML
            res.send(html);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error obtaining the products');
        }
    },

    */