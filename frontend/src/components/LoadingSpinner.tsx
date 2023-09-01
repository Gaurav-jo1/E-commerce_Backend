import React from "react";

import "../styles/Components_styles/LoadingSpinner.scss";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading_screen">
      <div className="loading_spinner" />
    </div>
  );
};

export default LoadingSpinner;
