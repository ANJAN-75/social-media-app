const usermodel=require("../model/user.model")
const jwt=require("jsonwebtoken")
const crypto=require("crypto")


const register=async(req,res)=>{
    const {username,email,password,bio,profile_image}=req.body

    const existingUser= await usermodel.findOne({
        $or:[
            {email:email},
            {username:username}
        ]
    })

    if(existingUser){
        return res.status(409).json({
            message:"user is already exist"+existingUser.email==email? "email already exist" : "usernae already exist"

        })
    }
    const hashedpassword=crypto.createHash("sha256").update(password).digest("hex")

   const user=await usermodel.create({
    username:username,
    email:email,
    password:hashedpassword,
    bio:bio,
    profile_image:profile_image

   })

    const token=jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    res.cookie("token",token)

    res.status(200).json({
        message:"user registered sucessfully",
        data:{
            username:username,
            email:email,
            bio:bio,
            profile_image:profile_image
        }
    })

    
}


module.exports=register