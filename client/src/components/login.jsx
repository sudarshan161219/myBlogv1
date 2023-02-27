import React, { useState } from "react";
import {Navigate} from 'react-router-dom'
import { toast } from "react-toastify";

const login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserName("");
    setPassword("");

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "content-Type": "application/json" },
        credentials: "include",
      });

      if (response.status === 200) {
        setRedirect(true);
      } else {
        toast.error(`Opps!!, Login failed`, {
          position: toast.POSITION.TOP_RIGHT,
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

if(redirect) {
return <Navigate to={'/'} />
}

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
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
            Login
          </button>
        </div>
      </form>
    </main>
  );
};

export default login;
