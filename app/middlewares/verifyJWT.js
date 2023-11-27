const jwt = require("jsonwebtoken");

/**
 * Middleware de verificação de token do usuário
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.Next} next 
 * @returns 
 */
const verifyJWT = (req, res, next) => {
    const rawToken = req.headers['authorization']
    const token = rawToken.split(' ')[1]

    if(!token) return res.status(401).json({auth: false, message: "Token not found"})

    try{
        const decoded = jwt.verify(token, process.env.SECRET)
        req.userId = decoded.id // id do usuário
        req.userType = decoded.type // nível de acesso
    }catch(err){
        if(err) return res.status(500).json({auth: false, message: err})
    }
    next()
}

module.exports = verifyJWT;