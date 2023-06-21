import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import login_art from "../../assets/login_art.jpeg";
import "../../styles/AuthPages_styles/Auth.scss";
import { LoginComponentProps } from "../../components/ComponentsInterface";

function handleGoogleLogin(idToken?: string) {
  axios
    .post("http://127.0.0.1:8000/google_login/google/", {
      id_token: idToken,
    })
    .then(function (response) {
      console.log(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

const Loginpage: React.FC<LoginComponentProps> = ({ setSignupOpen, setLoginOpen, setForgotOpen}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const SignupLink = () => {
     setSignupOpen(true); setLoginOpen(false);
    };

  const ForgotLink = () => {
      setForgotOpen(true); setLoginOpen(false);
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/user_login/api/token/", {
      username: username, password: password,
    })
    .then(function (response) {
      console.log("Response from LoginPage: ",response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));
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
              <p onClick={ForgotLink}>Forgot your password?</p>
            </div>
            <button>Sign in</button>
          </form>
        </div>
      </div>

      <div className="Auth_bg_img">
        <div className="Auth_bg_img-logo"></div>
        <div className="Auth_bg_img-art" style={{width:"460px"}} >
          <img src={login_art} alt="login_art"/>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;