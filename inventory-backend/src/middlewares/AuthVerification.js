const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    let Token = req.headers['token']
    jwt.verify(Token, 'SecretKey1234567890', (err, decoded) => {
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