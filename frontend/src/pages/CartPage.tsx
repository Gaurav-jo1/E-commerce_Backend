import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthPages } from "../components/Commonfun";
import Navbar from "../components/Navbar";
import NavPage from "../components/NavPage";
import { GlobalValue } from "../context/GlobalValue";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const CartPage: React.FC = () => {
  const { setLoginOpen, setSignupOpen } = useContext(GlobalValue);
  const { authTokens } = useContext(AuthContext);
  
  useEffect(() => {
    const fetchCart = () => {
        axios.get("http://127.0.0.1:8000/cart/products/", {
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
    }

    fetchCart()
  },[authTokens])

  return (
    <div>
      <AuthPages />
      <Navbar setSignupOpen={setSignupOpen} setLoginOpen={setLoginOpen} />
      <NavPage />
      <h1>CartPage</h1>
      <Link to="/"> Homepage </Link>
      <Footer />
    </div>
  );
};

export default CartPage;
