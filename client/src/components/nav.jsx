import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

const nav = () => {
const [userName, setUserName] = useState(null)


useEffect(() => {
  userData ()
}, [])

 function userData () {
 fetch("http://localhost:4000/profile", {
  credentials: 'include'
}).then(response => {
  response.json().then(userInfo => {
    // console.log(userInfo.username);
    setUserName(userInfo.username)
  })
})

}

  return (
    <header>
    <Link to='/'  className='logo link'>  MyBlog</Link>

{userName && (
  <div className='profile'>
  <h1>{userName }</h1>
  <Link className='profile-link' to='/create' >Create new post</Link>
  </div>
)}

{!userName && (
      <ul>
      <li>
    <Link to='/login'  className='link'> Login</Link>
      </li>
      <li>
    <Link to='/register'  className='link'>Register</Link>
      </li>
    </ul>

)}


  </header>
  )
}

export default nav