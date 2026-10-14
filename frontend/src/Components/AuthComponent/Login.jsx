import React, { useState } from "react";
import sewaGharLogo from "../../assets/sewaghar-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../Redux/Features/UserSlice";
import { toast } from "react-toastify";

const inputClass =
  "h-12 w-full rounded-xl border-[1.5px] border-[#D9DCE4] bg-white px-4 text-base text-[#1B2F5B] transition placeholder:text-[#9AA2B5] focus:border-[#1B2F5B] focus:outline-none focus:ring-4 focus:ring-[#1B2F5B]/15";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData).unwrap();
      localStorage.setItem("user", JSON.stringify(res.user));
      toast.success("Welcome back!", {
        style: { background: "#1B2F5B", color: "#fff" },
        progressStyle: { background: "#F0892F" },
      });
      if (res.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (res.user.role === "vendor") {
        navigate("/vendor/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Unable to log in");
    }
  };

  return (
    // Exactly one screen tall. The inner wrapper only scrolls on extremely small screens.
    <section className="h-dvh w-full overflow-y-auto bg-[#F6F5F0]">
      <div className="flex min-h-full items-center justify-center px-4 py-4 sm:px-6">
        <div className="w-full max-w-[480px]">
          {/* Logo scales with screen height so everything fits without scrolling */}
          <div className="mb-3 flex justify-center">
            <img
              src={sewaGharLogo}
              alt="SewaGhar"
              className="h-[clamp(64px,13vh,112px)] w-auto select-none"
              draggable="false"
            />
          </div>

          {/* Card (borderless on phones, raised from sm up) */}
          <div className="sm:overflow-hidden sm:rounded-3xl sm:border sm:border-[#E6E8EE] sm:border-t-[4px] sm:border-t-[#F0892F] sm:bg-white sm:p-8 sm:shadow-[0_20px_50px_-20px_rgba(27,47,91,0.25)]">
            <form onSubmit={handleSubmit} noValidate>
              <h1 className="mb-1 text-center text-2xl font-bold tracking-tight text-[#1B2F5B] sm:text-3xl">
                Welcome back
              </h1>
              <p className="mb-5 text-center text-base text-[#5D6882]">
                Log in to manage your bookings.
              </p>

              <div className="mb-4 grid gap-2">
                <label
                  htmlFor="email"
                  className="text-[0.95rem] font-semibold text-[#1B2F5B]"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              <div className="mb-4 grid gap-2">
                <label
                  htmlFor="password"
                  className="text-[0.95rem] font-semibold text-[#1B2F5B]"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className={`${inputClass} pr-14`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-[#5D6882] hover:text-[#1B2F5B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B2F5B]"
                  >
                    {showPassword ? (
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 3l18 18" />
                        <path d="M10.6 6.1A10.7 10.7 0 0 1 12 6c5 0 8.5 4 9.5 6a12.6 12.6 0 0 1-2.7 3.4M6.6 6.7C4.4 8.2 3 10.4 2.5 12c1 2 4.5 6 9.5 6 1.4 0 2.6-.3 3.7-.8" />
                        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.5 12C3.5 10 7 6 12 6s8.5 4 9.5 6c-1 2-4.5 6-9.5 6s-8.5-4-9.5-6z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[0.95rem]">
                <label className="inline-flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    name="remember"
                    className="h-[18px] w-[18px] accent-[#F0892F]"
                  />
                  <span className="text-[#1B2F5B]">Keep me logged in</span>
                </label>
                <a
                  href="#"
                  className="font-semibold text-[#1B2F5B] hover:text-[#D9741C]"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full rounded-xl bg-[#1B2F5B] text-base font-bold text-white transition hover:bg-[#14234A] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#1B2F5B]"
              >
                {isLoading ? "Logging in..." : "Log in"}
              </button>

              <p className="mt-5 text-center text-base text-[#5D6882]">
                New to SewaGhar?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-[#1B2F5B]  decoration-[#F0892F] decoration-2 underline-offset-4 hover:text-[#D9741C]"
                >
                  Create an account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
