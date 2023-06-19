import React, { useState, useEffect } from "react";

// Styling
import "../styles/HomePage.scss";

import {RxCross2} from "react-icons/rx";

// Pages and Components
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import Navbar from "../components/Navbar";
import NavPage from "../components/NavPage";
import SaleBar from "../components/SaleBar";
import MainContent from "./MainContent";
import ForgotPage from "./ForgotPage";
import NewPassPage from "./NewPassPage";



const HomePage: React.FC = () => {
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [forgotOpen, setForgotOpen] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<boolean>(false);

  useEffect(() => {
    if ( loginOpen || signupOpen || forgotOpen ) {
      // Disable scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scrolling
      document.body.style.overflow = 'auto';
    }
  }, [loginOpen, signupOpen, forgotOpen]);

  return (
    <div className="Homepage_div">
      <div className="Homepage_login">
        {loginOpen && 
        <div className="Homepage_backdrop-bg">
          <div className="Homepage_backdrop">
            <dialog className="Homepage_login-dialog" open>
              <p className="Homepage_login-close"><RxCross2 onClick={() => setLoginOpen(false)}/></p>
              <LoginPage setSignupOpen={setSignupOpen} setLoginOpen={setLoginOpen} setForgotOpen={setForgotOpen}/>
            </dialog>
          </div>
        </div>
        }
      </div> 
      <div className="Homepage_signup">
        {signupOpen && 
        <div className="Homepage_backdrop-bg">
          <div className="Homepage_backdrop">
            <dialog className="Homepage_login-dialog" open>
              <p className="Homepage_login-close"><RxCross2 onClick={() => setSignupOpen(false)}/></p>
              <SignupPage setSignupOpen={setSignupOpen} setLoginOpen={setLoginOpen}/>
            </dialog>
          </div>
        </div>
        }
      </div>
      <div className="Homepage_forgot-password">
        {forgotOpen && 
        <div className="Homepage_backdrop-bg">
          <div className="Homepage_backdrop">
            <dialog className="Homepage_login-dialog" open>
              <p className="Homepage_login-close"><RxCross2 onClick={() => setForgotOpen(false)}/></p>
              <ForgotPage setNewPassword={setNewPassword} setForgotOpen={setForgotOpen}/>
            </dialog>
          </div>
        </div>
        }
      </div>
      <div className="Homepage_forgot-password">
        {newPassword && 
        <div className="Homepage_backdrop-bg">
          <div className="Homepage_backdrop">
            <dialog className="Homepage_login-dialog" open>
              <p className="Homepage_login-close"><RxCross2 onClick={() => setForgotOpen(false)}/></p>
              <NewPassPage />
            </dialog>
          </div>
        </div>
        }
      </div>
      <div className="HomePage_navbar-container">
        <Navbar setSignupOpen={setSignupOpen} setLoginOpen={setLoginOpen} />
      </div>
      <div className="HomePage_navbar-container">
        <NavPage />
      </div>
      <div className="HomePage_salebar-container">
        <SaleBar />
      </div>
      <div className="HomePage_main-container">
        <MainContent />
      </div>
    </div>
  );
};

export default HomePage;
