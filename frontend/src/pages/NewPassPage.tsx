import React, { useState } from "react";

// style
import "../styles/NewPassPage.scss";
import axios from "axios";

const NewPassPage: React.FC = () => {
  const [newPass, setNewPass] = useState<string>("");
  const [reNewPass, setReNewPass] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/user_login/reset_password/", {
        user_new_password: newPass,
        user_reEnter_password: reNewPass,
      })
      .then(function (response) {
        console.log(response.status);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="NewPassPage_container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter new Password"
          title="Enter your new Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Re-Enter new password"
          title="Re-Enter your Password"
          value={reNewPass}
          onChange={(e) => setReNewPass(e.target.value)}
          required
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default NewPassPage;
