import React, { useState, useEffect, useContext } from "react";
import { AuthPages } from "../AuthPages/AuthPages.tsx";
import { GlobalValue } from "../../context/GlobalValue";
import { useNavigate } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";

import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

import LoadingSpinner from "../../components/LoadingSpinner";

import { MyProductInterface } from "../../common/CommonInterfaces";

// Styling
import "../../styles/ShopPage.scss";

const SearchPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState<MyProductInterface[] | null>(null);

  const { setLoginOpen, userProSearch } = useContext(GlobalValue);

  const { authTokens } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (userProSearch) {
      setIsLoading(true)
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
  }, [ userProSearch]); // eslint-disable-line
  
  const addProductToCard = (product_id: number) => {
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

  return (
    <div className="search_page_container">

      {isLoading ? <LoadingSpinner/> : ""}

      <AuthPages />
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
