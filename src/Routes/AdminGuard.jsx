import { Navigate, Outlet } from "react-router-dom";
import { useGetMeQuery } from "../redux/features/userSlice";

const AdminGuard = () => {
    const { data, isLoading } = useGetMeQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data?.loggedUserInfo) {
        return <Navigate to="/login" replace />;
    }
    if (data?.loggedUserInfo?.role !== 'admin') {
        return <Navigate to='/' replace />
    }

    return <Outlet />;
};

export default AdminGuard;