import React from "react";

// Styling
import "../styles/components_styles/NavPage.scss";
import { Link } from "react-router-dom";

const myNavArray: string[] = ["New & Featured", "Men", "Women", "Kids", "Sale"];

const NavPage: React.FC = () => {

  return (
    <nav className="NavPages_container">
      <ul className="NavPages_container-ul">
        {myNavArray.map((item, index) => (
          <Link key={index} to={`/${item}`}>
            <li>{item}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavPage;
