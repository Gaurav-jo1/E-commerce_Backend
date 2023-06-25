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

// Interface
interface ShopImages {
  [key: string]: {
    property1: string;
    property2: string;
    property3: number;
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

const MainPage: React.FC = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  console.log("isHovered", isHovered);

  return (
    <div className="Maincontent_container">
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

      <div className="Maincontent_container_shop-options">
        {Object.keys(myLists).map((key) => (
          <div key={key} className="Maincontent_shop_image-container">
            <img
              id={`hide_img-${isHovered == key ? key : ''}`}
              className="Shop-options_main-img"
              src={myLists[key].property1}
              alt={myLists[key].property1}
              onMouseEnter={() => setIsHovered(key)}
            />
            <img
              id={`show_img-${isHovered == key ? key : ''}`}
              className="Shop-options_hover-img"
              src={myLists[key].property4}
              alt={myLists[key].property4}
            />
            <p>{myLists[key].property2} </p>
            <span>$ {myLists[key].property3.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
