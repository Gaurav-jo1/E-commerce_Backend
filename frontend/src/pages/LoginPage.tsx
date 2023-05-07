import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const handleGoogleLogin = async (idToken: string | undefined) => {
      const response = await axios.post('http://127.0.0.1:8000/google_login/google/', { id_token: idToken });
      // const accessToken = response.data.access_token;
      console.log(response.data)

      // Store the access token in local storage or a cookie
      // localStorage.setItem('access_token', accessToken);

      // // Set the Authorization header for all subsequent requests
      // axios.defaults.headers.common
}

const LoginPage: React.FC = () => {
  return (
    <div>
      <div>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            // console.log(credentialResponse.credential);
            handleGoogleLogin(credentialResponse.credential)
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap/>
      </div>
      <h1>LoginPage</h1>
      <Link to="/">Home Page</Link>
    </div>
  );
};

export default LoginPage;
