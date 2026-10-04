import { createBrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import AuthRoutes from "./AuthRoutes";
import NotFound from "../Components/NotFound";
import { AdminRoutes } from "./AdminRoutes";

export const router = createBrowserRouter([
    PublicRoutes,
    AdminRoutes,
    PrivateRoutes,
    AuthRoutes,
    { path: '*', element: <NotFound /> }
]);