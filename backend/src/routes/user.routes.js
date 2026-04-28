const express=require("express")

//require controller
const {followController,unfollowController}=require("../controllers/user.controllers")

//require midleware
const identifyingUser=require("../middlewares/auth.midleware")

const userRoute=express.Router()


// post - api/user/follow/:username
//description- using this api we can follow a user

userRoute.post("/follow/:username",identifyingUser,followController)



//post -api/user/unfollow/:username
// description -using this api we can unfollow a user


userRoute.post("/unfollow/:username",identifyingUser,unfollowController)




module.exports=userRoute  