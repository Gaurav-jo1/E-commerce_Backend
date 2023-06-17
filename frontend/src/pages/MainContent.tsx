import React from "react";

// Assests
import MainBG from "../assets/1.webp";

// Styling
import "../styles/MainContent.scss";

const MainContent: React.FC = () => {
  return (
    <div className="Maincontent_container">
      <div className="Maincontent_container-textbg">
        <div className="Maincontent_container-bg">
          <img src={MainBG} alt="Dress Background" />
        </div>
        <div className="Maincontent_container-text">
          <p>PREETY FOR SUMMER</p>
          <span>SHOP&nbsp;ALL&nbsp;NEW</span>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
