import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { useRegisterMutation } from "../../redux/features/userSlice";
import { toast } from "react-toastify";
const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [register, { isLoading, errors }] = useRegisterMutation();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        role: ''
    });
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register(formData).unwrap();
            toast.success(res.message);
            navigate('/login');
        }
        catch (err) {
            toast.error(err?.data?.message);
        }
    }
    return (
        <div className="flex  w-full items-center justify-center bg-[#F7F6F2] px-4 py-6">

            <div className="w-full max-w-2xl">

                {/* Card */}
                <div className="rounded-3xl border border-[#E8E5DD] bg-white p-6 shadow-[0_15px_45px_rgba(20,40,43,0.07)] sm:p-8">

                    {/* Header */}
                    <div className="mb-6 text-center">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#E0912B]">
                            Join sewaX
                        </p>

                        <h1 className="text-2xl font-semibold tracking-tight text-[#17211F]">
                            Create your account
                        </h1>

                        <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-[#7A827E]">
                            Create an account to discover trusted services and connect with
                            professionals around you.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-3.5">

                        {/* Username */}
                        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-5">
                            <label
                                htmlFor="username"
                                className="w-28 shrink-0 text-sm font-medium text-[#26332F]"
                            >
                                Username
                            </label>

                            <input
                                id="username"
                                value={formData.username}
                                name="username"
                                type="text"
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className="flex-1 rounded-xl border border-[#E3E1DA] bg-[#FCFCFA] px-4 py-2.5 text-sm text-[#17211F] outline-none transition placeholder:text-[#A3AAA6] focus:border-[#E0912B] focus:bg-white focus:ring-4 focus:ring-[#E0912B]/10"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-5">
                            <label
                                htmlFor="email"
                                className="w-28 shrink-0 text-sm font-medium text-[#26332F]"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                                type="email"
                                placeholder="you@example.com"
                                className="flex-1 rounded-xl border border-[#E3E1DA] bg-[#FCFCFA] px-4 py-2.5 text-sm text-[#17211F] outline-none transition placeholder:text-[#A3AAA6] focus:border-[#E0912B] focus:bg-white focus:ring-4 focus:ring-[#E0912B]/10"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-5">
                            <label
                                htmlFor="password"
                                className="w-28 shrink-0 text-sm font-medium text-[#26332F]"
                            >
                                Password
                            </label>
                            <div className="relative flex-1">

                                <input
                                    id="password"
                                    onChange={handleChange}
                                    name="password"
                                    value={formData.password}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create a strong password"
                                    className="flex-1 w-full rounded-xl border border-[#E3E1DA] bg-[#FCFCFA] px-4 py-2.5 text-sm text-[#17211F] outline-none transition placeholder:text-[#A3AAA6] focus:border-[#E0912B] focus:bg-white focus:ring-4 focus:ring-[#E0912B]/10"
                                />
                                <button
                                    onClick={(pre) => setShowPassword((prev) => !prev)}
                                    type="button"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#6B7570] hover:text-[#17211F]"
                                >
                                    {showPassword ? <IoIosEyeOff size={18} /> : <FaEye size={18} />}
                                </button>

                            </div>



                        </div>

                        {/* Phone */}
                        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-5">
                            <label
                                htmlFor="phone"
                                className="w-28 shrink-0 text-sm font-medium text-[#26332F]"
                            >
                                Phone
                            </label>

                            <input
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                name="phone"
                                type="tel"
                                placeholder="+977 98XXXXXXXX"
                                className="flex-1 rounded-xl border border-[#E3E1DA] bg-[#FCFCFA] px-4 py-2.5 text-sm text-[#17211F] outline-none transition placeholder:text-[#A3AAA6] focus:border-[#E0912B] focus:bg-white focus:ring-4 focus:ring-[#E0912B]/10"
                            />
                        </div>

                        {/* Address */}
                        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-5">
                            <label
                                htmlFor="address"
                                className="w-28 shrink-0 text-sm font-medium text-[#26332F]"
                            >
                                Address
                            </label>

                            <input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                type="text"
                                placeholder="Kathmandu, Nepal"
                                className="flex-1 rounded-xl border border-[#E3E1DA] bg-[#FCFCFA] px-4 py-2.5 text-sm text-[#17211F] outline-none transition placeholder:text-[#A3AAA6] focus:border-[#E0912B] focus:bg-white focus:ring-4 focus:ring-[#E0912B]/10"
                            />
                        </div>

                        {/* Role */}
                        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-5">
                            <label
                                htmlFor="role"
                                className="w-28 shrink-0 text-sm font-medium text-[#26332F]"
                            >
                                Account type
                            </label>

                            <select
                                id="role"
                                name="role"
                                onChange={handleChange}
                                value={formData.role}
                                className="flex-1 rounded-xl border border-[#E3E1DA] bg-[#FCFCFA] px-4 py-2.5 text-sm text-[#17211F] outline-none transition focus:border-[#E0912B] focus:bg-white focus:ring-4 focus:ring-[#E0912B]/10"
                            >
                                <option value="" disabled>
                                    Select account type
                                </option>
                                <option value="user">User</option>
                                <option value="vendor">Vendor</option>
                                <option value="admin">Admin</option>

                            </select>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="mt-5 w-full rounded-xl bg-[#14282B] px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[#1D3A3E] hover:shadow-lg active:scale-[0.99]"
                        >
                            Create account
                        </button>

                    </form>

                    {/* Login */}
                    <p className="mt-5 text-center text-sm text-[#6B7570]">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-[#E0912B] transition hover:text-[#C97E22]"
                        >
                            Sign in
                        </Link>
                    </p>

                </div>

            </div>
        </div>
    );
};

export default Register;

