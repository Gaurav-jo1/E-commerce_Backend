import React from "react";

// Components
import { AuthPages } from "../components/Commonfun";
import SaleBar from "../components/SaleBar";
import MainPage from "./MainPage";
import Footer from "../components/Footer";

// Styling
import "../styles/HomePage.scss";

const HomePage: React.FC = () => {

  return (
    <div className="homepage_div">
      <AuthPages />
      <div className="homepage_salebar_container">
        <SaleBar />
      </div>
      <div className="homepage_main_container">
        <MainPage />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
