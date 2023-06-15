import React from "react";
// import shoppy_logo from "../assets/logo4.png";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { SignComponentProps } from "./ComponentsInterface";
import "../styles/Navbar.scss"

const Navbar: React.FC<SignComponentProps> = ({setSignupOpen, setLoginOpen}) => {
  return (
    <nav>
      <ul>
        <li>
          <p>
            <HiMagnifyingGlass />
          </p>
          <input type="text" placeholder="Search..." />
        </li>
        <li>
          <p>Shoppy</p>
        </li>
        <li>
          <p onClick={() => setSignupOpen(true)}>Sign up</p>
          <button onClick={() => setLoginOpen(true)}>Sign in</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
