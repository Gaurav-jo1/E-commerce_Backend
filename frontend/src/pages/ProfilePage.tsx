import React from 'react'
import "../styles/ProfilePage.scss"
import { Link } from 'react-router-dom'

const ProfilePage:React.FC = () => {
  return (
    <div>
        <h1>ProfilePage</h1>
        <Link to="/">HomePage</Link>
    </div>
  )
}

export default ProfilePage