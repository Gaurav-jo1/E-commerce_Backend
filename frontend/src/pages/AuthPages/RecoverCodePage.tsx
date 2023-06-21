import React, { useContext } from "react";
import axios from "axios";
import { GlobalValue } from "../../context/GlobalValue";
import { RecoverCodePassComponentProps } from "../../components/ComponentsInterface";

import "../../styles/AuthPages_styles/RecoverCodePage.scss";

const RecoverCodePage: React.FC<RecoverCodePassComponentProps> = ({setForgotOpen, setNewPassword}) => {
  const {  userCode, userId, setUserCode } = useContext(GlobalValue);

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/user_login/reset_code/", {
        user_id: userId,
        user_code: userCode,
      })
      .then(function (response) {
        if (response.status == 200) {
          setForgotOpen(false);
          setNewPassword(true);
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="RecoverPage-container">
      <div className="RecoverPage_recover-form">
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
    </div>
  );
};

export default RecoverCodePage;
