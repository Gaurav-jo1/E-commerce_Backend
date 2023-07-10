import React, { useState, useEffect } from "react";

// Styling
import "../styles/HomePage.scss";

// Icons
import { RxCross2 } from "react-icons/rx";

// Components
import NavPage from "../components/NavPage";
import Navbar from "../components/Navbar";
import SaleBar from "../components/SaleBar";

// Pages
import LoginPage from "./AuthPages/LoginPage";
import SignupPage from "./AuthPages/SignupPage";
import MainPage from "./MainPage";
import ForgotPage from "./AuthPages/ForgotPage";
import NewPassPage from "./AuthPages/NewPassPage";
import EmailCodePage from "./AuthPages/EmailCodePage";

// Interfaces and Types
interface AuthContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const HomePage: React.FC = () => {
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [forgotOpen, setForgotOpen] = useState<boolean>(false);
  const [emailCode, setEmailCode] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<boolean>(false);

  useEffect(() => {
    if (loginOpen || signupOpen || forgotOpen || newPassword || emailCode) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling
      document.body.style.overflow = "auto";
    }
  }, [loginOpen, signupOpen, forgotOpen, newPassword, emailCode]);

  function AuthContainer({ isOpen, onClose, children }: AuthContainerProps) {
    if (!isOpen) {
      return null;
    }

    return (
      <div className="Homepage_auth-container">
        <div className="Homepage_backdrop-bg">
          <div className="Homepage_backdrop">
            <dialog className="Homepage_login-dialog" open>
              <p className="Homepage_login-close">
                <RxCross2 onClick={onClose} />
              </p>
              {children}
            </dialog>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="Homepage_div">
      {/* LoginPage */}
      <AuthContainer isOpen={loginOpen} onClose={() => setLoginOpen(false)}>
        <LoginPage
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          setForgotOpen={setForgotOpen}
        />
      </AuthContainer>

      {/* SignupPage */}
      <AuthContainer isOpen={signupOpen} onClose={() => setSignupOpen(false)}>
        <SignupPage setSignupOpen={setSignupOpen} setLoginOpen={setLoginOpen} />
      </AuthContainer>

      {/* ForgotPage */}
      <AuthContainer isOpen={forgotOpen} onClose={() => setForgotOpen(false)}>
        <ForgotPage
          setForgotOpen={setForgotOpen}
          setLoginOpen={setLoginOpen}
          setEmailCode={setEmailCode}
        />
      </AuthContainer>

      {/* EmailCodePage */}
      <AuthContainer isOpen={emailCode} onClose={() => setEmailCode(false)}>
        <EmailCodePage
          setNewPassword={setNewPassword}
          setEmailCode={setEmailCode}
        />
      </AuthContainer>

      {/* NewPassPage */}
      <AuthContainer isOpen={newPassword} onClose={() => setNewPassword(false)}>
        <NewPassPage
          setNewPassword={setNewPassword}
          setLoginOpen={setLoginOpen}
        />
      </AuthContainer>

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
        <MainPage />
      </div>
    </div>
  );
};

export default HomePage;
