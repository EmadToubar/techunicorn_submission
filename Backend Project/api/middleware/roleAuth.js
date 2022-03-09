const jwt = require('jsonwebtoken');

//Function is used to verify user permissions
const authUser = (permissions)=>{
return (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if(permissions.includes(decoded.role)){
        next();
    } else{
        return res.status(401).json("Permission needed");
    }
}
}

module.exports = {authUser}


  