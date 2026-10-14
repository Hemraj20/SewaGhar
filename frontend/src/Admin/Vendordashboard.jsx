import React, { useMemo, useState } from "react";
import { useGetAllvendorQuery } from "../Redux/Features/VendorSlice";

/*
  SewaGhar: Vendors page for admins (same UI as UserDashboard)
  Navy #1B2F5B, orange #F0892F, paper #F6F5F0.
  Expects the API shape:
  { vendors: [{ id, user_id, name, address, number, service_name, created_at }] }
*/

const PAGE_SIZE = 10;

/* -------------------------------- Helpers ------------------------------- */

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "?";

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

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

/* ------------------------------ Small parts ----------------------------- */

const ServiceBadge = ({ name }) => (
  <span className="inline-flex items-center rounded-full bg-[#1B2F5B]/10 px-3 py-1 text-xs font-bold text-[#1B2F5B]">
    {name || "No service"}
  </span>
);

const Avatar = ({ name }) => (
  <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-[#FEF3E6] text-sm font-bold text-[#9A4A0B]">
    {getInitials(name)}
  </span>
);

const StatCard = ({ label, value, icon }) => (
  <div className="flex items-center gap-4 rounded-2xl border border-[#E6E8EE] bg-white p-5">
    <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-[#FEF3E6] text-[#D9741C]">
      <Icon className="h-6 w-6">{icon}</Icon>
    </span>
    <div className="min-w-0">
      <p className="truncate text-2xl font-bold leading-none text-[#1B2F5B]">{value}</p>
      <p className="mt-1.5 text-sm text-[#5D6882]">{label}</p>
    </div>
  </div>
);

const actionBase =
  "grid h-9 w-9 place-items-center rounded-lg border border-[#E6E8EE] bg-white text-[#5D6882] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2F5B] focus-visible:ring-offset-2";

const ActionButtons = ({ vendor, onView, onUpdate, onDelete }) => (
  <div className="flex items-center justify-end gap-2">
    <button
      type="button"
      onClick={() => onView(vendor)}
      aria-label={`View ${vendor.name}`}
      title="View"
      className={`${actionBase} hover:border-[#1B2F5B] hover:bg-[#F6F5F0] hover:text-[#1B2F5B]`}
    >
      <Icon className="h-[18px] w-[18px]">
        <path d="M2.5 12C3.5 10 7 6 12 6s8.5 4 9.5 6c-1 2-4.5 6-9.5 6s-8.5-4-9.5-6z" />
        <circle cx="12" cy="12" r="3" />
      </Icon>
    </button>
    <button
      type="button"
      onClick={() => onUpdate(vendor)}
      aria-label={`Update ${vendor.name}`}
      title="Update"
      className={`${actionBase} hover:border-[#F0892F] hover:bg-[#FEF3E6] hover:text-[#9A4A0B]`}
    >
      <Icon className="h-[18px] w-[18px]">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
      </Icon>
    </button>
    <button
      type="button"
      onClick={() => onDelete(vendor)}
      aria-label={`Delete ${vendor.name}`}
      title="Delete"
      className={`${actionBase} hover:border-[#B42318] hover:bg-[#FEF3F2] hover:text-[#B42318]`}
    >
      <Icon className="h-[18px] w-[18px]">
        <path d="M3 6h18" />
        <path d="M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
        <path d="M10 11v6M14 11v6" />
      </Icon>
    </button>
  </div>
);

/* --------------------------------- Page --------------------------------- */

const VendorDashboard = () => {
  const { data, isLoading, isError, refetch } = useGetAllvendorQuery();
  const [search, setSearch] = useState("");
  const [service, setService] = useState("all");
  const [page, setPage] = useState(1);

  const vendors = data?.vendors ?? [];

  // Services that at least one vendor offers, with how many vendors each has
  const serviceOptions = useMemo(() => {
    const map = {};
    vendors.forEach((v) => {
      const key = v.service_name || "No service";
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  }, [vendors]);

  const stats = useMemo(() => {
    const locations = new Set(vendors.map((v) => v.address?.trim().toLowerCase()));
    const latest = vendors.reduce(
      (max, v) => (new Date(v.created_at) > max ? new Date(v.created_at) : max),
      new Date(0)
    );
    return {
      total: vendors.length,
      services: serviceOptions.length,
      locations: locations.size,
      latest: vendors.length ? formatDate(latest) : "-",
    };
  }, [vendors, serviceOptions]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return [...vendors]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .filter((v) => service === "all" || (v.service_name || "No service") === service)
      .filter(
        (v) =>
          !q ||
          v.name?.toLowerCase().includes(q) ||
          v.address?.toLowerCase().includes(q) ||
          v.service_name?.toLowerCase().includes(q) ||
          v.number?.includes(q)
      );
  }, [vendors, search, service]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const rows = filtered.slice(start, start + PAGE_SIZE);

  const onSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const onService = (e) => {
    setService(e.target.value);
    setPage(1);
  };

  // TODO: connect these to your pages, modals or API calls
  const handleView = (vendor) => console.log("view", vendor);
  const handleUpdate = (vendor) => console.log("update", vendor);
  const handleDelete = (vendor) => console.log("delete", vendor);

  return (
    <div className="font-sans">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-[#1B2F5B] sm:text-3xl">
          Vendors
        </h1>
        <p className="mt-1 text-base text-[#5D6882]">
          Service providers registered on SewaGhar.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total vendors"
          value={stats.total}
          icon={
            <>
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
            </>
          }
        />
        <StatCard
          label="Services covered"
          value={stats.services}
          icon={<path d="M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10" />}
        />
        <StatCard
          label="Locations"
          value={stats.locations}
          icon={
            <>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </>
          }
        />
        <StatCard
          label="Latest vendor added"
          value={stats.latest}
          icon={
            <>
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 10h18M8 3v4M16 3v4" />
            </>
          }
        />
      </div>

      {/* Table card */}
      <section
        aria-label="Vendors table"
        className="overflow-hidden rounded-2xl border border-[#E6E8EE] bg-white"
      >
        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b border-[#E6E8EE] p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#9AA2B5]">
              <Icon className="h-[18px] w-[18px]">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </Icon>
            </span>
            <input
              type="search"
              value={search}
              onChange={onSearch}
              aria-label="Search vendors"
              placeholder="Search by name, service, address or phone"
              className="h-11 w-full rounded-xl border-[1.5px] border-[#D9DCE4] bg-white pl-11 pr-4 text-[0.95rem] text-[#1B2F5B] transition placeholder:text-[#9AA2B5] focus:border-[#1B2F5B] focus:outline-none focus:ring-4 focus:ring-[#1B2F5B]/15"
            />
          </div>

          <div className="relative w-full lg:w-64">
            <label htmlFor="service-filter" className="sr-only">
              Filter by service
            </label>
            <select
              id="service-filter"
              value={service}
              onChange={onService}
              className="h-11 w-full cursor-pointer appearance-none rounded-xl border-[1.5px] border-[#D9DCE4] bg-white pl-4 pr-11 text-[0.95rem] font-semibold text-[#1B2F5B] transition focus:border-[#1B2F5B] focus:outline-none focus:ring-4 focus:ring-[#1B2F5B]/15"
            >
              <option value="all">All services ({stats.total})</option>
              {serviceOptions.map(([name, count]) => (
                <option key={name} value={name}>
                  {name} ({count})
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5D6882]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* States */}
        {isLoading ? (
          <div className="divide-y divide-[#E6E8EE]" aria-busy="true">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-5">
                <div className="h-10 w-10 rounded-full bg-[#EDEFF4] motion-safe:animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-40 rounded bg-[#EDEFF4] motion-safe:animate-pulse" />
                  <div className="h-3 w-56 rounded bg-[#EDEFF4] motion-safe:animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="px-6 py-16 text-center">
            <p className="text-lg font-bold text-[#1B2F5B]">
              We couldn&apos;t load the vendors
            </p>
            <p className="mt-1 text-[#5D6882]">Check your connection and try again.</p>
            <button
              type="button"
              onClick={refetch}
              className={`mt-5 inline-flex h-11 items-center rounded-xl bg-[#1B2F5B] px-6 text-[0.95rem] font-bold text-white transition-colors hover:bg-[#14234A] ${focusRing}`}
            >
              Try again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-lg font-bold text-[#1B2F5B]">No vendors found</p>
            <p className="mt-1 text-[#5D6882]">Try a different search or filter.</p>
          </div>
        ) : (
          <>
            {/* Desktop / tablet table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[960px] text-left">
                <thead className="bg-[#F6F5F0] text-xs font-semibold uppercase tracking-wider text-[#5D6882]">
                  <tr>
                    <th scope="col" className="px-5 py-3.5">Vendor</th>
                    <th scope="col" className="px-5 py-3.5">Service</th>
                    <th scope="col" className="px-5 py-3.5">Phone</th>
                    <th scope="col" className="px-5 py-3.5">Address</th>
                    <th scope="col" className="px-5 py-3.5">Joined</th>
                    <th scope="col" className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E8EE]">
                  {rows.map((v) => (
                    <tr key={v.id} className="transition-colors hover:bg-[#F6F5F0]/60">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={v.name} />
                          <div className="min-w-0">
                            <p className="truncate font-bold text-[#1B2F5B]">{v.name}</p>
                            <p className="truncate text-sm text-[#5D6882]">
                              Vendor #{v.id} &middot; User #{v.user_id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <ServiceBadge name={v.service_name} />
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-[0.95rem] text-[#1B2F5B]">
                        {v.number || "-"}
                      </td>
                      <td className="max-w-[220px] px-5 py-4">
                        <p className="truncate text-[0.95rem] text-[#5D6882]" title={v.address}>
                          {v.address || "-"}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-[0.95rem] text-[#5D6882]">
                        {formatDate(v.created_at)}
                      </td>
                      <td className="px-5 py-4">
                        <ActionButtons
                          vendor={v}
                          onView={handleView}
                          onUpdate={handleUpdate}
                          onDelete={handleDelete}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <ul className="divide-y divide-[#E6E8EE] md:hidden">
              {rows.map((v) => (
                <li key={v.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar name={v.name} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate font-bold text-[#1B2F5B]">{v.name}</p>
                        <ServiceBadge name={v.service_name} />
                      </div>
                      <p className="text-sm text-[#5D6882]">
                        Vendor #{v.id} &middot; User #{v.user_id}
                      </p>
                      <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <dt className="text-[#5D6882]">Phone</dt>
                          <dd className="font-semibold text-[#1B2F5B]">{v.number || "-"}</dd>
                        </div>
                        <div>
                          <dt className="text-[#5D6882]">Joined</dt>
                          <dd className="font-semibold text-[#1B2F5B]">{formatDate(v.created_at)}</dd>
                        </div>
                        <div className="col-span-2">
                          <dt className="text-[#5D6882]">Address</dt>
                          <dd className="font-semibold text-[#1B2F5B]">{v.address || "-"}</dd>
                        </div>
                      </dl>
                      <div className="mt-4 border-t border-[#E6E8EE] pt-3">
                        <ActionButtons
                          vendor={v}
                          onView={handleView}
                          onUpdate={handleUpdate}
                          onDelete={handleDelete}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            <div className="flex flex-col items-center justify-between gap-3 border-t border-[#E6E8EE] px-5 py-4 sm:flex-row">
              <p className="text-sm text-[#5D6882]">
                Showing{" "}
                <span className="font-semibold text-[#1B2F5B]">
                  {start + 1}-{start + rows.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#1B2F5B]">{filtered.length}</span>{" "}
                vendors
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`h-10 rounded-xl border-[1.5px] border-[#D9DCE4] bg-white px-4 text-sm font-semibold text-[#1B2F5B] transition-colors hover:border-[#1B2F5B] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[#D9DCE4] ${focusRing}`}
                >
                  Previous
                </button>
                <span className="px-2 text-sm font-semibold text-[#1B2F5B]">
                  {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`h-10 rounded-xl border-[1.5px] border-[#D9DCE4] bg-white px-4 text-sm font-semibold text-[#1B2F5B] transition-colors hover:border-[#1B2F5B] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[#D9DCE4] ${focusRing}`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default VendorDashboard;