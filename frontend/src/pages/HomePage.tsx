import React from 'react'
import "../styles/HomePage.scss"
import shoppy_logo from "../assets/logo2.png"
import {IoSearchSharp} from "react-icons/io5"
// import { Link } from 'react-router-dom'

const HomePage:React.FC = () => {
  return (
    <div className='Homepage_div'>
        <nav>
          <ul>
            <li><img src={shoppy_logo} alt="shoppy logo" height={"30px"} /></li>
            <li>
              <input type="text" placeholder='Search...'/>
              <p> <IoSearchSharp /> </p>
            </li>
            <li>
              <button>Log in</button>
              <button>Sign up</button>
            </li>
          </ul>
        </nav>
    </div>
  )
}

export default HomePage;