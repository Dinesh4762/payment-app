const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("./config")

function authMiddleware(req,res,next){
    const tokenString = req.headers.authorization;
    if(!tokenString || !tokenString.startsWith("Bearer ")){
      return res.status(403).json({msg: "wrong authorization headers!"})
    }
    const token = tokenString.split(" ")[1];
   try {
     const encoded = jwt.verify(token, JWT_SECRET);
     req.userId = encoded.userId;
     next();
   } catch (error) {
    res.status(403).json({msg:"You are not authorized!"})
   }

}
module.exports = authMiddleware;
