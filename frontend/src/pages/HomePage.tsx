import React, { useContext } from "react";
// Styling
import "../styles/HomePage.scss";

// Components
import NavPage from "../components/NavPage";
import Navbar from "../components/Navbar";
import SaleBar from "../components/SaleBar";

// Function
import { AuthPages } from "../components/Commonfun";

// Pages

import MainPage from "./MainPage";
import { GlobalValue } from "../context/GlobalValue";

// Interfaces and Types

const HomePage: React.FC = () => {
  const { setLoginOpen, setSignupOpen } = useContext(GlobalValue);

  return (
    <div className="Homepage_div">
      <AuthPages />
      <div className="HomePage_navbar-container">
        <Navbar setSignupOpen={setSignupOpen} setLoginOpen={setLoginOpen} />
      </div>
      <div className="HomePage_navbar-container">
        <NavPage />
      </div>
      <div className="HomePage_salebar-container">
        <SaleBar />
      </div>
      <div className="HomePage_main-container">
        <MainPage />
      </div>
    </div>
  );
};

export default HomePage;
