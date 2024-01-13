import { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { databases } from "../../appwrite/appwriteConfig";
import "./order.css";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { useAuth } from "../../Context/AuthContext";
import { arrayRooms, arrayCategory } from "../../Cart/cart";
export const Order = () => {
  const navigate = useNavigate();
  const [datas, setData] = useState();
  const getMessage = async () => {
    const response = await databases.listDocuments(
      "652a5e59d1dea3e3e921",
      "6530f86fa5f5d0fe91aa"
    );
    setData(response.documents);
  };
  const [edit, setEdit] = useState();
  const handelEdit = async (index) => {
    setOpen(true);
    const IdDocument = userOrder[index].$id;
    const promise = await databases.getDocument(
      "652a5e59d1dea3e3e921",
      "6530f86fa5f5d0fe91aa",
      IdDocument
    );
    setEdit(promise);
  };
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [numberRoom, setnumberRoom] = useState("");
  const handleChange1 = (e) => {
    setnumberRoom(e.target.value);
  };
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState("");
  const handleChange2 = (e) => {
    setnumberRoom(e.target.value);
    e.preventDefault();
    setCategory(e.target.value);
    if (e.target.value === "Suite") {
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
  const [start, setStart] = useState("");
  const handleChange3 = (e) => {
    setStart(e.target.value);
  };
  const [end, setEnd] = useState("");
  const handleChange4 = (e) => {
    setEnd(e.target.value);
  };
  const [userOrder, setUserOrder] = useState(null);

  useEffect(() => {
    if (datas?.length > 0) {
      const foundOrders = datas.filter(
        (dataOrder) => user.$id === dataOrder.userID
      );
      setUserOrder(foundOrders);
    }
  }, [datas, setUserOrder, user.$id]);
  const UpdateDocument = () => {
    setOpen(false);
    setCategory("");
    setnumberRoom("");
    setStart("");
    setEnd("");
    const IdDocument = edit.$id;
    const promise = databases.updateDocument(
      "652a5e59d1dea3e3e921",
      "6530f86fa5f5d0fe91aa",
      IdDocument,
      {
        numberRoom: numberRoom ? numberRoom : edit.numberRoom,
        category: category ? category : edit.category,
        name: edit.name,
        start: start ? start : edit.start,
        end: end ? end : edit.end,
      }
    );
    promise.then(
      function (response) {
        getMessage(); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };
  const DeleteDocument = (index) => {
    const IdDocument = userOrder[index].$id;
    console.log(IdDocument);
    const promise = databases.deleteDocument(
      "652a5e59d1dea3e3e921",
      "6530f86fa5f5d0fe91aa",
      IdDocument
    );
    promise.then(
      function (response) {
        // Delete successful
        // Update the local state or data immediately
        const updatedOrders = userOrder.filter((order, i) => i !== index);
        setUserOrder(updatedOrders);
        getMessage();
      },
      function (error) {
        console.log(error);
      }
    );
  };
  useEffect(() => {
    if (!datas) {
      getMessage();
    }
  }, [datas]);
  return (
    <Fragment>
      <Header />
      <div className="order">
        <div className="text">
          <p>Orders</p>
          <div className="linkspan">
            <NavLink to="/" className="link">
              Home -
            </NavLink>
            <span>Order</span>
          </div>
        </div>
      </div>
      <div className="orderDetail">
        <div className="container">
          <div className="showOrder">
            <table>
              <thead className="headerTable">
                <tr className="detailheader">
                  <td>#.</td>
                  <td>Hotel Name</td>
                  <td>Room</td>
                  <td>From</td>
                  <td>To</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="bodyTable">
                {userOrder?.length > 0 ? (
                  userOrder.map((order, index) => {
                    return (
                      <tr className="detailbody" key={index}>
                        <td>{index + 1}.</td>
                        <td>{order.name}</td>
                        <td>{order.numberRoom}</td>
                        <td>{order.start}</td>
                        <td>{order.end}</td>
                        <td>
                          <ButtonGroup size="small">
                            <Button
                              variant="contained"
                              className="btn"
                              onClick={() => DeleteDocument(index)}
                            >
                              Delete
                            </Button>
                            <Button
                              variant="contained"
                              className="btn"
                              onClick={() => handelEdit(index)}
                            >
                              Edit
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <h3 className="load">
                    <span>There aren't any Order Yet</span>
                    <Button
                      variant="contained"
                      onClick={() => navigate("/hotel")}
                      sx={{ marginLeft: "10px" }}
                      className="btn"
                      size="small"
                    >
                      Book
                    </Button>
                  </h3>
                )}
              </tbody>
            </table>
            <Dialog
              id="aria-labelldby"
              open={open}
              onClose={() => setOpen(false)}
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
                    name={category}
                    value={category}
                    onChange={handleChange2}
                  >
                    {arrayCategory.map((categ, index) => {
                      return (
                        <MenuItem
                          sx={{
                            padding: "15px",
                            borderBottom: "1px solid #ccc",
                            backgroundColor: "#fff",
                          }}
                          value={categ}
                          key={index}
                        >
                          {categ}
                        </MenuItem>
                      );
                    })}
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
                    name={numberRoom}
                    value={numberRoom}
                    onChange={handleChange1}
                  >
                    {arrayRooms.map((room) => {
                      return (
                        <MenuItem
                          sx={{
                            padding: "15px",
                            borderBottom: "1px solid #ccc",
                            backgroundColor: "#fff",
                          }}
                          value={room}
                        >
                          {room}
                        </MenuItem>
                      );
                    })}
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
                    name={start}
                    value={start}
                    onChange={handleChange3}
                  />
                  <InputLabel className="label" for="to">
                    To:{" "}
                  </InputLabel>
                  <input
                    type="date"
                    id="to"
                    className="date"
                    name={end}
                    value={end}
                    onChange={handleChange4}
                  />
                </div>
                <div className="selectBook">
                  <h3>Price Per Night:</h3>
                  <span>{price}</span>
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  className="btn"
                  onClick={() => {
                    setOpen(false);
                    setCategory("");
                    setnumberRoom("");
                    setStart("");
                    setEnd("");
                  }}
                >
                  Cancel
                </Button>
                <Button className="btn" onClick={UpdateDocument}>
                  Edit
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};
