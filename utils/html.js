
const baseHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product List</title>
    <link rel="stylesheet" href="../public/styles.css">
</head>
<body>
`;

//function para generar HTML base
const generateHtml = (content) => {
    return baseHtml + content + '</body></html>';
};
const getProductCards = (products) => {
    let html = '';
    products.forEach(product => {
        html += `
            <div class="product-card">
                <h2>${product.name}</h2>
                <p>Categoría: ${product.category}</p>
                <img src="${product.image}" alt="${product.name}" />
                <p>Precio: ${product.price}</p>
            </div>
        `;
    });
    return html;
};

const getNavBar = () => {
    return `
        <nav>
            <ul>
                <li><a href="/products">Home</a></li>
                <li><a href="/products/Camisetas">Dashboard</a></li>
                <li><a href="/products/Accesorios">Add Product</a></li>
            </ul>
        </nav>
    `;
};

module.exports = {
    baseHtml,
    generateHtml,
    getProductCards,
    getNavBar,
};
