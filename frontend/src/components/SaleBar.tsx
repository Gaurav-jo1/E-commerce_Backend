import React from 'react';

// Style
import "../styles/SaleBar.scss";

const SaleBar:React.FC = () => {
  return (
    <div className='salebar_container'>
        <ul>
            <li>
                <div className="salebar_container-main">
                    <p>New Styles on Sale: Up to 40% Off</p>
                </div>
                <div className="salebar_container-para">
                    <p>Shop All Our New Markdowns</p>
                </div>
            </li>
            <li>
                <div className="salebar_container-main">
                    <p>Free Delivery</p>
                </div>
                <div className="salebar_container-para">
                    <p>Applies to orders of ₹ 14 000.00 or more. View details</p>
                </div>
            </li>
        </ul>
    </div>
  )
}

export default SaleBar;
