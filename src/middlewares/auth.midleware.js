const jwt=require("jsonwebtoken")



const identifyingUser=(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        return res.status(405).json({
            message:"no valid token ! unauthorized access"
        })
    }
    let decoded
    try{
         decoded=jwt.verify(token,process.env.JWT_SECRET)
    }catch(e){
        return res.status(401).json({
            message:"Token Invalid"
        })
    }
    req.user=decoded

    next()
}

module.exports=identifyingUser