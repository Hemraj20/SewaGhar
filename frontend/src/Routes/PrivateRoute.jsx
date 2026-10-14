import AdminDashboard from "../Admin/AdminDashboard";
import ServiceDashboard from "../Admin/ServiceDashboard";
import UserDashboard from "../Admin/UserDashboard";
import VendorDashboard from "../Admin/VendorDashboard";
import PrivateLayout from "../Layouts/PrivateLayout";
import Guard from "./Guard";

export const PrivateRoute = {
  element: <Guard />,
  children: [
    {
      element: <PrivateLayout />,
      children: [
        {
          path: "/admin/dashboard",
          element: <AdminDashboard />,
        },
        {
          path: "/admin/users",
          element: <UserDashboard />,
        },

        {
          path: "/admin/vendors",
          element: <VendorDashboard />,
        },
        {
          path: "/user/dashboard",
          element: <AdminDashboard />,
        },
        {
          path: "/admin/services",
          element: <ServiceDashboard />,
        },
        
      ],
    },
  ],
};
