import React, { useContext } from "react";

import { GlobalValue } from "../context/GlobalValue";

// Components
import { AuthPages } from "../components/Commonfun";
import NavPage from "../components/NavPage";
import Navbar from "../components/Navbar";
import SaleBar from "../components/SaleBar";
import MainPage from "./MainPage";

// Styling
import "../styles/HomePage.scss";

const HomePage: React.FC = () => {
  const { setLoginOpen, setSignupOpen } = useContext(GlobalValue);

  return (
    <div className="homepage_div">
      <AuthPages />
      <div className="homepage_navbar_container">
        <Navbar setSignupOpen={setSignupOpen} setLoginOpen={setLoginOpen} />
      </div>
      <div className="homepage_navbar_container">
        <NavPage />
      </div>
      <div className="homepage_salebar_container">
        <SaleBar />
      </div>
      <div className="homepage_main_container">
        <MainPage />
      </div>
    </div>
  );
};

export default HomePage;
