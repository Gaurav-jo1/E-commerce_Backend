import React, { useState, useEffect, useContext } from "react";
import { AuthPages } from "../../components/Commonfun";
import Navbar from "../../components/Navbar";
import NavPage from "../../components/NavPage";
import { GlobalValue } from "../../context/GlobalValue";
import { useNavigate } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";

import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

import "../../styles/ShopPage.scss"

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

const SearchPage: React.FC = () => {
  const [searchData, setSearchData] = useState<Product[] | null>(null);

  const { setLoginOpen, setSignupOpen, userProSearch } =
    useContext(GlobalValue);

  const { authTokens } = useContext(AuthContext);

  const navigate = useNavigate()

  useEffect(() => {
    if (userProSearch) {
      axios
        .post("http://127.0.0.1:8000/product_search/search/", {
          user_search: userProSearch,
        })
        .then(function (response) {
          setSearchData(JSON.parse(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    else {
      navigate("/")
    }
  }, [navigate, userProSearch]);

  const addProductToCard = (product_id: number) => {
    axios
      .post(
        "http://127.0.0.1:8000/cart/products/add/",
        {
          product_id: product_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
        }
      )
      .then(function (response) {
        console.log("Response from Cart Page: ", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="search_page_container">
      <AuthPages />
      <Navbar setSignupOpen={setSignupOpen} setLoginOpen={setLoginOpen} />
      <NavPage />
      <div className="shop_page_products_container">
        {searchData &&
          searchData.map((product) => (
            <div key={product.id} className="shop_page_products_container_item">
              <div className="shop_page_products_container_item_image">
                <img
                  src={`http://127.0.0.1:8000${product.image}`}
                  alt={product.name}
                  height={"100%"}
                  width={"100%"}
                />
              </div>

              <div className="shop_page_products_container_item_title">
                <p>{product.name}</p>
              </div>

              <div className="shop_page_products_container_item_cart">
                <button onClick={() => addProductToCard(product.id)}>
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
  );
};

export default SearchPage;
