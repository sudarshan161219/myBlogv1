import React, { useState } from "react";
import { toast } from 'react-toastify';



const register = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserName("");
    setPassword("");

    try {
      
   const response =   await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "content-Type": "application/json" },
      });

      if(response.status === 200){
        toast.success(`success, user registered`, {
          position: toast.POSITION.TOP_RIGHT
      });
      }else{
        toast.error(`Opps!!, username: ${username} already taken`, {
          position: toast.POSITION.TOP_RIGHT
      });
      }
     
    } catch (error) {
      console.log(error);
    }

  
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleUserPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input
          type='text'
          placeholder='username'
          value={username}
          onChange={handleUserName}
        />
        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={handleUserPassword}
        />
        <div className='btn-container'>
          <button className='button-28' role='button'>
            Register
          </button>
        </div>
      </form>
    </main>
  );
};

export default register;
