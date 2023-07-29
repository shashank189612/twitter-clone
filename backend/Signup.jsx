import React, { useState } from "react";
import twitterImg from "../../assets/images/twitterimg.png";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";
import Login from "./Login";
import "./Login.css";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [signInWithGoogle, googleuser, googleloading, googleerror] =
    useSignInWithGoogle(auth);

  if (user || googleuser) {
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

    createUserWithEmailAndPassword(email, password);

    const user = {
      username: username,
      name: name,
      email: email,
    };
    axios.post("http://localhost:000/register", user);
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
        <div className="form-box">
          <TwitterIcon className="twittericon" style={{ color: "skyblue" }} />
          <h2 className="heading">Happening Now</h2>
          <h3 className="heading1">Join twitter today</h3>

          <div className="form-box">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="display-name "
                placeholder="@username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                className="display-name"
                placeholder="enter fullname"
                onChange={(e) => setName(e.target.value)}
              />

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
                <button type="submit" className="btn" onClick={handleSubmit}>
                  SignUp
                </button>
              </div>
            </form>
          </div>
          <hr />
          <div className="google-button">
            <GoogleButton
              className="g-btn"
              type="light"
              onClick={handleGoogleSignIn}
            />
          </div>
          <div className="alreadyHaveAc">
            Already have an account?
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "skyblue",
                fontWeight: "600",
                marginLeft: "5px",
              }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
