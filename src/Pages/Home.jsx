import { Fragment } from "react";
import { Header } from "../Components/Header/Header";
import { Landing } from "../Components/Landing/Landing";
import { Footer } from "../Components/Footer/Footer";
import { WelcomePages } from "../Components/WelcomePages/WelcomePages";
import { ImageFixed } from "../Components/ImageFixed/ImageFixed";
import { Featuers } from "../Components/Featuers/Featuers";
export const Home = () => {
  return (
    <Fragment>
      <Header />
      <Landing />
      <WelcomePages />
      <ImageFixed />
      <Featuers />
      <Footer />
    </Fragment>
  );
};
