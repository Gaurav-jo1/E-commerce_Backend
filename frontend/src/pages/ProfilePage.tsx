import React, { useContext } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { MyUserInterface } from "../common/CommonInterfaces";
interface ProfilePageInterface {
  setUserData: React.Dispatch<React.SetStateAction<MyUserInterface | null>>;
  setProfilePage: React.Dispatch<React.SetStateAction<boolean>>;
}

// Global Context
import { AuthContext } from "../context/AuthContext";

// Styling
import "../styles/ProfilePage.scss";

const ProfilePage: React.FC<ProfilePageInterface> = ({
  setUserData,
  setProfilePage,
}) => {
  const { authTokens, callLogout } = useContext(AuthContext);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data: UserProfile, error } = useQuery<MyUserInterface>(
    ["user_profile"],
    () =>
      axios
        .get<MyUserInterface>("https://shoppy-ly6w.onrender.com/user_profile/info/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
        })
        .then((response) => response.data)
  );

  if (error) {
    navigate("/");
  }

  const logUserOut = () => {
    callLogout();
    navigate("/");
    setProfilePage(false);
    setUserData(null);
    queryClient.removeQueries(["user_profile"]);
  };

  return (
    <>
      <div className="profile" onClick={() => setProfilePage(false)} />
      <section className="profile__container">
        <main>
          <div className="profile__container-picture">
            <img
              src={`https://shoppy-ly6w.onrender.com${UserProfile?.picture}`}
              alt={UserProfile?.user}
            />
          </div>
          <div className="profile__container-name">
            <p>{UserProfile?.user}</p>
          </div>
        </main>
        <div className="profile__container-logout">
          <button onClick={logUserOut}>Logout User</button>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
