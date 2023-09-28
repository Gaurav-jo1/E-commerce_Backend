import React, { useState, useEffect, useContext } from "react";

import axios from "axios";

import { AuthPages } from "../AuthPages/AuthPages.tsx";
import LoadingSpinner from "../../components/LoadingSpinner";

import { useNavigate } from "react-router-dom";
import { MdDoneAll } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import search_empty from "../../assets/search_empty.webp";
import { Product } from "../../common/CommonInterfaces";
// Global Context
import { GlobalValue } from "../../context/GlobalValue";
import { AuthContext } from "../../context/AuthContext";

// Styling
import "../../styles/ShopPage.scss";

const SearchPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<Product[] | null>(null);
  const [searchEmpty, setSearchEmpty] = useState<boolean>(false);

  const { userProSearch, addProductToCart } = useContext(GlobalValue);

  const { handleDelete } = useContext(AuthContext);

  const navigate = useNavigate();

  console.log(searchData);

  const Products_ids: number[] = localStorage.getItem("User_products")
    ? JSON.parse(localStorage.getItem("User_products") || "")
    : [];

  useEffect(() => {
    if (userProSearch) {
      setIsLoading(true);
      axios
        .post("http://127.0.0.1:8000/product_search/search/", {
          user_search: userProSearch,
        })
        .then(function (response) {
          setSearchData(JSON.parse(response.data));
          setSearchEmpty(false);
        })
        .catch(function (error) {
          console.log(error);
          setSearchEmpty(true);
        })
        .finally(() => {
          setIsLoading(false); // Set isLoading to false when the request completes (success or error)
        });
    } else {
      navigate("/");
    }
  }, [userProSearch]); // eslint-disable-line

  console.log("Search Data: ", searchData);
  return (
    <div className="shop__main">
      {isLoading ? <LoadingSpinner /> : ""}

      <div className="shop__main-heading">
        <h1>
          Search Results For : <span>{userProSearch}</span>
        </h1>
      </div>

      <AuthPages />

      {searchData ? (
        <div className="shop__products-container">
          {searchData?.map((product) => (
            <div key={product.id} className="shop__products-item">
              <img
                src={`http://127.0.0.1:8000/${product.image}`}
                alt={product.name}
                height={"100%"}
                width={"100%"}
              />

              <p>{product.name}</p>
              <span>${product.price}</span>
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
      ) : (
        ""
      )}

      {searchEmpty && (
        <div className="shop__empty-result">
          <p>Sorry, we couldn't find any results</p>
          <img src={search_empty} alt="Search Empty" />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
