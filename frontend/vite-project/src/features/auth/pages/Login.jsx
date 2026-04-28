import React from "react";
import { useState } from "react";
import "../style/formStyle.scss";
import axios from "axios"
import {Link } from "react-router"
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandeller=(e)=>{
    e.preventDefault()
    axios.post("http://localhost:3000/api/auth/login",
      {
        username,
        password
      },
      {withCredentials:true})
      .then(res=>{
        console.log(res.data)
      })
    
  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form
        onSubmit={submitHandeller}
        >
          <input
          onInput={(e)=>{setUsername(e.target.value)}}
          type="text" 
          name="username" 
          placeholder="username"
           />
          <input 
          onInput={e=>{setPassword(e.target.value)}}
          type="text" 
          name="password"
           placeholder="password" />
          <button type="submit">Login</button>
          <p>
          if you dont have  an acount! 
           <Link to="/register">Login </Link>
         </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
