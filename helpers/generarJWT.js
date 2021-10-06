

const jwt = require('jsonwebtoken')

const generarJWT = (uid='') => {
    return new Promise((resolve,reject)=> {
        // El payload lleva el id.
        const payload = {uid};
        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn:'4h'
        },(err,token)=> {
            if(err){
                console.log(err)
                reject('The token couldnt be created.')
            }else{
                // Devuelvo el token.
                resolve(token)
            }
        })
    })
}
module.exports=generarJWT