const jwt = require('jsonwebtoken');


//Function is used to authenticate user using JWT and provide JWT access token
module.exports = (req, res, next) => {
    try{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    } catch(error){
        return res.status(401).json({
            message:'Auth failed'
        })
    };
    next();
};