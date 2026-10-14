import React from "react";
import Header from "../Components/Shared/Header";

import Footer from "../Components/Shared/Footer";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <Header />
     <Outlet/>
      <Footer />
    </>
  );
};

export default PublicLayout;
