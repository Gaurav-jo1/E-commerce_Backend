import React, { useState } from "react";

// Assests
import MainBG from "../assets/1.webp";

// Styling
import "../styles/MainPage.scss";

// Media
import MainImage1 from "../assets/11.webp";
import MainImage2 from "../assets/41.webp";
import MainImage3 from "../assets/21.webp";
import MainImage4 from "../assets/31.webp";

import HoverImage1 from "../assets/12.webp";
import HoverImage2 from "../assets/42.webp";
import HoverImage3 from "../assets/22.webp";
import HoverImage4 from "../assets/32.webp";

import ImageCard1 from "../assets/card1.webp";
import ImageCard2 from "../assets/card2.webp";

import ShoeBanner from "../assets/shoe_banner.png";

import ShoppyLogo from "../assets/android-chrome-512x512.png";

// Interface
interface ShopImages {
  [key: string]: {
    property1: string;
    property2: string;
    property3: number;
    property4: string;
  };
}

interface CardImages {
  [card: string]: {
    property1: string;
    property2: string;
    property3: string;
    property4: string;
  };
}

const myLists: ShopImages = {
  keys1: {
    property1: MainImage1,
    property2: "Bohemian Sun Crochet Knit Halter Mini Dress",
    property3: 52.0,
    property4: HoverImage1,
  },
  keys2: {
    property1: MainImage2,
    property2: "Iconic Edge Ribbed Henley Cropped Tank",
    property3: 29.99,
    property4: HoverImage2,
  },
  keys3: {
    property1: MainImage3,
    property2: "Better Than Classic Distressed Denim Shorts",
    property3: 38.0,
    property4: HoverImage3,
  },
  keys4: {
    property1: MainImage4,
    property2: "Bringing The Vibes Distressed Denim Shorts",
    property3: 38.0,
    property4: HoverImage4,
  },
};

const myCards: CardImages = {
  card1: {
    property1: ImageCard1,
    property2: "App Drops",
    property3: "Nike Dunk Low",
    property4: "Get it First",
  },
  card2: {
    property1: ImageCard2,
    property2: "Trending: That 90's vibe with the Nike Air Max 90 Futura",
    property3: "Stylin' Up With Wasu",
    property4: "Read Now",
  },
};

const MainPage: React.FC = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  console.log("isHovered", isHovered);

  return (
    <div className="Maincontent_container">
      {/* 1. First Component */}
      <div className="Maincontent_container-textbg">
        <div className="Maincontent_container-bg">
          <img
            src={MainBG}
            alt="Dress Background"
            height={"100%"}
            width={"100%"}
          />
        </div>
        <div className="Maincontent_container-text">
          <p>PREETY FOR SUMMER</p>
          <span>SHOP&nbsp;ALL&nbsp;NEW</span>
        </div>
      </div>
      
      {/* 2. Summer text Banner Component */}
      <div className="Maincontent_container-summer_text">
        <span>Summer Essentials</span>
        <h3>Chase the day</h3>

        <p>
          {" "}
          Move. Explore. Bring your boldest <br /> Get after summer's endless
          possibilities with ready-for-anything fits.{" "}
        </p>
        <button>Shop</button>
      </div>

      {/* 3. Shop Options Component */}
      <div className="Maincontent_container_shop-options">
        {Object.keys(myLists).map((key) => (
          <div key={key} className="Maincontent_shop_image-container">
            <img
              id={`hide_img-${isHovered == key ? key : ""}`}
              className="Shop-options_main-img"
              src={myLists[key].property1}
              alt={myLists[key].property1}
              onMouseEnter={() => setIsHovered(key)}
            />
            <img
              id={`show_img-${isHovered == key ? key : ""}`}
              className="Shop-options_hover-img"
              src={myLists[key].property4}
              alt={myLists[key].property4}
              onMouseLeave={() => setIsHovered(null)}
            />
            <p>{myLists[key].property2} </p>
            <span>$ {myLists[key].property3.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* 4. Card Options Component */}
      <div className="Maincontent_container_cards-options">
      {Object.entries(myCards).map(([card, properties]) => (
          <div key={card} className="Maincontent_shop_card-container">
            <img src={properties.property1} alt={card} />
            <div className="Maincontent_shop_card-texts">
              <span>{properties.property2}</span>
              <p>{properties.property3}</p>
              <button>{properties.property4}</button>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Shoe Banner Component */}
      <div className="Maincontent_container_shoes-banner">
        <div className="Shoe_banner-logo_text-container">
          <img src={ShoppyLogo} alt="Shoppy Logo" />
          <h1>New <br /> Arrivals</h1>
        </div>
        <img src={ShoeBanner} alt="Shoe Banner" />
        <button>Shop Now</button>
      </div>
    </div>
  );
};

export default MainPage;
