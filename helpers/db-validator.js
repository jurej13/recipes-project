
const Recipes = require("../models/recypes");


const emailExiste = async (email='') => {
    const existEmail = await usuario.findOne({email})
    if(existEmail){
        throw new Error(`The email ${email} is already registered in the database`)
    }
}
const existRecipeId = async(id) => {
    const existRecipe = await Recipes.findById(id)
    if(!existRecipe){
        throw new Error(`El Id no existe : ${id} .`)  
    }
}
module.exports={
    emailExiste,
    existRecipeId
}