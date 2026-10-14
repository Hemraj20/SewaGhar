import Login from "../Components/AuthComponent/Login";
import Register from "../Components/AuthComponent/Register";
import AuthLayout from "../Layouts/AuthLayout";

export const AuthRoute = {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      {path:"/register", element:<Register/> }
    ],
  }
;
