import React, { Fragment, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import "./register.css";
import { useAuth } from "../../Context/AuthContext";
import { Snackbar } from "@mui/material";
export const Register = () => {
  const navigate = useNavigate();
  const { Register } = useAuth();
  const [load, setLoad] = useState(false);
  const registeruser = useRef("");
  const handelSubmit = (e) => {
    e.preventDefault();
    const Name = registeruser.current.name.value;
    const Email = registeruser.current.email.value;
    const Pass1 = registeruser.current.pass1.value;
    const Pass2 = registeruser.current.pass2.value;
    if (Pass1 !== Pass2) {
      alert("Passwords do not match");
      registeruser.current.pass1.value = "";
      registeruser.current.pass2.value = "";
      return;
    } else {
      setLoad(true);
      const userinfo = { Name, Email, Pass1, Pass2 };
      Register(userinfo);
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    }
  };
  const [nameUser, setNameUser] = useState("");
  const handelChange = (e) => {
    setNameUser(e.target.value);
  };
  return (
    <Fragment>
      <div className="register">
        <div className="container">
          <div className="form">
            <div className="image">
              <img
                src="/assest/c174cc50fd12557049ac3bfc2577a676.jpg"
                alt="RegisterImage"
              />
            </div>
            <div className="inputs">
              <div className="welcomeRegister">
                <h3>Welcome {nameUser}</h3>
                <p>
                  Hello {nameUser ? nameUser : "there"} create your account to
                  start booking your room{" "}
                </p>
              </div>
              <div className="input">
                <form onSubmit={handelSubmit} ref={registeruser}>
                  <div className="box">
                    <label for="name">Name:</label>
                    <input
                      id="name"
                      required
                      type="name"
                      name="name"
                      placeholder="Enter Your Name"
                      onChange={handelChange}
                    />
                  </div>
                  <div className="box">
                    <label for="email">Email:</label>
                    <input
                      id="email"
                      required
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                    />
                  </div>

                  <div className="box">
                    <label for="pass1">Password:</label>
                    <input
                      id="pass1"
                      required
                      type="password"
                      name="pass1"
                      placeholder="Enter Password"
                    />
                  </div>

                  <div className="box">
                    <label for="pass2">Confirm Password:</label>
                    <input
                      id="pass2"
                      type="password"
                      name="password"
                      placeholder="Confirm Password"
                    />
                  </div>

                  <div className="box">
                    {load ? (
                      <svg class="ring" viewBox="25 25 50 50" stroke-width="5">
                        <circle cx="50" cy="50" r="20" />
                      </svg>
                    ) : (
                      <input type="submit" value="Register" className="btn" />
                    )}
                  </div>
                </form>
              </div>
              <Snackbar
                open={load}
                autoHideDuration={2500}
                className="success"
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                message="Register Complate"
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
