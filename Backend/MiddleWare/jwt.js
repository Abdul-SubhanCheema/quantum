
const jwt=require('jsonwebtoken');

const jwtMiddleware=(req,res,next)=>{

    const token=req.headers.authorization.split(' ')[1];

    if(!token) return res.status(401).json({message:"UnAuthorized"});

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)

        req.userInfo=decoded;
        next();

        
    } catch (error) {
        console.log(error);
        res.status(401).json({message:"Invalid Token Found"})
    }


}

const generateToken=(userData)=>{

    return jwt.sign(userData,process.env.JWT_SECRET_KEY);
}



module.exports={jwtMiddleware,generateToken};
