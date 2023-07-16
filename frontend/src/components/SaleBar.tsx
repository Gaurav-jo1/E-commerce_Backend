import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Style
import "../styles/components_styles/SaleBar.scss";
import { GlobalValue } from "../context/GlobalValue";

const SaleBar: React.FC = () => {
  const { setNavValue } = useContext(GlobalValue);

  return (
    <div className="salebar_container">
      <ul>
        <li>
          <Link to="/Shop" onClick={() => setNavValue("Sale")}>
            <div className="salebar_container-main">
              <p>New Styles on Sale: Up to 40% Off</p>
            </div>
            <div className="salebar_container-para">
              <p>Shop All Our New Markdowns</p>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/Shop" onClick={() => setNavValue("Sale")}>
            <div className="salebar_container-main">
              <p>Free Delivery</p>
            </div>
            <div className="salebar_container-para">
              <p>Applies to orders of ₹ 14 000.00 or more. View details</p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SaleBar;
