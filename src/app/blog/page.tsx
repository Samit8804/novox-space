"use client";

import Link from "next/link";

const articles = [
  { slug: "overview-effect", title: "The Overview Effect: Why Every Human Should See Earth from Orbit", category: "Philosophy", date: "Jul 12, 2026", excerpt: "The profound cognitive shift experienced by astronauts viewing Earth from space is no longer exclusive to trained professionals.", image: "/images/Saturn Rings Background.png" },
  { slug: "olympus-mons", title: "Olympus Mons: Climbing the Solar System's Tallest Peak", category: "Exploration", date: "Jul 8, 2026", excerpt: "New luxury expedition packages now include guided ascents of the 21.9km Martian volcano.", image: "/images/Mars Surface Background.png" },
  { slug: "zero-g-cuisine", title: "Zero-Gravity Cuisine: The Michelin-Starred Chefs of Orbit", category: "Lifestyle", date: "Jul 1, 2026", excerpt: "How top chefs are redefining fine dining for the low-gravity environment.", image: "/images/Jupiter Orbit Background.png" },
  { slug: "cassini-rings-resort", title: "The Cassini Rings Resort: Engineering Marvel at Saturn", category: "Architecture", date: "Jun 25, 2026", excerpt: "Behind the scenes of the most ambitious hospitality project ever conceived.", image: "/images/Luxury Orbital Lounge.png" },
];

export default function BlogPage() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="page-enter">
      <div className="min-h-screen relative">
        <div
          className="fixed inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(/images/deep sea of space.png)" }}
        />
        <div className="fixed inset-0 bg-gradient-to-b from-space-black/80 via-space-black/50 to-space-black" />
        <div className="relative z-10 section-container mx-auto px-6 lg:px-8 pt-32 pb-24">
          <div className="flex flex-col items-center mb-12">
            <span className="text-accent-cyan text-sm font-mono tracking-[0.3em] uppercase mb-2">The Exosphere Chronicle</span>
            <h1 className="text-display-2 font-display font-bold text-white">Blog</h1>
          </div>

          <div className="max-w-6xl mx-auto">
            <Link
              href={`/blog/${featured.slug}`}
              className="relative rounded-3xl overflow-hidden mb-10 min-h-[320px] flex items-end cursor-pointer group block"
            >
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space-black/90 via-space-black/40 to-transparent" />
              <div className="relative z-10 p-8 lg:p-12 max-w-3xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs px-3 py-1 rounded-full bg-accent-cyan/20 text-accent-cyan font-mono backdrop-blur-sm">
                    {featured.category}
                  </span>
                  <span className="text-white/50 text-sm font-mono">{featured.date}</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-3 leading-tight">
                  {featured.title}
                </h2>
                <p className="text-white/60 text-base lg:text-lg leading-relaxed">{featured.excerpt}</p>
              </div>
            </Link>

            <div className="grid md:grid-cols-3 gap-6">
              {rest.map((article) => (
                <Link
                  key={article.title}
                  href={`/blog/${article.slug}`}
                  className="relative rounded-3xl overflow-hidden min-h-[280px] flex items-end cursor-pointer group block"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-black/90 via-space-black/30 to-transparent" />
                  <div className="relative z-10 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent-cyan/20 text-accent-cyan font-mono backdrop-blur-sm">
                        {article.category}
                      </span>
                      <span className="text-white/40 text-xs font-mono">{article.date}</span>
                    </div>
                    <h3 className="text-lg font-display font-semibold text-white mb-2">{article.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{article.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
