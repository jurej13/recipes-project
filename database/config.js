

const mongoose = require('mongoose')

const dbConnection = async()=> {
    try {
        await mongoose.connect(process.env.MONGODB_CNN)
    } catch (error) {
        console.log(error)
        throw new Error('Error tratando de conectar a la Base de Datos.')
    }
}
module.exports = {
    dbConnection
}