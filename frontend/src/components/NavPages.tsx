import React from 'react'

// Styling
import "../styles/NavPage.scss"

const NavPages:React.FC = () => {
  return (
    <nav className='NavPages_container'>
        <ul className='NavPages_container-ul'>
            <li>New & Featured</li>
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>Sale</li>
        </ul>
    </nav>
  )
}

export default NavPages