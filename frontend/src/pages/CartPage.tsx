import React, { useContext } from "react";

import axios from "axios";
import { MdDelete } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { AuthPages } from "../components/Commonfun";
import { GlobalValue } from "../context/GlobalValue";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../main";

// Components
import Navbar from "../components/Navbar";
import NavPage from "../components/NavPage";
import Footer from "../components/Footer";

// Styling
import "../styles/CartPage.scss";
interface MyCart {
  id: number;
  image: string;
  name: string;
  price: number;
}

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  
  const { setLoginOpen, setSignupOpen } = useContext(GlobalValue);
  const { authTokens } = useContext(AuthContext);

  const calculateSubtotal = (products: MyCart[]): number => {
    return products.reduce((total, product) => total + product.price, 0);
  };

  const handleDelete = (product_id: number) => {
    axios
      .delete(`http://127.0.0.1:8000/cart/products/delete/${product_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then(function (response) {
        console.log(response);
        queryClient.invalidateQueries(["user_cart"]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const { isLoading, error, data: CartPageData,} = useQuery(["user_cart"], () =>
    axios
      .get("http://127.0.0.1:8000/cart/products/get/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => response.data), 
      {
        refetchOnWindowFocus: false,
      }
  );

  if (isLoading) return "Loading...";

  if (error) {
    navigate("/")

  }


  return (
    <div className="CartPage-Container">
      <AuthPages />
      <Navbar setSignupOpen={setSignupOpen} setLoginOpen={setLoginOpen} />
      <NavPage />
      <div className="CartPage_main_container-div">
        <div className="CartPage_main_container">
          {CartPageData.map((product: MyCart) => (
            <div key={product.id} className="CartPage_main_container-product">
              <div className="CartPage_main-image_name-container">
                <div className="CartPage_main_image-container">
                  <img
                    src={`http://127.0.0.1:8000${product.image}`}
                    alt={product.name}
                  />
                </div>
                <div className="CartPage_main_name-container">
                  <p>{product.name}</p>
                  <span>Lorem ipsum dolor sit amet.</span>
                  <b>$ {product.price}</b>
                </div>
              </div>
              <div className="CartPage_main-delete-container">
                <button onClick={() => handleDelete(product.id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="CartPage_grand_total-section">
          <div className="CartPage_grand_heading">
            <h1>Subtotal</h1>
            <span></span>
          </div>
          <div className="CartPage_products-container">
            {CartPageData.map((product: MyCart) => (
              <div
                key={product.id}
                className="CartPage_products_container-products"
              >
                <p>{product.name}</p>
                <b>${product.price}</b>
              </div>
            ))}
          </div>
          <div className="CartPage_products_total-price">
            <span></span>
            <p>${CartPageData && calculateSubtotal(CartPageData)}</p>
          </div>
          <div className="CartPage_products_shop-button">
            <button>Proceed to Buy &nbsp;💸</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
