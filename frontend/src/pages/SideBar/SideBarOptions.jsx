import React from "react";
import "./SideBarOptions.css";

const SideBarOptions = ({ active, text, Icon }) => {
  return (
    <div className={`sideBarOptions ${active && "sideBarOptions_active"}`}>
      <Icon />
      <h2>{text}</h2>
    </div>
  );
};

export default SideBarOptions;
