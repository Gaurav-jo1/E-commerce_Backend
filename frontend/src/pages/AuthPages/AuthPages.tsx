import { useEffect, useContext } from "react";
import { RxCross2 } from "react-icons/rx";

// Pages
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import ForgotPage from "./ForgotPage";
import NewPassPage from "./NewPassPage";
import EmailCodePage from "./EmailCodePage";

// Context
import { GlobalValue } from "../../context/GlobalValue";

export interface AuthContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function AuthContainer({
  isOpen,
  onClose,
  children,
}: AuthContainerProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="homepage_auth_container">
      <div className="homepage_backdrop_bg ">
        <div className="homepage_backdrop">
          <dialog className="homepage_login_dialog" open>
            <p className="homepage_login_close">
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
