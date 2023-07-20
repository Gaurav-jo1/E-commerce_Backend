import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import NavPage from "../components/NavPage";
import { GlobalValue } from "../context/GlobalValue";
import { AuthPages } from "../components/Commonfun";
import { ShopPageProps } from "../components/CommonInterfaces";
import Footer from "../components/Footer";

import {BsFillCartCheckFill } from "react-icons/bs";

// styling
import "../styles/ShopPage.scss";

const ShopPage: React.FC<ShopPageProps> = ({
  productData,
  MainImage,
  PageName,
}) => {
  const { setLoginOpen, setSignupOpen } = useContext(GlobalValue);

  const sortedProducts = productData.sort(
    (a, b) => a.position_id - b.position_id
  );

  return (
    <div className="ShopPage_container">
      <AuthPages />
      <div className="ShopPage_navbar-container">
        <Navbar setSignupOpen={setSignupOpen} setLoginOpen={setLoginOpen} />
      </div>
      <div className="ShopPage_navpage-container">
        <NavPage />
      </div>
      <div className="ShopPage_container-main">
        <div className="ShopPage_container-main_poster">
          <img
            src={MainImage}
            alt="Mens Section "
            height={"100%"}
            width={"100%"}
          />
          <div className="ShopPage_container-main_text">
            <h1>{PageName}</h1>
          </div>
        </div>
        <div className="ShopPage_products-container">
          {sortedProducts.map((product) => (
            <div key={product.id} className="ShopPage_products_container-item">
              <div className="ShopPage_products_container-item_image">
                <img
                  src={`http://127.0.0.1:8000${product.image}`}
                  alt={product.product}
                  height={"100%"}
                  width={"100%"}
                />
              </div>
              <div className="ShopPage_products_container-item_title">
                <p>{product.product}</p>
              </div>

              <div className="ShopPage_products_container-item_cart">
                <button> <p> <BsFillCartCheckFill /> </p>Add to Cart  &nbsp; </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ShopPage_footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default ShopPage;
