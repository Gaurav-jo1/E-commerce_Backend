import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import art2 from "../assets/art2.jpeg";
import axios from "axios";
import "../styles/Auth.scss";

interface SignupComponentProps {
  setSignupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function handleGoogleLogin(idToken?: string) {
  axios
    .post("http://127.0.0.1:8000/google_login/google/", {
      id_token: idToken,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

const SignupPage: React.FC<SignupComponentProps> = ({setSignupOpen,setLoginOpen}) => {
  const SigninLink = () => {
    setSignupOpen(false);
    setLoginOpen(true)
  }
  return (
    <div className="SignupPage">
      <div className="Auth_login-form">
        <div className="Auth_login-text">
          <h4>Sign up with Shoppy for free</h4>
          <div className="Auth_sign_in_or_up-link">
            <p>Already have an account?&nbsp; </p>
            <p onClick={SigninLink}>Sign in</p>
          </div>
        </div>
        <div className="Auth_google-div">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleGoogleLogin(credentialResponse.credential);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            type="standard"
            text="continue_with"
            logo_alignment="left"
            width="260px"
          />
        </div>
        <div className="Auth_login_form-divider">
          <p>or</p>
        </div>
        <div className="Auth_login-inputs">
          <form>
            <input
              type="email"
              placeholder="Enter your Email Address"
              required
            />
            <input type="text" placeholder="Username" required />
            <input type="password" placeholder="Password" required />
            <div className="Auth_login_forgot-password"></div>
            <button>Sign up</button>
          </form>
        </div>
      </div>

      <div className="Auth_bg_img">
        <div className="Auth_bg_img-logo"></div>
        <div className="Auth_bg_img-art">
          <img src={art2} alt="art" />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
