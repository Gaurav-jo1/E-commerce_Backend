import React, { useState } from "react";

import SaleBar from "../components/SaleBar";
import Footer from "../components/Footer";

import { Link } from "react-router-dom";
import { Blurhash } from "react-blurhash";

// Media
import MainBG from "../assets/1.webp";
import ShoeBanner from "../assets/shoe-banner.webp";
import ShoeBanner1 from "../assets/shoe-banner-r1.webp";
import ShoeBanner2 from "../assets/shoe-banner-r2.webp";
import ShoppyLogo from "../assets/android-chrome-512x512.png";
import { myLists, myCards, mySections } from "../common/CommonData";

// Global Context
import { AuthPages } from "./AuthPages/AuthPages.tsx";
// Styling
import "../styles/HomePage.scss";

const HomePage: React.FC = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

  return (
    <div className="homepage">
      <AuthPages />
      <SaleBar />
      {/* 1. First Component */}
      <div className="homepage__first-textbg">
        <div className="homepage__first-bg">
          <img
            src={MainBG}
            alt="Mens Section"
            onLoad={() => setIsImgLoaded(true)}
            style={{ display: isImgLoaded ? "block" : "none" }}
          />

          {!isImgLoaded && (
            <Blurhash
              hash="pKLNb|%h.m-CMwOFM{00xbMwSi%2$*baXSV[V@S4xts;W;_3kD%2xakWbbMx-pofj?xtRkozWAbaIURPt6tRj]V["
              resolutionX={32}
              resolutionY={32}
              width={"100%"}
              height={"747px"}
              punch={1}
            />
          )}
        </div>
        <div className="homepage__first-text">
          <p>PREETY FOR SUMMER</p>
          <Link to="/New & Featured">
            <span>SHOP&nbsp;ALL&nbsp;NEW</span>
          </Link>
        </div>
      </div>

      {/* 2. Summer text Banner Component */}
      <div className="homepage__summer-text">
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
      <div className="homepage__shop-options">
        {Object.keys(myLists).map((key) => (
          <div key={key} className="homepage_shop-images">
            <Link to="/Shop">
              <img
                id={`hide_img_${isHovered === key ? key : ""}`}
                className="shop_options_main_img"
                src={myLists[key].property1}
                alt={myLists[key].property1}
                onMouseEnter={() => setIsHovered(key)}
                loading="lazy"
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
      <div className="homepage__shoes-banner">
        <div className="homepage__shoes-text-logo">
          <img src={ShoppyLogo} alt="Shoppy Logo" loading="lazy" />
          <h1>
            {" "}
            New <br /> Arrivals{" "}
          </h1>
        </div>
        <div className="homepage__shoes-poster">
          <img src={ShoeBanner} alt="Shoe Banner" loading="lazy" />
        </div>
        <div className="homepage__shoes-poster-mobile">
          <img src={ShoeBanner1} alt="Shoe Banner" loading="lazy" />
          <img src={ShoeBanner2} alt="Shoe Banner" loading="lazy" />
        </div>
        <div className="homepage__shoes-button">
          <Link to="/Men">
            <button>Shop Now</button>
          </Link>
        </div>
      </div>

      {/* 5. Card Options Component */}
      <div className="homepage__card">
        {Object.entries(myCards).map(([card, properties]) => (
          <div key={card} className="homepage__card-container">
            <img src={properties.property1} alt={card} loading="lazy" />
            <div className="homepage__card-texts">
              <p>{properties.property3}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 6. Men's, Women and Kids Section  */}
      <div className="homepage__genders-heading">
        <p>Explore</p>
      </div>

      <div className="homepage__genders-sections">
        {Object.entries(mySections).map(([section, properties]) => (
          <div key={section} className="homepage__genders-images">
            <Link to={`/${properties.property2}`}>
              <img
                src={properties.property1}
                alt={properties.property2}
                loading="lazy"
              />
              <button>{properties.property2}'s</button>
            </Link>
          </div>
        ))}
      </div>

      {/* 7. About Page */}
      <div className="homepage__about">
        <div className="homepage__about-heading">
          <h1> MADE FOR THE </h1>
          <h1>MODERN SHOPPING</h1>
        </div>

        <div className="homepage__about-text">
          <p>
            Welcome to Shoppy, where dreams become fashion reality! We are the
            trendsetters, the style mavens, and the shopping destination that
            fuels your passion for all things fabulous. Dive into our carefully
            curated collection of cutting-edge fashion, statement accessories,
            and irresistible homeware.Shoppy empowers you to express your unique
            style effortlessly.
          </p>
          <a href="https://github.com/Gaurav-jo1" target="_blank">
            <button>ABOUT US</button>
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
