const express=require("express")
const usermodel=require("../model/user.model")
const jwt=require("jsonwebtoken")
const crypto=require("crypto")
const authRoutes=express.Router()
const register=require("../controllers/authControllers")

authRoutes.post("/register",register)

module.exports=authRoutes