import React, { useContext } from "react";
import axios from "axios";

import { useQuery,useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { AuthPages } from "../components/Commonfun";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";

// Styling
import "../styles/ProfilePage.scss"

interface MyData {
  id: number;
  picture: string;
  user: string;
}

const ProfilePage: React.FC = () => {
  const { authTokens, callLogout } = useContext(AuthContext);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { isLoading, error, data:UserProfile } = useQuery<MyData>(["user_profile"], () =>
    axios.get<MyData>("http://127.0.0.1:8000/user_profile/info/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => response.data)
  );

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    navigate("/")
  }
  
  const logUserOut = () => {
    callLogout()
    navigate("/")
    queryClient.removeQueries(["user_profile"]);
  }

  return (
    <div className="profile_page_container">
      <AuthPages />

      <main className="profile_main_container">
          <div className="profile_container_picture">
            <img src={`http://127.0.0.1:8000${UserProfile?.picture}`} alt={UserProfile?.user} />
          </div>
          <div className="profile_container_name">
            <p>{UserProfile?.user}</p>
          </div>
          <div className="profile_container_logout">
            <button onClick={logUserOut}>Logout User</button>
          </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
