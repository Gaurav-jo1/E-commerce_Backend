import {useEffect, useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { AuthContainerProps } from "./CommonInterfaces";

// Pages
import LoginPage from "../pages/AuthPages/LoginPage";
import SignupPage from "../pages/AuthPages/SignupPage";
import ForgotPage from "../pages/AuthPages/ForgotPage";
import NewPassPage from "../pages/AuthPages/NewPassPage";
import EmailCodePage from "../pages/AuthPages/EmailCodePage";

// Context
import { GlobalValue } from "../context/GlobalValue";

export function AuthContainer({
  isOpen,
  onClose,
  children,
}: AuthContainerProps) {
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

export function AuthPages() {
  const {
    loginOpen,
    signupOpen,
    forgotOpen,
    emailCode,
    newPassword,
    setLoginOpen,
    setSignupOpen,
    setForgotOpen,
    setEmailCode,
    setNewPassword,
  } = useContext(GlobalValue);

  useEffect(() => {
    if (loginOpen || signupOpen || forgotOpen || newPassword || emailCode) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling
      document.body.style.overflow = "auto";
    }
  }, [loginOpen, signupOpen, forgotOpen, newPassword, emailCode]);
  
  return (
    <>
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
    </>
  );
}
