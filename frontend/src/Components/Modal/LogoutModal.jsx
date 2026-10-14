import React, { useEffect, useRef, useState } from "react";

/*
  SewaGhar Logout confirmation modal
  Same design as Login / Header / Footer: navy #1B2F5B, orange #F0892F, paper #F6F5F0.
  Place at: src/Components/Shared/LogoutModal.jsx

  Props:
    open      boolean   show / hide the modal
    onClose   function  called on Cancel, Escape, or backdrop click
    onConfirm function  called when the user confirms (do your logout here)
    loading   boolean   optional, disables buttons while logging out
*/

const LogoutModal = ({ open, onClose, onConfirm, loading = false }) => {
  const cancelRef = useRef(null);
  
  // Escape to close, lock page scroll, focus the safe action first
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cancelRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4 font-sans">
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="absolute inset-0 bg-[#1B2F5B]/60"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
        aria-describedby="logout-desc"
        className="relative w-full max-w-[420px] overflow-hidden rounded-3xl border border-t-4 border-[#E6E8EE] border-t-[#F0892F] bg-white p-6 text-center shadow-[0_20px_50px_-20px_rgba(27,47,91,0.45)] sm:p-8"
      >
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#FEF3E6] text-[#D9741C]">
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
        </span>

        <h2
          id="logout-title"
          className="mt-5 text-2xl font-bold tracking-tight text-[#1B2F5B]"
        >
          Log out?
        </h2>
        <p id="logout-desc" className="mt-2 text-base text-[#5D6882]">
          You&apos;ll need to log in again to manage your account.
        </p>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
          <button
            ref={cancelRef}
            type="button"
            onClick={onClose}
            disabled={loading}
            className="h-12 flex-1 rounded-xl border-[1.5px] border-[#D9DCE4] bg-white text-base font-semibold text-[#1B2F5B] transition-colors hover:border-[#1B2F5B] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2F5B] focus-visible:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="h-12 flex-1 rounded-xl bg-[#1B2F5B] text-base font-bold text-white transition-colors hover:bg-[#14234A] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2F5B] focus-visible:ring-offset-2"
          >
            {loading ? "Logging out..." : "Yes, log out"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
