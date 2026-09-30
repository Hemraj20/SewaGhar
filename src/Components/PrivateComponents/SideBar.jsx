
import { FileText, LayoutDashboard, LogOut, Settings, Store, Users, Wrench } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutModal from "../Modals/LogoutModal";
import { useLogoutMutation } from "../../redux/features/userSlice";
import { toast } from "react-toastify";

const Sidebar = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            const res = await logout().unwrap();
            toast.success(res.message);
            localStorage.removeItem('user');
            setShowModal(false);
            navigate('/login');

        }
        catch (err) {
            toast.error(err?.data?.message || 'Logout Failed');
        }
    }

    return (
        <>
            <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1F3A3D] text-white">

                {/* Logo */}
                <div className="flex h-20 items-center border-b border-white/10 px-6">
                    <NavLink to='/'>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E0912B] text-xl font-bold">
                            S
                        </div>
                    </NavLink>

                    <div className="ml-3">
                        <h1 className="text-xl font-bold">
                            sewa<span className="text-[#E0912B]">X</span>
                        </h1>

                        <p className="text-xs text-white/40">
                            Admin Panel
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="px-4 py-6">

                    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-white/30">
                        Main Menu
                    </p>

                    <div className="space-y-1">

                        <NavLink
                            to="/admin/dashboard"
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${isActive
                                    ? "bg-[#E0912B] text-white"
                                    : "text-white/60 hover:bg-white/10 hover:text-white"
                                }`
                            }
                        >
                            <LayoutDashboard size={19} />
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/admin/users"
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${isActive
                                    ? "bg-[#E0912B] text-white"
                                    : "text-white/60 hover:bg-white/10 hover:text-white"
                                }`
                            }
                        >
                            <Users size={19} />
                            Users
                        </NavLink>

                        <NavLink
                            to="/admin/vendors"
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${isActive
                                    ? "bg-[#E0912B] text-white"
                                    : "text-white/60 hover:bg-white/10 hover:text-white"
                                }`
                            }
                        >
                            <Store size={19} />
                            Vendors
                        </NavLink>

                        <NavLink
                            to="/admin/services"
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${isActive
                                    ? "bg-[#E0912B] text-white"
                                    : "text-white/60 hover:bg-white/10 hover:text-white"
                                }`
                            }
                        >
                            <Wrench size={19} />
                            Services
                        </NavLink>

                        <NavLink
                            to="/admin/vendor/services"
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${isActive
                                    ? "bg-[#E0912B] text-white"
                                    : "text-white/60 hover:bg-white/10 hover:text-white"
                                }`
                            }
                        >
                            <Store size={19} />
                            Vendor Services
                        </NavLink>

                        <NavLink
                            to="/admin/posts"
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${isActive
                                    ? "bg-[#E0912B] text-white"
                                    : "text-white/60 hover:bg-white/10 hover:text-white"
                                }`
                            }
                        >
                            <FileText size={19} />
                            Service Posts
                        </NavLink>

                    </div>

                    {/* Other */}
                    <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-white/30">
                        Other
                    </p>

                    <div className="space-y-1">

                        <NavLink
                            to="/admin/settings"
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${isActive
                                    ? "bg-[#E0912B] text-white"
                                    : "text-white/60 hover:bg-white/10 hover:text-white"
                                }`
                            }
                        >
                            <Settings size={19} />
                            Settings
                        </NavLink>

                    </div>

                </nav>

                {/* Bottom */}
                <div className="absolute bottom-0 left-0 w-full border-t border-white/10 p-4">

                    <button
                        onClick={() => setShowModal(true)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-white/60 transition hover:bg-red-500/10 hover:text-red-400"
                    >
                        <LogOut size={19} />
                        Logout
                    </button>

                </div>

            </aside>

            <div>
                {
                    showModal && <LogoutModal
                        onConfirm={handleLogout}
                        onCancel={() => setShowModal(false)}
                    />
                }
            </div>

        </>
    );
};

export default Sidebar;

