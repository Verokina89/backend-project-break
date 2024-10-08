const mongoose = require('mongoose');
const dotenv = require('dotenv');

//crga vaiables de entorno
dotenv.config();

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('BBDD conectada correctamente');
        
    } catch (error) {
        console.error(error);
        throw new Error('Error al iniciar la base de datos');
    }
};

module.exports = { 
    dbConnection
};