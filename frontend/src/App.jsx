import React from "react";
import {  RouterProvider } from "react-router-dom";
import { Router } from "./Routes/Index";

const App = () => {
  return <RouterProvider router={Router} />;
};

export default App;
