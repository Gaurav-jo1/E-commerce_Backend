import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { AxiosResponse, AxiosError } from 'axios';
import SearchBar from "./SearchBar";
import ProfilePage from "../pages/ProfilePage";

import { Link } from "react-router-dom";
import { FcMenu } from "react-icons/fc";
import { CiShoppingCart } from "react-icons/ci";
import { HiMagnifyingGlass } from "react-icons/hi2";

import { MyUserInterface } from "../common/CommonInterfaces";
// Global Context
import { AuthContext } from "../context/AuthContext";
import { GlobalValue } from "../context/GlobalValue";

// Styling
import "../styles/Components_styles/Navbar.scss";

const Navbar: React.FC = () => {
  const [userData, setUserData] = useState<MyUserInterface | null>(null);
  const [searchBar, setSearchBar] = useState<boolean>(false);
  const [profilePage, setProfilePage] = useState<boolean>(false);

  const { authTokens } = useContext(AuthContext);
  const { setSignupOpen, setLoginOpen, setNavOptions, navOptions } =
    useContext(GlobalValue);

  useEffect(() => {
    if (searchBar || profilePage || navOptions) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    if (authTokens) {
      axios
        .get("https://shoppy-ly6w.onrender.com/user_profile/info/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
        })
        .then((response:AxiosResponse ) => {
          setUserData(response.data);
        })
        .catch((error: AxiosError) => {
          console.log("error", error);
        });
    }
  }, [searchBar, authTokens, profilePage, navOptions]);

  return (
    <>
      <nav className="navbar">
        <div onClick={() => setSearchBar(true)} className="navbar__search">
          <p>
            <HiMagnifyingGlass />
          </p>
          <input type="text" placeholder="Search..." />
        </div>

        <div className="navbar__logo">
          <Link to="/">
            <p>Shoppy</p>
          </Link>
        </div>
        {userData && userData ? (
          <>
            <div className="navbar__profile">
              <p id="search" onClick={() => setSearchBar(true)}>
                <HiMagnifyingGlass />
              </p>
              <Link to="/cart">
                <p>
                  <CiShoppingCart />
                </p>
              </Link>
              <img
                src={`https://shoppy-ly6w.onrender.com${userData.picture}`}
                alt="Profile"
                onClick={() => setProfilePage(true)}
              />
              <span onClick={() => setNavOptions(true)}>
                <FcMenu />
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="navbar__buttons">
              <p onClick={() => setSignupOpen(true)}>Sign up</p>
              <button onClick={() => setLoginOpen(true)}>Sign in</button>
            </div>
            <div className="navbar__button-slider">
              <p onClick={() => setSearchBar(true)}>
                <HiMagnifyingGlass />
              </p>
              <p onClick={() => setNavOptions(true)}>
                <FcMenu />
              </p>
            </div>
          </>
        )}
      </nav>
      {searchBar && <SearchBar setSearchBar={setSearchBar} />}

      {profilePage && (
        <ProfilePage
          setUserData={setUserData}
          setProfilePage={setProfilePage}
        />
      )}
    </>
  );
};

export default Navbar;
