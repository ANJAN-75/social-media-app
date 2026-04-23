const express=require("express")
const multer  = require('multer')
const {postController,getPostsController,getPostDetailsController} = require("../controllers/post.controllers")
const identifyingUser=require("../middlewares/auth.midleware")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const postRoutes=express.Router()

// create a post 
//  POST /api/posts
postRoutes.post("/",upload.single('imageUrl'),identifyingUser,postController)



//get post of particular user who requesting
// GET /api/posts

postRoutes.get("/",identifyingUser,getPostsController)


//Get /api/posts/details/:postid

postRoutes.get("/details/:id",identifyingUser,getPostDetailsController)






module.exports=postRoutes