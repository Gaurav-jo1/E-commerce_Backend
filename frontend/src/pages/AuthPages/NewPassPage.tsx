import React, { useState, useContext } from "react";

// Interface and Types
import { NewPassComponentProps } from "../../components/CommonInterfaces";

// Icons
import { BsFillUnlockFill } from "react-icons/bs";

// Global Values
import { GlobalValue } from "../../context/GlobalValue";

// Media
import new_art from "../../assets/new_part.webp";

import axios from "axios";

import "../../styles/AuthPages_styles/NewPassPage.scss";

const NewPassPage: React.FC<NewPassComponentProps> = ({
  setNewPassword,
  setLoginOpen,
}) => {
  const [newPass, setNewPass] = useState<string>("");
  const [reNewPass, setReNewPass] = useState<string>("");
  const [passNot, setPassNot] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    userEmail,
    userCode,
    userId,
    setUserCode,
    setUserEmail,
    setUserId,
    setPassChanged,
  } = useContext(GlobalValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (newPass == reNewPass) {
      axios
        .post("http://127.0.0.1:8000/user_login/change_password/", {
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
            setPassChanged(true);
            setUserCode("");
            setUserEmail("");
            setUserId("");
            setIsLoading(false);
          }
        })
        .catch(function (error) {
          if (error.response.status == 404) {
            setPassNot(true);
            setIsLoading(false);
          }
          setIsLoading(false);
        });
    } else {
      setPassNot(true);
      setIsLoading(false);

      console.log("Password Does not Match");
    }
  };

  return (
    <div className="new_pass_page_container">
      <div className="new_pass_page_container_form">
        {passNot && (
          <div className="new_pass_page_password_match">
            <span>"The password you entered does not match"</span>
          </div>
        )}

        <div className="new_pass_page_container_text">
          <p>
            <BsFillUnlockFill />
          </p>
          <h3>Unlock the Possibilities</h3>
          <p>
            Please enter a new password for your email <b>{userEmail}</b>
          </p>
        </div>
        <div className="new_pass_page_container_inputs">
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

            {isLoading ? (
              <button disabled={true} type="submit">
                <>
                  Sending... &nbsp;
                  <span className="loading_circle"></span>
                </>
              </button>
            ) : (
              <button type="submit">Send Request</button>
            )}
          </form>
        </div>
      </div>

      <div className="auth_bg_img">
        <div className="auth_bg_img_logo"></div>
        <div className="auth_bg_img_art" style={{ width: "460px" }}>
          <img src={new_art} alt="new_art" />
        </div>
      </div>
    </div>
  );
};

export default NewPassPage;
