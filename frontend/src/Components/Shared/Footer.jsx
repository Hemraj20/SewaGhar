import React from "react";
import { Link, useLocation } from "react-router-dom";
import sewaGharLogo from "../../assets/sewaghar-logo.png";

/*
  SewaGhar Footer
  Same palette as Login and Header:
    navy #1B2F5B  (background)   orange #F0892F (accents)   paper #F6F5F0 (logo tile)

  Hidden on the routes listed in HIDE_ON so the Login page stays exactly one screen tall.
  Requires: react-router-dom v6+, Tailwind CSS
*/

const HIDE_ON = ["/login", "/register"];

/* -------------------------------- Icons -------------------------------- */

const Icon = ({ children, className = "h-5 w-5" }) => (
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

/* -------------------------------- Content ------------------------------- */

const columns = [
  {
    title: "Services",
    links: [
      { label: "Plumbing", to: "/service/plumbing" },
      { label: "Electrical", to: "/service/electrical" },
      { label: "Home Cleaning", to: "/service/cleaning" },
      { label: "Repairs", to: "/service/repairs" },
      { label: "Painting", to: "/service/painting" },
      { label: "Moving", to: "/service/moving" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "How It Works", to: "/how-it-works" },
      { label: "Providers", to: "/vendor" },
      { label: "Become a Provider", to: "/vendor" },
      { label: "Browse All Services", to: "/service" },
    ],
  },
];

// TODO: replace the placeholder contact details with your real ones
const contacts = [
  {
    text: "support@sewaghar.com",
    href: "mailto:support@sewaghar.com",
    icon: (
      <>
        <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
        <path d="M22 6l-10 7L2 6" />
      </>
    ),
  },
  {
    text: "+977 98XXXXXXXX",
    href: "tel:+97798XXXXXXXX",
    icon: (
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
    ),
  },
  {
    text: "Nepal",
    icon: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
];

// TODO: replace "#" with your real social links
const socials = [
  {
    label: "Facebook",
    href: "#",
    icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />,
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.4A4 4 0 1112.6 8 4 4 0 0116 11.4z" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    icon: (
      <path d="M3 21l1.65-4.9A9 9 0 1112 21a9 9 0 01-4.1-1L3 21zM9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-.8.8a4 4 0 01-1.8-1.8l.8-.8-1-2L9 9.5z" />
    ),
  },
];

const linkClass =
  "rounded text-[0.95rem] text-white/75 transition-colors hover:text-[#F0892F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0892F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B2F5B]";

/* -------------------------------- Footer -------------------------------- */

const Footer = () => {
  const { pathname } = useLocation();

  if (HIDE_ON.includes(pathname)) return null;

  return (
    <footer className="border-t-4 border-[#F0892F] bg-[#1B2F5B] font-sans text-white">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              aria-label="SewaGhar home"
              className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0892F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B2F5B]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#F6F5F0]">
                <img
                  src={sewaGharLogo}
                  alt=""
                  className="h-10 w-10 select-none object-contain"
                  draggable="false"
                />
              </span>
              <span className="text-2xl font-bold tracking-tight">SewaGhar</span>
            </Link>

            <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-white/75">
              Trusted home services at your doorstep. Book verified providers
              for plumbing, electrical, cleaning, repairs and more.
            </p>

            <ul className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white transition-colors hover:bg-[#F0892F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0892F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B2F5B]"
                  >
                    <Icon>{s.icon}</Icon>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="mb-4 text-base font-bold text-white">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-base font-bold text-white">Contact</h3>
            <ul className="space-y-3.5">
              {contacts.map((c) => (
                <li key={c.text} className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#F0892F]">
                    <Icon className="h-[18px] w-[18px]">{c.icon}</Icon>
                  </span>
                  {c.href ? (
                    <a href={c.href} className={linkClass}>
                      {c.text}
                    </a>
                  ) : (
                    <span className="text-[0.95rem] text-white/75">
                      {c.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} SewaGhar. All rights reserved.</p>
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/privacy" className={linkClass.replace("text-[0.95rem]", "text-sm")}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className={linkClass.replace("text-[0.95rem]", "text-sm")}>
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;