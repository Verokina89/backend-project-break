const mongoose = require('mongoose')
const Product = require('../models/Product')
const { baseHtml, generateHtml, getProductCards, getNavBar} = require('../public/utils/html');

// const baseHtml = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Product List</title>
//     <link rel="stylesheet" href="../public/styles.css">
// </head>
// <body>
// `;

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
            const { productId }  = req.params;
            console.log("ID:", productId);

            //buscar el producto por su ID
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).send('Product not found');
            }

            const html = `<div>${product.name} - ${product.price}</div>`;
            res.send(generateHtml(html));
            //con JSON:
            // res.json(product);
        } catch (err) {
            // Capturar cualquier error y devolver un error de servidor
            console.error(err);
            res.status(500).send('Server error');
        }
    },

    // //muestra el formulario de creación de producto
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
            res.send(generateHtml(renderProductForm(product)));
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },

    // //actualiza el producto existente
    // updateProduct: async (req, res) => {
    //     try {
    //         await Product.findByIdAndUpdate(
    //             req.params.productId, req.body, { 
    //                 new: true 
    //             }
    //         );
    //         res.redirect('`/products/${newProduct._id}`');
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).send('Server Error');
    //     }
    // },

    // //elimina un producto
    // deleteProduct: async (req, res) => {
    //     try {
    //         await Product.findByIdAndDelete(req.params.productId);
    //         res.redirect('/');
    //     } catch (err) {
    //         res.status(500).send('Server Error');
    //     }
    // }
};

module.exports = ProductController;


/*
evaluar mejorar codigo metiendo todo dentro de una sola funcion para q e exportada. revisar que pasa con ls otras funciones que no se utilizan en est archivo---->

// Función para generar el formulario de productos (crear/editar)
const renderProductForm = (product = {}) => {
    return `
        <form action="/dashboard/${product._id ? product._id + '?_method=PUT' : ''}" method="POST">
        <input type="text" name="name" value="${product.name || ''}" placeholder="Nombre del producto" required>
        <input type="text" name="description" value="${product.description || ''}" placeholder="Descripción" required>
        <input type="text" name="image" value="${product.image || ''}" placeholder="URL de la imagen" required>
        <input type="text" name="category" value="${product.category || ''}" placeholder="Categoría" required>
        <input type="text" name="size" value="${product.size || ''}" placeholder="Talla" required>
        <input type="number" name="price" value="${product.price || ''}" placeholder="Precio" required>
        <button type="submit">${product._id ? 'Actualizar' : 'Crear'} Producto</button>
        </form>
    `;
};

//mostrar todos los productos
const showProducts = async (req, res) => {
    try {
        const products = await Product.find(); //obtener los productos
        if (products.length === 0) {
            return res.status(404).send('No existen productos disponibles');
        }
        const html = getProductCards(products); //Generar el HTML con las tarjetas de productos
        res.send(generateHtml(getNavBar() + html)); //cierra las etiqutas html de la baseHtml al dar respuesta generada
    } catch (err) {
        console.error(err); //log error 
        res.status(500).send('Server Error');
    }
};

//muestrar por ID
const showProductById = async (req, res) => {
    const { productId } = req.params;
// Verificar si el ID es valido
    if (!isValidObjectId(productId)) {
        return res.status(400).send('ID no válido');
    }
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).send('Producto no encontrado');

        const html = `<div>${product.name} - ${product.price}</div>`;
        res.send(generateHtml(html)); //cerrar etiqueta de baseHtml
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Mostrar el formulario para crear un nuevo producto
const showNewProduct = (req, res) => {
    res.send(generateHtml(renderProductForm())); //renderiza formulario vacio
};
  
// Crear producto nuevo
const createProduct = async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.redirect('/');
    } catch (err) {
        console.error(err);
      res.status(500).send('Server Error');
    }
};  

// Mostrar formulario de edicion para producto existente
const showEditProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).send('Producto no ha sido encontrado');
        }
        res.send(generateHtml(renderProductForm(product)));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
  
//actualizar producto existente
const updateProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(
            req.params.productId, req.body, { 
                new: true 
            });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.productId);
      res.redirect('/');
    } catch (err) {
      res.status(500).send('Server Error');
    }
};

module.exports = { 
    showProducts, showProductById, 
    showNewProduct, createProduct, 
    showEditProduct, updateProduct, 
    deleteProduct 
};


----------------------------------------------------------------------

   createProduct: async (req, res) => {
        try {
            const newProduct = new Product(req.body);
            await newProduct.save();
            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },

*/