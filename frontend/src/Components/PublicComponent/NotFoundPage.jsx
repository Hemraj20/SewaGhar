import React from "react";
import { Link, useNavigate } from "react-router-dom";



const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2F5B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F5F0]";

const quickLinks = [
  { label: "Services", to: "/service" },
  { label: "Providers", to: "/vendor" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "About", to: "/about" },
];

const Digit = ({ children }) => (
  <span className="text-[6.5rem] font-bold leading-none tracking-tight text-[#1B2F5B] sm:text-[9rem] lg:text-[11rem]">
    {children}
  </span>
);

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#F6F5F0] px-4 py-12 font-sans sm:px-6 sm:py-16">
      <div className="w-full max-w-[560px] text-center">
        {/* 4 [house] 4 */}
        <div
          className="flex items-center justify-center gap-2 sm:gap-4"
          aria-hidden="true"
        >
          <Digit>4</Digit>
          <span className="grid h-[5.5rem] w-[5.5rem] flex-none place-items-center rounded-full border-4 border-[#F0892F] bg-[#FEF3E6] text-[#1B2F5B] sm:h-32 sm:w-32 lg:h-40 lg:w-40">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10 sm:h-14 sm:w-14 lg:h-[4.5rem] lg:w-[4.5rem]"
            >
              <path d="M3 11.5 12 4l9 7.5" />
              <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" />
              <path
                d="M9.6 12.6a2.4 2.4 0 114.8 0c0 1.4-2.4 1.8-2.4 3.2M12 18h.01"
                stroke="#D9741C"
              />
            </svg>
          </span>
          <Digit>4</Digit>
        </div>

        <h1 className="mt-8 text-3xl font-bold tracking-tight text-[#1B2F5B] sm:text-4xl">
          Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-[#5D6882] sm:text-lg">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved, renamed or never existed.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className={`inline-flex h-14 items-center justify-center rounded-xl bg-[#1B2F5B] px-8 text-base font-bold text-white transition hover:bg-[#14234A] motion-safe:hover:-translate-y-0.5 ${focusRing}`}
          >
            Back to home
          </Link>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`inline-flex h-14 items-center justify-center rounded-xl border-[1.5px] border-[#D9DCE4] bg-white px-8 text-base font-semibold text-[#1B2F5B] transition hover:border-[#1B2F5B] motion-safe:hover:-translate-y-0.5 ${focusRing}`}
          >
            Go back
          </button>
        </div>

        <nav
          aria-label="Helpful links"
          className="mt-10 border-t border-[#E6E8EE] pt-6"
        >
          <p className="mb-3 text-sm font-semibold text-[#5D6882]">
            Or try one of these
          </p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`rounded text-[0.95rem] font-semibold text-[#1B2F5B]  decoration-[#F0892F] decoration-2 underline-offset-4 transition-colors hover:text-[#D9741C] ${focusRing}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default NotFoundPage;