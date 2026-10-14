import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOffSharp } from "react-icons/io5";
import { useRegisterMutation } from "../../Redux/Features/UserSlice";
import { toast } from "react-toastify";

const inputClass =
  "h-12 w-full rounded-xl border-[1.5px] border-[#D9DCE4] bg-white px-4 text-base text-[#1B2F5B] transition placeholder:text-[#9AA2B5] focus:border-[#1B2F5B] focus:outline-none focus:ring-4 focus:ring-[#1B2F5B]/15";

const labelClass = "text-[0.95rem] font-semibold text-[#1B2F5B]";

const linkClass =
  "font-semibold text-[#1B2F5B]  decoration-[#F0892F] decoration-2 underline-offset-4 hover:text-[#D9741C]";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [register, isLoading, error] = useRegisterMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    phone: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(formData).unwrap();

      toast.success(res.message);
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || "unable to register");
    }
  };
  return (
    <section className="flex min-h-[calc(100dvh-88px)] items-center justify-center bg-[#F6F5F0] px-4 py-8 sm:px-6 sm:py-12">
      <div className="w-full max-w-[560px]">
        <div className="sm:overflow-hidden sm:rounded-3xl sm:border sm:border-[#E6E8EE] sm:border-t-[4px] sm:border-t-[#F0892F] sm:bg-white sm:p-10 sm:shadow-[0_20px_50px_-20px_rgba(27,47,91,0.25)]">
          <form onSubmit={handleSubmit} noValidate>
            <h1 className="mb-1 text-center text-2xl font-bold tracking-tight text-[#1B2F5B] sm:text-3xl">
              Create your account
            </h1>
            <p className="mb-7 text-center text-base text-[#5D6882]">
              Join SewaGhar in less than a minute.
            </p>

            <div className="grid gap-5">
              <div className="grid content-start gap-2">
                <label htmlFor="username" className={labelClass}>
                  Username
                </label>
                <input
                  onChange={handleChange}
                  value={formData.username}
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Your Username"
                  className={inputClass}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid content-start gap-2">
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    onChange={handleChange}
                    value={formData.email}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>

                <div className="grid content-start gap-2">
                  <label htmlFor="phone" className={labelClass}>
                    Phone
                  </label>
                  <input
                    onChange={handleChange}
                    value={formData.phone}
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="98XXXXXXXX"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid relative content-start gap-2">
                  <label htmlFor="password" className={labelClass}>
                    Password
                  </label>

                  <input
                    onChange={handleChange}
                    value={formData.password}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Create a password"
                    className={inputClass}
                  />
                  <div
                    onClick={() => {
                      setShowPassword((prev) => !prev);
                    }}
                    className="absolute right-2 top-12"
                  >
                    {showPassword ? <IoEyeOffSharp /> : <IoMdEye />}
                  </div>
                  <p className="text-sm text-[#5D6882]">
                    At least 8 characters.
                  </p>
                </div>

                {/* Role (replaces Confirm password) */}
                <div className="grid content-start gap-2">
                  <label htmlFor="role" className={labelClass}>
                    Role
                  </label>
                  <div className="relative">
                    <select
                      onChange={handleChange}
                      value={formData.role}
                      id="role"
                      name="role"
                      required
                      defaultValue=""
                      className={`${inputClass} cursor-pointer appearance-none pr-11 invalid:text-[#9AA2B5] [&>option]:text-[#1B2F5B]`}
                    >
                      <option value="" disabled>
                        Select your role
                      </option>
                      <option value="user">User</option>
                      <option value="vendor">Vendor</option>
                      <option value="admin">Admin</option>
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
              </div>
            </div>

            {/* Terms */}
            <label className="mb-6 mt-5 inline-flex cursor-pointer items-start gap-2.5 text-[0.95rem]">
              <input
                type="checkbox"
                name="terms"
                className="mt-0.5 h-[18px] w-[18px] flex-none accent-[#F0892F]"
              />
              <span className="text-[#1B2F5B]">
                I agree to the{" "}
                <Link to="/terms" className={linkClass}>
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className={linkClass}>
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-[#1B2F5B] text-base font-bold text-white transition hover:bg-[#14234A] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#1B2F5B]"
            >
              Create account
            </button>

            <p className="mt-6 text-center text-base text-[#5D6882]">
              Already have an account?{" "}
              <Link to="/login" className={linkClass}>
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
