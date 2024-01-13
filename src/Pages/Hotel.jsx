import React, { Fragment } from "react";
import { Header } from "../Components/Header/Header";
import { Hotels } from "../Components/Hotels/Hotels";
import { Footer } from "../Components/Footer/Footer";

export const Hotel = () => {
  return (
    <Fragment>
      <Header />
      <Hotels />
      <Footer />
    </Fragment>
  );
};
