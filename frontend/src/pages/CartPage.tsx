import React, { useState, useContext, useEffect } from "react";

import axios from "axios";

import Footer from "../components/Footer.tsx";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import { AuthPages } from "./AuthPages/AuthPages.tsx";

import { MdDelete } from "react-icons/md";
import {RxCross1} from "react-icons/rx"
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import empty_cart from "../assets/empty_cart.webp";

import { Product } from "../common/CommonInterfaces.ts";
// Global Context
import { AuthContext } from "../context/AuthContext.tsx";

// Styling
import "../styles/CartPage.scss";

const CartPage: React.FC = () => {
  const [buyProducts, setBuyProducts] = useState<boolean>(false);
  const { authTokens, handleDelete } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authTokens) {
      navigate("/");
    }
  }, [authTokens, navigate]);

  const calculateSubtotal = (products: Product[]): number => {
    return products.reduce((total, product) => total + product.price, 0);
  };

  const {
    data: CartPageData,
    isLoading,
    error,
  } = useQuery<Product[]>(
    ["user_cart"],
    () =>
      axios
        .get("http://127.0.0.1:8000/cart/products/get/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
        })
        .then((response) => response.data),
    { enabled: false, refetchOnWindowFocus: false }
  );

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    navigate("/");
  }

  return (
    <div className="cart__container">
      <AuthPages />
      {CartPageData?.length != 0 ? (
        <div className="cart__main">
          <div className="cart__container-main">
            {CartPageData &&
              CartPageData.map((product: Product) => (
                <div key={product.id} className="cart__product">
                  <div className="cart__container-image-name">
                    <img
                      src={`http://127.0.0.1:8000/${product.image}`}
                      alt={product.name}
                    />
                    <p>{product.name}</p>
                    <span>${product.price}</span>
                  </div>
                  <button onClick={() => handleDelete(product.id)}>
                    <MdDelete />
                  </button>
                </div>
              ))}
          </div>
          <div className="cart__grand_total-section">
            <div className="cart__grand_total-container">
              <div className="cart__grand-heading">
                <h1>Subtotal</h1>
                <span></span>
              </div>
              <div className="cart__products-container">
                {CartPageData &&
                  CartPageData.map((product: Product) => (
                    <div key={product.id} className="cart__products">
                      <p>{product.name}</p>
                      <b>${product.price}</b>
                    </div>
                  ))}
              </div>
              <div className="cart__products-total-price">
                <span></span>
                <p>${CartPageData && calculateSubtotal(CartPageData)}</p>
              </div>
              <div className="cart__products-shop-button">
                <button onClick={() => setBuyProducts(true)}>Proceed to Buy &nbsp;💸</button>
              </div>
              {buyProducts && (
                <div className={`cart__products-bought ${buyProducts ? 'slide-in' : 'slide-out'}`}>
                  <p>Thanks for using Shoopy 🎉 </p>
                  <span onClick={() => setBuyProducts(false)}><RxCross1/></span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="cart__empty-message">
          <img src={empty_cart} alt="Empty Cart" width={"500px"} />
          <h1>Your cart is currently empty.</h1>
          <p>Start adding items to your cart and discover amazing products!</p>
          <button>
            <Link to="/New & Featured">Start Shopping</Link>
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CartPage;
