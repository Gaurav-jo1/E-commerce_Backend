import React, { useContext } from "react";

// Styling
import { Link } from "react-router-dom";
import "../styles/components_styles/NavPage.scss";
import { GlobalValue } from "../context/GlobalValue";

import {RxCross1} from "react-icons/rx"

const myNavArray: string[] = ["New & Featured", "Men", "Women", "Kids", "Sale"];

const NavLinks: React.FC = () => (
  <ul>
    {myNavArray.map((item, index) => (
      <li key={index}>
        <Link to={`/${item}`}>{item}</Link>
      </li>
    ))}
  </ul>
);

const NavPage: React.FC = () => {
  const { navOptions, setNavOptions } = useContext(GlobalValue);

  return (
    <>
      <nav className="navpage_container">
        <NavLinks />
      </nav>
      {navOptions && (
        <>
          <div className="navpage_container_mobile_bg" onClick={() => setNavOptions(false)} />
          <nav className="navpage_container_mobile">
            <span onClick={() => setNavOptions(false)}><RxCross1/></span>
            <NavLinks />
          </nav>
        </>
      )}
    </>
  );
};

export default NavPage;
