import React, { useState } from "react";
import twitterImg from "../../assets/images/twitterimg.png";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import "./Login.css";
import { blue } from "@mui/material/colors";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState("");
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [signInWithGoogle, googleuser, googleloading, googleerror] =
    useSignInWithGoogle(auth);

  if (user || googleuser) {
    navigate("/home/feed");
    console.log(user);
    console.log(googleuser);
  }
  if (error || googleerror) {
    error ? console.log(error.message) : console.log();
    googleerror ? console.log(googleerror.message) : console.log();
  }
  if (loading) {
    console.log("loading....");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("login clicked");
    console.log(email, password);
    signInWithEmailAndPassword(email, password);
  };

  const handleGoogleSignIn = () => {
    console.log("google clicked");
    signInWithGoogle();
  };

  return (
    <div className="login-container">
      <div className="img-container">
        <img className="image" src={twitterImg} alt="" />
      </div>
      <div className="form-container">
        <TwitterIcon className="twittericon" style={{ color: "skyblue" }} />
        <h2 className="heading">Happening Now</h2>
        <h3 className="heading1">What's happening today</h3>

        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <input
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email"
              type="email"
              className="email"
            />

            <input
              onChange={(event) => setPassword(event.target.value)}
              placeholder="password"
              type="password"
              className="password"
            />

            <div className="btn-login">
              <button
                type="submit"
                className="btn"
                onClick={signInWithEmailAndPassword}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="google-button">
          <GoogleButton
            className="g-btn"
            type="light"
            onClick={handleGoogleSignIn}
          />
        </div>
        <div>
          Don't have an account?
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: "skyblue",
              fontWeight: "600",
              marginLeft: "5px",
            }}
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
