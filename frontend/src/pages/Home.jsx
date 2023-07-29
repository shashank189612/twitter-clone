import React from "react";
import SideBar from "./SideBar/SideBar";
import Feed from "./Feed/Feed";
import Widgets from "./SideBar/Widgets";
import auth from "../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { Outlet } from "react-router-dom";
import useLoggedInUser from "../hooks/useLoggedInUser";

const Home = () => {
  const user = useAuthState(auth);
  // console.log(user);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="app">
      <SideBar handleLogout={handleLogout} user={user} />
      <Outlet />

      <Widgets />
    </div>
  );
};

export default Home;
