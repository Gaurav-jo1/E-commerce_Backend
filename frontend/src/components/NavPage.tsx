import React, { useState } from "react";

// Styling
import "../styles/components_styles/NavPage.scss";

enum AllowedValues {
  Zero = 0,
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5
}

const NavPage: React.FC = () => {
  // const [newFeature, setNewFeature] = useState<boolean>(false);
  // const [hoverMen, setHoverMen] = useState<boolean>(false);
  const [navHover, setNavHover] = useState<AllowedValues>(AllowedValues.Zero);

  return (
    <nav className="NavPages_container">
      <ul className="NavPages_container-ul">
        <li onMouseEnter={() => setNavHover(AllowedValues.One)}>New & Featured</li>
        <li onMouseEnter={() => setNavHover(AllowedValues.Two)}>Men</li>
        <li onMouseEnter={() => setNavHover(AllowedValues.Three)}>Women</li>
        <li onMouseEnter={() => setNavHover(AllowedValues.Four)}>Kids</li>
        <li onMouseEnter={() => setNavHover(AllowedValues.Five)}>Sale</li>
      </ul>
      {navHover == 1 && (
        <div
          onMouseLeave={() => setNavHover(AllowedValues.Zero)}
          className="NavPage_newpage-links">
          New Feature
        </div>
      )}
      {navHover == 2 && (
        <div onMouseLeave={() => setNavHover(AllowedValues.Zero)}
          className="NavPage_newpage-links">
          Men
        </div>
      )}
      {navHover ==3 && (
        <div onMouseLeave={() => setNavHover(AllowedValues.Zero)}
          className="NavPage_newpage-links">
          Women
        </div>
      )}
      {navHover == 4 && (
        <div onMouseLeave={() => setNavHover(AllowedValues.Zero)}
          className="NavPage_newpage-links">
          Kids
        </div>
      )}
      {navHover == 5 && (
        <div onMouseLeave={() => setNavHover(AllowedValues.Zero)}
          className="NavPage_newpage-links">
          Sale
        </div>
      )}
    </nav>
  );
};

export default NavPage;
