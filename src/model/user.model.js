const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:[true,"username is required"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    bio:{
        type:String,
        default:""
        
    },
    profile_image:{
        type:String,
        default:"https://ik.imagekit.io/selns3tgy/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3485.avif"

    }
})

const usermodel=mongoose.model("user",userSchema)

module.exports=usermodel