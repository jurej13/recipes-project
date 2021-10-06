const express= require('express');
const { dbConnection } = require('../database/config');
const cors=require('cors');


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath ='/api/usuarios'
        this.authPath = '/api/auth'
        this.recipesPath = '/api/recipes'
        // Coneccion a la base de datos.
        this.conectarDB();
        // Middlewares.
        this.middlewares();
        // Rutas.
        this.routes();
    }
    async conectarDB(){
        await dbConnection();
    }
    // Middlewares
    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'));
    }
    // Rutas
    routes(){
        this.app.use(this.usuariosPath,require('../routes/usuarios'))
        this.app.use(this.authPath,require('../routes/auth'))
        this.app.use(this.recipesPath,require('../routes/recipes'))
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo correctamente en : ', this.port)
        })
    }
}
module.exports=Server