import React, { useState } from "react";
import "../styles/HomePage.scss";
import shoppy_logo from "../assets/logo2.png";
import { IoSearchSharp } from "react-icons/io5";
import {RxCross2} from "react-icons/rx";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
// import { Link } from 'react-router-dom'



const HomePage: React.FC = () => {
  const [loginOpen, setloginOpen] = useState<boolean>(false);
  const [signupOpen, setsignupOpen] = useState<boolean>(false);

  return (
    <div className="Homepage_div">
      <div className="Homepage_login">
        {loginOpen && 
        <div className="backdrop">
          <dialog className="Homepage_login-dialog" open>
            <p className="Homepage_login-close"><RxCross2 onClick={() => setloginOpen(false)}/></p>
            <LoginPage setSignupOpen={setsignupOpen} setLoginOpen={setloginOpen}/>
          </dialog>
        </div>
        }
      </div> 
      <div className="Homepage_signup">
        {signupOpen && 
        <div className="backdrop">
          <dialog className="Homepage_login-dialog" open>
            <p className="Homepage_login-close"><RxCross2 onClick={() => setsignupOpen(false)}/></p>
            <SignupPage setSignupOpen={setsignupOpen} setLoginOpen={setloginOpen}/>
          </dialog>
        </div>
        }
      </div>
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
            <button onClick={() => setloginOpen(true)}>Sign in</button>
            <button onClick={() => setsignupOpen(true)}>Sign up</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
