import React from "react";
import {
  BsGithub,
  BsLinkedin,
  BsFillFileEarmarkCodeFill,
} from "react-icons/bs";

import x_logo from "../assets/x_logo.webp";

import "../styles/Components_styles/Footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__socials">
        <a
          href="https://twitter.com/GauravJoshiSays"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <img src={x_logo} alt="X" aria-label="X.com" width={"24px"} />{" "}
        </a>
        <a
          href="https://github.com/Gaurav-jo1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsGithub aria-label="GitHub" />
        </a>
        <a
          href="https://www.linkedin.com/in/gaurav-jo1/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsLinkedin aria-label="LinkedIn" />
        </a>
        <a
          href="https://github.com/Gaurav-jo1/E-commerce"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsFillFileEarmarkCodeFill aria-label="GitHub Repository" />
        </a>
      </div>

    </footer>
  );
};

export default Footer;
