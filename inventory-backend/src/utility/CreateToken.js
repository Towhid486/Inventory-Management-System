const jwt = require('jsonwebtoken');
const CreateToken = async (data) =>{
    let Payload = {exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data:data}
    let JWT_KEY = process.env.JWT_SECRET_KEY
    return jwt.sign(Payload, JWT_KEY)
}
module.exports = CreateToken;