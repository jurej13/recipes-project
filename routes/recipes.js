const { Router } = require("express");
const { check } = require("express-validator");
const { recipePost, recipesGet, recipesPut, recipeDelete } = require("../controllers/recipes");
const { existRecipeId } = require("../helpers/db-validator");
const { validarCampos } = require("../middlewares/validar-campos");




const router = Router();
// POST
router.post('/',[
    check('recipe_name', 'Name of the recipe need').not().isEmpty(),
    check('ingredients','Ingredients are needed').not().isEmpty(),
    check('preparation','Preparation is needed').not().isEmpty(),
    validarCampos
],recipePost)
// GET
router.get('/',recipesGet)
// UPDATE
router.put('/:id',[
    check('id','Id incorrect.').isMongoId(),
    check('id').custom(existRecipeId),
    validarCampos
], recipesPut)
router.delete('/:id',[
        check('id','No es un ID valido.').isMongoId(),
        check('id').custom(existRecipeId),
        validarCampos
], recipeDelete)


module.exports=router