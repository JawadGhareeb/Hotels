import React, { Fragment, useEffect, useRef, useState } from "react";
import { databases } from "../../appwrite/appwriteConfig";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import StarIcon from "@mui/icons-material/Star";
import { NavLink } from "react-router-dom";
import { Rating, Snackbar } from "@mui/material";
import { Loading } from "../Loading/Loading";
import { useAuth } from "../../Context/AuthContext";
import "./hotel.css";
export const Hotels = () => {
  const { user } = useAuth();
  const [data, setData] = useState();
  const refRender = useRef("");
  useEffect(() => {
    refRender.current = data;
  });
  useEffect(() => {
    if (!data) {
      if (refRender) {
        getMessage();
      }
    }
  }, [data, refRender]);
  const getMessage = async () => {
    const response = await databases.listDocuments(
      "652a5e59d1dea3e3e921",
      "652a5e704ea9137ef6cd"
    );
    setData(response.documents);
  };
  const [load, setLoad] = useState(true);
  useEffect(() => {
    if (data?.length > 0) {
      setLoad(false);
    }
  }, [data]);
  const [dontlog, setDontLog] = useState(false);
  return (
    <Fragment>
      <div className="hotels">
        <div className="text">
          <p>Hotel List</p>
          <div className="linkspan">
            <NavLink to="/" className="link">
              Home -
            </NavLink>
            <span>Hotels</span>
          </div>
        </div>
      </div>
      {load ? (
        <Loading />
      ) : (
        <div className="showhotels">
          <div className="container">
            <div className="details">
              {data.map((e, index) => {
                return (
                  <div className="boxhotel" key={index} id={index}>
                    <div className="image">
                      <img src={e.img} alt="" />
                    </div>
                    <div className="hotelsdetail">
                      <h3 className="name">{e.name}</h3>
                      <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit.
                      </p>
                      <span className="location">{e.location}</span>
                      <div className="moredetails">
                        <div className="rate">
                          <Rating
                            precision={0.25}
                            defaultValue={e.rate}
                            icon={
                              <StarIcon
                                sx={{
                                  color: "#b89146",
                                }}
                                readOnly
                              />
                            }
                            color="secondary"
                          />
                        </div>
                        <NavLink
                          className="read"
                          to={user ? `/${index}` : ""}
                          onClick={() => {
                            if (user) {
                              console.log("Logged");
                            } else {
                              setDontLog(true);
                              setTimeout(() => {
                                setDontLog(false);
                              }, 2000);
                            }
                          }}
                        >
                          read more
                          <KeyboardDoubleArrowLeftIcon className="more" />
                        </NavLink>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <Snackbar
        open={dontlog}
        autoHideDuration={2500}
        className="success"
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        message="Please Login or Register to Show Hotel Details..."
      />
    </Fragment>
  );
};
