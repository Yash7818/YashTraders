import jwt from 'jsonwebtoken'
import config from './config'
const getToken = (user) => {
    
    return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin

    },config.JWT_SECRET,{
        expiresIn:'48h'
    })
}
const isAuth = (req,res,next) => {
    const token = req.headers.authorization;
    if(token){
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, config.JWT_SECRET,(err, decode) =>{
            if(err){
                return res.status(401).send({error:'invalid token'})
            }
            req.user = decode
            next()
            return
        })
    } else{
    return res.status(401).send({error:'token is not supplied'})
    }
}

const isAdmin = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        return next()
    }
    else{
        return res.status(401).send({error:'The User is not valid'})
    }
}
export {getToken, isAuth, isAdmin}