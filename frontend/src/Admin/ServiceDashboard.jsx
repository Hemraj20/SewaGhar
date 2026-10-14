import React, { useMemo, useState } from "react";
import { useGetAllserviceQuery } from "../Redux/Features/ServiceSlice";

/*
  SewaGhar: Services page for admins (same UI as UserDashboard)
  Navy #1B2F5B, orange #F0892F, paper #F6F5F0.
  Expects the API shape: { services: [{ id, name, description }] }
*/

const PAGE_SIZE = 10;

/* -------------------------------- Helpers ------------------------------- */

// The API has no category field, so it is worked out from the service name.
const getCategory = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("clean")) return "cleaning";
  if (n.includes("repair")) return "repair";
  return "other";
};

const categoryMeta = {
  cleaning: { label: "Cleaning", badge: "bg-[#1B2F5B]/10 text-[#1B2F5B]" },
  repair: { label: "Repair", badge: "bg-[#FEF3E6] text-[#9A4A0B]" },
  other: { label: "Other", badge: "bg-[#EDEFF4] text-[#3F4A66]" },
};

const filters = [
  { value: "all", label: "All" },
  { value: "cleaning", label: "Cleaning" },
  { value: "repair", label: "Repair" },
  { value: "other", label: "Other" },
];

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

const CategoryBadge = ({ name }) => {
  const meta = categoryMeta[getCategory(name)];
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${meta.badge}`}
    >
      {meta.label}
    </span>
  );
};

const ServiceIcon = () => (
  <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-[#FEF3E6] text-[#D9741C]">
    <Icon>
      <path d="M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10" />
    </Icon>
  </span>
);

const StatCard = ({ label, value, icon }) => (
  <div className="flex items-center gap-4 rounded-2xl border border-[#E6E8EE] bg-white p-5">
    <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-[#FEF3E6] text-[#D9741C]">
      <Icon className="h-6 w-6">{icon}</Icon>
    </span>
    <div>
      <p className="text-2xl font-bold leading-none text-[#1B2F5B]">{value}</p>
      <p className="mt-1.5 text-sm text-[#5D6882]">{label}</p>
    </div>
  </div>
);

const actionBase =
  "grid h-9 w-9 place-items-center rounded-lg border border-[#E6E8EE] bg-white text-[#5D6882] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2F5B] focus-visible:ring-offset-2";

const ActionButtons = ({ service, onView, onUpdate, onDelete }) => (
  <div className="flex items-center justify-end gap-2">
    <button
      type="button"
      onClick={() => onView(service)}
      aria-label={`View ${service.name}`}
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
      onClick={() => onUpdate(service)}
      aria-label={`Update ${service.name}`}
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
      onClick={() => onDelete(service)}
      aria-label={`Delete ${service.name}`}
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

const ServiceDashboard = () => {
  const { data, isLoading, isError, refetch } = useGetAllserviceQuery();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const services = data?.services ?? [];

  const counts = useMemo(
    () => ({
      all: services.length,
      cleaning: services.filter((s) => getCategory(s.name) === "cleaning").length,
      repair: services.filter((s) => getCategory(s.name) === "repair").length,
      other: services.filter((s) => getCategory(s.name) === "other").length,
    }),
    [services]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return [...services]
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter((s) => category === "all" || getCategory(s.name) === category)
      .filter(
        (s) =>
          !q ||
          s.name?.toLowerCase().includes(q) ||
          s.description?.toLowerCase().includes(q)
      );
  }, [services, search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const rows = filtered.slice(start, start + PAGE_SIZE);

  const onSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const onCategory = (value) => {
    setCategory(value);
    setPage(1);
  };

  // TODO: connect these to your pages, modals or API calls
  const handleAdd = () => console.log("add service");
  const handleView = (service) => console.log("view", service);
  const handleUpdate = (service) => console.log("update", service);
  const handleDelete = (service) => console.log("delete", service);

  return (
    <div className="font-sans">
      {/* Heading */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1B2F5B] sm:text-3xl">
            Services
          </h1>
          <p className="mt-1 text-base text-[#5D6882]">
            Manage the services customers can book on SewaGhar.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1B2F5B] px-5 text-[0.95rem] font-bold text-white transition-colors hover:bg-[#14234A] ${focusRing}`}
        >
          <Icon className="h-4 w-4">
            <path d="M12 5v14M5 12h14" strokeWidth="2.5" />
          </Icon>
          Add service
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total services"
          value={counts.all}
          icon={<path d="M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10" />}
        />
        <StatCard
          label="Cleaning"
          value={counts.cleaning}
          icon={
            <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" />
          }
        />
        <StatCard
          label="Repair"
          value={counts.repair}
          icon={
            <path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z" />
          }
        />
        <StatCard
          label="Other"
          value={counts.other}
          icon={
            <>
              <path d="M3 11.5 12 4l9 7.5" />
              <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" />
            </>
          }
        />
      </div>

      {/* Table card */}
      <section
        aria-label="Services table"
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
              aria-label="Search services"
              placeholder="Search by name or description"
              className="h-11 w-full rounded-xl border-[1.5px] border-[#D9DCE4] bg-white pl-11 pr-4 text-[0.95rem] text-[#1B2F5B] transition placeholder:text-[#9AA2B5] focus:border-[#1B2F5B] focus:outline-none focus:ring-4 focus:ring-[#1B2F5B]/15"
            />
          </div>

          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                type="button"
                aria-pressed={category === f.value}
                onClick={() => onCategory(f.value)}
                className={`inline-flex h-10 items-center gap-2 rounded-xl border-[1.5px] px-4 text-sm font-semibold transition-colors ${focusRing} ${
                  category === f.value
                    ? "border-[#1B2F5B] bg-[#1B2F5B] text-white"
                    : "border-[#D9DCE4] bg-white text-[#1B2F5B] hover:border-[#1B2F5B]"
                }`}
              >
                {f.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    category === f.value
                      ? "bg-white/20 text-white"
                      : "bg-[#F6F5F0] text-[#5D6882]"
                  }`}
                >
                  {counts[f.value]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* States */}
        {isLoading ? (
          <div className="divide-y divide-[#E6E8EE]" aria-busy="true">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-5">
                <div className="h-10 w-10 rounded-xl bg-[#EDEFF4] motion-safe:animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-40 rounded bg-[#EDEFF4] motion-safe:animate-pulse" />
                  <div className="h-3 w-3/4 rounded bg-[#EDEFF4] motion-safe:animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="px-6 py-16 text-center">
            <p className="text-lg font-bold text-[#1B2F5B]">
              We couldn&apos;t load the services
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
            <p className="text-lg font-bold text-[#1B2F5B]">No services found</p>
            <p className="mt-1 text-[#5D6882]">Try a different search or filter.</p>
          </div>
        ) : (
          <>
            {/* Desktop / tablet table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[860px] text-left">
                <thead className="bg-[#F6F5F0] text-xs font-semibold uppercase tracking-wider text-[#5D6882]">
                  <tr>
                    <th scope="col" className="px-5 py-3.5">Service</th>
                    <th scope="col" className="px-5 py-3.5">Description</th>
                    <th scope="col" className="px-5 py-3.5">Category</th>
                    <th scope="col" className="px-5 py-3.5 text-right">ID</th>
                    <th scope="col" className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E8EE]">
                  {rows.map((s) => (
                    <tr key={s.id} className="transition-colors hover:bg-[#F6F5F0]/60">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <ServiceIcon />
                          <p className="font-bold text-[#1B2F5B]">{s.name}</p>
                        </div>
                      </td>
                      <td className="max-w-md px-5 py-4">
                        <p className="line-clamp-2 text-[0.95rem] text-[#5D6882]" title={s.description}>
                          {s.description}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <CategoryBadge name={s.name} />
                      </td>
                      <td className="px-5 py-4 text-right text-sm font-semibold text-[#5D6882]">
                        #{s.id}
                      </td>
                      <td className="px-5 py-4">
                        <ActionButtons
                          service={s}
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
              {rows.map((s) => (
                <li key={s.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <ServiceIcon />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-bold text-[#1B2F5B]">{s.name}</p>
                        <CategoryBadge name={s.name} />
                      </div>
                      <p className="mt-1 line-clamp-3 text-sm text-[#5D6882]">
                        {s.description}
                      </p>
                      <div className="mt-4 border-t border-[#E6E8EE] pt-3">
                        <ActionButtons
                          service={s}
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
                services
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

export default ServiceDashboard;