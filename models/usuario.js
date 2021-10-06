const {Schema,model} = require('mongoose')

const UsuarioSchema = Schema({
    name:{
        type:String,
        required:[true,'Name Obligatory']
    },
    email:{
        type:String,
        require:[true,'Email Obligatory'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password obligatory']
    },
    estado:{
        type:Boolean,
        default: true
    },
    google:{
        type:Boolean,
        default:false
    }
})
UsuarioSchema.methods.toJSON = function(){
    const {__v,password,_id, ...usuario } = this.toObject();
    usuario.uid = _id;   
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema)