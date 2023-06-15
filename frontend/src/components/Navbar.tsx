import React from "react";
import shoppy_logo from "../assets/logo2.png";
import { IoSearchSharp } from "react-icons/io5";
import { SignComponentProps } from "./SignComponent";
import "../styles/Navbar.scss"

const Navbar: React.FC<SignComponentProps> = ({setSignupOpen, setLoginOpen}) => {
  return (
    <nav>
      <ul>
        <li>
          <img src={shoppy_logo} alt="shoppy logo" height={"30px"} />
        </li>
        <li>
          <input type="text" placeholder="Search..." />
          <p>
            {" "}
            <IoSearchSharp />{" "}
          </p>
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
