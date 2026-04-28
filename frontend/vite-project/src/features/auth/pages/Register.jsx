import React from "react";
import "../style/formStyle.scss";
import { useState } from "react";
import axios from "axios" 
import {Link} from "react-router"
const Register = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const submitHandeller = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/auth/register",
      {
        username,
        email,
        password
      },
      {
        withCredentials:true
      }
    )
    .then(res=>{
      console.log(res.data)
    })
  };
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={submitHandeller}>
          <input
            onInput={(e) => {
              setusername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="username"
          />
          <input
            onInput={(e) => {
              setemail(e.target.value);
            }}
            type="text"
            name="email"
            placeholder="email"
          />
          <input
            onInput={(e) => {
              setpassword(e.target.value);
            }}
            type="text"
            name="password"
            placeholder="password"
          />
          <button type="submit">Register</button>
         <p>
          if you already have an acountv 
           <Link to="/login">Login </Link>
         </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
