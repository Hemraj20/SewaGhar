import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllvendorQuery } from "../../Redux/Features/VendorSlice";

/*
  SewaGhar: Provider profile cards (banner + overlapping avatar design)
  Same palette as the rest of the site: navy #1B2F5B, orange #F0892F, paper #F6F5F0.
  Save as src/Components/Page/Vendor.jsx (default export is `Vendor`).
  Expects: { vendors: [{ id, user_id, name, address, number, service_name, created_at }] }
*/

const PAGE_SIZE = 9;
const NEW_DAYS = 30;

/* -------------------------------- Helpers ------------------------------- */

const getInitials = (name = "") =>
  name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";

const formatMonth = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : "-";

const isNew = (iso) =>
  iso && Date.now() - new Date(iso).getTime() < NEW_DAYS * 24 * 60 * 60 * 1000;

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

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2F5B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F5F0]";

const phoneIcon = (
  <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7A2 2 0 0122 16.9z" />
);

/* ------------------------------ Profile card ---------------------------- */

const ProfileCard = ({ vendor }) => (
  <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#E6E8EE] bg-white transition-all duration-200 hover:shadow-[0_24px_60px_-24px_rgba(27,47,91,0.35)] motion-safe:hover:-translate-y-1">
    {/* Banner */}
    <div className="relative h-28 overflow-hidden bg-[#1B2F5B] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.14)_1px,transparent_0)] [background-size:18px_18px]">
      <span className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-[#F0892F]/30" />
      <span className="absolute -left-6 top-10 h-20 w-20 rounded-full bg-white/10" />

      <span className="absolute left-4 top-4 inline-flex max-w-[70%] items-center gap-1.5 truncate rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
        <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#F0892F]" />
        <span className="truncate">{vendor.service_name || "General service"}</span>
      </span>

      {isNew(vendor.created_at) && (
        <span className="absolute right-4 top-4 rounded-full bg-[#F0892F] px-2.5 py-0.5 text-xs font-bold text-[#1B2F5B]">
          New
        </span>
      )}
    </div>

    {/* Avatar */}
    <div className="-mt-10 z-20 flex justify-center">
      <span className="grid h-20 w-20 place-items-center rounded-full bg-[#F0892F] text-2xl font-bold text-[#1B2F5B] ring-4 ring-white">
        {getInitials(vendor.name)}
      </span>
    </div>

    {/* Body */}
    <div className="flex flex-1 flex-col px-6 pb-6 pt-4 text-center">
      <h3 className="truncate text-xl font-bold text-[#1B2F5B]" title={vendor.name}>
        {vendor.name}
      </h3>

      <p className="mt-1.5 flex items-center justify-center gap-1.5 text-sm text-[#5D6882]">
        <span className="text-[#D9741C]">
          <Icon className="h-4 w-4">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </Icon>
        </span>
        <span className="truncate">{vendor.address || "Address not provided"}</span>
      </p>

      {/* Info tiles */}
      <dl className="mt-5 grid grid-cols-2 gap-3 text-left">
        <div className="rounded-xl bg-[#F6F5F0] p-3">
          <dt className="text-xs font-semibold uppercase tracking-wider text-[#5D6882]">Phone</dt>
          <dd className="mt-1 truncate text-[0.95rem] font-bold text-[#1B2F5B]">
            {vendor.number || "-"}
          </dd>
        </div>
        <div className="rounded-xl bg-[#F6F5F0] p-3">
          <dt className="text-xs font-semibold uppercase tracking-wider text-[#5D6882]">Member since</dt>
          <dd className="mt-1 text-[0.95rem] font-bold text-[#1B2F5B]">
            {formatMonth(vendor.created_at)}
          </dd>
        </div>
      </dl>

      {/* Actions */}
      <div className="mt-auto flex gap-3 pt-6">
        <Link
          to={`/vendor/${vendor.id}`}
          className={`inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-[#1B2F5B] px-4 text-[0.95rem] font-bold text-white transition-colors hover:bg-[#14234A] ${focusRing}`}
        >
          View profile
        </Link>
        {vendor.number && (
          <a
            href={`tel:${vendor.number}`}
            aria-label={`Call ${vendor.name}`}
            title="Call"
            className={`grid h-12 w-12 flex-none place-items-center rounded-xl border-[1.5px] border-[#D9DCE4] bg-white text-[#1B2F5B] transition-colors hover:border-[#F0892F] hover:bg-[#FEF3E6] ${focusRing}`}
          >
            <Icon>{phoneIcon}</Icon>
          </a>
        )}
      </div>
    </div>
  </article>
);

const CardSkeleton = () => (
  <div className="overflow-hidden rounded-3xl border border-[#E6E8EE] bg-white" aria-hidden="true">
    <div className="h-28 bg-[#EDEFF4] motion-safe:animate-pulse" />
    <div className="-mt-10 flex justify-center">
      <div className="h-20 w-20 rounded-full bg-[#DDE1EA] ring-4 ring-white motion-safe:animate-pulse" />
    </div>
    <div className="space-y-3 px-6 pb-6 pt-4">
      <div className="mx-auto h-5 w-2/3 rounded bg-[#EDEFF4] motion-safe:animate-pulse" />
      <div className="mx-auto h-3.5 w-1/2 rounded bg-[#EDEFF4] motion-safe:animate-pulse" />
      <div className="grid grid-cols-2 gap-3 pt-3">
        <div className="h-14 rounded-xl bg-[#EDEFF4] motion-safe:animate-pulse" />
        <div className="h-14 rounded-xl bg-[#EDEFF4] motion-safe:animate-pulse" />
      </div>
      <div className="h-12 rounded-xl bg-[#EDEFF4] motion-safe:animate-pulse" />
    </div>
  </div>
);

/* --------------------------------- Page --------------------------------- */

const Vendor = () => {
  const { data, isLoading, isError, refetch } = useGetAllvendorQuery();
  const [search, setSearch] = useState("");
  const [service, setService] = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const vendors = data?.vendors ?? [];

  const serviceOptions = useMemo(() => {
    const map = {};
    vendors.forEach((v) => {
      const k = v.service_name || "General service";
      map[k] = (map[k] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  }, [vendors]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return [...vendors]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .filter((v) => service === "all" || (v.service_name || "General service") === service)
      .filter(
        (v) =>
          !q ||
          v.name?.toLowerCase().includes(q) ||
          v.address?.toLowerCase().includes(q) ||
          v.service_name?.toLowerCase().includes(q)
      );
  }, [vendors, search, service]);

  const shown = filtered.slice(0, visible);

  return (
    <section className="bg-[#F6F5F0] font-sans" aria-labelledby="vendors-heading">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 md:pt-12 lg:px-8 lg:pb-24">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#F0892F]/30 bg-[#FEF3E6] px-4 py-1.5 text-sm font-semibold text-[#1B2F5B]">
            <span className="h-2 w-2 rounded-full bg-[#F0892F]" />
            Meet our providers
          </p>
          <h1
            id="vendors-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-[#1B2F5B] sm:text-4xl lg:text-5xl"
          >
            Skilled people, ready to help
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#5D6882] sm:text-lg">
            Pick a provider for the job and contact them directly.
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mt-8 max-w-xl">
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-5 flex items-center text-[#9AA2B5]">
              <Icon>
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </Icon>
            </span>
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisible(PAGE_SIZE);
              }}
              aria-label="Search providers"
              placeholder="Search by name, service or location"
              className="h-14 w-full rounded-full border-[1.5px] border-[#D9DCE4] bg-white pl-14 pr-5 text-base text-[#1B2F5B] shadow-[0_10px_30px_-20px_rgba(27,47,91,0.35)] transition placeholder:text-[#9AA2B5] focus:border-[#1B2F5B] focus:outline-none focus:ring-4 focus:ring-[#1B2F5B]/15"
            />
          </div>
        </div>

        {/* Service chips */}
        {serviceOptions.length > 1 && (
          <div
            role="group"
            aria-label="Filter by service"
            className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
          >
            {[["all", vendors.length], ...serviceOptions].map(([name, count]) => (
              <button
                key={name}
                type="button"
                aria-pressed={service === name}
                onClick={() => {
                  setService(name);
                  setVisible(PAGE_SIZE);
                }}
                className={`inline-flex h-10 flex-none items-center gap-2 whitespace-nowrap rounded-full border-[1.5px] px-4 text-sm font-semibold transition-colors ${focusRing} ${
                  service === name
                    ? "border-[#1B2F5B] bg-[#1B2F5B] text-white"
                    : "border-[#D9DCE4] bg-white text-[#1B2F5B] hover:border-[#1B2F5B]"
                }`}
              >
                {name === "all" ? "All providers" : name}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    service === name ? "bg-[#F0892F] text-[#1B2F5B]" : "bg-[#F6F5F0] text-[#5D6882]"
                  }`}
                >
                  {count}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        <div className="mt-10">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
              {[...Array(6)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="mx-auto max-w-md rounded-3xl border border-[#E6E8EE] bg-white px-6 py-12 text-center">
              <p className="text-lg font-bold text-[#1B2F5B]">We couldn&apos;t load the providers</p>
              <p className="mt-1 text-[#5D6882]">Check your connection and try again.</p>
              <button
                type="button"
                onClick={refetch}
                className={`mt-5 inline-flex h-12 items-center rounded-xl bg-[#1B2F5B] px-7 text-base font-bold text-white transition-colors hover:bg-[#14234A] ${focusRing}`}
              >
                Try again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="mx-auto max-w-md rounded-3xl border border-[#E6E8EE] bg-white px-6 py-12 text-center">
              <p className="text-lg font-bold text-[#1B2F5B]">No providers found</p>
              <p className="mt-1 text-[#5D6882]">Try a different search or choose another service.</p>
            </div>
          ) : (
            <>
              <p className="mb-5 text-center text-sm text-[#5D6882]" aria-live="polite">
                Showing <span className="font-semibold text-[#1B2F5B]">{shown.length}</span> of{" "}
                <span className="font-semibold text-[#1B2F5B]">{filtered.length}</span> providers
              </p>

              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((v) => (
                  <li key={v.id}>
                    <ProfileCard vendor={v} />
                  </li>
                ))}
              </ul>

              {shown.length < filtered.length && (
                <div className="mt-10 text-center">
                  <button
                    type="button"
                    onClick={() => setVisible((n) => n + PAGE_SIZE)}
                    className={`inline-flex h-12 items-center rounded-xl border-[1.5px] border-[#D9DCE4] bg-white px-8 text-base font-semibold text-[#1B2F5B] transition-colors hover:border-[#1B2F5B] ${focusRing}`}
                  >
                    Show more providers
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Vendor;