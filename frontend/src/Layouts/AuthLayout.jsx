import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex flex-1 min-h-screen flex-col bg-white font-sans text-[#1B2F5B] antialiased">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
