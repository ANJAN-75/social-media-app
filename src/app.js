const express=require("express")
const app=express()
const cookie_parser=require("cookie-parser")
const authroutes=require("./routes/auth.routes")
const postRoutes=require("./routes/posts.routes")


app.use(cookie_parser())
app.use(express.json())


app.use("/api/auth",authroutes)
app.use("/api/posts",postRoutes)

module.exports=app