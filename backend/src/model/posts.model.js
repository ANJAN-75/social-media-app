const mongoose=require("mongoose")


const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    ImageUrl:{
        type:String,
        required:[true,"without image post not created"]
    },
    user:{
        ref:"user",
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"user id is required for creating an post"]
    }
})

const postmodel=mongoose.model("post",postSchema)

module.exports=postmodel