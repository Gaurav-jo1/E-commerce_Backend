import React from "react";
import { GoogleLogin } from "@react-oauth/google";

import axios from "axios";
import art from "../assets/login_art.jpeg";
import "../styles/LoginPage.scss";

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

const LoginPage: React.FC = () => {
  return (
    <div className="Loginpage">
      <div className="Loginpage_login-form">
        <div className="Loginpage_login-text">
          <h4>Welcome back to Shoppy!</h4>
          <h4>Please sign in</h4>

          <div className="Loginpage_signup-link">
            <p>New to Shoppy? &nbsp; </p>
            <p>Create an account</p>
          </div>
        </div>
        <div className="Loginpage_google-div">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleGoogleLogin(credentialResponse.credential);
            }}
            onError={() => {
              console.log("Login Failed");
            }} type="standard" text="continue_with" logo_alignment="left" width="260px" auto_select={false}
          />
        </div>
        <div className="Loginpage_login_form-divider">
          <p>or</p>
        </div>
        <div className="Loginpage_login-inputs">
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <div className="Loginpage_login_forgot-password">
              <p>Forgot your password?</p>
            </div>
            <button>Sign in</button>
          </form>
        </div>
      </div>

      <div className="Loginpage_bg_img">
        <div className="Loginpage_bg_img-logo"></div>
        <div className="Loginpage_bg_img-art">
          <img src={art} alt="art" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
