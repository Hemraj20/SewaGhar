import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Components/AdminComponent/AdminSidebar";

const PrivateLayout = () => {
  return (
    <div className="min-h-dvh bg-[#F6F5F0] font-sans lg:flex">
      {/* Sidebar (also provides the mobile top bar and slide-in menu) */}
      <AdminSidebar />

      {/* Page content */}
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mx-auto w-full max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PrivateLayout;