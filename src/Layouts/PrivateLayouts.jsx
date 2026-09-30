import { Outlet } from "react-router-dom";
import Sidebar from "../Components/PrivateComponents/SideBar";

const PrivateLayouts = () => {
    return (
        <div className="flex min-h-screen bg-slate-50">

            {/* Sidebar */}
            <Sidebar />

            {/* Page Content */}
            <main className="ml-64 flex-1">
                <Outlet />
            </main>

        </div>
    );
};

export default PrivateLayouts;