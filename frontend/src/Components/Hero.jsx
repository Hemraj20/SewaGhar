import {
    Home,
    Wrench,
    PaintRoller,
    Droplet,
    Zap,
    Truck,
} from "lucide-react";



const CATEGORIES = [
    { name: "Cleaning", icon: Home },
    { name: "Repair", icon: Wrench },
    { name: "Painting", icon: PaintRoller },
    { name: "Plumbing", icon: Droplet },
    { name: "Electric", icon: Zap },
    { name: "Shifting", icon: Truck },
];

const VENDORS = [
    { initials: "MR", name: "Maya Reyes", craft: "Painting & Finishes" },
    { initials: "DK", name: "Devon Kelso", craft: "Electrical" },
    { initials: "AT", name: "Amara Tesfaye", craft: "Cleaning" },
    { initials: "JL", name: "Jonah Lindqvist", craft: "Plumbing" },
];

const Hero = () => {
    return (
        <section className="bg-gradient-to-b from-orange-50 to-white px-6 py-20 text-center">
            <h1 className="mx-auto max-w-2xl text-4xl font-extrabold leading-tight text-slate-800 sm:text-5xl">
                Post what you need. Let <span className="text-orange-500">verified</span> vendors come to you.
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-slate-500">
                SewaX routes your service request straight to vendors specialised in exactly that
                work — every one added and approved by our team, not a public sign-up.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href="#" className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white">
                    Post a request
                </a>
                <a href="#" className="rounded-lg border border-slate-800 px-6 py-3 font-semibold text-slate-800">
                    See our vendors
                </a>
            </div>

            <div className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3">
                {CATEGORIES.map(({ name, icon: Icon }) => (
                    <div
                        key={name}
                        className="rounded-2xl border border-orange-100 bg-white p-6 text-center shadow-sm"
                    >
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                            <Icon className="h-5 w-5 text-orange-500" />
                        </div>
                        <h3 className="text-sm font-semibold text-slate-800">{name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}

function HowItWorks() {
    const steps = [
        { n: "1", title: "Post your request", body: "Say what you need, the category, and when. Takes under two minutes." },
        { n: "2", title: "It reaches specialists", body: "Only vendors approved for that exact service category see your post." },
        { n: "3", title: "Vendors respond", body: "Compare responses from vetted vendors and pick who to work with." },
    ];
    return (
        <section id="service" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mx-auto mb-10 max-w-lg text-center">
                <h2 className="text-2xl font-bold text-slate-800">How SewaX works</h2>
                <p className="mt-2 text-slate-500">
                    Your request goes only to vendors whose specialisation and service listing have
                    already been approved by our admin team.
                </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-xl border border-orange-100 bg-orange-100 sm:grid-cols-3">
                {steps.map((s) => (
                    <div key={s.n} className="bg-white p-7">
                        <div className="text-2xl font-bold text-orange-500">{s.n}</div>
                        <h3 className="mt-2 font-semibold text-slate-800">{s.title}</h3>
                        <p className="mt-2 text-sm text-slate-500">{s.body}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function VendorSection() {
    return (
        <section id="vendor" className="bg-orange-50 px-6 py-16">
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto mb-10 max-w-lg text-center">
                    <h2 className="text-2xl font-bold text-slate-800">Vendors on SewaX</h2>
                    <p className="mt-2 text-slate-500">
                        Vendor accounts aren't self-registered — every vendor is added by SewaX admin,
                        and every service they offer is reviewed before it goes live.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
                    {VENDORS.map((v) => (
                        <div key={v.name} className="rounded-2xl border border-orange-100 bg-white p-6 text-center">
                            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 font-bold text-white">
                                {v.initials}
                            </div>
                            <h3 className="text-sm font-semibold text-slate-800">{v.name}</h3>
                            <p className="mt-1 text-xs text-slate-500">{v.craft}</p>
                            <span className="mt-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                                Admin-approved
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
export default Hero; 