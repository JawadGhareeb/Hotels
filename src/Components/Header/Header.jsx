import React, { Fragment, useState } from "react";
import "./header.css";
import "../../App.css";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Close";
import { Box, Drawer } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
export const Header = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const sideBar = () => {
    setNav(true);
  };
  const { user, Logout } = useAuth();
  return (
    <Fragment>
      <div className="header">
        <div className="container">
          <div className="allElement">
            <div className="logo" onClick={() => navigate("/")}>
              <img src="/assest/logo.png" alt="logo" />
            </div>
            <div className="links">
              <NavLink className="link" to="/" end>
                Home
              </NavLink>
              <NavLink className="link" to="/hotel" end>
                Hotels
              </NavLink>
              <NavLink className="link" to={user ? "/order" : "/login"} end>
                Order
              </NavLink>
              <NavLink className="link" to={"/contact"} end>
                Contact
              </NavLink>
            </div>
            <div className="user">
              {user ? (
                <>
                  <button
                    className="status"
                    onClick={() => {
                      Logout();
                      navigate("/");
                    }}
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <button className="status" onClick={() => navigate("/login")}>
                    Log In
                  </button>
                </>
              )}
            </div>
            <div className="menu">
              <MenuIcon onClick={sideBar} fontSize="large" />
              <Drawer onClose={() => setNav(false)} open={nav} anchor="right">
                <Box sx={{ bgcolor: "#fff" }}></Box>
                <Box
                  height="100%"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <div className="secondLinks">
                    <div className="mark">
                      <div className="logo">
                        <img src="/assest/logo-1.png" alt="" />
                      </div>
                      <CancelIcon
                        onClick={() => setNav(false)}
                        sx={{
                          color: "var(--gold)",
                          cursor: "pointer",
                        }}
                        fontSize="medium"
                      />
                    </div>
                    <div className="MenuSecondLinks">
                      <NavLink className="link" to="/" end>
                        Home
                      </NavLink>
                      <NavLink className="link" to="/hotel" end>
                        Hotels
                      </NavLink>
                      <NavLink
                        className="link"
                        to={user ? "/order" : "/login"}
                        end
                      >
                        Order
                      </NavLink>
                      <NavLink className="link" to={"/contact"} end>
                        Contact
                      </NavLink>
                      {user ? (
                        <>
                          <button className="status" onClick={Logout}>
                            Log Out
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="status"
                            onClick={() => navigate("/login")}
                          >
                            Log In
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </Box>
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
