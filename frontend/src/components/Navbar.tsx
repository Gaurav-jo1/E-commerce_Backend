import React, {useState} from "react";

// Icons
import { HiMagnifyingGlass } from "react-icons/hi2";

// Interface and Types
import { SignComponentProps } from "./CommonInterfaces";

// Styling
import "../styles/components_styles/Navbar.scss"

const Navbar: React.FC<SignComponentProps> = ({setSignupOpen, setLoginOpen}) => {
  const [userSearch, setUserSearch] = useState<string>("")

  console.log(userSearch)
  return (
    <nav className="Navbar_container">
        <div className="Navbar_container-search">
          <p> <HiMagnifyingGlass /> </p>
          <input value={userSearch} type="text" placeholder="Search..." onChange={(e) => setUserSearch(e.target.value)} />
        </div>
        <div className="Navbar_container-logo"> <p>Shoppy</p> </div>
        <div className="Navbar_container-buttons">
          <p onClick={() => setSignupOpen(true)}>Sign up</p>
          <button onClick={() => setLoginOpen(true)}>Sign in</button>
        </div>
    </nav>
  );
};

export default Navbar;
