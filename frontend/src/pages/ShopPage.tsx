import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import NavPage from "../components/NavPage";
import { GlobalValue } from "../context/GlobalValue";
import { AuthPages } from "../components/Commonfun";
import { ShopPageProps } from "../components/CommonInterfaces";
import Footer from "../components/Footer";
import axios from "axios";
import { BsFillCartCheckFill } from "react-icons/bs";

// styling
import "../styles/ShopPage.scss";
import { AuthContext } from "../context/AuthContext";

const ShopPage: React.FC<ShopPageProps> = ({
  productData,
  mainImage,
  pageName,
}) => {
  const { setLoginOpen, setSignupOpen } = useContext(GlobalValue);
  const { authTokens } = useContext(AuthContext);

  const sortedProducts = productData.sort(
    (a, b) => a.position_id - b.position_id
  );

  const addProductToCard = (product_id:number) => {
    axios.post("http://127.0.0.1:8000/cart/products/add/", {
      product_id: product_id
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },

    })
      .then(function (response) {
        console.log("Response from Cart Page: ", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
            src={mainImage}
            alt="Mens Section "
            height={"100%"}
            width={"100%"}
          />
          <div className="ShopPage_container-main_text">
            <h1>{pageName}</h1>
          </div>
        </div>
        <div className="ShopPage_products-container">
          {sortedProducts.map((product) => (
            <div key={product.id} className="ShopPage_products_container-item">
              <div className="ShopPage_products_container-item_image">
                <img
                  src={`http://127.0.0.1:8000${product.product.image}`}
                  alt={product.product.name}
                  height={"100%"}
                  width={"100%"}
                />
              </div>
              <div className="ShopPage_products_container-item_title">
                <p>{product.product.name}</p>
              </div>

              <div className="ShopPage_products_container-item_cart">
                <button onClick={() => addProductToCard(product.product.id)}>
                  {" "}
                  <p>
                    {" "}
                    <BsFillCartCheckFill />{" "}
                  </p>
                  Add to Cart &nbsp;{" "}
                </button>
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
