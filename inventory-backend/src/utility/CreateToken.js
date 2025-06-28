const jwt = require('jsonwebtoken');
const CreateToken = async (data) =>{
    let EXPIRE={expiresIn: '30d'}
    let JWT_KEY = process.env.JWT_SECRET_KEY
    let Payload = {data:data}
    return jwt.sign(Payload,JWT_KEY,EXPIRE)
}
module.exports = CreateToken;