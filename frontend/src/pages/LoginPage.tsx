import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
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

const LoginPage: React.FC = () => {
  return (
    <div>
      <div>
        <GoogleLogin onSuccess={(credentialResponse) => {
            handleGoogleLogin(credentialResponse.credential);
          }}
          onError={() => {
            console.log("Login Failed");
          }} useOneTap
        />
      </div>
      <h1>LoginPage</h1>
      <Link to="/">Home Page</Link>
    </div>
  );
};

export default LoginPage;
