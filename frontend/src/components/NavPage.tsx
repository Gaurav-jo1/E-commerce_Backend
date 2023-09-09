import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowForward } from "react-icons/io";

// Global Context
import { GlobalValue } from "../context/GlobalValue";
import { AuthContext } from "../context/AuthContext";

// Styling
import "../styles/Components_styles/NavPage.scss";

const myNavArray: string[] = ["New & Featured", "Men", "Women", "Kids", "Sale"];

const NavPage: React.FC = () => {
  const { navOptions, setNavOptions, setLoginOpen, setSignupOpen } =
    useContext(GlobalValue);
  const { authTokens } = useContext(AuthContext);

  const OpenAuth = (isLogin: boolean) => {
    setNavOptions(false);

    if (isLogin) {
      setLoginOpen(true);
    } else {
      setSignupOpen(true);
    }
  };

  const NavLinks: React.FC = () => (
    <ul>
      {myNavArray.map((item, index) => (
        <Link key={index} to={`/${item}`}>
          <li onClick={() => setNavOptions(false)}>
            {item} <p>{navOptions && <IoIosArrowForward />}</p>
          </li>
        </Link>
      ))}
    </ul>
  );

  return (
    <>
      <nav className="navpage">
        <NavLinks />
      </nav>
      {navOptions && (
        <>
          <div
            className="navpage__container-mobile-bg"
            onClick={() => setNavOptions(false)}
          />
          <nav className="navpage__container-mobile">
            <span onClick={() => setNavOptions(false)}>
              <RxCross1 />
            </span>

            <NavLinks />

            {!authTokens ? (
              <div className="navpage__container-mobile-auth">
                <button onClick={() => OpenAuth(false)}>Sign up</button>
                <button onClick={() => OpenAuth(true)}>Sign in</button>
              </div>
            ) : (
              <div className="navpage__container-mobile-auth"></div>
            )}
          </nav>
        </>
      )}
    </>
  );
};

export default NavPage;
