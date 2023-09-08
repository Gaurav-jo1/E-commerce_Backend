import React, { useContext, useState } from "react";
import axios from "axios";
import { GlobalValue } from "../context/GlobalValue";
import { AuthPages } from "../common/Commonfun.tsx";
import { ShopPageProps } from "../common/CommonInterfaces";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdDoneAll } from "react-icons/md";
import { queryClient } from "../main.tsx";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import { Blurhash } from "react-blurhash";

// styling
import "../styles/ShopPage.scss";

const ShopPage: React.FC<ShopPageProps> = ({
  productData,
  mainImage,
  pageName,
  imgHash
}) => {
  const { setLoginOpen, CartPageData } = useContext(GlobalValue);
  const { authTokens } = useContext(AuthContext);

  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

  const sortedProducts = productData.sort(
    (a, b) => a.position_id - b.position_id
  );

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
          console.log(response.data);
          queryClient.invalidateQueries(["user_cart"]);
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

  return (
    <div className="shop_page_container">
      <AuthPages />
      <div className="shop_page_container_main">
        <div className="shop_page_container_main_poster">
          <img
            src={mainImage}
            alt="Mens Section"
            height={"100%"}
            width={"100%"}
            onLoad={() => setIsImgLoaded(true)}
            style={{display: isImgLoaded ? "block" : "none"}}
          />

          {!isImgLoaded && (
            <Blurhash
              hash={imgHash}
              resolutionX={32}
              resolutionY={32}
              height={"470px"}
              width={"100%"}
              punch={1}
            />
          )}
          <div className="shop_page_container_main_text">
            <h1>{pageName}</h1>
          </div>
        </div>
        <div className="shop_page_products_container">
          {sortedProducts.map((product) => (
            <div key={product.id} className="shop_page_products_container_item">
              <img
                src={`http://127.0.0.1:8000${product.product.image}`}
                alt={product.product.name}
                height={"100%"}
                width={"100%"}
              />
              <p>{product.product.name}</p>
              <span>${product.product.price}</span>
              {Products_ids.includes(product.id) ? (
                <button
                  id="added"
                  onClick={() => handleDelete(product.product.id)}
                >
                  <p>
                    {" "}
                    <MdDoneAll />{" "}
                  </p>
                  <span>Added to Cart &nbsp; </span>
                </button>
              ) : (
                <button
                  id="add"
                  onClick={() => addProductToCart(product.product.id)}
                >
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

      <div className="shop_page_footer_container">
        <Footer />
      </div>
    </div>
  );
};

export default ShopPage;
