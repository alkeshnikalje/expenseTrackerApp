const jwt = require('jsonwebtoken');

const userAuth = (req,res,next)=>{
    const autheHeader = req.headers.authorization;
    try{
        if(!autheHeader){
            return res.status(401).json({msg : "Unauthorized"});
        }
        const token = autheHeader.split(' ')[1];
        if(!token){
            return res.status(401).json({msg : "Unauthorized"});
        }
        jwt.verify(token,process.env.SECRET,(err,user)=>{
            if(err){
                return res.status(403).json({error: err.message});
            }
            req.user = user;
            next();
        });
    }
    catch(err){
        return res.status(500).json({error : err.message});
    }
}  



module.exports = userAuth;