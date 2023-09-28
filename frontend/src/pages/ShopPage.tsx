import React, { useContext, useState } from "react";

import Footer from "../components/Footer.tsx";
import { AuthPages } from "./AuthPages/AuthPages.tsx";

import { Blurhash } from "react-blurhash";
import { MdDoneAll } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";

import { ShopPageProps } from "../common/CommonInterfaces";
// Global Context
import { AuthContext } from "../context/AuthContext";
import { GlobalValue } from "../context/GlobalValue";

// styling
import "../styles/ShopPage.scss";

const ShopPage: React.FC<ShopPageProps> = ({
  productData,
  mainImage,
  pageName,
  imgHash,
}) => {
  const { addProductToCart } = useContext(GlobalValue);
  const { handleDelete } = useContext(AuthContext);

  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

  const sortedProducts = productData.sort(
    (a, b) => a.position_id - b.position_id
  );

  const Products_ids: number[] = localStorage.getItem("User_products")
  ? JSON.parse(localStorage.getItem("User_products") || "")
  : []

  return (
    <div className="shop">
      <AuthPages />
      <div className="shop__main">
        <div className="shop__main-poster">
          <img
            src={mainImage}
            alt="Mens Section"
            onLoad={() => setIsImgLoaded(true)}
            style={{ display: isImgLoaded ? "block" : "none" }}
          />

          {!isImgLoaded && (
            <Blurhash
              hash={imgHash}
              resolutionX={32}
              resolutionY={32}
              height={"100%"}
              width={"100%"}
              punch={1}
            />
          )}
          <div className="shop__main-text">
            <h1>{pageName}</h1>
          </div>
        </div>
        <div className="shop__products-container">
          {sortedProducts.map((product) => (
            <div key={product.id} className="shop__products-item">
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
        <Footer />
      </div>
    </div>
  );
};

export default ShopPage;
