import React from "react";
import {
  BsGithub,
  BsLinkedin,
  BsFillFileEarmarkCodeFill,
} from "react-icons/bs";

import {
  BiLogoTypescript,
  BiLogoReact,
  BiLogoSass,
  BiLogoPython,
  BiLogoDjango,
  BiLogoPostgresql,
  BiLogoDocker,
} from "react-icons/bi";
import {
  SiReactquery,
  SiRedis,
  SiAdobephotoshop,
  SiPostman,
} from "react-icons/si";
import { FcLinux } from "react-icons/fc";
import x_logo from "../assets/x_logo.webp";

import "../styles/Components_styles/Footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__socials">
        <a
          href="https://twitter.com/Gaurav1_Jo"
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

      <div className="footer__heading">
        <h1>Technology Stack</h1>
      </div>
      <div className="footer__skills">
        <div className="footer__skills-web">
          <p id="frontend">Frontend</p>
          <ul>
            <li>
              <span>
                <BiLogoTypescript
                  style={{
                    color: "#007acc",
                    background: "white",
                    borderRadius: "4px",
                  }}
                />
              </span>
              TypeScript{" "}
            </li>
            <li>
              <span style={{ fontSize: "24px" }}>
                <BiLogoReact style={{ color: "#00BCD4" }} />
              </span>
              React{" "}
            </li>
            <li>
              <span style={{ fontSize: "19px" }}>
                <SiReactquery
                  style={{ color: "#FF4500", paddingRight: "2px" }}
                />
              </span>
              React Query{" "}
            </li>
            <li>
              <span>
                <BiLogoSass
                  style={{
                    color: "#c69",
                    background: "white",
                    borderRadius: "10px",
                  }}
                />
              </span>
              SCSS (Sass){" "}
            </li>
          </ul>
          <p id="backend">Backend</p>
          <ul>
            <li>
              <span>
                <BiLogoPython
                  style={{
                    color: "#4584b6",
                    background: "white",
                    borderRadius: "50%",
                  }}
                />
              </span>
              Python{" "}
            </li>
            <li>
              <span>
                <BiLogoDjango
                  style={{
                    color: "white",
                    background: "#092e20",
                    borderRadius: "4px",
                    padding: "1px",
                  }}
                />
              </span>
              Django{" "}
            </li>
          </ul>
        </div>
        <div className="footer__skills-other">
          <p id="database">Databases</p>
          <ul>
            <li>
              <span>
                <BiLogoPostgresql style={{ color: "#336791" }} />
              </span>
              PostgreSQL{" "}
            </li>
            <li>
              <span>
                <SiRedis style={{ color: "#D82C20" }} />
              </span>
              Redis{" "}
            </li>
          </ul>
          <p id="devops">DevOps & Tools</p>
          <ul>
            <li>
              <span>
                <BiLogoDocker style={{ color: "#0db7ed" }} />
              </span>
              Docker{" "}
            </li>
            <li>
              <span>
                <FcLinux
                  style={{ background: "white", borderRadius: "20px" }}
                />
              </span>
              Linux{" "}
            </li>
          </ul>
          <p id="design">Design & Testing</p>
          <ul>
            <li>
              <span>
                <SiAdobephotoshop
                  style={{
                    color: "#2287b9",
                    background: "white",
                    borderRadius: "4px",
                  }}
                />
              </span>
              Adobe Photoshop{" "}
            </li>
            <li>
              <span>
                <SiPostman
                  style={{
                    color: "#ef5b25",
                    background: "white",
                    borderRadius: "50%",
                  }}
                />
              </span>
              Postman{" "}
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
