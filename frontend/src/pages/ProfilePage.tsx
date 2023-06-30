import React, { useContext } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";

interface MyData {
  id: number;
  username: string;
  email: string;
}

const ProfilePage: React.FC = () => {
  const { authTokens } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery<MyData, Error>(["data"], () =>
    axios
      .get<MyData>("http://127.0.0.1:8000/user_profile/info/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => response.data)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error;

  console.log(authTokens);

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Username: {data?.username}</p>
      <p>Email: {data?.email}</p>
    </div>
  );
};

export default ProfilePage;
