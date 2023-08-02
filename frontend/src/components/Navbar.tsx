import axios from "axios";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
// Icons
import { HiMagnifyingGlass } from "react-icons/hi2";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai";
// Interface and Types
import { SignComponentProps } from "./CommonInterfaces";

interface MyData {
  id: number;
  user: string;
  picture: string;
}

// Styling
import "../styles/components_styles/Navbar.scss";
import { AuthContext } from "../context/AuthContext";

const Navbar: React.FC<SignComponentProps> = ({
  setSignupOpen,
  setLoginOpen,
}) => {
  const [userSearch, setUserSearch] = useState<string>("");
  const [getUserInfo, setGetUserInfo] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<MyData>();

  const { authTokens } = useContext(AuthContext);

  if (authTokens && getUserInfo) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(authTokens.access),
    };
    axios
      .get("http://127.0.0.1:8000/user_profile/info/", { headers })
      .then((response) => {
        setGetUserInfo(false);
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <nav className="Navbar_container">
      <div className="Navbar_container-search">
        <p> <HiMagnifyingGlass /> </p>
        <input
          value={userSearch}
          type="text"
          placeholder="Search..."
          onChange={(e) => setUserSearch(e.target.value)}
        />
      </div>
      <div className="Navbar_container-logo">
          <Link to="/">
            <p>Shoppy</p>
          </Link>
      </div>
      {userInfo ? (
        <div className="Navbar_container-profile">
          <p>
            {" "}
            <AiOutlineHeart />{" "}
          </p>
          <Link to="/cart">
            <p>
              {" "}
              <CiShoppingCart />{" "}
            </p>
          </Link>
          <Link to="/profile">
            <img
              src={`http://127.0.0.1:8000${userInfo.picture}`}
              alt="profile pic"
            />
          </Link>
        </div>
      ) : (
        <div className="Navbar_container-buttons">
          <p onClick={() => setSignupOpen(true)}>Sign up</p>
          <button onClick={() => setLoginOpen(true)}>Sign in</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
