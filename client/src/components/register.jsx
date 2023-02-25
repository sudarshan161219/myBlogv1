import React, { useState } from "react";

const register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ userName, password }),
      headers: { "content-Type": "application/json" },
    });
    setUserName('')
    setPassword('')
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
          value={userName}
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
