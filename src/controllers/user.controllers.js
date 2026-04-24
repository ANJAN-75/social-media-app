const followmodel=require("../model/follow.model")
const usermodel=require("../model/user.model")



const followController=async(req,res)=>{

    const followeUsername=req.params.username
    const followerUsername=req.user.username

    const userexist=await usermodel.findOne({
        username:followeUsername
    })

    if(!userexist){
        return res.status(404).json({
            message:"user does not exist !"
        })
    }
    if(followeUsername===followerUsername){
        return res.status(404).json({
            message:"you cant follow yourself"
        })
    }

    const isAlreadyFollowing=await followmodel.findOne({
        follower:followerUsername,
        followee:followeUsername
    })

    if(isAlreadyFollowing){
        return res.status(409).json({
            message:"you already follow this user"
        })
    }

    const followRecord=await followmodel.create({
        follower:followerUsername,
        followee:followeUsername
    })

    res.status(201).json({
        message:`you are following ${followeUsername}`,
        follow:followRecord
    })

}

const unfollowController=async(req,res)=>{
    
    const followeUsername=req.params.username
    const followerUsername=req.user.username

    const isFollweExist=await usermodel.findOne({
        username:followeUsername
    })

    if(!isFollweExist){
        return res.status(404).json({
            message:"user does not exist ! whom you want to unfollow"
        })
    }

    const isFollowed=await followmodel.findOne({
        follower:followerUsername,
        followee:followeUsername
    })

    if(!isFollowed){
        return res.status(409).json({
            message:"you never follow this person "
        })
    }

    await followmodel.findByIdAndDelete(isFollowed._id)

    res.status(200).json({
        message:`you unfollowed ${followeUsername}`
    })

}



module.exports={
    followController,
    unfollowController
}
