require("dotenv").config()
const app=require("./src/app")
const connectDb=require("./src/config/data")


app.listen(3000,()=>{
    console.log("app is running well")
})

connectDb()