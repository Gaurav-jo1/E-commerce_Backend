import React, { useState, useEffect, useContext } from "react";

import axios from "axios";

import { queryClient } from "../../main.tsx";
import { AuthPages } from "../AuthPages/AuthPages.tsx";
import LoadingSpinner from "../../components/LoadingSpinner";

import { useNavigate } from "react-router-dom";
import { MdDoneAll } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";

import { MyProductInterface } from "../../common/CommonInterfaces";
// Global Context
import { GlobalValue } from "../../context/GlobalValue";
import { AuthContext } from "../../context/AuthContext";

// Styling
import "../../styles/ShopPage.scss";

const SearchPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState<MyProductInterface[] | null>(
    null
  );

  const { setLoginOpen, userProSearch, CartPageData } = useContext(GlobalValue);

  const { authTokens } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (userProSearch) {
      setIsLoading(true);
      axios
        .post("http://127.0.0.1:8000/product_search/search/", {
          user_search: userProSearch,
        })
        .then(function (response) {
          setSearchData(JSON.parse(response.data));
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false); // Set isLoading to false when the request completes (success or error)
        });
    } else {
      navigate("/");
    }
  }, [userProSearch]); // eslint-disable-line

  const addProductToCart = (product_id: number) => {
    if (authTokens) {
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
    } else {
      setLoginOpen(true);
    }
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

  const Products_ids: number[] = CartPageData
    ? CartPageData.map((item) => item.id)
    : [];

  console.log(Products_ids)

  return (
    <div className="shop__main">
      {isLoading ? <LoadingSpinner /> : ""}

      <div className="shop__main-heading">
        <h1>Search Results</h1>
      </div>

      <AuthPages />
      <div className="shop__products-container">
        {searchData &&
          searchData.map((product) => (
            <div key={product.id} className="shop__products-item">
              <img
                src={`http://127.0.0.1:8000${product.image}`}
                alt={product.name}
                height={"100%"}
                width={"100%"}
              />

              <p>{product.name}</p>
              <span>{product.id}</span>
              {Products_ids.includes(product.id) ? (
                <button id="added" onClick={() => handleDelete(product.id)}>
                  <p>
                    {" "}
                    <MdDoneAll />{" "}
                  </p>
                  <span>Added to Cart &nbsp; </span>
                </button>
              ) : (
                <button id="add" onClick={() => addProductToCart(product.id)}>
                  <p>
                    {" "}
                    <BsFillCartCheckFill />{" "}
                  </p>
                  <span>Add to Cart &nbsp; </span>
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
