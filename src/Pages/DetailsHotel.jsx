import { Fragment } from "react";
import { Header } from "../Components/Header/Header";
import { HotelDetails } from "../Components/HotelDetails/HotelDetails";
import { Footer } from "../Components/Footer/Footer";
export const DetailsHotel = () => {
  return (
    <Fragment>
      <Header />
      <HotelDetails />
      <Footer />
    </Fragment>
  );
};
