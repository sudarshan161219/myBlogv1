import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContex";

const nav = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  return (
    <header>
      <Link to='/' className='logo link'>
        MyBlog
      </Link>

      {userInfo && (
        <div className='profile'>
          <h1>{userInfo.username}</h1>
          <Link className='profile-link' to='/create'>
            Create new post
          </Link>
          <button onClick={logout}>Logout</button>
        </div>
      )}

      {!userInfo && (
        <ul>
          <li>
            <Link to='/login' className='link'>
              Login
            </Link>
          </li>
          <li>
            <Link to='/register' className='link'>
              Register
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default nav;
