
const mongoose=require("mongoose")

const followSchema= new mongoose.Schema({
    follower:{
        type:String,
        required:[true,"follower is required"]
    },
    followee:{
        type:String,
        required:[true,"follower is required"]
        
    },
    },{
        timestamps:true
    }
)

followSchema.index({follower:1,followee:1},{unique:true})

const followmodel=mongoose.model("follow",followSchema)


module.exports=followmodel