import React, {useContext} from "react";

// Styling
import "../styles/components_styles/NavPage.scss";
import { Link } from "react-router-dom";
import { GlobalValue } from "../context/GlobalValue";

const myNavArray: string[] = ["New & Featured", "Men", "Women", "Kids", "Sale"];


const NavPage: React.FC = () => {

  const {setNavValue} = useContext(GlobalValue)

  return (
    <nav className="NavPages_container">
      <ul className="NavPages_container-ul">
        {myNavArray.map((item, index) => (
          <li key={index} onClick={() => setNavValue(item)}>
            <Link to="/Shop">
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavPage;
