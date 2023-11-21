const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const token = req.headers['authorization']
    if(!token) return res.status(401).json({auth: false, message: "Token not found"})

    try{
        const decoded = jwt.verify(token, process.env.SECRET)
        req.userId = decoded.id
    }catch(err){
        if(err) return res.status(500).json({auth: false, message: err})
    }
    next()
}

module.exports = verifyJWT;