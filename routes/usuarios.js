const { Router } = require("express");
const { check } = require("express-validator");
const { usuarioPost } = require("../controllers/usuarios");
const { emailExiste } = require("../helpers/db-validator");
const { validarCampos } = require("../middlewares/validar-campos");




const router = Router();

router.post('/',[
    check('name', 'Name is obligatory').not().isEmpty(),
    check('email','Email is not valid').isEmail(),
    check('password','Password must to have more than 6 letters').isLength({min:6}),
    check('email').custom(emailExiste),
    validarCampos
],usuarioPost)
module.exports=router