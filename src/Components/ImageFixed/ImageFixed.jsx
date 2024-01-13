import { Fragment } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useNavigate } from "react-router-dom";
import "./imgfixed.css";
export const ImageFixed = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="fixedimg">
        <div className="imageFixed">
          <div className="container">
            <div className="bookFix">
              <div className="textFix">
                <h3>Book hotel rooms, get deals</h3>
                <h3 className="top">& book flights online.</h3>
              </div>
              <div className="rightBook" onClick={() => navigate("/hotel")}>
                <KeyboardDoubleArrowRightIcon className="animate" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
