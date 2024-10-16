const mongoose = require('mongoose')
const Product = require('../models/Product')
const { baseHtml, generateHtml, getProductCards, getNavBar, renderProductForm, productDetailsHtml, groupByCategory, showProductButtons } = require('../public/utils/html');


// Funciones del controlador de productos
const ProductController = {
    
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

//Register
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'register.html'));
});
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
      await auth.createUser({
        email,
        password
      });
      res.redirect('/login');
    } catch (error) {
      console.error('Error creating new user:', error);
      res.redirect('/register');
    }
});


//login
router.get('/', (req, res) => {
    res.redirect('/login');
});
router.post('/login', async (req, res) => {
    const { idToken } = req.body;
    try {
      // Verifica el ID token
      await auth.verifyIdToken(idToken);
  
      // Guardar el ID token en una cookie
      res.cookie('token', idToken, { httpOnly: true, secure: false }); // Usa secure: true en producción. Es un atributo de los navegadores para las cookies y evitar XXS
      res.json({ success: true });
    } catch (error) {
      console.error('Error verifying ID token:', error);
      res.status(401).json({ error: 'Invalid token' });
    }
});
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

module.exports = ProductController;
