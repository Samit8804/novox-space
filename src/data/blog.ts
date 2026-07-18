export interface BlogArticle {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
}

export const articles: BlogArticle[] = [
  {
    slug: "overview-effect",
    title: "The Overview Effect: Why Every Human Should See Earth from Orbit",
    category: "Philosophy",
    date: "Jul 12, 2026",
    excerpt: "The profound cognitive shift experienced by astronauts viewing Earth from space is no longer exclusive to trained professionals.",
    content: `For decades, the Overview Effect was a privilege reserved for the handful of humans who had strapped into rockets and left the bounds of Earth's atmosphere. Astronauts returned with a transformed worldview — borders invisible, conflicts trivial, the pale blue dot a fragile oasis in the void.

Now, with NovaX's commercial orbital voyages, this experience is democratized. Our standard Voyager package includes a 4-hour window at 400km altitude, with panoramic observation decks designed for maximum visual impact.

What exactly is the Overview Effect? Coined by Frank White in 1987, it describes the cognitive shift astronauts report when viewing the Earth from orbit. The atmosphere appears as a hairline-thin membrane. The planet rotates silently. There are no lines, no nations — just a single, interconnected system.

Early NovaX passengers report similar transformations. "I went up a tourist and came down an ambassador for the planet," says Maria Santos, who flew the Celestial trajectory in March 2026. "You can't unsee it."

Our pre-flight briefing includes exercises designed to prepare passengers for this psychological shift. Post-flight integration sessions help translate the experience into lasting perspective change.

The Overview Effect is not just a sight — it's a fundamental recalibration of what it means to be human. And now, it's available to you.`,
    image: "/images/Saturn Rings Background.png",
  },
  {
    slug: "olympus-mons",
    title: "Olympus Mons: Climbing the Solar System's Tallest Peak",
    category: "Exploration",
    date: "Jul 8, 2026",
    excerpt: "New luxury expedition packages now include guided ascents of the 21.9km Martian volcano.",
    content: `Standing nearly 22 kilometers high — two and a half times the height of Everest — Olympus Mons is the largest volcano in the Solar System. Its summit caldera spans 80 kilometers across, and its gentle slopes make it surprisingly accessible for determined climbers.

NovaX's new Olympus Expedition package combines a 14-day Mars surface stay with a 5-day guided ascent. Low Martian gravity (37% of Earth's) means the climb is physically demanding in different ways — less weight to carry, but requiring careful acclimatization to the thin atmosphere.

"Every step on Olympus Mons feels like history," says expedition lead Dr. Kenji Nakamura. "You're walking on geological time scales. The lava flows beneath your feet are millions of years old, preserved perfectly in the vacuum of space."

The ascent route follows the northwest ridge, with pressurized rest stops at 5km intervals. The summit view is unparalleled — a 360-degree panorama of Mars' rust-red surface, with the Tharsis volcanic plateau stretching to the horizon.

Climbers are supported by autonomous rovers carrying supplies and emergency shelter. Each team is limited to 12 participants per window, ensuring a premium experience.

Bookings for the 2027 window are now open. Pre-training includes altitude simulation and low-gravity mobility exercises at our Kennedy Space Center facility.`,
    image: "/images/Mars Surface Background.png",
  },
  {
    slug: "zero-g-cuisine",
    title: "Zero-Gravity Cuisine: The Michelin-Starred Chefs of Orbit",
    category: "Lifestyle",
    date: "Jul 1, 2026",
    excerpt: "How top chefs are redefining fine dining for the low-gravity environment.",
    content: `Cooking in microgravity presents challenges that would make any Earth-bound chef weep. No convection means no rising heat. No gravity means liquids form floating spheres. Flavors behave differently when sinuses don't drain normally.

Yet, against all odds, a new generation of chefs is embracing these constraints to create something entirely new: orbital cuisine.

Chef Amelie Durand, formerly of a three-Michelin-starred Parisian restaurant, now runs the kitchen aboard NovaX's Starlight Voyager. "Gravity is a habit, not a requirement," she says. "Once you understand how heat and particles behave without it, you can create textures and flavor combinations impossible on Earth."

The signature technique involves magnetically levitated induction cooktops that allow precise temperature control without open flames. Liquids are encapsulated in edible gel spheres that burst on contact. Bread is replaced by a fermented protein sponge that rises in any orientation.

Wine is served in specially designed bulbs with a narrow capillary opening — no glasses needed. The wine forms a slow-moving sphere inside the bulb, releasing aromas in concentrated bursts.

NovaX's orbital dining experience has garnered rave reviews. The tasting menu — 12 courses spanning 3 hours — is consistently rated the highlight of any voyage.

"People come for the view of Earth," Chef Durand notes. "They return for the taste of possibility."`,
    image: "/images/Jupiter Orbit Background.png",
  },
  {
    slug: "cassini-rings-resort",
    title: "The Cassini Rings Resort: Engineering Marvel at Saturn",
    category: "Architecture",
    date: "Jun 25, 2026",
    excerpt: "Behind the scenes of the most ambitious hospitality project ever conceived.",
    content: `Suspended in Saturn's ring system, the Cassini Rings Resort represents the pinnacle of human engineering and luxury. The project, a collaboration between NovaX and seven international space agencies, has been in development for over a decade.

The resort consists of 12 interconnected modules arranged in a gentle arc that follows the ring plane. Each module is shielded from micrometeoroids by a Whipple shield system — thin layers of fabric that disintegrate particles on impact.

"The view from the observation lounge is the most spectacular in the Solar System," says chief architect Yuki Tanaka. "Saturn fills the sky, with the rings stretching infinitely in both directions. The ice particles catch sunlight in a continuous, shimmering display."

Construction required 47 supply missions over 4 years. Materials were sourced partially from asteroid mining operations in the belt, reducing launch costs by an estimated 60%.

Guests arrive via NovaX's Saturn Shuttle, a 3-day journey from Earth. The resort features 24 suites, a zero-g spa, the Cassini Observatory, and the Rings Restaurant with floor-to-ceiling views of the planet.

Sustainability was a core design principle. The resort runs on solar power supplemented by RTGs (radioisotope thermoelectric generators). Water is recycled with 99.7% efficiency. Food is grown in onboard hydroponic gardens.

The Cassini Rings Resort opens for reservations in 2028. Waiting list priority is given to NovaX Vanguard members.`,
    image: "/images/Luxury Orbital Lounge.png",
  },
];
