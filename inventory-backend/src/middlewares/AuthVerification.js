const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    let Token = req.headers['token']
    let JWT_KEY = process.env.JWT_SECRET_KEY
    jwt.verify(Token, JWT_KEY, (err, decoded) => {
        if(err){
            console.log(err)
            res.status(401).json({status:false, message:"Unauthorized"})
        }else{
            let email = decoded['data'];
            req.headers.email = email;
            next();
        }
    })
}