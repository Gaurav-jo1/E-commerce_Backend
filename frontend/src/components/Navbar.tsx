import React, { useState, useEffect ,useContext } from "react";

import axios from "axios";

import { HiMagnifyingGlass } from "react-icons/hi2";
import { CiShoppingCart } from "react-icons/ci";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom"; 
import { GlobalValue } from "../context/GlobalValue";

import SearchBar from "./SearchBar";

// Styling
import "../styles/components_styles/Navbar.scss";
import ProfilePage from "../pages/ProfilePage";

interface MyData {
  id: number;
  user: string;
  picture: string;
}

const Navbar: React.FC = () => {
  const [fetchData, setFetchData] = useState<boolean>(false);
  const [searchBar, setSearchBar] = useState<boolean>(false);

  const { authTokens } = useContext(AuthContext);
  const {setSignupOpen, setLoginOpen, setProfilePage, profilePage} = useContext(GlobalValue)

  const { data: userInfo } = useQuery<MyData>( ["user_profile"], () =>
      axios.get<MyData>("http://127.0.0.1:8000/user_profile/info/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
        })
        .then((response) => response.data),
    { enabled: fetchData }
  );

  useEffect(() => {
    if (searchBar || profilePage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    if (authTokens && !fetchData) {
      setFetchData(true);
    }
  }, [searchBar, authTokens, fetchData, profilePage]);

  return (
    <>
      <nav className="navbar_container">
        <div onClick={() => setSearchBar(true)} className="navbar_search">
          <p> <HiMagnifyingGlass /> </p>
          <input type="text" placeholder="Search..." />
        </div>
        <div className="navbar_logo">
          <Link to="/"> <p>Shoppy</p> </Link>
        </div>
        {userInfo && userInfo ? (
          <div className="navbar_profile">
            <Link to="/cart">
              <p> <CiShoppingCart /> </p>
            </Link>
              <img
                src={`http://127.0.0.1:8000${userInfo.picture}`}
                alt="Profile"
                onClick={() => setProfilePage(true)}
              />
          </div>
        ) : (
          <div className="navbar_buttons">
            <p onClick={() => setSignupOpen(true)}>Sign up</p>
            <button onClick={() => setLoginOpen(true)}>Sign in</button>
          </div>
        )}
      </nav>
      {searchBar && (
        <SearchBar setSearchBar={setSearchBar}/>
      )}

      {profilePage && (
        <ProfilePage />
      )}
    </>
  );
};

export default Navbar;
