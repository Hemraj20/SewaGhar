import React from "react";

export default function NotFound({
    title = "404",
    heading = "Page not found",
    message = "Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.",
    onGoHome,
    homeHref = "/",
}) {
    const handleGoHome = (e) => {
        if (onGoHome) {
            e.preventDefault();
            onGoHome();
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-red-50 px-4">
            <div className="text-center max-w-md">
                <p className="text-sm font-semibold text-indigo-600 tracking-wide uppercase">
                    Error {title}
                </p>
                <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                    {heading}
                </h1>
                <p className="mt-4 text-base text-gray-500">
                    {message}
                </p>

                <div className="mt-8 flex items-center justify-center gap-4">
                    <a
                        href={homeHref}
                        onClick={handleGoHome}
                        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors"
                    >
                        Go back home
                    </a>
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                    >
                        Go back
                    </button>
                </div>
            </div>
        </div>
    );
}