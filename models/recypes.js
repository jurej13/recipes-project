const {Schema,model} = require('mongoose')

const RecypesSchema = Schema({
    recipe_name:{
        type:String,
        required:[true,'Name Obligatory']
    },
    cooked_before:{
        type:Boolean,
        default:false
    },
    ingredients:[{
        type:String,
        required:true   
    }]
    ,
    preparation:{
        type:String,
        required:true
    }
})
RecypesSchema.methods.toJSON = function(){
    const {__v,_id, ...recipes } = this.toObject();
    recipes.uid = _id;   
    return recipes;
}

module.exports = model('Recipes', RecypesSchema)