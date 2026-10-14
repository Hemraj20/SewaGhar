import React from "react";
import { Link } from "react-router-dom";



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

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2F5B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F5F0]";

const trust = [
  {
    label: "Verified providers",
    icon: <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3zM9 12l2 2 4-4" />,
  },
  {
    label: "Quick booking",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    label: "Fair prices",
    icon: (
      <>
        <path d="M20 12l-8 8-9-9V3h8l9 9z" />
        <circle cx="7.5" cy="7.5" r="1.5" />
      </>
    ),
  },
];

const mockServices = [
  {
    name: "Plumbing",
    active: true,
    icon: <path d="M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z" />,
  },
  { name: "Electrical", icon: <path d="M13 2L4 14h7l-1 8 9-12h-7z" /> },
  {
    name: "Cleaning",
    icon: (
      <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" />
    ),
  },
  {
    name: "Repairs",
    icon: (
      <path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z" />
    ),
  },
];

/* Decorative booking card (hidden from screen readers) */
const HeroGraphic = () => (
  <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
    {/* soft background shapes */}
    <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-[#F0892F]/15 sm:h-56 sm:w-56" />
    <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-[#1B2F5B]/10 sm:h-44 sm:w-44" />

    {/* main card */}
    <div className="relative overflow-hidden rounded-3xl border border-t-4 border-[#E6E8EE] border-t-[#F0892F] bg-white p-6 shadow-[0_20px_50px_-20px_rgba(27,47,91,0.25)] sm:p-8">
      <p className="text-lg font-bold text-[#1B2F5B]">Book a service</p>
      <p className="mt-0.5 text-sm text-[#5D6882]">Choose what you need today</p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {mockServices.map((s) => (
          <div
            key={s.name}
            className={`flex items-center gap-3 rounded-xl border-[1.5px] px-3.5 py-3 ${
              s.active
                ? "border-[#1B2F5B] bg-[#F6F5F0] ring-4 ring-[#1B2F5B]/10"
                : "border-[#D9DCE4] bg-white"
            }`}
          >
            <span className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-[#FEF3E6] text-[#D9741C]">
              <Icon className="h-[18px] w-[18px]">{s.icon}</Icon>
            </span>
            <span className="text-sm font-semibold text-[#1B2F5B]">{s.name}</span>
          </div>
        ))}
      </div>

      {/* provider row */}
      <div className="mt-5 flex items-center gap-3 rounded-xl border border-[#E6E8EE] bg-[#F6F5F0] p-3.5">
        <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-[#1B2F5B] text-white">
          <Icon>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
          </Icon>
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-[#1B2F5B]">Verified vendor</p>
          <p className="truncate text-xs text-[#5D6882]">Arrives in about 30 min</p>
        </div>
        <span className="flex items-center gap-1 text-sm font-bold text-[#1B2F5B]">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#F0892F]">
            <path d="M12 2l3 6.5 7 .9-5.1 4.8 1.3 7-6.2-3.5-6.2 3.5 1.3-7L2 9.4l7-.9z" />
          </svg>
          4.9
        </span>
      </div>

      <div className="mt-5 flex h-12 items-center justify-center rounded-xl bg-[#1B2F5B] text-base font-bold text-white">
        Confirm booking
      </div>
    </div>

    {/* floating confirmation badge */}
    <div className="absolute -bottom-5 right-3 flex items-center gap-3 rounded-2xl border border-[#E6E8EE] bg-white px-4 py-3 shadow-[0_20px_50px_-20px_rgba(27,47,91,0.35)] sm:-right-4">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-[#F0892F] text-white">
        <Icon className="h-[18px] w-[18px]">
          <path d="M5 13l4 4L19 7" strokeWidth="2.5" />
        </Icon>
      </span>
      <div>
        <p className="text-sm font-bold leading-tight text-[#1B2F5B]">Booking confirmed</p>
        <p className="text-xs text-[#5D6882]">Vendor is on the way</p>
      </div>
    </div>
  </div>
);

const Hero = () => (
  <section className="bg-[#F6F5F0] font-sans" aria-labelledby="hero-heading">
    <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-16 pt-8 sm:px-6 md:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 lg:pb-24 lg:pt-16">
      {/* Text */}
      <div className="text-center lg:text-left">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#F0892F]/30 bg-[#FEF3E6] px-4 py-1.5 text-sm font-semibold text-[#1B2F5B]">
          <span className="h-2 w-2 rounded-full bg-[#F0892F]" />
          Trusted home services in Nepal
        </p>

        <h1
          id="hero-heading"
          className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-[#1B2F5B] sm:text-5xl lg:text-6xl"
        >
          Home services,{" "}
          <span className=" decoration-[#F0892F] decoration-4 underline-offset-[10px]">
            made simple.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#5D6882] sm:text-lg lg:mx-0">
          Book verified plumbers, electricians, cleaners and more in a few taps.
          Transparent prices, reliable providers, and help that arrives when
          you need it.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
          <Link
            to="/service"
            className={`inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-[#1B2F5B] px-8 text-base font-bold text-white transition hover:bg-[#14234A] motion-safe:hover:-translate-y-0.5 ${focusRing}`}
          >
            Book a service
            <Icon className="h-4 w-4">
              <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="2.5" />
            </Icon>
          </Link>

          <Link
            to="/vendor"
            className={`inline-flex h-14 items-center justify-center rounded-xl border-[1.5px] border-[#D9DCE4] bg-white px-8 text-base font-semibold text-[#1B2F5B] transition hover:border-[#1B2F5B] motion-safe:hover:-translate-y-0.5 ${focusRing}`}
          >
            Become a vendor
          </Link>
        </div>

        <ul className="mt-9 flex flex-wrap justify-center gap-x-7 gap-y-3 lg:justify-start">
          {trust.map((t) => (
            <li
              key={t.label}
              className="flex items-center gap-2 text-sm font-semibold text-[#1B2F5B]"
            >
              <span className="text-[#D9741C]">
                <Icon className="h-5 w-5">{t.icon}</Icon>
              </span>
              {t.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Graphic */}
      <HeroGraphic />
    </div>
  </section>
);

export default Hero;