"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

const media = [
  { src: "/images/Saturn Rings Background.png", title: "Saturn's Rings", category: "Planetary", aspect: "landscape" },
  { src: "/images/Mars Surface Background.png", title: "Mars Surface", category: "Planetary", aspect: "portrait" },
  { src: "/images/Luxury Orbital Lounge.png", title: "Orbital Lounge Concept", category: "Architecture", aspect: "square" },
  { src: "/images/Jupiter Orbit Background.png", title: "Jupiter Orbit", category: "Planetary", aspect: "landscape" },
  { src: "/images/Moon Surface Background.png", title: "Lunar Landscape", category: "Planetary", aspect: "portrait" },
  { src: "/images/Space Dock  Mission Control Background.png", title: "Mission Control Hub", category: "Architecture", aspect: "square" },
  { src: "/images/Uranus & Neptune Background.png", title: "Uranus Ice Giant", category: "Planetary", aspect: "landscape" },
  { src: "/images/Kuiper Belt  Pluto Background.png", title: "Neptune Deep Blue", category: "Planetary", aspect: "portrait" },
];

const categories = ["All", "Planetary", "Architecture"];

const aspectClasses: Record<string, string> = {
  landscape: "row-span-2",
  portrait: "col-span-2",
  square: "",
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const filtered = useMemo(() => {
    let result = activeCategory === "All" ? [...media] : media.filter((m) => m.category === activeCategory);
    if (sortBy === "title") result.sort((a, b) => a.title.localeCompare(b.title));
    return result;
  }, [activeCategory, sortBy]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null && prev < filtered.length - 1 ? prev + 1 : prev));
  }, [filtered.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <>
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
          onClick={closeLightbox}
          role="dialog"
          aria-label="Image lightbox"
          aria-modal="true"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center z-10"
            aria-label="Close lightbox"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {lightboxIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {lightboxIndex < filtered.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <div className="max-w-5xl max-h-[85vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].title}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="text-center mt-4">
              <p className="text-white text-lg font-medium">{filtered[lightboxIndex].title}</p>
              <p className="text-white/40 text-sm mt-1">{filtered[lightboxIndex].category} &middot; {lightboxIndex + 1} / {filtered.length}</p>
            </div>
          </div>
        </div>
      )}
    <div className="page-enter">
      <div className="min-h-screen relative">
        <div
          className="fixed inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(/images/deep sea of space.png)" }}
        />
        <div className="fixed inset-0 bg-gradient-to-b from-space-black/80 via-space-black/50 to-space-black" />
        <div className="relative z-10 section-container mx-auto px-6 lg:px-8 pt-32 pb-24">
          <div className="flex flex-col items-center mb-10">
            <span className="text-accent-cyan text-sm font-mono tracking-[0.3em] uppercase mb-2">Visual Archive</span>
            <h1 className="text-display-2 font-display font-bold text-white">Gallery</h1>
          </div>

          <div className="flex gap-2 justify-center mb-10 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-accent-cyan text-[#050816]"
                    : "glass text-white/60 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
            <div className="glass rounded-full px-4 py-2 flex items-center gap-2 ml-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-white/60 text-sm outline-none font-mono cursor-pointer"
                aria-label="Sort gallery"
              >
                <option value="default" className="bg-space-dark text-white">Default</option>
                <option value="title" className="bg-space-dark text-white">By Title</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4 max-w-6xl mx-auto">
            {filtered.map((item, i) => (
              <div
                key={item.title}
                onClick={() => setLightboxIndex(filtered.indexOf(item))}
                className={`glass rounded-3xl p-4 group cursor-pointer overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:z-10 ${
                  i % 3 === 0 ? "md:col-span-2 md:row-span-2" : i % 5 === 0 ? "md:row-span-2" : i % 4 === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1328]/80 via-[#0D1328]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-medium drop-shadow-lg">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
