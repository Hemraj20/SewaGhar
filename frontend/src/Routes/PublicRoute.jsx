import HomePage from "../Page/HomePage";
import PublicLayout from "../Layouts/PublicLayout";
import Vendor from "../Components/Shared/Vendor";
import Post from "../Components/Shared/Post";
import About from "../Components/Shared/About";

export const PublicRoute = {
  element: <PublicLayout />,
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/vendors",
      element: <Vendor  />,
    },
     {
      path: "/posts",
      element: <Post  />,
    },
     {
      path: "/about",
      element: <About  />,
    },
  ],
};
