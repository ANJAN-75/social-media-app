import { useState,useContext } from "react";
import{getfeed} from "../services/post.api"
import { PostContex} from "../post.contex";


export const usePost=()=>{
    const contex=useContext(PostContex)
    const {feed,setFeed,loading,setLoading}=contex

    const handelFeed=async()=>{
        setLoading(true)
        const response=await getfeed()
        setFeed(response.posts)
        setLoading(false)
    }
    return{
        feed,
        loading,
        handelFeed
    }
        
    
}
