import { Fragment } from "react";
import "./welcomepages.css";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
export const WelcomePages = () => {
  return (
    <Fragment>
      <div className="welcome">
        <div className="container">
          <div className="welcomeHotel">
            <div className="video">
              <img src="/assest/bg_2.jpg.webp" alt="" />
            </div>
            <div className="textWelcome">
              <span>Welcome to Deluxe Hotel</span>
              <h3>Welcome To Our Hotels</h3>
              <p>
                On her way she met a copy. The copy warned the Little Blind
                Text, that where it came from it would have been rewritten a
                thousand times and everything that was left from its origin
                would be the word "and" and the Little Blind Text should turn
                around and return to its own, safe country. But nothing the copy
                said could convince her and so it didn’t take long until a few
                insidious Copy Writers ambushed her, made her drunk with Longe
                and Parole and dragged her into their agency, where they abused
                her for their.
              </p>
              <p>
                When she reached the first hills of the Italic Mountains, she
                had a last view back on the skyline of her hometown
                Bookmarksgrove, the headline of Alphabet Village and the subline
                of her own road, the Line Lane. Pityful a rethoric question ran
                over her cheek, then she continued her way.
              </p>
              <ul className="followlinks">
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};
