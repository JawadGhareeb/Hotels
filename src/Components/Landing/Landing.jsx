import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./landing.css";
export const Landing = () => {
  const backgrounds = [
    "/assest/banner-1.jpg",
    "/assest/banner-4.jpg",
    "/assest/video.jpg",
  ];
  const [selectedBackground, setSelectedBackground] = useState(
    "/assest/banner-1.jpg"
  );
  const selectRandomBackground = () => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    const randomBackground = backgrounds[randomIndex];
    setSelectedBackground(randomBackground);
  };
  useEffect(() => {
    setInterval(selectRandomBackground, 3000);
  }, []);
  const navigate = useNavigate();
  return (
    <Fragment>
      <div
        className="landing"
        style={{ backgroundImage: `url(${selectedBackground})` }}
      >
        <div className="container">
          <div className="text">
            <span>Hotel Booking Websites</span>
            <p>The best way to</p>
            <p className="online">book hotels online</p>
          </div>
          <div className="btn" onClick={() => navigate("/hotel")}>
            <button>read more</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
