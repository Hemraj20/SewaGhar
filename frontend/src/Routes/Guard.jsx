import { Navigate, Outlet } from "react-router-dom";
import { useGetMeQuery } from "../redux/features/userSlice";

const Guard = () => {
    const { data, isLoading } = useGetMeQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data?.loggedUserInfo) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default Guard;