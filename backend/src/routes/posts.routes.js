const express=require("express")
const multer  = require('multer')
const {postController,getPostsController,getPostDetailsController,postLikeController,getfeedController} = require("../controllers/post.controllers")
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


//post- /api/posts/like/:postId
//description: this api api for like a post

postRoutes.post("/like/:postId",identifyingUser,postLikeController)


// GET-/api/posts/feed
//descri- get all the post create in db

postRoutes.get("/feed",identifyingUser,getfeedController)





module.exports=postRoutes