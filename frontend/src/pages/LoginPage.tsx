import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import art from "../assets/login_art.jpeg";
import "../styles/Auth.scss";

interface LoginComponentProps {
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

const Loginpage: React.FC<LoginComponentProps> = ({ setSignupOpen, setLoginOpen, }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const SignupLink = () => {
     setSignupOpen(true); setLoginOpen(false);
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/user_login/api/token/", {
      username: username,
      password: password,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="LoginPage">
      <div className="Auth_login-form">
        <div className="Auth_login-text">
          <h4>Welcome back to Shoppy!</h4>
          <h4>Please sign in</h4>

          <div className="Auth_sign_in_or_up-link">
            <p>New to Shoppy? &nbsp; </p>
            <p onClick={SignupLink}>Create an account</p>
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
            type="standard" text="signin_with" logo_alignment="left" width="260px"
          />
        </div>
        <div className="Auth_login_form-divider">
          <p>or</p>
        </div>
        <div className="Auth_login-inputs">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" title="Enter you Username"
             value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" title="Enter you Password"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
            <div className="Auth_login_forgot-password">
              <p>Forgot your password?</p>
            </div>
            <button>Sign in</button>
          </form>
        </div>
      </div>

      <div className="Auth_bg_img">
        <div className="Auth_bg_img-logo"></div>
        <div className="Auth_bg_img-art">
          <img src={art} alt="art" />
        </div>
      </div>
    </div>
  );
};

export default Loginpage;