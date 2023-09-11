import React, { useState, useEffect, useContext } from "react";

import axios from "axios";

import { AuthPages } from "../AuthPages/AuthPages.tsx";
import LoadingSpinner from "../../components/LoadingSpinner";

import { useNavigate } from "react-router-dom";
import { MdDoneAll } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";

import { Product } from "../../common/CommonInterfaces";
// Global Context
import { GlobalValue } from "../../context/GlobalValue";
import { AuthContext } from "../../context/AuthContext";

// Styling
import "../../styles/ShopPage.scss";

const SearchPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState<Product[] | null>(null);

  const { userProSearch, addProductToCart } = useContext(GlobalValue);

  const { handleDelete } = useContext(AuthContext);

  const navigate = useNavigate();

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

  return (
    <div className="shop__main">
      {isLoading ? <LoadingSpinner /> : ""}

      <div className="shop__main-heading">
        <h1>Search Results</h1>
      </div>

      <AuthPages />
      <div className="shop__products-container">
        {searchData?.map((product) => (
          <div key={product.id} className="shop__products-item">
            <img
              src={`http://127.0.0.1:8000${product.image}`}
              alt={product.name}
              height={"100%"}
              width={"100%"}
            />

            <p>{product.name}</p>
            <span>
              {product.id} {typeof product.id}
            </span>
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
