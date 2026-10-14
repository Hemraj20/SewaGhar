import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import sewaGharLogo from "../../assets/sewaghar-logo.png";

const Icon = ({ children, className = "h-[22px] w-[22px]" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

const Chevron = ({ up }) => (
  <Icon className="h-3 w-3">
    <path d={up ? "M6 15l6-6 6 6" : "M6 9l6 6 6-6"} strokeWidth="2.5" />
  </Icon>
);

const Arrow = () => (
  <Icon className="h-3.5 w-3.5">
    <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="2.5" />
  </Icon>
);

/* ---------------------------- Service content --------------------------- */

const services = [
  {
    title: "Plumbing",
    to: "/service/plumbing",
    text: "Leaks, fittings, tanks and bathroom repairs.",
    icon: <path d="M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z" />,
  },
  {
    title: "Electrical",
    to: "/service/electrical",
    text: "Wiring, lighting, switches and electrical repairs.",
    icon: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  },
  {
    title: "Ambulance",
    to: "/service/ambulance",
    text: "Quick access to ambulance and emergency transport.",
    icon: (
      <>
        <path d="M3 13h12V6H3v7z" />
        <path d="M15 9h4l2 3v4h-6V9z" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="18" cy="17" r="2" />
        <path d="M7 9v3M5.5 10.5h3" />
      </>
    ),
  },
  {
    title: "Home Cleaning",
    to: "/service/cleaning",
    text: "Regular and deep cleaning for homes and apartments.",
    icon: (
      <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" />
    ),
  },
  {
    title: "Repairs",
    to: "/service/repairs",
    text: "Furniture, doors, fixtures and everyday home repairs.",
    icon: (
      <path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z" />
    ),
  },
  {
    title: "Painting",
    to: "/service/painting",
    text: "Interior and exterior painting with clean finishes.",
    icon: (
      <>
        <rect x="4" y="3" width="14" height="6" rx="1" />
        <path d="M18 6h2v5h-8v4M10 15h4v6h-4z" />
      </>
    ),
  },
  {
    title: "Moving",
    to: "/service/moving",
    text: "Packing, loading and shifting for local moves.",
    icon: <path d="M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10" />,
  },
  {
    title: "Home Maintenance",
    to: "/service/home-maintenance",
    text: "Reliable maintenance services for your home.",
    icon: (
      <>
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" />
        <path d="M9 20v-5h6v5" />
      </>
    ),
  },
];

/* ------------------------------ Navigation ------------------------------ */

const navbars = [
  { title: "Home", link: "/" },
  { title: "Services", link: "/service", menu: "services" },
  { title: "Vendor", link: "/vendors" },
  { title: "Posts", link: "/posts" },
  { title: "About", link: "/about" },
];

const promo = {
  title: "Offer a service? Join SewaGhar as a vendor.",
  text: "List your services, reach new customers and manage service requests in one place.",
  to: "/vendor",
};

/* ------------------------------- Styles --------------------------------- */

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2F5B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F5F0]";

// Desktop nav link: navy text, orange underline when active
const linkBase =
  "relative inline-flex items-center gap-1.5  py-1.5 text-[0.95rem] transition-colors hover:text-[#D9741C]";
const linkActive = "border-b-2 border-[#F0892F] font-bold text-[#1B2F5B]";
const linkIdle = "border-transparent font-medium text-[#1B2F5B]";

/* ---------------------------- Service item ------------------------------ */

const ServiceItem = ({ item }) => (
  <Link
    to={item.to}
    className={`flex gap-3.5 rounded-xl p-3.5 transition-colors hover:bg-[#F6F5F0] ${focusRing}`}
  >
    <span className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-[#FEF3E6] text-[#D9741C]">
      <Icon className="h-5 w-5">{item.icon}</Icon>
    </span>
    <span>
      <span className="block text-[0.95rem] font-semibold text-[#1B2F5B]">
        {item.title}
      </span>
      <span className="mt-0.5 block text-sm leading-snug text-[#5D6882]">
        {item.text}
      </span>
    </span>
  </Link>
);

/* ------------------------------- Header --------------------------------- */

const Header = () => {
  const [menu, setMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const wrapRef = useRef(null);
  const { pathname } = useLocation();

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close everything on route change */
  useEffect(() => {
    setMenu(null);
    setMobileOpen(false);
    setMobileSection(false);
  }, [pathname]);

  /* Desktop menu: outside click + Escape */
  useEffect(() => {
    if (!menu) return;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setMenu(null);
    };
    const onKey = (e) => e.key === "Escape" && setMenu(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  /* Mobile menu: lock body scroll + Escape */
  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[#F6F5F0] px-4 py-3 font-sans sm:px-6 lg:px-8">
      <div
        ref={wrapRef}
        className="relative mx-auto max-w-7xl"
        onMouseLeave={() => setMenu(null)}
      >
        {/* ============================ NAVBAR ============================ */}
        <div
          className={`flex h-16 items-center justify-between gap-6 rounded-2xl border border-[#E6E8EE] bg-white px-4 transition-shadow duration-200 md:px-6 ${
            scrolled
              ? "shadow-[0_20px_50px_-20px_rgba(27,47,91,0.35)]"
              : "shadow-[0_10px_30px_-20px_rgba(27,47,91,0.25)]"
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            aria-label="SewaGhar home"
            className={`flex items-center gap-2 rounded-lg ${focusRing}`}
          >
            <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-[#F6F5F0]">
              <img
                src={sewaGharLogo}
                alt=""
                className="h-9 w-9 select-none object-contain"
                draggable="false"
              />
            </span>
            <span className="text-[1.35rem] font-bold tracking-tight text-[#1B2F5B]">
              SewaGhar
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:block">
            <ul className="flex items-center gap-6 lg:gap-9">
              {navbars.map((nav) => (
                <li key={nav.link}>
                  {nav.menu ? (
                    <button
                      type="button"
                      aria-expanded={menu === nav.menu}
                      aria-controls={`menu-${nav.menu}`}
                      onClick={() =>
                        setMenu(menu === nav.menu ? null : nav.menu)
                      }
                      onMouseEnter={() => setMenu(nav.menu)}
                      className={`${linkBase} ${focusRing} ${
                        menu === nav.menu || pathname.startsWith(nav.link)
                          ? linkActive
                          : linkIdle
                      }`}
                    >
                      {nav.title}
                      <Chevron up={menu === nav.menu} />
                    </button>
                  ) : (
                    <NavLink
                      to={nav.link}
                      end={nav.link === "/"}
                      onMouseEnter={() => setMenu(null)}
                      className={({ isActive }) =>
                        `${linkBase} ${focusRing} ${
                          isActive ? linkActive : linkIdle
                        }`
                      }
                    >
                      {nav.title}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className={`inline-flex h-11 items-center rounded-xl border-[1.5px] border-[#D9DCE4] bg-white px-5 text-[0.95rem] font-semibold text-[#1B2F5B] transition-colors hover:border-[#1B2F5B] ${focusRing}`}
            >
              Log in
            </Link>
            <Link
              to="/register"
              className={`inline-flex h-11 items-center rounded-xl bg-[#1B2F5B] px-5 text-[0.95rem] font-bold text-white transition-colors hover:bg-[#14234A] ${focusRing}`}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile button */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className={`-mr-2 grid h-11 w-11 place-items-center rounded-xl text-[#1B2F5B] transition-colors hover:bg-[#F6F5F0] md:hidden ${focusRing}`}
          >
            <Icon className="h-6 w-6">
              {mobileOpen ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6 6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </Icon>
          </button>
        </div>

        {/* ======================= DESKTOP MEGA MENU ====================== */}
        {menu === "services" && (
          <div
            id="menu-services"
            className="absolute inset-x-0 top-full z-10 hidden pt-3 md:block"
          >
            <div className="grid grid-cols-[1fr_1fr_1.05fr] gap-x-5 gap-y-4 overflow-hidden rounded-3xl border border-t-4 border-[#E6E8EE] border-t-[#F0892F] bg-white p-6 shadow-[0_20px_50px_-20px_rgba(27,47,91,0.25)]">
              <div className="flex flex-col gap-1">
                {services.slice(0, 4).map((item) => (
                  <ServiceItem key={item.title} item={item} />
                ))}
              </div>

              <div className="flex flex-col gap-1">
                {services.slice(4).map((item) => (
                  <ServiceItem key={item.title} item={item} />
                ))}
              </div>

              {/* Provider promo */}
              <div className="flex flex-col justify-center gap-3 rounded-2xl bg-[#1B2F5B] p-6">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-[#F0892F]">
                  <Icon>
                    <path d="M3 11.5 12 4l9 7.5" />
                    <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
                  </Icon>
                </div>
                <p className="text-lg font-bold leading-snug text-white">
                  {promo.title}
                </p>
                <p className="text-sm leading-snug text-white/75">
                  {promo.text}
                </p>
                <Link
                  to={promo.to}
                  className="inline-flex items-center gap-1.5 self-start rounded text-sm font-semibold text-[#F0892F] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B2F5B]"
                >
                  Become a vendor
                  <Arrow />
                </Link>
              </div>

              {/* Bottom link */}
              <div className="col-span-3 flex items-center justify-between border-t border-[#E6E8EE] pt-4">
                <span className="text-sm text-[#5D6882]">
                  Can&apos;t find what you need?
                </span>
                <Link
                  to="/service"
                  className={`inline-flex items-center gap-1.5 rounded text-sm font-semibold text-[#1B2F5B] hover:text-[#D9741C] ${focusRing}`}
                >
                  Browse all services
                  <Arrow />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================== MOBILE MENU =========================== */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-[88px] overflow-y-auto bg-[#F6F5F0] px-4 pb-6 pt-4 sm:px-6 md:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto max-w-lg overflow-hidden rounded-3xl border border-t-4 border-[#E6E8EE] border-t-[#F0892F] bg-white p-4 shadow-[0_20px_50px_-20px_rgba(27,47,91,0.25)]"
          >
            <ul className="space-y-1">
              {navbars.map((nav) => (
                <li key={nav.link}>
                  {nav.menu ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={mobileSection}
                        onClick={() => setMobileSection((v) => !v)}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-semibold text-[#1B2F5B] hover:bg-[#F6F5F0] ${focusRing}`}
                      >
                        {nav.title}
                        <Chevron up={mobileSection} />
                      </button>

                      {mobileSection && (
                        <ul className="mb-2 mt-1 space-y-0.5 border-l-2 border-[#F0892F]/40 pl-2">
                          {services.map((item) => (
                            <li key={item.title}>
                              <Link
                                to={item.to}
                                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium text-[#1B2F5B] hover:bg-[#F6F5F0] ${focusRing}`}
                              >
                                <span className="text-[#D9741C]">
                                  <Icon className="h-5 w-5">{item.icon}</Icon>
                                </span>
                                {item.title}
                              </Link>
                            </li>
                          ))}
                          <li>
                            <Link
                              to="/service"
                              className={`flex rounded-xl px-3 py-2.5 text-[15px] font-semibold text-[#D9741C] hover:bg-[#F6F5F0] ${focusRing}`}
                            >
                              Browse all services
                            </Link>
                          </li>
                        </ul>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={nav.link}
                      end={nav.link === "/"}
                      className={({ isActive }) =>
                        `flex rounded-xl px-3 py-3 text-base ${focusRing} ${
                          isActive
                            ? "bg-[#FEF3E6] font-bold text-[#1B2F5B]"
                            : "font-semibold text-[#1B2F5B] hover:bg-[#F6F5F0]"
                        }`
                      }
                    >
                      {nav.title}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-4 grid gap-3 border-t border-[#E6E8EE] pt-4">
              <Link
                to="/register"
                className={`flex h-12 items-center justify-center rounded-xl bg-[#1B2F5B] text-base font-bold text-white hover:bg-[#14234A] ${focusRing}`}
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className={`flex h-12 items-center justify-center rounded-xl border-[1.5px] border-[#D9DCE4] bg-white text-base font-semibold text-[#1B2F5B] hover:border-[#1B2F5B] ${focusRing}`}
              >
                Log in
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
