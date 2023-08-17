import axios from "axios";
import React, { useState, useEffect ,useContext } from "react";
import { Link } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { AiOutlineSearch } from "react-icons/ai";
import { CiShoppingCart } from "react-icons/ci";
import {MdOutlineArrowForwardIos} from "react-icons/md"
import { SignComponentProps } from "./CommonInterfaces";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";

// Styling
import "../styles/components_styles/Navbar.scss";

interface MyData {
  id: number;
  user: string;
  picture: string;
}

interface SearchResult {
  [key: string]: string;
}

const Navbar: React.FC<SignComponentProps> = ({ setSignupOpen, setLoginOpen, }) => {
  const [userSearch, setUserSearch] = useState<string>("");
  const [fetchData, setFetchData] = useState<boolean>(false);
  const [searchBar, setSearchBar] = useState<boolean>(false);
  const [searchItems, setSearchItems] = useState<SearchResult | null >(null)

  const { authTokens } = useContext(AuthContext);

  if (authTokens && !fetchData) {
    setFetchData(true);searchItems
  }

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

  const productSearch = (userSearch:string) => {
    axios.post("http://127.0.0.1:8000/product_search/search/", {
        search_text: userSearch,
      })
      .then(function (response) {
        setSearchItems(JSON.parse(response.data));
      })
      .catch(function (error) {
        console.log("error",error);
      });
  }

  useEffect(() => {
    if (userSearch !== "") {
      productSearch(userSearch);
    }

    if (userSearch == "") {
      setSearchItems(null)
    }
  
  }, [userSearch]);

  return (
    <>
      <nav className="navbar_container">
        <div onClick={() => setSearchBar(true)} className="navbar_search">
          <p> <HiMagnifyingGlass /> </p>
          <input
            type="text"
            placeholder="Search..."
          />
        </div>
        <div className="navbar_logo">
          <Link to="/"> <p>Shoppy</p> </Link>
        </div>
        {userInfo ? (
          <div className="navbar_profile">
            <Link to="/cart">
              <p> <CiShoppingCart /> </p>
            </Link>
            <Link to="/profile">
              <img
                src={`http://127.0.0.1:8000${userInfo.picture}`}
                alt="Profile"
              />
            </Link>
          </div>
        ) : (
          <div className="navbar_buttons">
            <p onClick={() => setSignupOpen(true)}>Sign up</p>
            <button onClick={() => setLoginOpen(true)}>Sign in</button>
          </div>
        )}
      </nav>
      {searchBar && (
        <>
          <div onClick={() => setSearchBar(false)} className="navbar_container_search"/>
          <div className="navbar_user_search">
            <div className="navbar_search_input">
              <p><AiOutlineSearch /> </p>
              <input type="text" placeholder="Search the Shop" value={userSearch} onChange={(e) => setUserSearch(e.target.value)} autoFocus={true}/>
              <span>< MdOutlineArrowForwardIos/></span>
            </div>
            {searchItems && (
              <div className="navbar_search_result">
                {Object.values(searchItems).map((value, index) => (
                  <p key={index}>{value}</p>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
