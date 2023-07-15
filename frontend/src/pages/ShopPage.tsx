import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import NavPage from "../components/NavPage";
import { GlobalValue } from "../context/GlobalValue";
import { AuthPages } from "../components/Commonfun";
import MensPoster from "../assets/mensPoster.png";
import WomensPoster from "../assets/womenPoster.png";
import ChildPoster from "../assets/childPoster.png"
import NewFeature from "../assets/NewFeature.png"
import SalePoster from "../assets/salePoster.png"

// styling
import "../styles/ShopPage.scss";

const ShopPage: React.FC = () => {
  const { setLoginOpen, setSignupOpen, navValue } = useContext(GlobalValue);

  return (
    <div className="ShopPage_container">
      <AuthPages />
      <div className="ShopPage_navbar-container">
        <Navbar setSignupOpen={setSignupOpen} setLoginOpen={setLoginOpen} />
      </div>
      <div className="ShopPage_navpage-container">
        <NavPage />
      </div>
      {navValue == "New & Featured" && (
        <div className="ShopPage_container-main">
          <img src={NewFeature} alt="Mens Section " />
        </div>
      )}
      {navValue == "Men" && (
        <div className="ShopPage_container-main">
          <img src={MensPoster} alt="Mens Section " />
        </div>
      )}
      {navValue == "Women" && (
        <div className="ShopPage_container-main">
          <img src={WomensPoster} alt="Mens Section " />
        </div>
      )}
      {navValue == "Kids" && (
        <div className="ShopPage_container-main">
          <img src={ChildPoster} alt="Mens Section " />
        </div>
      )}
      {navValue == "Sale" && (
        <div className="ShopPage_container-main">
          <img src={SalePoster} alt="Mens Section " />
        </div>
      )}
    </div>
  );
};

export default ShopPage;
