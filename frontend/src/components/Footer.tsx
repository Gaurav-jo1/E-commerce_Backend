import React from "react";
import "../styles/Footer.scss";

import {
  BsTwitter,
  BsGithub,
  BsLinkedin,
  BsFillFileEarmarkCodeFill,
} from "react-icons/bs";

const Footer: React.FC = () => {
  return (
    <div className="Footer_container">
      <div className="Footer_container_one-div">
        <div className="Footer_container-list_container">
          <ul className="Footer_container-ul_one">
            <p>BECOME A MEMEBER</p>
            <p>STUDENT DISCOUNTS</p>
            <p>Send Us Feedback</p>
          </ul>
          <ul className="Footer_container-ul_two">
            <p>GET HELP</p>
            <li>Order Status</li>
            <li>Delivery</li>
            <li>Returns</li>
            <li>Payment Options</li>
            <li>Contact Us</li>
          </ul>
          <ul className="Footer_container-ul_three">
            <p>ABOUT SHOPPY</p>
            <li>News</li>
            <li>Carrers</li>
            <li>Sustainability</li>
          </ul>
        </div>
        <div className="Footer_container-logos_container">
          <p> <BsTwitter /> </p>
          <p> <BsGithub /> </p>
          <p> <BsLinkedin /> </p>
          <p> <BsFillFileEarmarkCodeFill /> </p>
        </div>
      </div>
      <div className="Footer_container_two-div">
        <div className="Footer_container-bottom_container">
          <p>&copy; 2023 Shoppy, Inc. All Rights Reserved</p>

          <ul>
            <li>Guides</li>
            <li>Terms of Sale</li>
            <li>Terms of Use</li>
            <li>Shoppy Privacy Policy</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
