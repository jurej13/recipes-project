const { response,request } = require("express");
const Recipes = require("../models/recypes");



// POST
const recipePost = async (req=request,res=response) => {
    const {recipe_name,ingredients,preparation} = req.body;
    const recipe = new Recipes({recipe_name,ingredients,preparation})
    await recipe.save()
    res.json({
        recipe,
        msg: 'added with success'
    })
}
// GET
const recipesGet = async (req=request,res=response) => {
        const [total,recipes] = await Promise.all([
            Recipes.countDocuments({estado:true}),
            Recipes.find({estado:true})//realizando un filtro para que solo me traiga los de estado true
        ])
        res.json({
            total,
            recipes
            // msg:'Cantidad de registros en la bd:',
        });
}
// UPDATE
const recipesPut = async(req=request,res=response)=> {
    const {id} = req.params;
    const {_id,ingredients, ...resto} = req.body
    const recipe = await Recipes.findByIdAndUpdate(id,resto)
    // si los ingredientes tiene un valor, simplemente lo guardo. si no queda como esta.
    if(ingredients){    
        recipe.ingredients = ingredients;
        await recipe.save();
    }
    res.json(recipe);
}
// DELETE
const recipeDelete = async (req=request,res=response) => {
        const {id} = req.params
        const recipe = await Recipes.findByIdAndDelete(id)
        // const recipe = await Recipes.findByIdAndUpdate(id,{estado:false});
        res.json(recipe);
}
// Exports
module.exports={
    recipePost,
    recipesGet,
    recipesPut,
    recipeDelete
}