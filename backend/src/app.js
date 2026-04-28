const express=require("express")
const app=express()
const cookie_parser=require("cookie-parser")
const authroutes=require("./routes/auth.routes")
const postRoutes=require("./routes/posts.routes")
const userRoutes=require("./routes/user.routes")
const cors=require("cors")


app.use(cookie_parser())
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))

app.use("/api/auth",authroutes)
app.use("/api/posts",postRoutes)
app.use("/api/user",userRoutes)


module.exports=app