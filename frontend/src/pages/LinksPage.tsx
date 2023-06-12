import React from 'react'
import { Link } from 'react-router-dom'

const LinksPage:React.FC = () => {
  return (
    <div>
        <h1>Links Page</h1>
        <Link to="/home">Home Page</Link>
        {" "}
        <Link to="/profile">Profile Page</Link>
        {" "}
        <Link to="/login">Login Page</Link>
        {" "}
        <Link to="/signup">Signup Page</Link>
    </div>
  )
}

export default LinksPage