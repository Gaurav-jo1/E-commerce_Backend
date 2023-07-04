import React, { useState, useContext } from "react";

// Styling
import "../../styles/AuthPages_styles/Auth.scss";

// Google Sign In
import { GoogleLogin } from "@react-oauth/google";

// Media
import login_art from "../../assets/login_art.jpeg";

// Interface and Types
import { LoginComponentProps } from "../../components/CommonInterfaces";

import axios from "axios";
import { GlobalValue } from "../../context/GlobalValue";
import { AuthContext } from "../../context/AuthContext";

const Loginpage: React.FC<LoginComponentProps> = ({
  setSignupOpen,
  setLoginOpen,
  setForgotOpen,
}) => {
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
        console.log(response.data);
        setAuthTokens(response.data);
        localStorage.setItem("authTokens", JSON.stringify(response.data));
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
    <div className="LoginPage">
      <div className="Auth_login-form">
        {passChanged ? (
          <div className="LoginPage_password-changed">
            <span>
              "Password Changed Successfully" &nbsp; <p>✅</p>{" "}
            </span>
          </div>
        ) : (
          ""
        )}
        {wrongC ? (
          <div className="LoginPage_password-wrong">
            <span>"The credentials you entered are incorrect"</span>
          </div>
        ) : (
          ""
        )}

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
            type="standard"
            text="signin_with"
            logo_alignment="left"
            width="260px"
          />
        </div>
        <div className="Auth_login_form-divider">
          <p>or</p>
        </div>
        <div className="Auth_login-inputs">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email or Username"
              title="Enter you Email or Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              title="Enter you Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="Auth_login_forgot-password">
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

      <div className="Auth_bg_img">
        <div className="Auth_bg_img-logo"></div>
        <div className="Auth_bg_img-art" style={{ width: "460px" }}>
          <img src={login_art} alt="login_art" />
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
