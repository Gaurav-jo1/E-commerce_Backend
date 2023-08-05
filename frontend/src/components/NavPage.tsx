import React from "react";

// Styling
import { Link } from "react-router-dom";
import "../styles/components_styles/NavPage.scss";

const myNavArray: string[] = ["New & Featured", "Men", "Women", "Kids", "Sale"];

const NavPage: React.FC = () => {
  return (
    <nav className="navpage-container">
      <ul>
        {myNavArray.map((item, index) => (
          <li key={index}>
            <Link to={`/${item}`}>{item}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavPage;
