import { Fragment, useState } from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { useAuth } from "../../Context/AuthContext";
import { Link, NavLink } from "react-router-dom";
import { Snackbar } from "@mui/material";
import emailjs from "@emailjs/browser";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../WelcomePages/WelcomePages";
import "./contact.css";
export const Contact = () => {
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const [send, setSend] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();
    if (user) {
      const contacJS = {
        from_name: user.name,
        from_email: user.email,
        to_name: "Jawad",
        message: message,
      };
      emailjs
        .send(
          "service_31j4mdc",
          "template_8h3vo3d",
          contacJS,
          "STNHyqS1FoXu79qZL"
        )
        .then(
          (result) => {
            setMessage("");
            setSend(false);
          },
          (error) => {
            console.log(error);
          }
        );
      setSend(true);
    } else {
      setSend(true);
    }
  };
  return (
    <Fragment>
      <Header />
      <div className="hotels">
        <div className="text">
          <p>Contact</p>
          <div className="linkspan">
            <NavLink to="/" className="link">
              Home -
            </NavLink>
            <span>contact</span>
          </div>
        </div>
      </div>
      <div className="contact">
        <div className="container">
          <div className="contactForm">
            <div className="boxOne">
              <p>Get in touch</p>
              <span>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Morbi
                vehicula en nunc et sollicitudi,Cras pulvina, nisi at imperdiet
                pharetra
              </span>
              <ul className="followlinks" style={{ marginTop: "20px" }}>
                <Link>
                  <li className="boxlinks">
                    <FacebookIcon />
                  </li>
                </Link>
                <Link>
                  <li className="boxlinks">
                    <InstagramIcon />
                  </li>
                </Link>
                <Link>
                  <li className="boxlinks">
                    <LinkedInIcon />
                  </li>
                </Link>
              </ul>
            </div>
            <div className="boxTwo">
              <p>Send Message</p>
              <form onSubmit={sendEmail}>
                <div className="boxInput">
                  <div className="boxEmail">
                    <textarea
                      className="name"
                      value={message}
                      placeholder="Type Your Message"
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  {send && user ? (
                    <svg class="ring" viewBox="25 25 50 50" stroke-width="5">
                      <circle cx="50" cy="50" r="20" />
                    </svg>
                  ) : (
                    <input type="submit" value="Send" className="btn" />
                  )}
                  <Snackbar
                    open={send}
                    autoHideDuration={1500}
                    className="success"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    message={user ? "Message Send" : "Please Login or Rgister"}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};
