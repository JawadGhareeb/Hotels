import { Fragment } from "react";
import { arrCart } from "../../Cart/cart";
import "./featuers.css";
export const Featuers = () => {
  return (
    <Fragment>
      <div className="featuers">
        <div className="container">
          <div className="featContent">
            {arrCart.map((cart, index) => {
              return (
                <div className="feat" key={index}>
                  <div className="Image">
                    <img src={cart.srcImage} alt="" />
                  </div>
                  <div className="textFeat">
                    <h3>{cart.head}</h3>
                    <span>{cart.explain}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
