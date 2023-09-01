/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";

import axios from "axios";

import { HiMagnifyingGlass } from "react-icons/hi2";
import { CiShoppingCart } from "react-icons/ci";
import { FcMenu } from "react-icons/fc";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { GlobalValue } from "../context/GlobalValue";

import SearchBar from "./SearchBar";

// Styling
import "../styles/components_styles/Navbar.scss";
import ProfilePage from "../pages/ProfilePage";

import { MyUserInterface } from "./CommonInterfaces";

const Navbar: React.FC = () => {
  const [userData, setUserData] = useState<MyUserInterface | null>(null);
  const [searchBar, setSearchBar] = useState<boolean>(false);
  const [profilePage, setProfilePage] = useState<boolean>(false);

  const { authTokens } = useContext(AuthContext);
  const { setSignupOpen, setLoginOpen, setNavOptions, navOptions } =
    useContext(GlobalValue);

  const UserProfileSearch = () => {
    axios
      .get("http://127.0.0.1:8000/user_profile/info/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then(function (response) {
        setUserData(response.data);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  useEffect(() => {
    if (searchBar || profilePage || navOptions) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    if (authTokens) {
      UserProfileSearch();
    }
  }, [searchBar, authTokens, profilePage, navOptions]);

  return (
    <>
      <nav className="navbar_container">
        <div onClick={() => setSearchBar(true)} className="navbar_search">
          <p>
            <HiMagnifyingGlass />
          </p>
          <input type="text" placeholder="Search..." />
        </div>

        <div className="navbar_logo">
          <Link to="/">
            <p>Shoppy</p>
          </Link>
        </div>
        {userData && userData ? (
          <>
            <div className="navbar_profile">
              <p id="search" onClick={() => setSearchBar(true)}>
                <HiMagnifyingGlass />
              </p>
              <Link to="/cart">
                <p>
                  <CiShoppingCart />
                </p>
              </Link>
              <img
                src={`http://127.0.0.1:8000${userData.picture}`}
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
            <div className="navbar_buttons">
              <p onClick={() => setSignupOpen(true)}>Sign up</p>
              <button onClick={() => setLoginOpen(true)}>Sign in</button>
            </div>
            <div className="navbar_button_slider">
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
