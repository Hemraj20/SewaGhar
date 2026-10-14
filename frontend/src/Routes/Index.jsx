import { createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "./AuthRoute";
import { PublicRoute } from "./PublicRoute";
import NotFoundPage from "../Components/PublicComponent/NotFoundPage";
import { PrivateRoute } from "./PrivateRoute";

export const Router = createBrowserRouter([
  AuthRoute,
  PrivateRoute,
  PublicRoute,
  { path: "*", element: <NotFoundPage /> },
]);
