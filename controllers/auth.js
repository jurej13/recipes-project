
const {response,request} = require('express');
const usuario = require('../models/usuario');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const generarJWT = require('../helpers/generarJWT');


const login = async(req = request,res = response) => {
    const {email,password} = req.body
    try {
        // ifs de verificacion para saber si esta correcto.
        const usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(404).json({
                msg:'El correo buscado no existe.'
            })
        }
        // Controlar que el estado sea true, en caso de ser falso, el usuario esta eliminado.
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Email / password incorrect- maybe user was eliminated from the db'
            })
        }
        // verificacion de password.
        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario/password incorrect. - Password'
            })
        }
        const token= await generarJWT(usuario.id);
        res.json({
            usuario,token,
            msg:'Logeado correctamente.'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador.- email'
        })
    }
    
}
module.exports= {
    login
}