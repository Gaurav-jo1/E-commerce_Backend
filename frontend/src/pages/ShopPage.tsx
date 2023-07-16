import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import NavPage from "../components/NavPage";
import { GlobalValue } from "../context/GlobalValue";
import { AuthPages } from "../components/Commonfun";
import MensPoster from "../assets/mensPoster.png";
import WomensPoster from "../assets/womenPoster.png";
import ChildPoster from "../assets/childPoster.png";
import NewFeature from "../assets/NewFeature.png";
import SalePoster from "../assets/salePoster.png";
import Footer from "../components/Footer";

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
          <img src={NewFeature} alt="Mens Section " height={"100%"} width={"100%"} />
          <div className="ShopPage_container-main_text">
            <h1>New & Featured</h1>
          </div>
        </div>
      )}
      {navValue == "Men" && (
        <div className="ShopPage_container-main">
          <img src={MensPoster} alt="Mens Section " height={"100%"} width={"100%"} />
          <div className="ShopPage_container-main_text">
            <h1>Men</h1>
          </div>
        </div>
      )}
      {navValue == "Women" && (
        <div className="ShopPage_container-main">
          <img src={WomensPoster} alt="Mens Section " height={"100%"} width={"100%"} />
          <div className="ShopPage_container-main_text">
            <h1>Women</h1>
          </div>
        </div>
      )}
      {navValue == "Kids" ||  navValue == "Kid"  ? (
        <div className="ShopPage_container-main">
          <img src={ChildPoster} alt="Mens Section " height={"100%"} width={"100%"} />
          <div className="ShopPage_container-main_text">
            <h1>Kids</h1>
          </div>
        </div>
      ) : ""}
      {navValue == "Sale" && (
        <div className="ShopPage_container-main">
          <img src={SalePoster} alt="Mens Section " height={"100%"} width={"100%"} />
          <div className="ShopPage_container-main_text">
            <h1>Sale</h1>
          </div>
        </div>
      )}

      <div className="ShopPage_footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default ShopPage;
