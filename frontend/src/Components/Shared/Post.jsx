import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllpostQuery } from "../../Redux/Features/PostSlice";

/*
  SewaGhar: Community feed of service requests (Twitter-style timeline)
  Same palette as the rest of the site: navy #1B2F5B, orange #F0892F, paper #F6F5F0.
  Expects: { posts: [{ id, title, description, location, budget, slug, created_at, username }] }
  Route example: /posts  (inside PublicLayout)
*/

const PAGE_SIZE = 8;

/* -------------------------------- Helpers ------------------------------- */

const getInitials = (name = "") =>
  name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";

// "Toilet cleaning 8987" -> "Toilet cleaning" (drops the trailing number)
const getTitle = (post) =>
  (post.slug || post.title || "Service request")
    .replace(/[-_]+/g, " ")
    .replace(/\s*\d+$/, "")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());

const getHandle = (name = "") => "@" + name.toLowerCase().replace(/\s+/g, "");

const formatBudget = (budget) => {
  const n = Number(budget);
  return Number.isFinite(n) ? `Rs ${n.toLocaleString("en-IN")}` : "Negotiable";
};

const timeAgo = (iso) => {
  if (!iso) return "";
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 60) return "now";
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  if (s < 86400 * 30) return `${Math.floor(s / 86400)}d`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};

const fullDate = (iso) =>
  iso
    ? new Date(iso).toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

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
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2F5B] focus-visible:ring-offset-2";

const tabs = [
  { value: "latest", label: "Latest" },
  { value: "budget", label: "Top budget" },
];

/* -------------------------------- Post row ------------------------------- */

const Avatar = ({ name }) => {
  const dark = (name.length + name.charCodeAt(0)) % 2 === 0;
  return (
    <span
      className={`grid h-11 w-11 flex-none place-items-center rounded-full text-sm font-bold ${
        dark ? "bg-[#1B2F5B] text-white" : "bg-[#F0892F] text-[#1B2F5B]"
      }`}
    >
      {getInitials(name)}
    </span>
  );
};

const actionClass = `inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-[#5D6882] transition-colors hover:bg-[#FEF3E6] hover:text-[#9A4A0B] ${focusRing}`;

const PostRow = ({ post, saved, copied, onSave, onShare }) => (
  <article className="flex gap-3 px-4 py-5 transition-colors hover:bg-[#F6F5F0]/60 sm:gap-4 sm:px-6">
    <Avatar name={post.username || "?"} />

    <div className="min-w-0 flex-1">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-x-1.5 text-[0.95rem]">
        <span className="font-bold text-[#1B2F5B]">{post.username}</span>
        <span className="text-[#5D6882]">{getHandle(post.username)}</span>
        <span className="text-[#9AA2B5]" aria-hidden="true">&middot;</span>
        <time dateTime={post.created_at} title={fullDate(post.created_at)} className="text-[#5D6882]">
          {timeAgo(post.created_at)}
        </time>
      </div>

      {/* Content */}
      <h3 className="mt-1 text-lg font-bold text-[#1B2F5B]">{getTitle(post)}</h3>
      <p className="mt-1 whitespace-pre-line text-base leading-relaxed text-[#2A3A63]">
        {post.description?.trim()}
      </p>

      {/* Meta chips */}
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FEF3E6] px-3 py-1 text-sm font-bold text-[#9A4A0B]">
          <Icon className="h-4 w-4">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v10M9.5 9.5c0-1 1-1.8 2.5-1.8s2.5.8 2.5 1.8-1 1.6-2.5 1.9-2.5.9-2.5 1.9 1 1.8 2.5 1.8 2.5-.8 2.5-1.8" />
          </Icon>
          {formatBudget(post.budget)}
        </span>
        {post.location && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EDEFF4] px-3 py-1 text-sm font-semibold text-[#3F4A66]">
            <Icon className="h-4 w-4">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </Icon>
            {post.location}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="-ml-3 mt-3 flex items-center gap-1 sm:gap-3">
        <Link to={`/post/${post.id}`} className={actionClass}>
          <Icon className="h-[18px] w-[18px]">
            <path d="M21 12a8 8 0 01-11.5 7.2L3 21l1.8-6A8 8 0 1121 12z" />
          </Icon>
          Offer help
        </Link>

        <button
          type="button"
          onClick={() => onSave(post.id)}
          aria-pressed={saved}
          className={`${actionClass} ${saved ? "text-[#9A4A0B]" : ""}`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-[18px] w-[18px]"
            fill={saved ? "#F0892F" : "none"}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
          </svg>
          {saved ? "Saved" : "Save"}
        </button>

        <button type="button" onClick={() => onShare(post.id)} className={actionClass}>
          <Icon className="h-[18px] w-[18px]">
            <path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4-4 4M12 2v13" />
          </Icon>
          <span aria-live="polite">{copied ? "Link copied" : "Share"}</span>
        </button>
      </div>
    </div>
  </article>
);

const RowSkeleton = () => (
  <div className="flex gap-4 px-6 py-5" aria-hidden="true">
    <div className="h-11 w-11 flex-none rounded-full bg-[#EDEFF4] motion-safe:animate-pulse" />
    <div className="flex-1 space-y-3">
      <div className="h-3.5 w-40 rounded bg-[#EDEFF4] motion-safe:animate-pulse" />
      <div className="h-4 w-1/2 rounded bg-[#EDEFF4] motion-safe:animate-pulse" />
      <div className="h-3.5 w-full rounded bg-[#EDEFF4] motion-safe:animate-pulse" />
      <div className="h-6 w-32 rounded-full bg-[#EDEFF4] motion-safe:animate-pulse" />
    </div>
  </div>
);

/* --------------------------------- Page --------------------------------- */

const Post = () => {
  const { data, isLoading, isError, refetch } = useGetAllpostQuery();
  const [tab, setTab] = useState("latest");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [savedIds, setSavedIds] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  const posts = data?.posts ?? [];

  const sorted = useMemo(() => {
    const list = [...posts];
    return tab === "budget"
      ? list.sort((a, b) => Number(b.budget) - Number(a.budget))
      : list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [posts, tab]);

  const shown = sorted.slice(0, visible);

  const summary = useMemo(() => {
    const budgets = posts.map((p) => Number(p.budget)).filter(Number.isFinite);
    const avg = budgets.length ? budgets.reduce((a, b) => a + b, 0) / budgets.length : 0;
    const counts = {};
    posts.forEach((p) => p.location && (counts[p.location] = (counts[p.location] || 0) + 1));
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    return { avg, top: top ? top[0] : "-" };
  }, [posts]);

  const toggleSave = (id) =>
    setSavedIds((ids) => (ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]));

  const share = async (id) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/post/${id}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <section className="bg-[#F6F5F0] font-sans" aria-labelledby="posts-heading">
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 md:pt-12 lg:pb-24">
        <div className="mb-6">
          <h1 id="posts-heading" className="text-3xl font-bold tracking-tight text-[#1B2F5B] sm:text-4xl">
            Service requests
          </h1>
          <p className="mt-2 text-base text-[#5D6882]">
            See what people near you need and offer your help.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_300px]">
          {/* Timeline */}
          <div className="min-w-0">
            {/* Composer */}
            <Link
              to="/post/create"
              className={`mb-4 flex items-center gap-4 rounded-2xl border border-[#E6E8EE] bg-white p-4 transition-colors hover:border-[#1B2F5B] sm:p-5 ${focusRing}`}
            >
              <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-[#FEF3E6] text-[#D9741C]">
                <Icon>
                  <path d="M12 5v14M5 12h14" strokeWidth="2.2" />
                </Icon>
              </span>
              <span className="flex-1 text-base text-[#5D6882]">What do you need help with?</span>
              <span className="hidden h-10 items-center rounded-xl bg-[#1B2F5B] px-5 text-sm font-bold text-white sm:inline-flex">
                Post
              </span>
            </Link>

            <div className="rounded-2xl border border-[#E6E8EE] bg-white">
              {/* Tabs */}
              <div role="tablist" aria-label="Sort requests" className="flex border-b border-[#E6E8EE]">
                {tabs.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    role="tab"
                    aria-selected={tab === t.value}
                    onClick={() => {
                      setTab(t.value);
                      setVisible(PAGE_SIZE);
                    }}
                    className={`relative flex-1 px-4 py-4 text-[0.95rem] transition-colors hover:bg-[#F6F5F0] ${focusRing} ${
                      tab === t.value ? "font-bold text-[#1B2F5B]" : "font-medium text-[#5D6882]"
                    }`}
                  >
                    {t.label}
                    {tab === t.value && (
                      <span className="absolute bottom-0 left-1/2 h-1 w-14 -translate-x-1/2 rounded-full bg-[#F0892F]" />
                    )}
                  </button>
                ))}
              </div>

              {/* Feed */}
              {isLoading ? (
                <div className="divide-y divide-[#E6E8EE]" aria-busy="true">
                  {[...Array(4)].map((_, i) => (
                    <RowSkeleton key={i} />
                  ))}
                </div>
              ) : isError ? (
                <div className="px-6 py-14 text-center">
                  <p className="text-lg font-bold text-[#1B2F5B]">We couldn&apos;t load the requests</p>
                  <p className="mt-1 text-[#5D6882]">Check your connection and try again.</p>
                  <button
                    type="button"
                    onClick={refetch}
                    className={`mt-5 inline-flex h-12 items-center rounded-xl bg-[#1B2F5B] px-7 text-base font-bold text-white transition-colors hover:bg-[#14234A] ${focusRing}`}
                  >
                    Try again
                  </button>
                </div>
              ) : shown.length === 0 ? (
                <div className="px-6 py-14 text-center">
                  <p className="text-lg font-bold text-[#1B2F5B]">No requests yet</p>
                  <p className="mt-1 text-[#5D6882]">Be the first to post what you need.</p>
                </div>
              ) : (
                <>
                  <div className="divide-y divide-[#E6E8EE]">
                    {shown.map((p) => (
                      <PostRow
                        key={p.id}
                        post={p}
                        saved={savedIds.includes(p.id)}
                        copied={copiedId === p.id}
                        onSave={toggleSave}
                        onShare={share}
                      />
                    ))}
                  </div>

                  {shown.length < sorted.length && (
                    <button
                      type="button"
                      onClick={() => setVisible((n) => n + PAGE_SIZE)}
                      className={`w-full rounded-b-2xl border-t border-[#E6E8EE] px-6 py-4 text-[0.95rem] font-semibold text-[#D9741C] transition-colors hover:bg-[#F6F5F0] ${focusRing}`}
                    >
                      Show more requests
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Side column (desktop) */}
          <aside className="hidden space-y-4 lg:sticky lg:top-28 lg:block">
            <div className="rounded-2xl bg-[#1B2F5B] p-6 text-white">
              <p className="text-lg font-bold leading-snug">Need something fixed or cleaned?</p>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Post a request and let providers come to you.
              </p>
              <Link
                to="/post/create"
                className="mt-5 inline-flex h-11 items-center rounded-xl bg-[#F0892F] px-5 text-[0.95rem] font-bold text-[#1B2F5B] transition-colors hover:bg-[#D9741C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B2F5B]"
              >
                Post a request
              </Link>
            </div>

            <div className="rounded-2xl border border-[#E6E8EE] bg-white p-6">
              <h2 className="text-base font-bold text-[#1B2F5B]">At a glance</h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-[#5D6882]">Open requests</dt>
                  <dd className="font-bold text-[#1B2F5B]">{posts.length}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-[#5D6882]">Average budget</dt>
                  <dd className="font-bold text-[#1B2F5B]">{formatBudget(summary.avg)}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-[#5D6882]">Busiest area</dt>
                  <dd className="truncate font-bold text-[#1B2F5B]">{summary.top}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Post;