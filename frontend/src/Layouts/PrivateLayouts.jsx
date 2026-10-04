import { Outlet } from "react-router-dom";
const PrivateLayouts = () => {
    return (
        <div className="min-h-screen">
            <Outlet />


        </div>
    );
};

export default PrivateLayouts;