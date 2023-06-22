import React, { useState, useContext } from "react";

// style
import "../../styles/AuthPages_styles/NewPassPage.scss";

// Interface and Types
import { NewPassComponentProps } from "../../components/ComponentsInterface";

// Icons
import { BsFillUnlockFill } from "react-icons/bs";

// Global Values
import { GlobalValue } from "../../context/GlobalValue";

// Media
import new_art from "../../assets/new_part.jpeg";

import axios from "axios";

const NewPassPage: React.FC<NewPassComponentProps> = ({setNewPassword,setLoginOpen}) => {
  const [newPass, setNewPass] = useState<string>("");
  const [reNewPass, setReNewPass] = useState<string>("");
  const { userEmail, userCode, userId, setUserCode, setUserEmail, setUserId } =
    useContext(GlobalValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass == reNewPass) {
      axios.post("http://127.0.0.1:8000/user_login/change_password/", {
          user_id: userId,
          user_email: userEmail,
          user_code: userCode,
          user_new_password: newPass,
          user_reEnter_password: reNewPass,
        })
        .then(function (response) {
          console.log(response);
  
          if (response.status == 200) {
            setNewPassword(false);
            setLoginOpen(true);
            setUserCode("");
            setUserEmail("");
            setUserId("");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    else {
      console.log("Password Does not Match");
    }
  };

  return (
    <div className="NewPassPage_container">
      <div className="NewPassPage_container-form">
        <div className="NewPassPage_container-text">
          <p>
            {" "}
            <BsFillUnlockFill />{" "}
          </p>
          <h3>Unlock the Possibilities</h3>
          <p>
            Please enter a new password for your email <b>{userEmail}</b>{" "}
          </p>
        </div>
        <div className="NewPassPage_container-inputs">
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Enter new Password"
              title="Enter your new Password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Re-Enter new password"
              title="Re-Enter your Password"
              value={reNewPass}
              onChange={(e) => setReNewPass(e.target.value)}
              required
            />

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      <div className="Auth_bg_img">
        <div className="Auth_bg_img-logo"></div>
        <div className="Auth_bg_img-art" style={{ width: "460px" }}>
          <img src={new_art} alt="new_art" />
        </div>
      </div>
    </div>
  );
};

export default NewPassPage;
