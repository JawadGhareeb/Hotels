import React from "react";
import { NavLink } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./footer.css";
export const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="linksfooter">
          <div className="logofooter">
            <NavLink to="/">
              <h3>
                <img src="/assest/logo.png" alt="logo" />
              </h3>
            </NavLink>
          </div>
          <div className="create">
            <p>
              &copy; 2023 All right reserved create by
              <span className="prootech">Jawad</span>
            </p>
          </div>
          <ul className="followlinks">
            <NavLink>
              <li className="boxlinks">
                <FacebookIcon />
              </li>
            </NavLink>
            <NavLink to="https://github.com/JawadGhareeb">
              <li className="boxlinks">
                <GitHubIcon />
              </li>
            </NavLink>
            <NavLink to="https://www.linkedin.com/in/jawad-ghareeb-5767a4253/">
              <li className="boxlinks">
                <LinkedInIcon />
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};
