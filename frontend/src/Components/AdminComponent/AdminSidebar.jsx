import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import sewaGharLogo from "../../assets/sewaghar-logo.png";
import LogoutModal from "../Modal/LogoutModal";
import { useLogoutMutation } from "../../Redux/Features/UserSlice";

/*
  SewaGhar Dashboard Sidebar: one sidebar for admin, vendor and user.
  The menu, label and home link change with `user.role`.

  The logged-in user (and role) is read from localStorage by default.
  You can still override it:  <DashboardSidebar user={{ name, email, role }} />
  role:   "admin" | "vendor" | "user"   (anything else falls back to "user")

  Place at: src/Components/Shared/DashboardSidebar.jsx
*/

/* --------------------- Logged-in user and role ------------------------- */

// TODO: set this to the key your login uses, e.g. localStorage.setItem("user", ...)
const USER_KEY = "user";

// Reads the logged-in user from localStorage.
// Works whether you saved the user itself ({ name, email, role })
// or an object that wraps it ({ user: { ... }, token }).
const readStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data?.user ?? data ?? null;
  } catch {
    return null; // missing or corrupted value
  }
};

// Accept common spellings from the backend ("Admin", "provider", "customer"...)
const roleAliases = {
  admin: "admin",
  vendor: "vendor",
  provider: "vendor",
  user: "user",
  customer: "user",
};

const normalizeRole = (role) =>
  roleAliases[String(role || "").trim().toLowerCase()] || "user";

/* -------------------------------- Icons -------------------------------- */

const Icon = ({ children, className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

const ic = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </>
  ),
  bookings: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  services: <path d="M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10" />,
  provider: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
    </>
  ),
  customers: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
      <path d="M16 4.6a3.5 3.5 0 010 6.8M18 14.3c2.2.7 3.5 2.6 3.5 5.7" />
    </>
  ),
  payments: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20M6 15h4" />
    </>
  ),
  star: (
    <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.2l-5.6 3 1.1-6.2L3 9.6l6.2-.9z" />
  ),
  reports: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  earnings: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9.5 9.5c0-1 1-1.8 2.5-1.8s2.5.8 2.5 1.8-1 1.6-2.5 1.9-2.5.9-2.5 1.9 1 1.8 2.5 1.8 2.5-.8 2.5-1.8" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z" />
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.5a2.4 2.4 0 114.8 0c0 1.4-2.4 1.8-2.4 3.2M12 17h.01" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" />
    </>
  ),
};

/* --------------------------- Menus per role ---------------------------- */
// TODO: adjust labels and routes to match your pages.

const menus = {
  admin: {
    label: "Admin",
    home: "/admin",
    groups: [
      {
        title: "Overview",
        items: [
          { label: "Dashboard", to: "/admin", end: true, icon: ic.dashboard },
          { label: "Bookings", to: "/admin/bookings", icon: ic.bookings },
        ],
      },
      {
        title: "Manage",
        items: [
          { label: "Services", to: "/admin/services", icon: ic.services },
          { label: "Vendors", to: "/admin/vendors", icon: ic.provider },
          { label: "Customers", to: "/admin/users", icon: ic.customers },
          { label: "Payments", to: "/admin/payments", icon: ic.payments },
          { label: "Reviews", to: "/admin/reviews", icon: ic.star },
        ],
      },
      {
        title: "System",
        items: [
          { label: "Reports", to: "/admin/reports", icon: ic.reports },
          { label: "Settings", to: "/admin/settings", icon: ic.settings },
        ],
      },
    ],
  },

  vendor: {
    label: "Vendor",
    home: "/vendor",
    groups: [
      {
        title: "Overview",
        items: [
          { label: "Dashboard", to: "/vendor", end: true, icon: ic.dashboard },
          { label: "Bookings", to: "/vendor/bookings", icon: ic.bookings },
        ],
      },
      {
        title: "My Services",
        items: [
          { label: "Services", to: "/vendor/services", icon: ic.services },
          { label: "Earnings", to: "/vendor/earnings", icon: ic.earnings },
          { label: "Reviews", to: "/vendor/reviews", icon: ic.star },
        ],
      },
      {
        title: "Account",
        items: [
          { label: "Profile", to: "/vendor/profile", icon: ic.provider },
          { label: "Settings", to: "/vendor/settings", icon: ic.settings },
        ],
      },
    ],
  },

  user: {
    label: "Customer",
    home: "/account",
    groups: [
      {
        title: "Overview",
        items: [
          { label: "Dashboard", to: "/account", end: true, icon: ic.dashboard },
          { label: "My bookings", to: "/account/bookings", icon: ic.bookings },
          { label: "Favorites", to: "/account/favorites", icon: ic.heart },
        ],
      },
      {
        title: "Billing",
        items: [
          { label: "Payment history", to: "/account/payments", icon: ic.payments },
        ],
      },
      {
        title: "Account",
        items: [
          { label: "Profile", to: "/account/profile", icon: ic.provider },
          { label: "Help & support", to: "/account/support", icon: ic.help },
          { label: "Settings", to: "/account/settings", icon: ic.settings },
        ],
      },
    ],
  },
};

/* -------------------------------- Parts -------------------------------- */

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0892F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B2F5B]";

const Brand = ({ home, label }) => (
  <Link
    to={home}
    aria-label={`SewaGhar ${label} home`}
    className={`flex items-center gap-2.5 rounded-lg ${focusRing}`}
  >
    <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-[#F6F5F0]">
      <img
        src={sewaGharLogo}
        alt=""
        className="h-9 w-9 select-none object-contain"
        draggable="false"
      />
    </span>
    <span className="leading-tight">
      <span className="block text-xl font-bold tracking-tight text-white">
        SewaGhar
      </span>
      <span className="block text-xs font-semibold uppercase tracking-widest text-[#F0892F]">
        {label}
      </span>
    </span>
  </Link>
);

/* ------------------------------- Sidebar -------------------------------- */

const DashboardSidebar = ({ user: userProp }) => {
  const [open, setOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  // Who is logged in? (prop wins, otherwise localStorage)
  const [storedUser, setStoredUser] = useState(readStoredUser);
  const user = userProp || storedUser;

  // Keep in sync if the user changes in another tab (login / logout)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === USER_KEY || e.key === null) setStoredUser(readStoredUser());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Pick the menu from the role; unknown or missing roles get the customer menu
  const role = normalizeRole(user?.role);
  const menu = menus[role];
  const name = user?.name || menu.label;
  const email = user?.email || "";

  // Close the drawer with Escape and lock page scroll while it's open (mobile)
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleLogout = async () => {
    try {
      const res = await logout().unwrap();
      toast.success(res?.message || "Logged out");
      localStorage.removeItem(USER_KEY); // forget the logged-in user
      setLogoutModal(false);
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || "Unable to log out");
    }
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#E6E8EE] bg-white px-4 sm:px-6 lg:hidden">
        <Link
          to={menu.home}
          className="flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2F5B]"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#F6F5F0]">
            <img src={sewaGharLogo} alt="" className="h-8 w-8 object-contain" />
          </span>
          <span className="text-lg font-bold tracking-tight text-[#1B2F5B]">
            SewaGhar <span className="text-[#D9741C]">{menu.label}</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
          aria-expanded={open}
          aria-controls="dashboard-sidebar"
          className="-mr-2 grid h-11 w-11 place-items-center rounded-xl text-[#1B2F5B] transition-colors hover:bg-[#F6F5F0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2F5B]"
        >
          <Icon className="h-6 w-6">
            <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="2" />
          </Icon>
        </button>
      </div>

      {/* Overlay (mobile) */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-[#1B2F5B]/50 transition-opacity duration-200 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        id="dashboard-sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#1B2F5B] font-sans text-white transition-transform duration-200 ease-out lg:sticky lg:top-0 lg:z-auto lg:h-dvh lg:flex-none lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full invisible lg:visible"
        }`}
      >
        {/* Header */}
        <div className="flex h-20 flex-none items-center justify-between border-b border-white/10 px-5">
          <Brand home={menu.home} label={menu.label} />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
            className={`-mr-2 grid h-10 w-10 place-items-center rounded-xl text-white/80 transition-colors hover:bg-white/10 hover:text-white lg:hidden ${focusRing}`}
          >
            <Icon className="h-5 w-5">
              <path d="M6 6l12 12M18 6L6 18" strokeWidth="2" />
            </Icon>
          </button>
        </div>

        {/* Navigation (changes with role) */}
        <nav
          aria-label={`${menu.label} navigation`}
          className="flex-1 space-y-6 overflow-y-auto px-3 py-6"
        >
          {menu.groups.map((group) => (
            <div key={group.title}>
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-widest text-white/50">
                {group.title}
              </p>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.95rem] transition-colors ${focusRing} ${
                          isActive
                            ? "bg-white/10 font-bold text-white before:absolute before:-left-3 before:top-1/2 before:h-6 before:w-1 before:-translate-y-1/2 before:rounded-r-full before:bg-[#F0892F]"
                            : "font-medium text-white/70 hover:bg-white/5 hover:text-white"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            className={
                              isActive
                                ? "text-[#F0892F]"
                                : "text-white/60 group-hover:text-[#F0892F]"
                            }
                          >
                            <Icon>{item.icon}</Icon>
                          </span>
                          {item.label}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Profile + logout */}
        <div className="flex-none border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-[#F0892F] text-base font-bold uppercase text-white">
              {name.charAt(0)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white">{name}</p>
              {email && (
                <p className="truncate text-xs text-white/60">{email}</p>
              )}
            </div>
            <button
              type="button"
              aria-label="Log out"
              title="Log out"
              onClick={() => setLogoutModal(true)}
              className={`grid h-10 w-10 flex-none place-items-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-[#F0892F] ${focusRing}`}
            >
              <Icon>
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
              </Icon>
            </button>
          </div>
        </div>
      </aside>

      <LogoutModal
        open={logoutModal}
        onClose={() => setLogoutModal(false)}
        onConfirm={handleLogout}
        loading={isLoading}
      />
    </>
  );
};

export default DashboardSidebar;