import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayouts = () => {
    return (
        <div className="flex min-h-screen w-full flex-col lg:flex-row">

            {/* Brand Section */}
            <section className="relative flex flex-1 flex-col justify-center gap-10 items-center overflow-hidden bg-gradient-to-br from-[#14282B] to-[#1D3A3E] p-8 text-[#F4EFE4] md:p-12 lg:flex-[0_0_42%]">

                {/* Background pattern */}
                <div className="pointer-events-none absolute inset-0 opacity-10">
                    <div className="h-full w-full bg-[radial-gradient(circle,_#F4EFE4_1px,_transparent_1px)] bg-[length:26px_26px]" />
                </div>

                {/* Brand content */}
                <div className="relative z-10">

                    <svg
                        className="mb-7 h-[52px] w-[52px]"
                        viewBox="0 0 52 52"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-label="sewaX mark"
                    >
                        <circle
                            cx="26"
                            cy="26"
                            r="25"
                            stroke="#F4EFE4"
                            strokeOpacity="0.35"
                            strokeWidth="1.5"
                        />

                        <path
                            d="M16 32c0 4.5 4 7 10 7s10-2.2 10-6c0-4.2-4.3-5.4-9-6.4C21.7 25.6 17 24.4 17 20.4c0-3.8 4-6 9-6s9.4 2.2 10 6.4"
                            stroke="#E0912B"
                            strokeWidth="2.6"
                            strokeLinecap="round"
                        />
                    </svg>

                    <h2 className="mb-4 font-serif text-5xl font-medium tracking-tight sm:text-6xl">
                        sewa<span className="italic text-[#E0912B]">X</span>
                    </h2>

                    <p className="max-w-md text-base leading-relaxed text-[#F4EFE4]/80 sm:text-lg">
                        Book trusted help for your home, errands, and everyday
                        tasks — all in one place.
                    </p>

                </div>

                {/* Statistics */}
                <div className="relative z-10 hidden gap-8 text-sm text-[#F4EFE4]/60 md:flex">

                    <div>
                        <strong className="block font-serif text-xl font-medium text-[#F4EFE4]">
                            12k+
                        </strong>
                        verified providers
                    </div>

                    <div>
                        <strong className="block font-serif text-xl font-medium text-[#F4EFE4]">
                            60+
                        </strong>
                        cities served
                    </div>

                    <div>
                        <strong className="block font-serif text-xl font-medium text-[#F4EFE4]">
                            4.8/5
                        </strong>
                        average rating
                    </div>

                </div>

            </section>

            {/* Auth Page */}
            <main className="flex flex-1 items-center justify-center bg-[#FBF9F5] p-8 md:p-12">
                <Outlet />
            </main>

        </div>
    )
}

export default AuthLayouts