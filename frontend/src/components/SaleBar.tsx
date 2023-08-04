import React from "react";
import { Link } from "react-router-dom";

// Styling
import "../styles/components_styles/SaleBar.scss";

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
          <Link to="/Shop" className="salebar-link">
            <p className="salebar-heading">Free Delivery</p>
            <p className="salebar-description">
              Applies to orders of ₹ 14 000.00 or more. View details
            </p>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default SaleBar;
