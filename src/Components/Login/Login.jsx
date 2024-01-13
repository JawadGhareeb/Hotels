import React, { Fragment, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { Snackbar } from "@mui/material";
import "../../App.css";
import "./login.css";

export const Login = () => {
  const navigate = useNavigate();
  const { Login, user } = useAuth();
  const loggedIn = useRef("");
  const [load, setLoad] = useState(false);
  const handelSubmit = (e) => {
    e.preventDefault();
    setLoad(true);
    const email = loggedIn.current.email.value;
    const password = loggedIn.current.password.value;
    const services = { email, password };
    Login(services);
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      setTimeout(() => {
        setLoad(false);
        loggedIn.current.email.value = "";
        loggedIn.current.password.value = "";
      }, 4000);
    }
  };
  return (
    <Fragment>
      <div className="login">
        <div className="container">
          <div className="form">
            <div className="image">
              <img
                src="/assest/c174cc50fd12557049ac3bfc2577a676.jpg"
                alt="LoginImage"
              />
            </div>
            <div className="inputs">
              <div className="welcomeLogin">
                <h3>Welcome</h3>
                <p>Hello there Sign in to start booking your room </p>
              </div>
              <div className="input">
                <form onSubmit={handelSubmit} ref={loggedIn}>
                  <div className="box">
                    <label for="email">Email:</label>
                    <input
                      id="email"
                      required
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                  </div>

                  <div className="box">
                    <label for="pass">Password:</label>
                    <input
                      id="pass"
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                  </div>

                  <div className="box">
                    {load ? (
                      <svg class="ring" viewBox="25 25 50 50" stroke-width="5">
                        <circle cx="50" cy="50" r="20" />
                      </svg>
                    ) : (
                      <input type="submit" value="Login" className="btn" />
                    )}
                  </div>
                </form>
                <p className="para">
                  Don't have an account? <Link to="/signup">Register</Link>
                </p>
              </div>
            </div>
            <Snackbar
              open={load}
              autoHideDuration={2500}
              className="success"
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              message={user ? "LogIn Success" : "LogIn Failed"}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
