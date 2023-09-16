import React, { useState, useContext } from "react";

import axios from "axios";

import { ImKey } from "react-icons/im";
import forgot_art from "../../assets/forgot_art.webp";

// Global Context
import { GlobalValue } from "../../context/GlobalValue";

// Styling
import "../../styles/AuthPages_styles/ForgotPage.scss";
export interface ForgotPassComponentProps {
  setForgotOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailCode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPage: React.FC<ForgotPassComponentProps> = ({
  setForgotOpen,
  setLoginOpen,
  setEmailCode,
}) => {
  const [noEmail, setNoEmail] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");

  const { userEmail, setUserEmail, setUserId } = useContext(GlobalValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post("https://shoppy-ly6w.onrender.com/user_login/reset_password/", {
        user_email: userEmail,
      })
      .then((response) => {
        setUserId(response.data.user_id);

        if (response.status == 200) {
          setForgotOpen(false);
          setEmailCode(true);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setErrorText(error.response.data.error);
        setNoEmail(true);
        setIsLoading(false);
      });
  };

  // Function for Going back to Login Page
  const GoBack = () => {
    setForgotOpen(false);
    setLoginOpen(true);
  };

  return (
    <div className="forgot-page-container">
      {/* Form Container */}
      <div className="forgot-page__forgot-form">
        {noEmail && (
          <div className="forgot-page__email-match">
            <span>"{errorText}"</span>
          </div>
        )}
        <div className="forgot-page__container-text">
          <p>
            <ImKey />
          </p>
          <h3>Yo! Forgot your Password?</h3>
          <p>No worries! Enter your email to reset your password.</p>
        </div>
        <div className="forgot-page__container-inputs">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              title="Enter your Email Address"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />

            {isLoading ? (
              <button disabled={true} type="submit">
                Sending... &nbsp;
                <span className="loading-circle"></span>
              </button>
            ) : (
              <button type="submit">Send Request</button>
            )}

            <p onClick={GoBack}>Go Back</p>
          </form>
        </div>
      </div>

      <div className="auth_bg_img">
        <div className="auth_bg_img_art" style={{ width: "460px" }}>
          <img src={forgot_art} alt="forgot_art" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPage;
