const postmodel=require("../model/posts.model")
const multer  = require('multer')
const jwt=require("jsonwebtoken")

const ImageKit =require("@imagekit/nodejs")

const { toFile } = require("@imagekit/nodejs")



const upload = multer({storage:multer.memoryStorage()})

const client=new ImageKit({
    privateKey:process.env.PRIVATE_KEY,
})

const post=async(req,res)=>{



    const token=req.cookies.token
    if(!token){
        res.status(405).json({
            message:"no valid token ! unauthorized access"
        })
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)

    const file= await client.files.upload({
        file:await toFile(req.file.buffer, "file"),
        fileName:"test",
        folder:"user-post-image"
    })


    const post= await postmodel.create({
        caption:req.body.caption,
        user:decoded.id,
        ImageUrl:file.url
    })

    res.status(201).json({
        message:"post created sucessfully",
        post:post
    })

}




module.exports=post