const app=require("./src/app")
const connectDb=require("./src/config/data")
require("dotenv").config()

app.listen(3000,()=>{
    console.log("app is running well")
})

connectDb()