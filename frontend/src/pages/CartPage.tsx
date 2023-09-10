import React, { useContext, useEffect } from "react";

import axios from "axios";

import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import { queryClient } from "../main.tsx";
import { AuthPages } from "./AuthPages/AuthPages.tsx";

import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";

import empty_cart from "../assets/empty_cart.webp";

import { Product } from "../common/CommonInterfaces.ts";
// Global Context
import { AuthContext } from "../context/AuthContext";

// Styling
import "../styles/CartPage.scss";

const CartPage: React.FC = () => {
  const { authTokens } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authTokens) {
      navigate("/");
    }
  }, [authTokens, navigate]);

  const calculateSubtotal = (products: Product[]): number => {
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
      .then((response) => {
        console.log(response);
        queryClient.invalidateQueries(["user_cart"]);
      })
      .catch((error) => {
        console.log(error);
      });
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
    { enabled: !!authTokens, refetchOnWindowFocus: false }
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
                      src={`http://127.0.0.1:8000${product.image}`}
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
                <button>Proceed to Buy &nbsp;💸</button>
              </div>
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
