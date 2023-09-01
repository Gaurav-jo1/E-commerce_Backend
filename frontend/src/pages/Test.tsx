import React, { useState } from "react";
import "../styles/MainPage.scss";

import { Link } from "react-router-dom";

import MainBG from "../assets/1.webp";

import { myLists } from "../components/CommonData";

const Test: React.FC = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <div>
      <div className="maincontent_container_textbg">
        <div className="maincontent_container_bg">
          <img src={MainBG} alt="Dress Background" />
        </div>
        <div className="maincontent_container_text">
          <p>PREETY FOR SUMMER</p>
          <Link to="/New & Featured">
            <span>SHOP&nbsp;ALL&nbsp;NEW</span>
          </Link>
        </div>
      </div>

      <div className="maincontent_container_summer_text">
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

      <div className="maincontent_container_shop_options">
        {Object.keys(myLists).map((key) => (
          <div key={key} className="maincontent_shop_image_container">
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
    </div>
  );
};

export default Test;
