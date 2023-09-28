import React, { useState, useContext } from "react";

import axios from "axios";

import { BsFillUnlockFill } from "react-icons/bs";
import new_art from "../../assets/new_part.webp";
import { Blurhash } from "react-blurhash";
// Global Values
import { GlobalValue } from "../../context/GlobalValue";

// Styling
import "../../styles/AuthPages_styles/NewPassPage.scss";

interface NewPassComponentProps {
  setNewPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewPassPage: React.FC<NewPassComponentProps> = ({
  setNewPassword,
  setLoginOpen,
}) => {
  const [newPass, setNewPass] = useState<string>("");
  const [reNewPass, setReNewPass] = useState<string>("");
  const [passNot, setPassNot] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageLoad, setImageLoad] = useState<boolean>(false);

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
        .then((response) => {
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
        .catch((error) => {
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
    <div className="new-pass">
      <div className="new-pass__form">
        {passNot && (
          <div className="new-pass__password-match">
            <span>"The password you entered does not match"</span>
          </div>
        )}

        <div className="new-pass__text">
          <p>
            <BsFillUnlockFill />
          </p>
          <h3>Unlock the Possibilities</h3>
          <p>
            Please enter a new password for your email <b>{userEmail}</b>
          </p>
        </div>
        <div className="new-pass__inputs">
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
          <img src={new_art} alt="new_art" 
            style={{ display: imageLoad ? "block" : "none" }}
            onLoad={() => setImageLoad(true)}
          />
          {!imageLoad && (
            <Blurhash
              hash={"EHHVO,P_I9%#05H@0HER9sVg.5w]"}
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

export default NewPassPage;
