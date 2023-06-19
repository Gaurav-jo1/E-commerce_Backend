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
          <img src={MainBG} alt="Dress Background" height={"100%"} width={"100%"} />
        </div>
        <div className="Maincontent_container-text">
          <p>PREETY FOR SUMMER</p>
          <span>SHOP&nbsp;ALL&nbsp;NEW</span>
        </div>
      </div>
      <div className="Maincontent_container-summer_text">
        <p>summer kicks</p>
        <h3>Step Into summer style</h3>

        <p>For days when you need fresh kicks that can keep up with your every move. #ChaseTheDay</p>
        
        <button>Shop Kicks</button>

        <button>Shop Summer Styles</button>
      </div>
    </div>
  );
};

export default MainContent;
