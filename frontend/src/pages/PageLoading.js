import React from "react";
import "./Pages.css";

const PageLoading = () => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="loadingPage-container">
        <h3>page loading ...</h3>
      </div>
    </div>
  );
};

export default PageLoading;
