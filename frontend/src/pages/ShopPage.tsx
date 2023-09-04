import React, { useContext } from "react";
import { GlobalValue } from "../context/GlobalValue";
import { AuthPages } from "../common/Commonfun.tsx";
import { ShopPageProps } from "../common/CommonInterfaces";
import Footer from "../components/Footer";
import axios from "axios";
import { BsFillCartCheckFill } from "react-icons/bs";

// styling
import { AuthContext } from "../context/AuthContext";
import "../styles/ShopPage.scss";

const ShopPage: React.FC<ShopPageProps> = ({
  productData,
  mainImage,
  pageName,
}) => {
  const { setLoginOpen } = useContext(GlobalValue);
  const { authTokens } = useContext(AuthContext);

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
    <div className="shop_page_container">
      <AuthPages />
      <div className="shop_page_container_main">
        <div className="shop_page_container_main_poster">
          <img
            src={mainImage}
            alt="Mens Section"
            height={"100%"}
            width={"100%"}
          />
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
              <button onClick={() => addProductToCart(product.product.id)}>
                <p> <BsFillCartCheckFill /> </p>
                Add to Cart &nbsp;{" "}
              </button>
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
