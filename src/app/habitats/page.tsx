"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import { destinations } from "@/data/destinations";

type Habitat = {
  id: string; name: string; location: string; planet: string;
  description: string; amenities: string[]; simulation_credits: number;
  capacity: number; images: string[]; rating: number;
  artificial_gravity: string; availability: string;
  room_types: string[]; dining: string[]; observatory: string;
  weather: string; reviews: { author: string; text: string; rating: number }[];
  scientific_purpose: string; environmental_protection: string;
};

const HABITATS: Habitat[] = [
  {
    id: "stratosphere-expanse", name: "The Stratosphere Expanse",
    location: "Low Earth Orbit", planet: "earth",
    description: "Earth's premier orbital habitat — a simulation of zero-gravity living with panoramic Earth observation decks. Experience the Overview Effect from the comfort of a fully immersive environment."
      + " Educational modules cover orbital mechanics, Earth science, and the challenges of long-duration spaceflight.",
    amenities: ["Zero-G Simulation", "Earth View Suites", "Mission Training", "Launch Simulation Deck", "Observation Lounge", "VR EVA Simulator"],
    simulation_credits: 4500, capacity: 24, rating: 5,
    images: ["/images/Luxury Orbital Lounge.png", "/images/deep sea of space.png", "/images/astranaut background main bg of website.png"],
    artificial_gravity: "100%", availability: "Available",
    room_types: ["Earth View Suite", "Stargazer Penthouse", "Orbital Studio"],
    dining: ["Nebula Restaurant", "Zero-G Bar", "Private Chef Service"],
    observatory: "360° Earth observation deck with telescopes",
    weather: "Controlled environment, 21°C, zero precipitation",
    scientific_purpose: "Study Earth's magnetosphere and Van Allen belts from LEO; microgravity biology experiments.",
    environmental_protection: "Zero-emission orbital operations; all water recycled via closed-loop life support.",
    reviews: [
      { author: "E. Musk", text: "Unforgettable views. The Earth rise at dawn is worth every credit.", rating: 5 },
      { author: "S. Branson", text: "The finest orbital experience I have ever had.", rating: 5 },
    ],
  },
  {
    id: "olympus-dome", name: "Olympus Dome Estates",
    location: "Mars - Olympus Mons Base", planet: "mars",
    description: "Pressurized habitat simulation on the edge of the solar system's largest volcano. Experience Martian sunset simulations, low-gravity sports training, and learn about hydroponic food production in the botanical research dome.",
    amenities: ["Pressurized Suites", "Mars Rover Simulation", "Low-G Training", "Observation Dome", "Botanical Lab", "Geology Workshop"],
    simulation_credits: 8500, capacity: 12, rating: 5,
    images: ["/images/Mars Surface Background.png", "/images/Luxury Orbital Lounge.png", "/images/Space Dock  Mission Control Background.png"],
    artificial_gravity: "38%", availability: "Limited",
    room_types: ["Olympus Suite", "Caldera View Room", "Rover Base Camp"],
    dining: ["Red Planet Restaurant", "Martian Terrace", "Hydroponic Cafe"],
    observatory: "Olympus Mons summit observatory with 360° Martian vista",
    weather: "Surface: -63°C, Dust storms seasonal. Dome: 22°C controlled",
    scientific_purpose: "Analyze Martian subsurface geology; test ISRU (In-Situ Resource Utilization) for future colonization.",
    environmental_protection: "Regolith-only construction (no imported materials); dust storm monitoring for safety.",
    reviews: [
      { author: "NASA Adm.", text: "The Mars sunset from the dome is hypnotic. An engineering marvel.", rating: 5 },
    ],
  },
  {
    id: "cassini-rings", name: "Cassini Rings Habitat",
    location: "Saturn Ring Plane", planet: "saturn",
    description: "Simulation habitat positioned at the edge of Saturn's ring plane. Each suite offers an unobstructed view of the ice rings and the gas giant beyond. Educational modules cover ring dynamics, moon interactions, and cryo-preservation science.",
    amenities: ["Ring View Suites", "Ice Mineral Lab", "Ringside Observatory", "Astrophotography Deck", "Cryo Lab", "Ring Walk Simulation"],
    simulation_credits: 15000, capacity: 8, rating: 5,
    images: ["/images/Saturn Rings Background.png", "/images/Luxury Orbital Lounge.png", "/images/Space Dock  Mission Control Background.png"],
    artificial_gravity: "Variable (Ring spin)", availability: "Waitlist",
    room_types: ["Ring View Penthouse", "Saturn Suite", "Cryo Chamber"],
    dining: ["Ringside Restaurant", "Ice Bar", "Private Dining with View"],
    observatory: "Ring-plane observatory with telescopes tracking Saturn's moons",
    weather: "Space: -180°C. Habitat interior: 20°C, artificial atmosphere",
    scientific_purpose: "Observe ring dynamics and moon interactions; study Saturn's magnetospheric plasma environment.",
    environmental_protection: "Ring debris avoidance protocols; non-invasive observation only — no sample collection.",
    reviews: [
      { author: "N. Armstrong Fnd.", text: "Watching the rings drift past your window is transcendental.", rating: 5 },
    ],
  },
  {
    id: "sol-station-prime", name: "Sol-Station Prime",
    location: "Mercury - Solar Orbit", planet: "mercury",
    description: "Thermally shielded simulation habitat offering the closest view of the Sun any explorer can safely experience. Learn about solar physics, radiation shielding, and the challenges of operating near a star.",
    amenities: ["Solar Observation Deck", "Thermal Simulation", "Radiation-Shielded Suites", "Sun Gazing Lounge", "Cooling Pools", "Solar Research Lab"],
    simulation_credits: 12000, capacity: 6, rating: 5,
    images: ["/images/Luxury Orbital Lounge.png", "/images/Inner Solar System Background (Mercury & Venus).png", "/images/Space Dock  Mission Control Background.png"],
    artificial_gravity: "85%", availability: "Seasonal",
    room_types: ["Solar Suite", "Mercury View Room", "Sun Gazing Studio"],
    dining: ["Solar Flare Restaurant", "Cooled Wine Cellar", "Observation Cafe"],
    observatory: "Front-row solar observatory with hydrogen-alpha filters",
    weather: "Exterior: 430°C day / -180°C night. Interior: 18°C shielded",
    scientific_purpose: "Research solar wind composition at close range; study Mercury's exosphere and magnetic field.",
    environmental_protection: "Solar radiation harvested for power; thermal shielding prevents heat pollution.",
    reviews: [
      { author: "Dr. H. Zubrin", text: "The solar prominences viewed from the observatory defy description.", rating: 5 },
    ],
  },
  {
    id: "ishtar-aerostat", name: "Ishtar Aerostat Lab",
    location: "Venus - Cloud Layer", planet: "venus",
    description: "Cloud-level aerostat habitat simulation with 360-degree views of Venusian cloudscapes. Float above the crushing surface pressure in a pressurized balloon habitat while studying Venus's runaway greenhouse effect.",
    amenities: ["Cloud View Lounge", "Aerostat Suites", "Twilight Observatory", "Pressure-Safe Design", "Atmospheric Research Deck", "Climate Science Lab"],
    simulation_credits: 9500, capacity: 10, rating: 5,
    images: ["/images/Luxury Orbital Lounge.png", "/images/Inner Solar System Background (Mercury & Venus).png", "/images/Space Dock  Mission Control Background.png"],
    artificial_gravity: "91% (Earth-nominal)", availability: "Available",
    room_types: ["Cloud Suite", "Aerostat Penthouse", "Twilight Cabin"],
    dining: ["Cloud Nine Restaurant", "Sulfur Sunset Bar", "Aerostat Terrace"],
    observatory: "Cloud-penetrating radar and atmospheric composition lab",
    weather: "Exterior: 462°C, 90 atm. Aerostat interior: 22°C, 1 atm",
    scientific_purpose: "Study cloud-level atmospheric chemistry; investigate greenhouse effect runaway dynamics.",
    environmental_protection: "Aerostat operates on solar power; no surface contact to preserve pristine environment.",
    reviews: [
      { author: "C. Sagan Inst.", text: "Floating above Venus in a luxury habitat is science fiction made real.", rating: 5 },
    ],
  },
  {
    id: "artemis-regolith", name: "Artemis Regolith Base",
    location: "Lunar Surface", planet: "moon",
    description: "Simulated lunar surface habitat carved into ancient regolith with Earth-view observation domes. Train for real lunar missions and learn about in-situ resource utilization, low-gravity biomechanics, and lunar geology.",
    amenities: ["Earth View Dome", "Regolith Suites", "Low-G Training", "Lunar Rover Simulator", "Earth-rise Observatory", "Lunar Geology Lab"],
    simulation_credits: 6500, capacity: 8, rating: 5,
    images: ["/images/Moon Surface Background.png", "/images/Luxury Orbital Lounge.png", "/images/Space Dock  Mission Control Background.png"],
    artificial_gravity: "16%", availability: "Available",
    room_types: ["Earth View Villa", "Regolith Suite", "Crater Edge Cabin"],
    dining: ["Earth-rise Restaurant", "Lunar Dust Bar", "Hydroponic Garden"],
    observatory: "Earth-facing observatory with live continent tracking",
    weather: "Surface: -180°C. Villa interior: 21°C, full life support",
    scientific_purpose: "Analyze regolith composition for He-3 extraction; test lunar surface habitat durability.",
    environmental_protection: "Regolith sourced from existing excavation; no atmospheric emissions.",
    reviews: [
      { author: "A. Aldrin", text: "The Earth-rise from the villa dome made me emotional. Perfect.", rating: 5 },
    ],
  },
  {
    id: "amalthea-transit", name: "Amalthea Transit Hub",
    location: "Jupiter Orbit", planet: "jupiter",
    description: "Radiation-shielded orbital habitat simulation with sweeping views of Jupiter's turbulent atmosphere. Witness the Great Red Spot and auroral displays while learning about magnetosphere physics and gas giant dynamics.",
    amenities: ["Jupiter View Suites", "Radiation Shelter", "Aurora Observatory", "Great Red Spot Deck", "Magnetosphere Lab", "Io Transit Viewing"],
    simulation_credits: 20000, capacity: 6, rating: 5,
    images: ["/images/Jupiter Orbit Background.png", "/images/Luxury Orbital Lounge.png", "/images/Space Dock  Mission Control Background.png"],
    artificial_gravity: "100% (rotational)", availability: "Waitlist",
    room_types: ["Jupiter Suite", "Great Red Spot Room", "Aurora Penthouse"],
    dining: ["Giant's Table Restaurant", "Europa Wine Bar", "Orbital Kitchen"],
    observatory: "Multi-band observatory tracking Jupiter's atmospheric dynamics",
    weather: "Exterior: -145°C. Hub interior: 20°C, shielded from radiation",
    scientific_purpose: "Monitor Great Red Spot atmospheric dynamics; study radiation belt particle energies.",
    environmental_protection: "Radiation shielding uses natural magnetosphere; no propellant venting into orbit.",
    reviews: [
      { author: "ESA Director", text: "The Great Red Spot viewed from the deck is the most humbling sight.", rating: 5 },
    ],
  },
  {
    id: "titania-ice", name: "Titania Ice Outpost",
    location: "Uranus - Titania Surface", planet: "uranus",
    description: "Deep cryo habitat simulation on Uranus's largest moon. Study Uranus's extreme axial tilt, its unique magnetic field, and the challenges of cryogenic life support in the outer solar system.",
    amenities: ["Cryo Suites", "Magnetic Observatory", "Ice Core Lab", "Uranus View Deck", "Thermal Simulation", "Research Library"],
    simulation_credits: 18000, capacity: 4, rating: 4,
    images: ["/images/Uranus & Neptune Background.png", "/images/Luxury Orbital Lounge.png", "/images/Space Dock  Mission Control Background.png"],
    artificial_gravity: "38%", availability: "Seasonal",
    room_types: ["Cryo Suite", "Magnetic View Room", "Researcher Cabin"],
    dining: ["Ice Giant Kitchen", "Cryo Bar", "Research Mess Hall"],
    observatory: "Magnetic boundary observatory with Uranus ring tracking",
    weather: "Surface: -203°C. Outpost interior: 18°C, reinforced insulation",
    scientific_purpose: "Map Uranus's unique axial magnetic field; study ring-moon tidal interactions.",
    environmental_protection: "Minimal-power cryo operations; all waste heat captured and recycled.",
    reviews: [
      { author: "Dr. K. Tsiolkovsky", text: "Studying Uranus's magnetosphere from the outpost is a researcher's dream.", rating: 4 },
    ],
  },
  {
    id: "triton-spires", name: "Triton Thermal Spires",
    location: "Neptune - Triton Surface", planet: "neptune",
    description: "Geothermally heated habitat simulation with nitrogen ice geyser observation decks. The farthest habitat simulation in the solar system, offering views of Neptune's deep blue atmosphere and Triton's cryovolcanic activity.",
    amenities: ["Geyser Observatory", "Thermal Suites", "Nitrogen Ice Lab", "Neptune View Deck", "Cryo Lab", "Deep Space Comm Array"],
    simulation_credits: 25000, capacity: 4, rating: 4,
    images: ["/images/Uranus & Neptune Background.png", "/images/Luxury Orbital Lounge.png", "/images/neptune moon.png"],
    artificial_gravity: "38%", availability: "Explorer Only",
    room_types: ["Thermal Suite", "Geyser View Room", "Expedition Cabin"],
    dining: ["Deep Blue Restaurant", "Geyser View Bar", "Expedition Kitchen"],
    observatory: "Deep space observatory with Neptune atmospheric tracking",
    weather: "Surface: -235°C. Spire interior: 20°C, geothermal heated",
    scientific_purpose: "Observe Triton's cryovolcanic plumes; study Neptune's internal heat flux.",
    environmental_protection: "Geothermal-only heating; strict bio-containment for Triton sample analysis.",
    reviews: [
      { author: "Capt. Nemo Soc.", text: "Witnessing Triton's geysers against Neptune's blue is worth the 12-year journey.", rating: 5 },
    ],
  },
  {
    id: "charon-horizon", name: "Charon Horizon Lodge",
    location: "Pluto - Charon Orbit", planet: "pluto",
    description: "Binary-system orbital habitat simulation with views of Pluto's heart-shaped Sputnik Planitia. Orbit the edge of the solar system in simulated solitude, learning about Kuiper Belt objects and the distant Sun as a bright star.",
    amenities: ["Pluto View Suites", "Binary Orbit Deck", "Kuiper Belt Observatory", "Stargazer Lounge", "Deep Space Lab", "Solar Sail Dock"],
    simulation_credits: 30000, capacity: 4, rating: 4,
    images: ["/images/Kuiper Belt  Pluto Background.png", "/images/Luxury Orbital Lounge.png", "/images/plotu moon.png"],
    artificial_gravity: "6% (micro-g)", availability: "Explorer Only",
    room_types: ["Pluto Suite", "Binary View Room", "Kuiper Cabin"],
    dining: ["Far Horizon Restaurant", "Starlight Bar", "Expedition Mess"],
    observatory: "Kuiper Belt deep field observatory, darkest skies in system",
    weather: "Exterior: -230°C. Lodge interior: 18°C, redundant life support",
    scientific_purpose: "Survey Kuiper Belt object composition; study Pluto-Charon tidal locking dynamics.",
    environmental_protection: "Solar-sail transit; zero debris generation; all observations passive.",
    reviews: [
      { author: "V. Tereshkova", text: "The silence at the edge of the system is the most profound I have ever experienced.", rating: 5 },
    ],
  },
];

const planetBgMap: Record<string, string> = {
  earth: "/images/deep sea of space.png",
  moon: "/images/Moon Surface Background.png",
  mars: "/images/Mars Surface Background.png",
  saturn: "/images/Saturn Rings Background.png",
  jupiter: "/images/Jupiter Orbit Background.png",
  mercury: "/images/Inner Solar System Background (Mercury & Venus).png",
  venus: "/images/Inner Solar System Background (Mercury & Venus).png",
  uranus: "/images/Uranus & Neptune Background.png",
  neptune: "/images/Uranus & Neptune Background.png",
  pluto: "/images/Kuiper Belt  Pluto Background.png",
};

const planetColors: Record<string, string> = {
  earth: "#4B7BE5", moon: "#C0C0C0", mars: "#E07040", saturn: "#E8D5A3",
  jupiter: "#D4A574", mercury: "#A0522D", venus: "#E8A317",
  uranus: "#7EC8E3", neptune: "#3355FF", pluto: "#CD853F",
};

const roomViews: Record<string, { image: string; desc: string }> = {
  earth: { image: "/images/deep sea of space.png", desc: "Earth slowly rotates below your window, continents drifting past in an endless ballet of blue and white." },
  moon: { image: "/images/Moon Surface Background.png", desc: "The Earth hangs motionless above the lunar horizon, a blue marble against the velvet black." },
  mars: { image: "/images/Mars Surface Background.png", desc: "The Sun rises over the rust-colored landscape, casting long shadows across ancient volcanic plains." },
  saturn: { image: "/images/Saturn Rings Background.png", desc: "Ice crystals catch the distant sunlight as Saturn's rings drift past your observation deck." },
  jupiter: { image: "/images/Jupiter Orbit Background.png", desc: "The Great Red Spot churns below as Jupiter's banded atmosphere fills your entire field of view." },
  mercury: { image: "/images/Inner Solar System Background (Mercury & Venus).png", desc: "The Sun blazes brilliantly beyond your shielded window, solar prominences dancing at the edge." },
  venus: { image: "/images/Inner Solar System Background (Mercury & Venus).png", desc: "Sulfuric cloud layers stretch endlessly below, painted in sunset hues by the distant Sun." },
  uranus: { image: "/images/Uranus & Neptune Background.png", desc: "Uranus's cyan disk hangs at a bizarre tilt, its faint ring system catching the dim sunlight." },
  neptune: { image: "/images/Uranus & Neptune Background.png", desc: "Neptune's deep blue storms swirl silently below as Triton's geysers glitter in the distance." },
  pluto: { image: "/images/Kuiper Belt  Pluto Background.png", desc: "The Sun is just another star here, casting golden light across Pluto's heart-shaped nitrogen plains." },
};

function StatsBar() {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const targets = [10, 15840, 4.8, 10];
  const labels = ["Simulated Habitats", "Missions Completed", "Avg Readiness Score", "Destinations"];

  useEffect(() => {
    const intervals = targets.map((t, i) => {
      const step = t / 60;
      return setInterval(() => {
        setCounts((prev) => {
          const next = [...prev];
          next[i] = Math.min(prev[i] + step, t);
          return next;
        });
      }, 30);
    });
    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-8 lg:gap-16 py-6">
      {counts.map((c, i) => (
        <div key={labels[i]} className="text-center">
          <p className="text-3xl lg:text-4xl font-display font-bold text-gradient">
            {i === 2 ? (c).toFixed(1) : Math.floor(c).toLocaleString()}{i === 2 ? " ★" : "+"}
          </p>
          <p className="text-white/30 text-xs mt-1 font-mono">{labels[i]}</p>
        </div>
      ))}
    </div>
  );
}

function HabitatViewPreview({ planet }: { planet: string }) {
  const view = roomViews[planet] || roomViews.earth;
  return (
    <div className="absolute -top-32 right-0 w-56 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
      <div className="rounded-2xl overflow-hidden backdrop-blur-3xl bg-space-black/80 border border-white/[0.08] shadow-2xl">
        <div className="relative h-28 overflow-hidden">
          <img
            src={view.image}
            alt="Habitat View"
            className="w-full h-full object-cover transition-all duration-[10s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-black/60 to-transparent" />
          <div className="absolute bottom-2 left-3">
            <span className="text-white/60 text-[10px] font-mono tracking-wider">HABITAT VIEW</span>
          </div>
        </div>
        <div className="p-3">
          <p className="text-white/60 text-[10px] leading-relaxed line-clamp-3">{view.desc}</p>
        </div>
      </div>
    </div>
  );
}

function HabitatModal({ habitat, onClose }: { habitat: Habitat; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const pc = planetColors[habitat.planet] || "#4B7BE5";

  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
    >
      <div className="absolute inset-0 backdrop-blur-xl bg-black/40" />
      <div
        className={`relative w-[640px] max-h-[88vh] overflow-y-auto rounded-3xl backdrop-blur-3xl bg-space-black/85 border border-white/[0.08] shadow-2xl transition-all duration-500 ${visible ? "scale-100" : "scale-90"}`}
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: `0 0 80px ${pc}15, 0 0 0 1px ${pc}10` }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white/50 hover:text-white transition-all z-10">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="relative h-56 overflow-hidden">
          <img src={habitat.images[galleryIdx]} alt={habitat.name} className="w-full h-full object-cover transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/30 to-transparent" />
          {habitat.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {habitat.images.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setGalleryIdx(i); }} className={`w-1.5 h-1.5 rounded-full transition-all ${i === galleryIdx ? "bg-white w-4" : "bg-white/30"}`} />
              ))}
            </div>
          )}
          <div className="absolute bottom-6 left-6">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pc, boxShadow: `0 0 12px ${pc}` }} />
              <h2 className="text-2xl font-display font-bold text-white">{habitat.name}</h2>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-white/40 text-xs font-mono">{habitat.location}</span>
              <span className="text-white/20">·</span>
              <span className="text-amber-400 text-xs">{Array(habitat.rating).fill("★").join("")}</span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-white/50 text-sm leading-relaxed">{habitat.description}</p>

          <div className="grid grid-cols-3 gap-2.5">
            {[
              { label: "Sim Credits", value: `${habitat.simulation_credits.toLocaleString()} SC`, clr: "text-amber-400" },
              { label: "Capacity", value: `${habitat.capacity} crew`, clr: "text-white/80" },
              { label: "Gravity", value: habitat.artificial_gravity, clr: "text-cyan-300" },
              { label: "Rating", value: `${habitat.rating}.0 ★`, clr: "text-amber-400" },
              { label: "Availability", value: habitat.availability, clr: habitat.availability === "Available" ? "text-emerald-400" : "text-amber-400" },
              { label: "Weather", value: habitat.weather.split(",")[0].trim(), clr: "text-white/60" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-2.5 text-center">
                <p className="text-white/25 text-[10px] font-mono mb-0.5">{s.label}</p>
                <p className={`text-xs font-semibold ${s.clr}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {habitat.scientific_purpose && (
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-3.5 h-3.5 text-purple-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                <span className="text-white/30 text-[10px] font-mono uppercase tracking-wider">Scientific Purpose</span>
              </div>
              <p className="text-white/50 text-xs leading-relaxed">{habitat.scientific_purpose}</p>
            </div>
          )}

          {habitat.environmental_protection && (
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-3.5 h-3.5 text-emerald-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-white/30 text-[10px] font-mono uppercase tracking-wider">Environmental Protection</span>
              </div>
              <p className="text-white/50 text-xs leading-relaxed">{habitat.environmental_protection}</p>
            </div>
          )}

          {habitat.room_types.length > 0 && (
            <div>
              <h4 className="text-white/40 text-[10px] font-mono uppercase tracking-wider mb-2">Simulation Modules</h4>
              <div className="flex flex-wrap gap-1.5">
                {habitat.room_types.map((r) => (
                  <span key={r} className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/50 text-[11px]">{r}</span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-white/40 text-[10px] font-mono uppercase tracking-wider mb-2">Amenities</h4>
            <div className="flex flex-wrap gap-1.5">
              {habitat.amenities.map((a) => (
                <span key={a} className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/50 text-[11px]">{a}</span>
              ))}
            </div>
          </div>

          {habitat.dining.length > 0 && (
            <div>
              <h4 className="text-white/40 text-[10px] font-mono uppercase tracking-wider mb-2">Dining</h4>
              <div className="flex flex-wrap gap-1.5">
                {habitat.dining.map((d) => (
                  <span key={d} className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/50 text-[11px]">{d}</span>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-3.5 h-3.5 text-cyan-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              <span className="text-white/30 text-[10px] font-mono uppercase tracking-wider">Observatory</span>
            </div>
            <p className="text-white/50 text-xs leading-relaxed">{habitat.observatory}</p>
          </div>

          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-3.5 h-3.5 text-emerald-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <span className="text-white/30 text-[10px] font-mono uppercase tracking-wider">Explorer Reviews</span>
            </div>
            <div className="space-y-2">
              {habitat.reviews.map((r, i) => (
                <div key={i} className="pb-2 border-b border-white/[0.04] last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-white/40 text-xs">{r.author}</span>
                    <span className="text-amber-400/70 text-[10px]">{Array(r.rating).fill("★").join("")}</span>
                  </div>
                  <p className="text-white/40 text-[11px] leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <a href={`/planet/${habitat.planet}`} className="text-center py-3 rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02]" style={{ backgroundColor: `${pc}18`, color: pc, border: `1px solid ${pc}35` }}>
              Plan Mission
            </a>
            <a href={`/mission-simulator?habitat=${habitat.id}`} className="text-center py-3 rounded-2xl text-sm font-semibold bg-white/[0.06] text-white/70 hover:bg-white/[0.1] transition-all duration-300 border border-white/[0.08]">
              Explore Habitat
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HabitatsPage() {
  const [selectedHabitat, setSelectedHabitat] = useState<Habitat | null>(null);
  const [activePlanet, setActivePlanet] = useState<string | null>(null);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const grouped = useCallback(() => {
    const groups: Record<string, Habitat[]> = {};
    HABITATS.forEach((h) => {
      if (!groups[h.planet]) groups[h.planet] = [];
      groups[h.planet].push(h);
    });
    return groups;
  }, []);

  const groups = grouped();
  const planetOrder = ["earth", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"];

  useEffect(() => {
    const imgs = Object.values(planetBgMap);
    let loaded = 0;
    imgs.forEach((src) => {
      const img = new Image();
      img.onload = () => { loaded++; if (loaded === imgs.length) setHeroLoaded(true); };
      img.src = src;
    });
  }, []);

  return (
    <div className="min-h-screen bg-space-black">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 transition-all duration-1000" style={{ opacity: heroLoaded ? 1 : 0 }}>
          <img src="/images/Luxury Orbital Lounge.png" alt="" className="w-full h-full object-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-space-black/70 via-space-black/60 to-space-black" />
          <div className="absolute inset-0 bg-gradient-radial from-space-black/40 via-transparent to-space-black/60" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(34,211,238,0.06), transparent 60%)" }} />
        </div>

        <div className="relative z-10 section-container w-full pt-44 pb-24">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="text-accent-cyan text-xs font-mono tracking-[0.3em] uppercase block mb-8">Simulation Habitats</span>
            <h1 className="text-display-2 lg:text-7xl font-display font-bold text-white mb-12 leading-none">
              <span className="text-gradient">Space</span> Habitats
            </h1>
            <p className="text-white/40 text-lg lg:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              Explore fully immersive space habitat simulations — from Earth orbit to the Kuiper Belt. Learn real space science through interactive experiences.
            </p>
            <div className="w-full mb-12">
              <StatsBar />
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <a href="#habitats" className="btn-primary px-8 py-4 text-sm">Explore Habitats</a>
              <a href="/ai-mission-planner" className="btn-secondary px-8 py-4 text-sm">AI Mission Planner</a>
            </div>
          </div>
        </div>
      </section>

      {/* HABITATS BY DESTINATION */}
      <section id="habitats" className="relative py-24">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.03), transparent 60%)" }} />
        <div className="section-container space-y-32">
          {planetOrder.map((planetId) => {
            const habitatsForPlanet = groups[planetId];
            if (!habitatsForPlanet) return null;
            const dest = destinations.find((d) => d.node_id === planetId);
            const pc = planetColors[planetId] || "#4B7BE5";
            const bg = planetBgMap[planetId] || "/images/deep sea of space.png";

            return (
              <div key={planetId} className="scroll-mt-24" data-planet={planetId}>
                <div
                  className="relative -mx-4 lg:-mx-12 px-4 lg:px-12 py-12 lg:py-16 rounded-3xl overflow-hidden mb-10"
                  onMouseEnter={() => setActivePlanet(planetId)}
                  onMouseLeave={() => setActivePlanet(null)}
                >
                  <div className="absolute inset-0 transition-all duration-700" style={{ opacity: activePlanet === planetId ? 0.4 : 0.15 }}>
                    <img src={bg} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-space-black/90 via-space-black/60 to-space-black/80" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: pc, boxShadow: `0 0 16px ${pc}` }} />
                      <h2 className="text-3xl lg:text-4xl font-display font-bold text-white">{dest?.name || planetId}</h2>
                      <span className="text-white/20 text-sm font-mono">{dest?.type === "MOON" ? "MOON" : "PLANET"}</span>
                    </div>
                    <p className="text-white/30 text-sm max-w-xl">{dest?.description.slice(0, 180)}...</p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {habitatsForPlanet.map((habitat) => (
                    <div
                      key={habitat.id}
                      className="group relative rounded-2xl overflow-hidden backdrop-blur-2xl bg-white/[0.02] border border-white/[0.06] transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:shadow-2xl"
                      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                      onClick={() => setSelectedHabitat(habitat)}
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = (e.clientX - rect.left) / rect.width - 0.5;
                        const y = (e.clientY - rect.top) / rect.height - 0.5;
                        e.currentTarget.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) scale(1.02)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)";
                      }}
                    >
                      <HabitatViewPreview planet={planetId} />

                      <div className="relative h-48 overflow-hidden">
                        <img src={habitat.images[0]} alt={habitat.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/40 to-transparent" />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="px-2.5 py-1 rounded-full backdrop-blur-xl bg-white/[0.08] border border-white/[0.1] text-white/70 text-[10px] font-mono">{dest?.name || planetId}</span>
                          <span className="px-2.5 py-1 rounded-full backdrop-blur-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[10px] font-mono">{Array(habitat.rating).fill("★").join("")}</span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                          <h3 className="text-white font-bold text-lg drop-shadow-xl">{habitat.name}</h3>
                          <span className="text-amber-400 font-mono font-bold text-sm drop-shadow-xl">{habitat.simulation_credits.toLocaleString()} <span className="text-[10px] text-white/50">SC</span></span>
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <p className="text-white/40 text-xs leading-relaxed line-clamp-2">{habitat.description}</p>

                        <div className="flex flex-wrap gap-1.5">
                          {habitat.amenities.slice(0, 3).map((a) => (
                            <span key={a} className="px-2 py-0.5 rounded-md bg-white/[0.04] text-white/40 text-[10px]">{a}</span>
                          ))}
                          {habitat.amenities.length > 3 && (
                            <span className="px-2 py-0.5 rounded-md bg-white/[0.04] text-white/30 text-[10px]">+{habitat.amenities.length - 3}</span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                          <div className="flex items-center gap-3 text-[11px] font-mono">
                            <span className="text-white/30">Crew: <span className="text-white/50">{habitat.capacity}</span></span>
                            <span className="text-white/20">|</span>
                            <span className="text-white/30">Grav: <span className="text-white/50">{habitat.artificial_gravity}</span></span>
                            <span className="text-white/20">|</span>
                            <span className={habitat.availability === "Available" ? "text-emerald-400/70" : "text-amber-400/70"}>{habitat.availability}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedHabitat(habitat); }}
                            className="text-center py-2.5 rounded-xl text-[11px] font-semibold transition-all duration-300 hover:scale-[1.03]"
                            style={{ backgroundColor: `${pc}15`, color: pc, border: `1px solid ${pc}30` }}
                          >
                            Plan Mission
                          </button>
                          <a
                            href={`/mission-simulator?habitat=${habitat.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-center py-2.5 rounded-xl text-[11px] font-semibold bg-white/[0.05] text-white/60 hover:bg-white/[0.09] transition-all duration-300 border border-white/[0.08]"
                          >
                            Explore Habitat
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {selectedHabitat && <HabitatModal habitat={selectedHabitat} onClose={() => setSelectedHabitat(null)} />}
    </div>
  );
}
