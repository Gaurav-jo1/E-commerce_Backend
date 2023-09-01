import React from "react";
import { Link } from "react-router-dom";

// Styling
import "../styles/Components_styles/SaleBar.scss";

const SaleBar: React.FC = () => {
  return (
    <section className="salebar">
      <ul className="salebar-list">
        <li className="salebar-item">
          <Link to="/Sale" className="salebar-link">
            <p className="salebar-heading">New Styles on Sale: Up to 40% Off</p>
            <p className="salebar-description">Shop All Our New Markdowns</p>
          </Link>
        </li>
        <li className="salebar-item">
          <Link to="/Kids" className="salebar-link">
            <p className="salebar-heading">Hello Shoppy Kid's Store</p>
            <p className="salebar-description">
              Get access to Kid's Fashion Store
            </p>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default SaleBar;
