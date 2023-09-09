import React from "react";
import { Link } from "react-router-dom";

// Styling
import "../styles/Components_styles/SaleBar.scss";

const SaleBar: React.FC = () => {
  return (
    <section className="salebar">
      <ul>
        <li>
          <Link to="/Sale">
            <p className="salebar__heading">
              New Styles on Sale: Up to 40% Off
            </p>
            <p className="salebar__description">Shop All Our New Markdowns</p>
          </Link>
        </li>
        <li>
          <Link to="/Kids" className="salebar__link">
            <p className="salebar__heading">Hello Shoppy Kid's Store</p>
            <p className="salebar__description">
              Get access to Kid's Fashion Store
            </p>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default SaleBar;
