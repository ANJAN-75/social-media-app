import { useState,createContext } from "react";

export const PostContex=createContext()

export const PostProvider=({children})=>{
    const [feed, setFeed] = useState([])
    const [loading, setLoading] = useState(false)

    return(
        <PostContex.Provider value={{feed,setFeed,loading,setLoading}}>
            {children}
        </PostContex.Provider>
    )
}