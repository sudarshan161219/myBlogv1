import React from 'react'
import { Link } from 'react-router-dom'

const nav = () => {

  return (
    <header>
    <Link to='/'  className='logo link'>  MyBlog</Link>
    <ul>
      <li>
    <Link to='/login'  className='link'> Login</Link>
      </li>
      <li>
    <Link to='/register'  className='link'>Register</Link>
      </li>
    </ul>
  </header>
  )
}

export default nav