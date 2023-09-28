import React, { useState, useContext } from "react";

import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { Blurhash } from "react-blurhash";
import signup_art from "../../assets/signup_art.webp";

// Global Context
import { AuthContext } from "../../context/AuthContext";
// Styling
import "../../styles/AuthPages_styles/Auth.scss";

interface SignComponentProps {
  setSignupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupPage: React.FC<SignComponentProps> = ({
  setSignupOpen,
  setLoginOpen,
}) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorText, setErrorText] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageLoad, setImageLoad] = useState<boolean>(false);

  const { setAuthTokens } = useContext(AuthContext);

  const SigninLink = () => {
    setSignupOpen(false);
    setLoginOpen(true);
  };

  const handleGoogleLogin = (idToken?: string) => {
    axios
      .post("http://127.0.0.1:8000/google_login/google/", {
        id_token: idToken,
      })
      .then((response) => {
        console.log("User Created");
        setAuthTokens(response.data);
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        setSignupOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("http://127.0.0.1:8000/user_login/register/", {
        username: username.toLowerCase(),
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);

        if (response.status == 200) {
          console.log("User Created");
          setAuthTokens(response.data);
          localStorage.setItem("authTokens", JSON.stringify(response.data));
          setSignupOpen(false);
        }
      })
      .catch((error) => {
        setErrorText(error.response.data.error);
        setIsLoading(false);
      });
  };

  return (
    <div className="signup-page">
      {/* Form Container */}
      <div className="auth-form">
        {errorText && (
          <div className="signup-page__password-wrong">
            <span>"{errorText}"</span>
          </div>
        )}
        <div className="auth-form__text">
          <h4>Sign up with Shoppy for free</h4>
          <div className="auth-form__auth-link">
            <p>Already have an account?&nbsp; </p>
            <p onClick={SigninLink}>Sign in</p>
          </div>
        </div>
        <div className="auth-form__google-div">
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
        <div className="auth-form__divider">
          <p>or</p>
        </div>
        <div className="auth-form__inputs">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              title="Enter your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              title="Enter your Username"
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

            <div className="auth-form__forgot-password"></div>

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
      <div className="auth_bg_img">
        <div className="auth_bg_img_logo"></div>
        <div className="auth_bg_img_art" style={{ width: "460px" }}>
          <img
            src={signup_art}
            alt="signup_art"
            style={{ display: imageLoad ? "block" : "none" }}
            onLoad={() => setImageLoad(true)}
          />
          {!imageLoad && (
            <Blurhash
              hash={
                "oWIg[O?F${~oXlSvM|E+%fVZRQspKhSeIWD+xZsVE7-T%KS#SdNHXSjZMzWDniahNHoexYWCWqjZ"
              }
              resolutionX={32}
              resolutionY={32}
              height={"100%"}
              width={"100%"}
              punch={1}
              className="blur_hash_div"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
