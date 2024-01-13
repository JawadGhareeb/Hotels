import { Fragment, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./hoteldetail.css";
import { ID, databases } from "../../appwrite/appwriteConfig";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Loading } from "../Loading/Loading";
import { useAuth } from "../../Context/AuthContext";
import CancelIcon from "@mui/icons-material/Cancel";
import { dotPulse } from "ldrs";
export const HotelDetails = () => {
  dotPulse.register();
  const { id } = useParams();
  const [datas, setData] = useState();
  const [name, setName] = useState("");
  const getMessage = async () => {
    const response = await databases.listDocuments(
      "652a5e59d1dea3e3e921",
      "652a5e704ea9137ef6cd"
    );
    setData(response.documents[id]);
    setName(response.documents[id]?.name);
  };
  const refRender = useRef("");
  useEffect(() => {
    refRender.current = datas;
  }, [datas]);
  useEffect(() => {
    if (!datas) {
      if (refRender) {
        getMessage();
      }
    }
  }, [datas, refRender]);
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState("");
  const [number, setNumber] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const handelChange = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
    if (e.target.value === "Suite") {
      setPrice("$70");
    } else if (e.target.value === "Small Suite") {
      setPrice("$70");
    } else if (e.target.value === "Single Room") {
      setPrice("$35");
    } else if (e.target.value === "Double Room") {
      setPrice("$40");
    } else if (e.target.value === "Family Room") {
      setPrice("$55");
    } else if (e.target.value === "Room VIP") {
      setPrice("$85");
    }
  };
  const handelChnageRoom = (e) => {
    e.preventDefault();
    setNumber(e.target.value);
  };
  const navigate = useNavigate();
  const { user } = useAuth();
  const IdUser = user.$id;
  const createDocument = () => {
    if (
      category !== "" &&
      number !== "" &&
      dateStart !== "" &&
      dateEnd !== ""
    ) {
      const promise = databases.createDocument(
        "652a5e59d1dea3e3e921",
        "6530f86fa5f5d0fe91aa",
        ID.unique(),
        {
          numberRoom: number,
          category: category,
          name: name,
          start: dateStart,
          end: dateEnd,
          userID: IdUser,
        }
      );
      promise.then(
        function (response) {
          console.log(response);
        },
        function (error) {
          console.log(error);
        }
      );
      navigate("/order");
    } else {
      console.log("Error");
    }
  };
  const [load, setLoad] = useState(true);
  useEffect(() => {
    if (datas) {
      setLoad(false);
    }
  }, [datas]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const fetchAvailableRooms = async () => {
    const response = await databases.listDocuments(
      "652a5e59d1dea3e3e921",
      "6530f86fa5f5d0fe91aa"
    );
    const bookedRooms = response.documents
      .filter((document) => document.name === datas.name)
      .map((document) => document.numberRoom);
    const availableRooms = datas.arrayRooms.filter(
      (room) => !bookedRooms.includes(room)
    );
    setAvailableRooms(availableRooms);
  };
  useEffect(() => {
    if (datas) {
      fetchAvailableRooms();
    }
  }, [datas]);
  return (
    <Fragment>
      <div className="hotel">
        <div className="text">
          <p>
            {datas ? (
              datas.name
            ) : (
              <l-dot-pulse size="28" speed="1.3" color="#fff"></l-dot-pulse>
            )}
          </p>
          <div className="linkspan">
            <NavLink to="/" className="link">
              Home -
            </NavLink>
            <span>ShowHotel</span>
          </div>
        </div>
      </div>
      {load ? (
        <Loading />
      ) : (
        <div className="details">
          <div className="container">
            <div className="insideHotel">
              <h3>The best way to book room online for luxury hotels</h3>
              <p>
                Praesent non ullamcorper ligula. Proin a mi vitae massa lacinia
                sollicitudin eget eu ante. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Pellentesque consectetur rhoncus
                lobortis. Curabitur sit amet velit sagittis, pellentesque diam
                euismod, faucibus quam. Cras non rhoncus ipsum. Quisque mattis
                arcu metus, a fermentum justo semper in. Aliquam egestas metus
                at nunc aliquam.
              </p>
              <p>
                id molestie ex ornare. Aliquam id arcu vel sem pretium porttitor
                non maximus diam. Quisque urna turpis, euismod sed elementum
                vel, pellentesque eu eros. Orci varius natoque penatibus et
                magnis dis parturient montes, nascetur ridiculus musc.
              </p>
              <div className="image">
                <div className="box">
                  <img
                    src={datas ? datas.arrayImages[0] : null}
                    alt="roomImage"
                  />
                </div>
                <div className="box">
                  <img
                    src={datas ? datas.arrayImages[1] : null}
                    alt="receptionImage"
                  />
                </div>
              </div>
              <Button
                className="btn"
                onClick={() => {
                  if (user) {
                    setOpen(true);
                  } else {
                    navigate("/login");
                  }
                }}
              >
                Book Now
              </Button>
            </div>
            <Dialog
              aria-labelledby="dialog-book"
              open={open}
              onClose={() => {
                setOpen(false);
                setCategory("");
                setNumber("");
                setPrice("");
              }}
              className="book"
            >
              <DialogTitle id="aria-labelldby">
                <div className="bookContent">
                  <div className="logo">
                    <img src="/assest/logo-1.png" alt="" />
                  </div>
                  <div
                    className="close"
                    onClick={() => {
                      setOpen(false);
                      setCategory("");
                      setNumber("");
                      setPrice("");
                    }}
                  >
                    <CancelIcon
                      sx={{
                        fontSize: "28px",
                      }}
                    />
                  </div>
                </div>
              </DialogTitle>
              <DialogContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  paddingTop: "8px",
                  paddingBottom: "0px",
                }}
              >
                <div className="selectBook">
                  <InputLabel
                    id="demo-select-small-label"
                    sx={{
                      cursor: "pointer",
                    }}
                    className="label"
                  >
                    Category:
                  </InputLabel>
                  <Select
                    variant="outlined"
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    className="selectInput"
                    color="warning"
                    value={category}
                    onChange={handelChange}
                  >
                    {datas
                      ? datas.arrayCategory.map((type, index) => {
                          return (
                            <MenuItem
                              sx={{
                                padding: "15px",
                                borderBottom: "1px solid #ccc",
                                backgroundColor: "#fff",
                              }}
                              value={type}
                              key={index}
                            >
                              {type}
                            </MenuItem>
                          );
                        })
                      : null}
                  </Select>
                </div>
                <div className="selectBook">
                  <InputLabel
                    id="demo-select-small-label"
                    sx={{
                      cursor: "pointer",
                      marginRight: "20px",
                    }}
                    className="label"
                  >
                    Room:
                  </InputLabel>
                  <Select
                    select
                    variant="outlined"
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    className="selectInput"
                    color="warning"
                    value={number}
                    onChange={handelChnageRoom}
                  >
                    {availableRooms.map((room, index) => (
                      <MenuItem
                        sx={{
                          padding: "15px",
                          borderBottom: "1px solid #ccc",
                          backgroundColor: "#fff",
                        }}
                        key={index}
                        value={room}
                      >
                        {room}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="selectBook">
                  <InputLabel className="label" for="from">
                    From:{" "}
                  </InputLabel>
                  <input
                    type="date"
                    id="from"
                    className="date"
                    onChange={(e) => {
                      setDateStart(e.target.value);
                    }}
                  />
                  <InputLabel className="label" for="to">
                    To:{" "}
                  </InputLabel>
                  <input
                    type="date"
                    id="to"
                    onChange={(e) => {
                      setDateEnd(e.target.value);
                    }}
                    className="date"
                  />
                </div>
                <div className="selectBook">
                  <h3>Price Per Night:</h3>
                  <span>{price}</span>
                </div>
              </DialogContent>
              <DialogActions sx={{ paddingTop: "0" }}>
                <Button
                  className="btn"
                  onClick={() => {
                    setOpen(false);
                    setCategory("");
                    setNumber("");
                    setPrice("");
                    setDateEnd("");
                    setDateStart("");
                  }}
                >
                  Cancel
                </Button>
                <Button className="btn" onClick={createDocument}>
                  Book
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      )}
    </Fragment>
  );
};
