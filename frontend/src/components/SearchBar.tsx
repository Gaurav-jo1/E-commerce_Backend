import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { AxiosResponse } from 'axios';

import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";

// Global Context
import { GlobalValue } from "../context/GlobalValue";

// Styling
import "../styles/Components_styles/SearchBar.scss";

interface SearchBarProps {
  setSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchBar }) => {
  const [userSearch, setUserSearch] = useState<string>("");
  const [searchItems, setSearchItems] = useState<Array<{ id: string; name: string }> | null>();
  const [searchError, setSearchError] = useState<string>();

  const { setUserProSearch } = useContext(GlobalValue);

  const navigate = useNavigate();

  const productSearch = (userSearch: string) => {
    axios
      .post("http://127.0.0.1:8000/product_search/search/", {
        search_text: userSearch,
      })
      .then((response: AxiosResponse) => {
        console.log("Product Search", JSON.parse(response.data));
        setSearchError("");
        setSearchItems(JSON.parse(response.data));
      })
      .catch((error) => {
        console.log("error", error);
        setSearchError(error.response.data.message);
        setSearchItems(null);
      });
  };

  useEffect(() => {
    if (userSearch !== "" && userSearch.length == 2) {
      productSearch(userSearch);
    }
  }, [userSearch]);

  // Search for Men or any other catergory:
  const userProductSearch = (product_text: string) => {
    navigate("/search");
    setUserProSearch(product_text);
    setSearchBar(false);
    localStorage.setItem("userProSearch", product_text);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (userSearch.length <= 1) {
        setSearchError("Minimum 2 characters required");
        setSearchItems(null)
      } else {
        userProductSearch(userSearch);
      }
    }
  };

  const handleClickSearch = () => {
    if (userSearch.length <= 1) {
      setSearchError("Minimum 2 characters required");
      setSearchItems(null)
    } else {
      userProductSearch(userSearch);
    }
  }

  return (
    <>
      <div className="navbar__container-search" />
      <div className="navbar__user-search">
        <div
          className="navbar__search-close"
        >
          <p onClick={() => setSearchBar(false)}>
            <RxCross1 />
          </p>
        </div>
        <div className="navbar__search-input">
          <p>
            <AiOutlineSearch />{" "}
          </p>
          <input
            type="text"
            placeholder="Search the Shop"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            autoFocus={true}
            minLength={2}
            onKeyDown={handleKeyPress}
          />
          <span onClick={() => handleClickSearch()}>
            <MdOutlineArrowForwardIos />
          </span>
        </div>
        {searchItems && (
          <div className="navbar__search-result">
            {searchItems.map((product) => (
              <p
                key={product.id}
                onClick={() => userProductSearch(product.name)}
              >
                {product.name}
              </p>
            ))}
          </div>
        )}
        {searchError && (
          <div className="navbar__search-result">
            <span>{searchError}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
