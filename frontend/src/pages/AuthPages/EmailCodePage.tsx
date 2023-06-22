import React, {useState, useContext } from "react";

// Styling
import "../../styles/AuthPages_styles/EmailCodePage.scss";

// Icons
import { MdMarkEmailUnread } from "react-icons/md";

// Global Values
import { GlobalValue } from "../../context/GlobalValue";

// Interface and Types
import { EmailCodeComponentProps } from "../../components/ComponentsInterface";

// Media
import code_art from "../../assets/code_art.jpeg";

import axios from "axios";

const RecoverCodePage: React.FC<EmailCodeComponentProps> = ({ setNewPassword, setEmailCode,}) => {

  const [noCode, setNoCode] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");

  const { userCode, userId, setUserCode, userEmail } = useContext(GlobalValue);

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)

    axios.post("http://127.0.0.1:8000/user_login/reset_code/", {
        user_id: userId,
        user_code: userCode,
      })
      .then(function (response) {
        if (response.status == 200) {
          setEmailCode(false);
          setNewPassword(true);
          setIsLoading(false)
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error)
        setErrorText(error.response.data.error);
        setNoCode(true);
        setIsLoading(false);
      });
  };

  return (
    <div className="Emailcode-container">

      {/* Form Container */}
      <div className="Emailcode_recover-form">
        {noCode ? (
            <div className="Emailcode_recover-match">
              <span>"{errorText}"</span>
            </div>
          ) : (
            ""
          )}
        <div className="Emailcode_container-text">
          <p> <MdMarkEmailUnread /> </p>
          <h3>Password Recovery</h3>
          <p> Please check your email <b>{userEmail}</b> for a verification code
            and enter it below to recover your account. </p>
        </div>
        <form onSubmit={handleSubmitCode}>
          <input type="number" placeholder="Enter Recovery Code" title="Enter your Code" 
            value={userCode} onChange={(e) => setUserCode(e.target.value)} required />

            {isLoading ? (
              <button disabled={true} type="submit">
                <>
                  Submitting... &nbsp;
                  <span className="loading-circle"></span>
                </>
              </button>
            ) : (
              <button type="submit">Submit</button>
            )}
        </form>
      </div>

      {/* Image Container */}
      <div className="Auth_bg_img">
        <div className="Auth_bg_img-logo"></div>
        <div className="Auth_bg_img-art" style={{ width: "460px" }}>
          <img src={code_art} alt="forgot_art" />
        </div>
      </div>
    </div>
  );
};

export default RecoverCodePage;
