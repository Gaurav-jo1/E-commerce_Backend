import React from "react";
// import shoppy_logo from "../assets/logo4.png";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { SignComponentProps } from "./ComponentsInterface";
import "../styles/Navbar.scss"

const Navbar: React.FC<SignComponentProps> = ({setSignupOpen, setLoginOpen}) => {
  return (
    <nav className="Navbar_container">
        <div className="Navbar_container-search">
          <p> <HiMagnifyingGlass /> </p>
          <input type="text" placeholder="Search..." />
        </div>
        <div className="Navbar_container-logo"> <p>Shoppy</p> </div>
        <div className="Navbar_container-buttons">
          <p onClick={() => setSignupOpen(true)}>Sign up</p>
          <button onClick={() => setLoginOpen(true)}>Sign in</button>
        </div>
    </nav>
  );
};

export default Navbar;