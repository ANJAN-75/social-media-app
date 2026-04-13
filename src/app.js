const express=require("express")
const app=express()
const cookie_parser=require("cookie-parser")
const authroutes=require("./routes/auth.routes")


app.use(cookie_parser())
app.use(express.json())
app.use("/api/auth",authroutes)

module.exports=app