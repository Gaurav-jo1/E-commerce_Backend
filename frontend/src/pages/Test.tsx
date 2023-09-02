import React, { useState } from "react";
import SaleBar from "../components/SaleBar";
import MainBG from "../assets/1.webp";
import ShoeBanner from "../assets/shoe-banner.webp";
import ShoppyLogo from "../assets/android-chrome-512x512.png";
import { Link } from "react-router-dom";

import ShoeBanner1 from "../assets/shoe_banner_R1.png"
import ShoeBanner2 from "../assets/shoe_banner_R2.png"

import { myLists } from "../components/CommonData";

const Test: React.FC = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <div className="homepage_container">
      <div className="homepage_salebar_container">
        <SaleBar />
      </div>
      {/* 1. First Component */}
      <div className="homepage_container_textbg">
        <div className="homepage_container_bg">
          <img src={MainBG} alt="Dress Background" />
        </div>
        <div className="homepage_container_text">
          <p>PREETY FOR SUMMER</p>
          <Link to="/New & Featured">
            <span>SHOP&nbsp;ALL&nbsp;NEW</span>
          </Link>
        </div>
      </div>

      {/* 2. Summer text Banner Component */}
      <div className="homepage_container_summer_text">
        <span>Summer Essentials</span>
        <h3>Chase the day</h3>
        <p>
          {" "}
          Move. Explore. Bring your boldest <br /> Get after summer's endless
          possibilities with ready-for-anything fits.{" "}
        </p>
        <Link to="/Women">
          <button>Shop</button>
        </Link>
      </div>

      {/* 3. Shop Options Component */}
      <div className="homepage_container_shop_options">
        {Object.keys(myLists).map((key) => (
          <div key={key} className="homepage_shop_image_container">
            <Link to="/Shop">
              <img
                id={`hide_img_${isHovered === key ? key : ""}`}
                className="shop_options_main_img"
                src={myLists[key].property1}
                alt={myLists[key].property1}
                onMouseEnter={() => setIsHovered(key)}
              />
              <img
                id={`show_img_${isHovered === key ? key : ""}`}
                className="shop_options_hover_img"
                src={myLists[key].property4}
                alt={myLists[key].property4}
                onMouseLeave={() => setIsHovered(null)}
              />
            </Link>
            <p>{myLists[key].property2}</p>
          </div>
        ))}
      </div>

      {/* 4. Shoe Banner Component */}
      <div className="homepage_container_shoes_banner">
        <div className="shoe_banner_logo_text_container">
          <img src={ShoppyLogo} alt="Shoppy Logo" />
          <h1> New <br /> Arrivals</h1>
        </div>
        <div className="shoe_banner_poster_container">
          <img src={ShoeBanner} alt="Shoe Banner" />
        </div>
        <div className="shoe_banner_poster_mobile">
          <img src={ShoeBanner1} alt="Shoe Banner" />
          <img src={ShoeBanner2} alt="Shoe Banner" />
        </div>
        <div className="shoe_banner_button_container">
          <Link to="/Men">
            <button>Shop Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Test;
