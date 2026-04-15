const express=require("express")
const post  = require("../controllers/post.controllers")
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const postRoutes=express.Router()


postRoutes.post("/",upload.single('imageUrl'),post)


module.exports=postRoutes