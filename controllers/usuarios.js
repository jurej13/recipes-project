const {response,request}= require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs')

const usuarioPost = async(req= request,res = response) => {
    const {name,email,password} = req.body;
    const usuario = new Usuario({name,email,password})


    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt)
    await usuario.save();

    res.json({
        msg:'Se creo correctamente.'
    })
}
module.exports={
    usuarioPost
}