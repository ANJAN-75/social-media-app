const postmodel=require("../model/posts.model")
const multer  = require('multer')

const ImageKit =require("@imagekit/nodejs")

const { toFile } = require("@imagekit/nodejs")


const upload = multer({storage:multer.memoryStorage()})

const client=new ImageKit({
   
    privateKey:process.env.PRIVATE_KEY,
    
})

const post=async(req,res)=>{
    const caption =req.body
    const imageUrl=req.file
    const file= await client.files.upload({
        file:await toFile(req.file.buffer, "file"),
        fileName:"test"
    })

    res.send(file)
}



module.exports=post