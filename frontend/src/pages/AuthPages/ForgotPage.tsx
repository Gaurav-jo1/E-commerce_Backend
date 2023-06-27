import React, { useState, useContext } from "react";

// Global values
import { GlobalValue } from "../../context/GlobalValue";

// Interface and Types
import { ForgotPassComponentProps } from "../../components/CommonInterfaces";

// React Icons
import { ImKey } from "react-icons/im";

// Media files
import forgot_art from "../../assets/forgot_art.jpeg";

// Styling
import "../../styles/AuthPages_styles/ForgotPage.scss";

import axios from "axios";

const ForgotPage: React.FC<ForgotPassComponentProps> = ({
  setForgotOpen,
  setLoginOpen,
  setEmailCode,
}) => {
  const [noEmail, setNoEmail] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");

  const { userEmail, setUserEmail, setUserId } = useContext(GlobalValue);

  // Function to Make Network request For Resetting Password
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
    <div className="ForgotPage_container">
      {/* Form Container */}
      <div className="ForgotPage_forgot-form">
        {noEmail ? (
          <div className="ForgotPage_email-match">
            <span>"{errorText}"</span>
          </div>
        ) : (
          ""
        )}
        <div className="ForgotPage_container-text">
          <p>
            {" "}
            <ImKey />{" "}
          </p>
          <h3>Yo! Forgot your Password?</h3>
          <p>No worries! Enter your email to reset your password.</p>
        </div>
        <div className="ForgotPage_container-inputs">
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
                <>
                  Sending... &nbsp;
                  <span className="loading-circle"></span>
                </>
              </button>
            ) : (
              <button type="submit">Send Request</button>
            )}

            <p onClick={GoBack}>Go Back</p>
          </form>
        </div>
      </div>

      {/* Image Container */}
      <div className="Auth_bg_img">
        <div className="Auth_bg_img-logo"></div>
        <div className="Auth_bg_img-art" style={{ width: "460px" }}>
          <img src={forgot_art} alt="forgot_art" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPage;
