import React from 'react'
import "../styles/HomePage.scss"
import { Link } from 'react-router-dom'

const HomePage:React.FC = () => {
  return (
    <div>
        <h1>HomePage</h1>
        <Link to="/profile">Profile Page</Link>
        {" "}
        <Link to="/login">Login Page</Link>
        {" "}
        <Link to="/signup">Signup Page</Link>
    </div>
  )
}

export default HomePage