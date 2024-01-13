import { Fragment } from "react";
import "./loading.css";
export const Loading = () => {
  return (
    <Fragment>
      <div className="dot-pulse">
        <div className="dot-pulse__dot"></div>
      </div>
    </Fragment>
  );
};
