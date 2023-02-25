import React from "react";

const login = () => {
  return (
    <main>
      <form>
      <h1>Login</h1>
        <input type='text' placeholder='username' />
        <input type='password' placeholder='password' />
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
