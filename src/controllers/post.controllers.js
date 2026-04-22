const postmodel=require("../model/posts.model")
const multer  = require('multer')
const jwt=require("jsonwebtoken")

const ImageKit =require("@imagekit/nodejs")

const { toFile } = require("@imagekit/nodejs")




const upload = multer({storage:multer.memoryStorage()})

const client=new ImageKit({
    privateKey:process.env.PRIVATE_KEY,
})

const postController=async(req,res)=>{



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
    
    if(!req.file){
        return res.status(404).josn({
            message:"image required"
        })
    }

    if(!req.body.caption){
        return res.status(404).josn({
            message:"caption required"
        })
    }

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

const getPostsController=async(req,res)=>{
    const token=req.cookies.token

    if(!token){
        return res.status(403).json({
            message:"unauthorize Access!"
        })
    }

    let decoded
   try{
     decoded=jwt.verify(token,process.env.JWT_SECRET)
   }catch(e){
    return res.status(401).json({
        message:"unvalid token"
    })
   }

   const userId=decoded.id

   const posts=await postmodel.find({
    user:userId
   })

   res.status(200).json({
    message:"all posts",
    posts:posts
   })
    
}


const getPostDetailsController=async(req,res)=>{
    const token=req.cookies.token

    if(!token){
        return res.status(405).json({
            message:"Unauthorized Access !"
        })
    }

    let decoded

    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(e){
        return res.status(404).json({
            message:"Token invalid"
        })
    }

    const userId=decoded.id

    const postId=req.params.id

    const post=await postmodel.findById(postId)
    
    if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
    const authorizedPost=post.user.toString()===userId
    if(!authorizedPost){
        res.status(404).json({
            messsage:"unauthorized user!"
        })
    }

    res.status(200).json({
        message:"post details",
        post:post
    })

}

module.exports={
    postController,
    getPostsController,
    getPostDetailsController

} 