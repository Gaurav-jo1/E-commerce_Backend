import React, { useContext } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { AuthPages } from "../components/Commonfun";
import Navbar from "../components/Navbar";
import NavPage from "../components/NavPage";
import { GlobalValue } from "../context/GlobalValue";
import Footer from "../components/Footer";
import { redirect } from "react-router-dom";

interface MyData {
  id: number;
  user: string;
}

const ProfilePage: React.FC = () => {
  const { authTokens } = useContext(AuthContext);
  const { setLoginOpen, setSignupOpen } = useContext(GlobalValue);


  const { isLoading, error, data } = useQuery<MyData>(["user_profile"], () =>
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

  if (error) {
    redirect("/");
  }

  return (
    <div>
      <AuthPages />
      <Navbar setSignupOpen={setSignupOpen} setLoginOpen={setLoginOpen} />
      <NavPage />
      <h1>Profile Page</h1>
      <Link to="/">Home Page</Link>
      <p>
        {" "}
        <b>Username:</b> {data?.user}
      </p>
      <Footer />
    </div>
  );
};

export default ProfilePage;
