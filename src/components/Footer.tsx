"use client";

import Link from "next/link";

const footerLinks = [
  {
    heading: "Explore",
    links: [
      { label: "Solar System", href: "/solar-system" },
      { label: "Destinations", href: "/destinations" },
      { label: "Packages", href: "/packages" },
      { label: "Moons", href: "/moons" },
    ],
  },
  {
    heading: "Experience",
    links: [
      { label: "Mission Planner", href: "/ai-mission-planner" },
      { label: "Training", href: "/training" },
      { label: "Hotels", href: "/hotels" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-space-black">
      <div className="section-container py-20">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-gradient-premium flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-white font-display font-bold text-2xl">
                Nova<span className="text-gradient">X</span>
              </span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              The definitive digital gateway for humanity&apos;s expansion into the Solar System.
            </p>
            <div className="flex gap-4 mt-8">
              {[
                { label: "X", href: "https://x.com/novax" },
                { label: "IG", href: "https://instagram.com/novax" },
                { label: "YT", href: "https://youtube.com/@novax" },
                { label: "LI", href: "https://linkedin.com/company/novax" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-2xl glass-light flex items-center justify-center text-white/40 text-xs font-mono hover:text-white hover:border-accent-blue/30 transition-all"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          {footerLinks.map((group) => (
            <div key={group.heading}>
              <h4 className="text-white/40 text-xs font-semibold uppercase tracking-[0.2em] mb-6">
                {group.heading}
              </h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/40 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="p-10 rounded-3xl glass-light mb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-display font-bold text-white">
                Join the <span className="text-gradient">Vanguard</span>
              </h3>
              <p className="text-white/40 text-sm mt-1">
                Receive mission updates, exclusive offers, and launch window notifications.
              </p>
            </div>
            <div className="flex w-full lg:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-72 px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-accent-blue/50 transition-colors placeholder:text-white/20"
              />
              <button
                className="btn-primary px-6 py-3.5 whitespace-nowrap"
                onClick={() => alert("Thank you for subscribing to NovaX mission updates!")}
              >
                <span>Subscribe</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} NovaX Space Tourism. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/legal/privacy" className="text-white/20 text-xs hover:text-white/40 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="text-white/20 text-xs hover:text-white/40 transition-colors">
              Terms of Service
            </Link>
            <Link href="/legal/security" className="text-white/20 text-xs hover:text-white/40 transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
