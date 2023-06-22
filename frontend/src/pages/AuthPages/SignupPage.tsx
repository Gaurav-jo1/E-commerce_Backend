import React, {useState} from "react";

// Styling
import "../../styles/AuthPages_styles/Auth.scss";

// Google Sign Up
import { GoogleLogin } from "@react-oauth/google";

// Interface and Types
import { SignComponentProps } from "../../components/ComponentsInterface";

// Media
import signup_art from "../../assets/signup_art.jpeg";

import axios from "axios";

function handleGoogleLogin(idToken?: string) {
  axios.post("http://127.0.0.1:8000/google_login/google/", {
      id_token: idToken,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

const SignupPage: React.FC<SignComponentProps> = ({setSignupOpen,setLoginOpen}) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [wrongC, setWrongC] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const SigninLink = () => {
    setSignupOpen(false); setLoginOpen(true);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    axios.post("http://127.0.0.1:8000/user_login/register/", {
      username: username,
      email: email,
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
    <div className="SignupPage">

      {/* Form Container */}
      <div className="Auth_login-form">
        <div className="Auth_login-text">
          <h4>Sign up with Shoppy for free</h4>
          <div className="Auth_sign_in_or_up-link">
            <p>Already have an account?&nbsp; </p>
            <p onClick={SigninLink}>Sign in</p>
          </div>
        </div>
        <div className="Auth_google-div">
          <GoogleLogin onSuccess={(credentialResponse) => {
              handleGoogleLogin(credentialResponse.credential);
            }}
            onError={() => { console.log("Login Failed"); }}
            type="standard" text="continue_with" logo_alignment="left"
            width="260px" />
        </div>
        <div className="Auth_login_form-divider">
          <p>or</p>
        </div>
        <div className="Auth_login-inputs">
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" title="Enter your Email Address"
            value={email} onChange={(e) => setEmail(e.target.value)} required/>

            <input type="text" placeholder="Username" title="Enter you Username"
            value={username} onChange={(e) => setUsername(e.target.value)} required />

            <input type="password" placeholder="Password" title="Enter you Password"
            value={password} onChange={(e) => setPassword(e.target.value)} required/>

            <div className="Auth_login_forgot-password"></div>

            {isLoading ? (
              <button disabled={true} type="submit">
                <>
                  Creating... &nbsp;
                  <span className="loading-circle"></span>
                </>
              </button>
            ) : (
              <button type="submit">Sign up</button>
            )}
          </form>
        </div>
      </div>

      {/* Image Container */}
      <div className="Auth_bg_img">
        <div className="Auth_bg_img-logo"></div>
        <div className="Auth_bg_img-art">
          <img src={signup_art} alt="signup_art" style={{width:"460px"}} />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
