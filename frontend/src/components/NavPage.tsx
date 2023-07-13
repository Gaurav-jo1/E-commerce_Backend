import React, { useState } from "react";

// Styling
import "../styles/components_styles/NavPage.scss";

import { newFeatureArray, mensArray, womensArray,kidsArray, saleArray } from "./CommonData";

enum AllowedValues {
  Zero = 0,
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
}



const NavPage: React.FC = () => {
  const [navHover, setNavHover] = useState<AllowedValues>(AllowedValues.One);

  return (
    <nav className="NavPages_container">
      <ul
        className="NavPages_container-ul"
        onMouseLeave={() => setNavHover(AllowedValues.Zero)}
      >
        <li onMouseEnter={() => setNavHover(AllowedValues.One)}>
          New & Featured
        </li>
        <li onMouseEnter={() => setNavHover(AllowedValues.Two)}>Men</li>
        <li onMouseEnter={() => setNavHover(AllowedValues.Three)}>Women</li>
        <li onMouseEnter={() => setNavHover(AllowedValues.Four)}>Kids</li>
        <li onMouseEnter={() => setNavHover(AllowedValues.Five)}>Sale</li>
      </ul>
      {navHover == 1 && (
        <div className="NavPage_newpage_container-links">
          <div
            onMouseLeave={() => setNavHover(AllowedValues.One)}
            className="NavPage_newpage-links"
          >
            <ul>
              <p>New & Featured</p>
              {newFeatureArray.NewFeatured.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <ul>
              <p>Shop Icons</p>
              {newFeatureArray.ShopIcons.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <ul>
              <p>New For Men</p>
              {newFeatureArray.NewForMen.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <ul>
              <p>New For Women</p>
              {newFeatureArray.NewForWomen.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <ul>
              <p>New For Kids</p>
              {newFeatureArray.NewForKids.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {navHover == 2 && (
        <div className="NavPage_newpage_container-links">
          <div
            onMouseLeave={() => setNavHover(AllowedValues.Zero)}
            className="NavPage_newpage-links"
          >
            <ul>
              <p>Featured</p>
              {mensArray.Featured.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <ul>
              <p>Shoes</p>
              {mensArray.Shoes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <ul>
              <p>Clothing</p>
              {mensArray.Clothing.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <ul>
              <p>Shop By Sport</p>
              {mensArray.ShopBySport.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {navHover == 3 && (
        <div className="NavPage_newpage_container-links">
          <div
            onMouseLeave={() => setNavHover(AllowedValues.Zero)}
            className="NavPage_newpage-links"
          >
            <ul>
              <p>Featured</p>
              {womensArray.Featured.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <ul>
              <p>Shoes</p>
              {womensArray.Shoes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <ul>
              <p>Clothing</p>
              {womensArray.Clothing.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <ul>
              <p>Shop By Sport</p>
              {womensArray.ShopBySport.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {navHover == 4 && (
        <div className="NavPage_newpage_container-links">
          <div
            onMouseLeave={() => setNavHover(AllowedValues.Zero)}
            className="NavPage_newpage-links"
          >
            <ul>
              <p>Featured</p>
              {kidsArray.Featured.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <ul>
              <p>Boys' Shoes</p>
              {kidsArray.BoysShoes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <ul>
              <p>Girls' Shoes</p>
              {kidsArray.GirlsShoes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <ul>
              <p>Accessories And Equipment</p>
              {kidsArray.AccessoriesAndEquipment.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {navHover == 5 && (
        <div className="NavPage_newpage_container-links">
          <div
            onMouseLeave={() => setNavHover(AllowedValues.Zero)}
            className="NavPage_newpage-links"
          >
            <ul>
              <p>Featured</p>
              {saleArray.Featured.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <ul>
              <p>Men's Sale</p>
              {saleArray.MensSale.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <ul>
              <p>Women's Shoes</p>
              {saleArray.WomensSale.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <ul>
              <p>Kids's Sale</p>
              {saleArray.KidsSale.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavPage;
