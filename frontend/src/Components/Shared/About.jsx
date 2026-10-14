import React from "react";
import { Link } from "react-router-dom";
import sewaGharLogo from "../../assets/sewaghar-logo.png";

/*
  SewaGhar: About page
  Same palette as the rest of the site: navy #1B2F5B, orange #F0892F, paper #F6F5F0.
  Save as src/Components/Page/About.jsx   (route: /about)
  Edit the text in the arrays below to match your real story.
*/

const Icon = ({ children, className = "h-6 w-6" }) => (
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

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2F5B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F5F0]";

/* -------------------------------- Content ------------------------------- */

const values = [
  {
    title: "Trust first",
    text: "Every booking should feel safe. We build tools that help customers and providers know who they are dealing with.",
    icon: <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3zM9 12l2 2 4-4" />,
  },
  {
    title: "Fair and transparent",
    text: "Clear service details and open budgets, so there are no surprises when the work is done.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M9.5 9.5c0-1 1-1.8 2.5-1.8s2.5.8 2.5 1.8-1 1.6-2.5 1.9-2.5.9-2.5 1.9 1 1.8 2.5 1.8 2.5-.8 2.5-1.8" />
      </>
    ),
  },
  {
    title: "Made simple",
    text: "Finding help at home should take minutes, not days of phone calls. We keep every step short and clear.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    title: "Quality work",
    text: "We celebrate skilled providers and make it easy for good work to be seen and recommended.",
    icon: <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.2l-5.6 3 1.1-6.2L3 9.6l6.2-.9z" />,
  },
  {
    title: "Local community",
    text: "We grow by supporting local plumbers, electricians, cleaners and craftspeople in the places they live.",
    icon: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
        <path d="M16 4.6a3.5 3.5 0 010 6.8M18 14.3c2.2.7 3.5 2.6 3.5 5.7" />
      </>
    ),
  },
  {
    title: "Always improving",
    text: "We listen to feedback from both sides and keep improving the platform every week.",
    icon: <path d="M3 17l6-6 4 4 8-8M14 7h7v7" />,
  },
];

const steps = [
  {
    title: "Choose a service",
    text: "Browse plumbing, electrical, cleaning, repairs and more, or post what you need.",
  },
  {
    title: "Connect with a provider",
    text: "Compare providers, check their details and get in touch directly.",
  },
  {
    title: "Get it done",
    text: "Your provider arrives, finishes the job, and you share how it went.",
  },
];

const audiences = [
  {
    title: "For customers",
    points: [
      "Find providers for everyday home needs",
      "Post a request with your own budget",
      "Contact providers directly",
      "Save the requests you care about",
    ],
    cta: { label: "Browse services", to: "/service" },
  },
  {
    title: "For providers",
    points: [
      "List your services and reach new customers",
      "See requests from people near you",
      "Manage your work in one place",
      "Build a name for quality and reliability",
    ],
    cta: { label: "Become a provider", to: "/vendor" },
  },
];

/* --------------------------------- Page --------------------------------- */

const About = () => (
  <div className="bg-[#F6F5F0] font-sans">
    {/* ------------------------------- Intro ------------------------------ */}
    <section aria-labelledby="about-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-8 sm:px-6 md:pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#F0892F]/30 bg-[#FEF3E6] px-4 py-1.5 text-sm font-semibold text-[#1B2F5B]">
            <span className="h-2 w-2 rounded-full bg-[#F0892F]" />
            About SewaGhar
          </p>
          <h1
            id="about-heading"
            className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-[#1B2F5B] sm:text-5xl lg:text-6xl"
          >
            Care for your home,{" "}
            <span className=" decoration-[#F0892F] decoration-4 underline-offset-[10px]">
              made easy.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#5D6882] sm:text-lg lg:mx-0">
            SewaGhar connects people with skilled local service providers, from
            plumbers and electricians to cleaners and painters. We believe
            getting help at home should be simple, honest and stress-free.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              to="/service"
              className={`inline-flex h-14 items-center justify-center rounded-xl bg-[#1B2F5B] px-8 text-base font-bold text-white transition hover:bg-[#14234A] motion-safe:hover:-translate-y-0.5 ${focusRing}`}
            >
              Explore services
            </Link>
            <Link
              to="/vendor"
              className={`inline-flex h-14 items-center justify-center rounded-xl border-[1.5px] border-[#D9DCE4] bg-white px-8 text-base font-semibold text-[#1B2F5B] transition hover:border-[#1B2F5B] motion-safe:hover:-translate-y-0.5 ${focusRing}`}
            >
              Meet our providers
            </Link>
          </div>
        </div>

        {/* Logo showcase */}
        <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
          <div className="absolute -right-5 -top-5 h-36 w-36 rounded-full bg-[#F0892F]/20 sm:h-48 sm:w-48" />
          <div className="absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-[#1B2F5B]/10 sm:h-40 sm:w-40" />
          <div className="relative overflow-hidden rounded-3xl border border-t-4 border-[#E6E8EE] border-t-[#F0892F] bg-white p-8 shadow-[0_20px_50px_-20px_rgba(27,47,91,0.25)] sm:p-10">
            <div className="grid place-items-center rounded-2xl bg-[#F6F5F0] p-6">
              <img src={sewaGharLogo} alt="" className="h-48 w-auto select-none sm:h-56" draggable="false" />
            </div>
            <p className="mt-6 text-center text-xl font-bold text-[#1B2F5B]">SewaGhar</p>
            <p className="text-center text-sm text-[#5D6882]">Service, at your home</p>
          </div>
        </div>
      </div>
    </section>

    {/* --------------------------- Story + mission ------------------------ */}
    <section className="border-y border-[#E6E8EE] bg-white" aria-labelledby="story-heading">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#D9741C]">Our story</p>
          <h2 id="story-heading" className="mt-3 text-3xl font-bold tracking-tight text-[#1B2F5B] sm:text-4xl">
            Why we built SewaGhar
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-[#5D6882] sm:text-lg">
            <p>
              Finding a reliable plumber or electrician usually means asking
              around, waiting for call-backs and hoping for a fair price.
              Skilled providers, on the other hand, struggle to reach the
              customers who need them.
            </p>
            <p>
              SewaGhar brings both sides together in one place, so customers
              can find help quickly and providers can grow their work with
              confidence.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div className="rounded-2xl bg-[#1B2F5B] p-7 text-white">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-[#F0892F]">
              <Icon>
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="4" />
                <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
              </Icon>
            </span>
            <h3 className="mt-5 text-xl font-bold">Our mission</h3>
            <p className="mt-2 leading-relaxed text-white/80">
              To make quality home services easy to find, fair to book and
              rewarding to provide.
            </p>
          </div>
          <div className="rounded-2xl border border-[#E6E8EE] bg-[#F6F5F0] p-7">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#FEF3E6] text-[#D9741C]">
              <Icon>
                <path d="M2.5 12C3.5 10 7 6 12 6s8.5 4 9.5 6c-1 2-4.5 6-9.5 6s-8.5-4-9.5-6z" />
                <circle cx="12" cy="12" r="3" />
              </Icon>
            </span>
            <h3 className="mt-5 text-xl font-bold text-[#1B2F5B]">Our vision</h3>
            <p className="mt-2 leading-relaxed text-[#5D6882]">
              A community where every home is well looked after and every
              skilled provider is easy to find.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* -------------------------------- Values ---------------------------- */}
    <section aria-labelledby="values-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#D9741C]">What we stand for</p>
          <h2 id="values-heading" className="mt-3 text-3xl font-bold tracking-tight text-[#1B2F5B] sm:text-4xl">
            The values behind every booking
          </h2>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <li
              key={v.title}
              className="rounded-2xl border border-[#E6E8EE] bg-white p-7 transition-all duration-200 hover:border-[#F0892F]/50 hover:shadow-[0_20px_50px_-24px_rgba(27,47,91,0.3)] motion-safe:hover:-translate-y-0.5"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#FEF3E6] text-[#D9741C]">
                <Icon>{v.icon}</Icon>
              </span>
              <h3 className="mt-5 text-lg font-bold text-[#1B2F5B]">{v.title}</h3>
              <p className="mt-2 leading-relaxed text-[#5D6882]">{v.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* ------------------------------ How it works ------------------------ */}
    <section className="bg-[#1B2F5B]" aria-labelledby="steps-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#F0892F]">How it works</p>
          <h2 id="steps-heading" className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Three simple steps
          </h2>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl bg-white/5 p-7 ring-1 ring-white/10">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#F0892F] text-lg font-bold text-[#1B2F5B]">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-bold text-white">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-white/75">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* ------------------------------ Two audiences ----------------------- */}
    <section aria-labelledby="audience-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#D9741C]">Built for both sides</p>
          <h2 id="audience-heading" className="mt-3 text-3xl font-bold tracking-tight text-[#1B2F5B] sm:text-4xl">
            One platform, two ways to win
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {audiences.map((a) => (
            <div
              key={a.title}
              className="flex flex-col overflow-hidden rounded-3xl border border-t-4 border-[#E6E8EE] border-t-[#F0892F] bg-white p-8 shadow-[0_20px_50px_-30px_rgba(27,47,91,0.25)]"
            >
              <h3 className="text-2xl font-bold text-[#1B2F5B]">{a.title}</h3>
              <ul className="mt-5 space-y-3">
                {a.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[#5D6882]">
                    <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-[#FEF3E6] text-[#D9741C]">
                      <Icon className="h-3.5 w-3.5">
                        <path d="M5 13l4 4L19 7" strokeWidth="3" />
                      </Icon>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                to={a.cta.to}
                className={`mt-8 inline-flex h-12 items-center justify-center self-start rounded-xl bg-[#1B2F5B] px-7 text-[0.95rem] font-bold text-white transition-colors hover:bg-[#14234A] ${focusRing}`}
              >
                {a.cta.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* --------------------------------- CTA ------------------------------ */}
    <section aria-labelledby="cta-heading">
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-[#1B2F5B] px-6 py-12 text-center sm:px-12 sm:py-16">
          <span className="absolute -right-10 -top-12 h-44 w-44 rounded-full bg-[#F0892F]/25" aria-hidden="true" />
          <span className="absolute -bottom-14 -left-8 h-40 w-40 rounded-full bg-white/10" aria-hidden="true" />
          <div className="relative">
            <h2 id="cta-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Join SewaGhar today and find the help your home needs, or start
              offering your skills to people nearby.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex h-14 items-center justify-center rounded-xl bg-[#F0892F] px-8 text-base font-bold text-[#1B2F5B] transition-colors hover:bg-[#D9741C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B2F5B]"
              >
                Create an account
              </Link>
              <Link
                to="/service"
                className="inline-flex h-14 items-center justify-center rounded-xl border-[1.5px] border-white/30 px-8 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B2F5B]"
              >
                Browse services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default About;