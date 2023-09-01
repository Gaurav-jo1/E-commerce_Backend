import React from "react";
import {BsGithub, BsLinkedin, BsFillFileEarmarkCodeFill } from "react-icons/bs";
import x_logo from "../assets/x_logo.webp"

import "../styles/Components_styles/Footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-container-one-div">
        <nav className="footer-container-list-container">
          <ul className="footer-container-ul-one">
            <li>BECOME A MEMBER</li>
            <li>STUDENT DISCOUNTS</li>
            <li>Send Us Feedback</li>
          </ul>
          <ul className="footer-container-ul-two">
            <li>GET HELP</li>
            <li>Order Status</li>
            <li>Delivery</li>
            <li>Returns</li>
            <li>Payment Options</li>
            <li>Contact Us</li>
          </ul>
          <ul className="footer-container-ul-three">
            <li>ABOUT SHOPPY</li>
            <li>News</li>
            <li>Careers</li>
            <li>Sustainability</li>
          </ul>
        </nav>
        <div className="footer-container-logos-container">
          <a href="https://twitter.com/Gaurav1_Jo" target="_blank" rel="noopener noreferrer"> <img src={x_logo} alt="X" aria-label="X.com" width={"22px"}/> </a>
          <a href="https://github.com/Gaurav-jo1" target="_blank" rel="noopener noreferrer"><BsGithub aria-label="GitHub" /></a>
          <a href="https://www.linkedin.com/in/gaurav-jo1/" target="_blank" rel="noopener noreferrer"><BsLinkedin aria-label="LinkedIn" /></a>
          <a href="https://github.com/Gaurav-jo1/E-commerce" target="_blank" rel="noopener noreferrer"><BsFillFileEarmarkCodeFill aria-label="GitHub Repository" /></a>
        </div>
      </div>
      <div className="footer-container-two-div">
        <div className="footer-container-bottom-container">
          <p>&copy; 2023 Shoppy, Inc. All Rights Reserved</p>
          <ul>
            <li>Guides</li>
            <li>Terms of Sale</li>
            <li>Terms of Use</li>
            <li>Shoppy Privacy Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
