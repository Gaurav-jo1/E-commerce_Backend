import React, { useState, useContext } from "react";

import axios from "axios";

import { GoogleLogin } from "@react-oauth/google";
import { LoginComponentProps } from "../../common/CommonInterfaces";
import { GlobalValue } from "../../context/GlobalValue";
import { AuthContext } from "../../context/AuthContext";

import login_art from "../../assets/login_art.webp";

// Styling
import "../../styles/AuthPages_styles/Auth.scss";

const Loginpage: React.FC<LoginComponentProps> = ({ setSignupOpen, setLoginOpen, setForgotOpen, }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [wrongC, setWrongC] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const field_state = username.includes("@") && ".com" ? true : false;

  const { passChanged } = useContext(GlobalValue);

  const { setAuthTokens } = useContext(AuthContext);

  const SignupLink = () => {
    setSignupOpen(true);
    setLoginOpen(false);
  };

  const ForgotLink = () => {
    setForgotOpen(true);
    setLoginOpen(false);
  };

  const handleGoogleLogin = (idToken?: string) => {
    axios
      .post("http://127.0.0.1:8000/google_login/google/", {
        id_token: idToken,
      })
      .then(function (response) {
        setAuthTokens(response.data);
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        setLoginOpen(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const postFunction = (field_name: string) => {
    axios
      .post("http://127.0.0.1:8000/user_login/api/token/", {
        [field_name]: username.toLowerCase(),
        password: password,
      })
      .then(function (response) {
        setIsLoading(false);
        setLoginOpen(false);
        console.log("Response from LoginPage: ", response.data);
        setAuthTokens(response.data);
        localStorage.setItem("authTokens", JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
        setWrongC(true);
        setIsLoading(false);
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (field_state) {
      postFunction("email");
    } else {
      postFunction("username");
    }
  };

  return (
    <div className="login-page">
      <div className="auth-form">
        {passChanged && (
          <div className="login-page-password-changed">
            <span>
              "Password Changed Successfully" &nbsp; <p>✅</p>{" "}
            </span>
          </div>
        )}

        {wrongC && (
          <div className="login-page-password-wrong">
            <span>"The credentials you entered are incorrect"</span>
          </div>
        )}

        <div className="auth-text">
          <h4>Welcome back to Shoppy!</h4>
          <h4>Please sign in</h4>

          <div className="auth-sign-in-or-up-link">
            <p>New to Shoppy? &nbsp; </p>
            <p onClick={SignupLink}>Create an account</p>
          </div>
        </div>
        <div className="auth-google-div">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleGoogleLogin(credentialResponse.credential);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            type="standard"
            text="signin_with"
            logo_alignment="left"
            width="260px"
          />
        </div>
        <div className="auth-form-divider">
          <p>or</p>
        </div>
        <div className="auth-inputs">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email or Username"
              title="Enter your Email or Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              title="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="auth-forgot-password">
              <p onClick={ForgotLink}>Forgot your password?</p>
            </div>

            {isLoading ? (
              <button disabled={true} type="submit">
                <>
                  Signing... &nbsp;
                  <span className="loading-circle"></span>
                </>
              </button>
            ) : (
              <button type="submit">Sign in</button>
            )}
          </form>
        </div>
      </div>

      <div className="auth_bg_img">
        <div className="auth_bg_img_logo"></div>
        <div className="auth_bg_img_art" style={{ width: "460px" }}>
          <img src={login_art} alt="login_art" />
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
