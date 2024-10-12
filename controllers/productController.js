const mongoose = require('mongoose')
const Product = require('../models/Product')
const { baseHtml, generateHtml, getProductCards, getNavBar, renderProductForm, productDetailsHtml, groupByCategory, showProductButtons } = require('../public/utils/html');


// Funciones del controlador de productos
const ProductController = {

    // //muestra los productos agrupados por categoria
    // showProductsByCategory : async (req, res) => {
    //     try {
    //         //obtiene todos los productos filtrados por categoria
    //         const products = await Product.find(); //asegura que 'category' es un campo en el modelo Product (q esta o existe en...)
    //         // Validar si existen productos
    //         if (products.length === 0) {
    //             return res.status(404).send('There are no products available');
    //         }
    //         // Agrupar productos por categoría
    //         const categories = groupByCategory(products);
    //         // Generar HTML para cada categoría con sus productos
    //         let htmlContent = '';
    //         for (const category in categories) {
    //             const categoryProducts = categories[category];
    //             const productCards = getProductCards(categoryProducts);
    //             // Agregar el nombre de la categoría y las tarjetas de productos al contenido HTML
    //             htmlContent += `
    //                     <h2 style="text-align: center; margin-bottom: 10px;">${category}</h2>
    //                     <div class="category-products" style="display: flex; flex-wrap: wrap; justify-content: space-around; gap: 20px; margin-bottom: 20px;">
    //                         ${productCards}
    //                     </div>
    //             `;
    //         }
    //         //crea HTML completo; con navbar y el contenido de cada categorías
    //         const html = generateHtml(`
    //             ${getNavBar()}
    //             ${htmlContent}
    //         `);
    //         // Enviar el HTML generado al cliente
    //         res.send(html);
    //     } catch (err) {
    //         console.error(err); //log de error
    //         res.status(500).send('Server Error');
    //     }
    // },
    showProductsByCategory: async (req, res) => {
        try {
            const categoryFilter = req.params.category; // Captura la categoría de la URL (si existe)
            let products;

            if (categoryFilter) {
                // Filtrar productos por la categoría especificada
                products = await Product.find({ category: categoryFilter });
            } else {
                // Si no hay filtro de categoría, obtener todos los productos
                products = await Product.find();
            }

            // Validar si existen productos
            if (products.length === 0) {
                return res.status(404).send('No hay productos disponibles.');
            }

            // Agrupar productos por categoría si no hay un filtro específico
            let htmlContent = '';
            if (!categoryFilter) {
                const categories = groupByCategory(products);
                for (const category in categories) {
                    const categoryProducts = categories[category];
                    const productCards = getProductCards(categoryProducts);
                    // Añadir la categoría al HTML
                    htmlContent += `
                        <h2 style="text-align: center; margin-bottom: 10px;">${category}</h2>
                        <div class="category-products" style="display: flex; flex-wrap: wrap; justify-content: space-around; gap: 20px; margin-bottom: 20px;">
                            ${productCards}
                        </div>
                    `;
                }
            } else {
                // Si hay un filtro de categoría, mostrar solo esos productos
                htmlContent = `
                    <h2 style="text-align: center; margin-bottom: 10px;">${categoryFilter}</h2>
                    <div class="category-products" style="display: flex; flex-wrap: wrap; justify-content: space-around; gap: 20px; margin-bottom: 20px;">
                        ${getProductCards(products)}
                    </div>
                `;
            }

            // Crear el HTML final con el navbar
            const html = generateHtml(`
                ${getNavBar()}
                ${htmlContent}
            `);
            res.send(html);
        } catch (err) {
            console.error(err); // Log de error
            res.status(500).send('Error del servidor');
        }
    },
    

    //mostra un producto por ID
    showProductById: async (req, res) => {
        // console.log("Entrando en showProductById");
        try {
            // Obtener el productId de los parámetros de la ruta
            const { productId } = req.params;
            console.log("ID:", productId);
            
            // Verificar si el productId es un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return res.status(400).send('Invalid product ID');
            }
            //buscar el producto por su ID y los obtiene de la bbdd
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).send('Product not found');
            }
            // Crear HTML con los detalles del producto
            // const productHtml = `
            //     <div style="text-align: center; padding: 20px;">
            //         <h2>${product.name}</h2>
            //         <img src="${product.image}" alt="${product.name}" style="max-width: 300px; margin-bottom: 20px;">
            //         <p>Precio: $${product.price}</p>
            //         <p>Descripción: ${product.description}</p>
            //     </div>
            // `;
            const productHtml = productDetailsHtml(product);
            // Enviar la respuesta con el HTML generado
            const html = generateHtml(`
                ${getNavBar()}
                ${productHtml}
            `);
            res.send(html);
        } catch (err) {
            // Capturar cualquier error y devolver un error de servidor
            console.error(err);
            res.status(500).send('Server error');
        }
    },

};

module.exports = ProductController;




/*
//ruta para mostrar solo las categorias '/'
    showCategories : async (req, res) => {
        try {
            // Obtener todas las categorías únicas desde la base de datos
            const products = await Product.find();
            const categories = [...new Set(products.map(product => product.category))]; // Obtener categorías únicas
    
            // Generar tarjetas para cada categoría
            const categoryCards = categories.map(category => `
                <div class="category-card" style="border: 2px solid #ddd; padding: 20px; margin: 10px; border-radius: 6px; text-align: center;">
                    <h3>${category}</h3>
                    <a href="/category/${category}">
                        <button style="padding: 10px 40px; background-color: #007BFF; color: white; border: none; border-radius: 5px; cursor: pointer;">Ver</button>
                    </a>
                </div>
            `).join('');
    
            // Generar HTML completo con navbar y las tarjetas de categoría
            const html = generateHtml(`
                ${getNavBar()}
                <h1>Categorías</h1>
                <div class="categories-container" style="display: flex; justify-content: center; flex-wrap: wrap;">
                    ${categoryCards}
                </div>
            `);
    
            res.send(html);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al cargar las categorías');
        }
    },
-----------------------------------
// Muestra los productos agrupados por categoria o filtra por categoria especifica
showProductsByCategory: async (req, res) => {
        try {
            const categoryFilter = req.params.category; // Captura la categoría de la URL (si existe)
            let products;

            if (categoryFilter) {
                // Filtrar productos por la categoría especificada
                products = await Product.find({ category: categoryFilter });
            } else {
                // Si no hay filtro de categoría, obtener todos los productos
                products = await Product.find();
            }

            // Validar si existen productos
            if (products.length === 0) {
                return res.status(404).send('No hay productos disponibles.');
            }

            // Agrupar productos por categoría si no hay un filtro específico
            let htmlContent = '';
            if (!categoryFilter) {
                const categories = groupByCategory(products);
                for (const category in categories) {
                    const categoryProducts = categories[category];
                    const productCards = getProductCards(categoryProducts);
                    // Añadir la categoría al HTML
                    htmlContent += `
                        <h2 style="text-align: center; margin-bottom: 10px;">${category}</h2>
                        <div class="category-products" style="display: flex; flex-wrap: wrap; justify-content: space-around; gap: 20px; margin-bottom: 20px;">
                            ${productCards}
                        </div>
                    `;
                }
            } else {
                // Si hay un filtro de categoría, mostrar solo esos productos
                htmlContent = `
                    <h2 style="text-align: center; margin-bottom: 10px;">${categoryFilter}</h2>
                    <div class="category-products" style="display: flex; flex-wrap: wrap; justify-content: space-around; gap: 20px; margin-bottom: 20px;">
                        ${getProductCards(products)}
                    </div>
                `;
            }

            // Crear el HTML final con el navbar
            const html = generateHtml(`
                ${getNavBar()}
                ${htmlContent}
            `);
            res.send(html);
        } catch (err) {
            console.error(err); // Log de error
            res.status(500).send('Error del servidor');
        }
    },   
*/