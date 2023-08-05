import React, { useContext, useEffect } from "react";

import axios from "axios";

import { MdDelete } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { GlobalValue } from "../context/GlobalValue";
import { AuthContext } from "../context/AuthContext";
import { queryClient } from "../main";
import { useNavigate } from "react-router-dom";

// Components
import { AuthPages } from "../components/Commonfun";
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
  const { setLoginOpen, setSignupOpen } = useContext(GlobalValue);
  const { authTokens } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if authTokens exist
    if (!authTokens) {
      // Redirect the user to the homepage
      navigate("/");
    }
  }, [authTokens, navigate]);

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

  const { isLoading, error, data: CartPageData,} = useQuery( ["user_cart"], () =>
      axios.get("http://127.0.0.1:8000/cart/products/get/", {
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
    console.log(error);
  }

  return (
    <div className="cart_page_container">
      <AuthPages />
      <Navbar setSignupOpen={setSignupOpen} setLoginOpen={setLoginOpen} />
      <NavPage />
      <div className="cart_page_main_container_div">
        <div className="cart_page_main_container">
          {CartPageData && CartPageData.map((product: MyCart) => (
            <div key={product.id} className="cart_page_product">
              <div className="cart_page_image_name_container">
                <div className="cart_page_image_container">
                  <img
                    src={`http://127.0.0.1:8000${product.image}`}
                    alt={product.name}
                  />
                </div>
                <div className="cart_page_name_container">
                  <p>{product.name}</p>
                  <span>Lorem ipsum dolor sit amet.</span>
                  <b>$ {product.price}</b>
                </div>
              </div>
              <div className="cart_page_delete_container">
                <button onClick={() => handleDelete(product.id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart_page_grand_total_section">
          <div className="cart_page_grand_heading">
            <h1>Subtotal</h1>
            <span></span>
          </div>
          <div className="cart_page_products_container">
            {CartPageData && CartPageData.map((product: MyCart) => (
              <div key={product.id} className="cart_page_products">
                <p>{product.name}</p>
                <b>${product.price}</b>
              </div>
            ))}
          </div>
          <div className="cart_page_products_total_price">
            <span></span>
            <p>${CartPageData && calculateSubtotal(CartPageData)}</p>
          </div>
          <div className="cart_page_products_shop_button">
            <button>Proceed to Buy &nbsp;💸</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
};

export default CartPage;
