"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

type NavItem = { label: string; href: string };
type NavGroup = { label: string; items: NavItem[] };

const PRIMARY: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "#" },
  { label: "Plan Mission", href: "/ai-mission-planner" },
  { label: "Simulator", href: "#" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "About", href: "/about" },
];

const EXPLORE_ITEMS: NavItem[] = [
  { label: "Solar System", href: "/solar-system" },
  { label: "Planets", href: "/destinations" },
  { label: "Moons", href: "/moons" },
  { label: "Habitats", href: "/habitats" },
  { label: "Knowledge Hub", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
];

const SIMULATOR_ITEMS: NavItem[] = [
  { label: "Mission Simulator", href: "/mission-simulator" },
  { label: "Training", href: "/training" },
  { label: "AI Planner", href: "/ai-mission-planner" },
];

const MORE_ITEMS: NavItem[] = [
  { label: "Book Mission", href: "/booking" },
  { label: "Packages", href: "/packages" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

function Dropdown({ label, items, pathname, onNav }: { label: string; items: NavItem[]; pathname: string; onNav: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = items.some((i) => pathname === i.href || pathname.startsWith(i.href + "/"));

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const show = () => { if (timerRef.current) clearTimeout(timerRef.current); setOpen(true); };
  const hide = () => { timerRef.current = setTimeout(() => setOpen(false), 200); };

  return (
    <div ref={ref} className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-xl hover:bg-white/5 ${active ? "text-white" : "text-white/50 hover:text-white"}`}
      >
        {label}
        <svg className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div onMouseEnter={show} onMouseLeave={hide}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 rounded-2xl bg-space-black/80 backdrop-blur-2xl border border-white/[0.08] shadow-2xl shadow-black/60 py-1.5 z-[999] animate-fade-slide-down origin-top">
          {items.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => { setOpen(false); onNav(); }}
              className={`block px-4 py-2.5 text-xs transition-all hover:bg-white/[0.06] first:rounded-t-xl last:rounded-b-xl ${pathname === item.href || pathname.startsWith(item.href + "/") ? "text-cyan-300 bg-white/[0.03]" : "text-white/50 hover:text-white"}`}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));
  const isActiveGroup = (items: NavItem[]) => items.some((i) => isActive(i.href));

  const handleNav = () => { setOpen(false); setMobileDropdown(null); };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${scrolled ? "bg-space-black/80 backdrop-blur-premium border-b border-white/5 shadow-2xl" : "bg-transparent"}`}>
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-2xl bg-gradient-premium flex items-center justify-center shadow-glow-blue group-hover:shadow-glow-cyan transition-all duration-500">
              <span className="text-white font-bold text-base">N</span>
            </div>
            <span className="text-white font-display font-bold text-xl tracking-tight">
              Nova<span className="text-gradient">X</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {PRIMARY.map((item) => {
              if (item.label === "Explore") {
                return <Dropdown key={item.label} label="Explore" items={EXPLORE_ITEMS} pathname={pathname} onNav={handleNav} />;
              }
              if (item.label === "Simulator") {
                return <Dropdown key={item.label} label="Simulator" items={SIMULATOR_ITEMS} pathname={pathname} onNav={handleNav} />;
              }
              return (
                <Link key={item.href} href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 rounded-xl hover:bg-white/5 ${isActive(item.href) ? "text-white" : "text-white/50 hover:text-white"}`}>
                  {item.label}
                </Link>
              );
            })}

            <Dropdown label="More" items={MORE_ITEMS} pathname={pathname} onNav={handleNav} />

            <div className="w-px h-5 bg-white/10 mx-2" />
            <Link href="/booking" className="btn-primary text-xs px-4 py-2 whitespace-nowrap">
              Book Mission
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2 rounded-xl hover:bg-white/5 transition-colors" aria-label="Menu" aria-expanded={open}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 top-20 z-[999] animate-fade-in">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-2xl" onClick={() => setOpen(false)} />
          <div className="relative bg-space-black/95 border-t border-white/[0.06] h-full overflow-y-auto">
            <div className="px-4 py-4 space-y-0.5 max-w-md mx-auto">
              {[
                { label: "Home", href: "/" },
                ...EXPLORE_ITEMS,
                { label: "Plan Mission", href: "/ai-mission-planner" },
                ...SIMULATOR_ITEMS,
                { label: "Dashboard", href: "/dashboard" },
                { label: "About", href: "/about" },
                { label: "—", href: "#" },
                ...MORE_ITEMS,
              ].map((item) => {
                if (item.label === "—") return <hr key="sep" className="border-white/[0.06] my-2" />;
                return (
                  <Link key={item.href} href={item.href} onClick={handleNav}
                    className={`block px-4 py-3 rounded-xl text-sm transition-all ${isActive(item.href) ? "text-cyan-300 bg-cyan-400/8" : "text-white/60 hover:text-white hover:bg-white/[0.03]"}`}>
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-4">
                <Link href="/booking" onClick={handleNav}
                  className="block w-full py-3 rounded-xl bg-gradient-premium text-white font-semibold text-center text-sm">
                  Book Mission
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
