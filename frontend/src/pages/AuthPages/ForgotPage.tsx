import React, { useContext } from "react";
import axios from "axios";
import { ForgotPassComponentProps } from "../../components/ComponentsInterface";
import { ImKey } from "react-icons/im";
import forgot_art from "../../assets/forgot_art.jpeg";
// Styling
import "../../styles/AuthPages_styles/ForgotPage.scss";
import { GlobalValue } from "../../context/GlobalValue";

const ForgotPage: React.FC<ForgotPassComponentProps> = ({
  setForgotOpen,
  setLoginOpen,
  setRecoverCode
}) => {
  const { userEmail, setUserEmail, setUserId } = useContext(GlobalValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/user_login/reset_password/", {
        user_email: userEmail,
      })
      .then(function (response) {
        setUserId(response.data.user_id);

        if (response.status == 200) {
          setForgotOpen(false);
          setRecoverCode(true)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const GoBack = () => {
    setForgotOpen(false);
    setLoginOpen(true);
  };

  return (
    <div className="ForgotPage_container">
      <div className="ForgotPage_forgot-form">
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
            <button type="submit">Send Request</button>
            <p onClick={GoBack}>Go Back</p>
          </form>
        </div>
      </div>

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
