import React, { useState, useContext } from "react";
import axios from "axios";
import { GlobalValue } from "../../context/GlobalValue";
import { ForgotPassComponentProps } from "../../common/CommonInterfaces";
import { ImKey } from "react-icons/im";
import forgot_art from "../../assets/forgot_art.webp";

// Styling
import "../../styles/AuthPages_styles/ForgotPage.scss";

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
      .post("http://127.0.0.1:8000/user_login/reset_password/", {
        user_email: userEmail,
      })
      .then(function (response) {
        setUserId(response.data.user_id);

        if (response.status == 200) {
          setForgotOpen(false);
          setEmailCode(true);
          setIsLoading(false);
        }
      })
      .catch(function (error) {
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
      <div className="forgot-page-forgot-form">
        {noEmail && (
          <div className="forgot-page-email-match">
            <span>"{errorText}"</span>
          </div>
        )}
        <div className="forgot-page-container-text">
          <p>
            <ImKey />
          </p>
          <h3>Yo! Forgot your Password?</h3>
          <p>No worries! Enter your email to reset your password.</p>
        </div>
        <div className="forgot-page-container-inputs">
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

      {/* Image Container */}
      <div className="auth_bg_img">
        <div className="auth_bg_img_logo"></div>
        <div className="auth_bg_img_art" style={{ width: "460px" }}>
          <img src={forgot_art} alt="forgot_art" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPage;
