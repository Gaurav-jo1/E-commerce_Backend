import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NewPassComponentProps } from "../components/ComponentsInterface";
// Styling
import "../styles/ForgotPage.scss";

const ForgotPage: React.FC<NewPassComponentProps> = ({setNewPassword, setForgotOpen}) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userCode, setUserCode] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/user_login/reset_password/", {
        user_email: userEmail,
      })
      .then(function (response) {
        console.log(response.data);
        setUserId(response.data.user_id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/user_login/reset_code/", {
        user_id: userId,
        user_code: userCode,
      })
      .then(function (response) {
        if (response.status == 200) {
          setForgotOpen(false)
          setNewPassword(true)
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="ForgotPage_container">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          title="Enter your Email Address"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <input type="submit" />
      </form>

      <form onSubmit={handleSubmitCode}>
        <input
          type="number"
          placeholder="Code"
          title="Enter your Code"
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          required
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default ForgotPage;
