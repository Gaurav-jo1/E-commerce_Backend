import React, { useContext } from "react";

// Styling
import { Link } from "react-router-dom";
import "../styles/components_styles/NavPage.scss";
import { GlobalValue } from "../context/GlobalValue";
import { RxCross1 } from "react-icons/rx";
import { AuthContext } from "../context/AuthContext";
import {IoIosArrowForward} from "react-icons/io"

const myNavArray: string[] = ["New & Featured", "Men", "Women", "Kids", "Sale"];


const NavPage: React.FC = () => {
  const { navOptions, setNavOptions, setLoginOpen, setSignupOpen } =
    useContext(GlobalValue);
  const { authTokens } = useContext(AuthContext);

  const OpenAuth = (isLogin: boolean) => {
    setNavOptions(false)

    if (isLogin) {
      setLoginOpen(true)
    } else {
      setSignupOpen(true)
    }
  }

  const NavLinks: React.FC = () => (
    <ul>
      {myNavArray.map((item, index) => (
        <li key={index} onClick={() =>  setNavOptions(false)}>
          <Link to={`/${item}`}>
            {item} <p>{navOptions && (<IoIosArrowForward/>)}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
  

  return (
    <>
      <nav className="navpage_container">
        <NavLinks />
      </nav>
      {navOptions && (
        <>
          <div
            className="navpage_container_mobile_bg"
            onClick={() => setNavOptions(false)}
          />
          <nav className="navpage_container_mobile">
            <span onClick={() => setNavOptions(false)}>
              <RxCross1 />
            </span>
            <NavLinks />
            {!authTokens ? (
              <div className="navpage_container_mobile_auth">
                <button onClick={() => OpenAuth(true)}>Sign up</button>
                <button onClick={() => OpenAuth(false)}>Sign in</button>
              </div>
            ) : (
              <div className="navpage_container_mobile_auth"></div>
            )}
          </nav>
        </>
      )}
    </>
  );
};

export default NavPage;
