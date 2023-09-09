import React from "react";

import "../styles/Components_styles/LoadingSpinner.scss";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-screen">
      <div className="loading-screen__spinner" />
    </div>
  );
};

export default LoadingSpinner;
