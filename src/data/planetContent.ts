export interface PlanetContent {
  overview: string;
  history: string;
  climate: string;
  surface: string;
  interestingFacts: string[];
  activities: string[];
  healthRisks: string[];
  missionHighlights: string[];
  recommendedPackage: string;
  suitableTravelers: string;
  bestSeason: string;
  requiredTraining: string;
  planetTheme: "solar" | "golden" | "earth" | "desert" | "storm" | "ringed" | "ice" | "deepblue" | "frozen";
  themeAccent: string;
  scientificInfo: {
    diameter: string;
    mass: string;
    distanceFromSun: string;
    orbitalPeriod: string;
    rotationPeriod: string;
    surfaceTemperature: string;
  };
}

export const planetContent: Record<string, PlanetContent> = {
  mercury: {
    planetTheme: "solar",
    themeAccent: "orange",
    overview:
      "Mercury is the smallest planet in our Solar System and the closest to the Sun. A world of extreme contrasts, its sun-scorched surface reaches 430°C during the day before plunging to -180°C at night. The planet's cratered landscape resembles our Moon, but with a subtle golden-brown hue imparted by iron-rich minerals. Despite its proximity to the Sun, Mercury harbors ice in permanently shadowed craters at its poles—a paradoxical treasure for early settlers. NovaX's Sol-Station Prime orbits at a carefully calculated distance, offering shielded luxury with panoramic solar observations that no other destination can match.",
    history:
      "Mercury has been observed since antiquity, with the earliest recorded sightings by the Sumerians around 3000 BCE. The Romans named it after their swift-footed messenger god, Mercury, due to its rapid 88-day orbit. NASA's Mariner 10 spacecraft first revealed its cratered face in 1974, followed by MESSENGER (2011-2015), which discovered water ice at the poles and volcanic plains. The BepiColombo mission, a joint ESA/JAXA endeavor, is currently en route to unlock more secrets. For luxury travelers, Mercury represents the ultimate frontier—closest to the Sun, farthest from comfort, yet offering unparalleled views of our star.",
    climate:
      "Mercury's climate is defined by extreme temperature swings. With virtually no atmosphere to retain heat, daytime temperatures at the equator reach 430°C—hot enough to melt lead. Nighttime temperatures plummet to -180°C, a difference of over 600°C. The poles, however, remain permanently shadowed below -200°C, preserving ancient water ice deposits. Solar radiation is approximately 10 times stronger than on Earth, requiring specialized shielding for all habitats. NovaX's Sol-Station Prime utilizes advanced reflective materials and active thermal control to maintain a perfect 22°C interior environment.",
    surface:
      "Mercury's surface is a testament to 4.5 billion years of cosmic bombardment. The massive Caloris Basin, spanning 1,550 kilometers, was created by an asteroid impact that sent shockwaves through the entire planet. Towering scarps called 'rupes'—cliffs formed as Mercury's interior cooled and contracted—rise up to 3 kilometers high. Smooth volcanic plains stretch between cratered highlands, evidence of ancient lava flows. Iron and titanium-rich minerals give the surface its distinctive dark, golden-brown appearance, while bright-rayed craters like Kuiper crater create striking albedo contrasts visible from orbit.",
    interestingFacts: [
      "Mercury has a massive iron core comprising 85% of its radius—proportionally larger than any other planet in the Solar System",
      "A day on Mercury (sunrise to sunrise) lasts 176 Earth days—longer than its 88-day year",
      "Despite being closest to the Sun, Mercury is not the hottest planet—that title belongs to Venus with its runaway greenhouse effect",
      "Mercury has a weak magnetic field, just 1% the strength of Earth's, but it deflects the solar wind enough to create a miniature magnetosphere",
      "The planet's surface is covered in a layer of 'regolith'—fine dust created by billions of years of micrometeorite impacts",
    ],
    activities: [
      "Solar corona observation from shielded panoramic lounges",
      "Low-gravity cliff hiking along the Victoria Rupes escarpment",
      "Caloris Basin rim trekking with thermal-protected rovers",
      "Polar ice cave exploration in permanently shadowed craters",
      "Spacewalk training in Mercury's unique magnetic field environment",
    ],
    healthRisks: [
      "Extreme solar radiation requiring continuous shielded environments",
      "Drastic thermal deltas between sunlit and shadowed zones",
      "Low gravity (38% of Earth) causing prolonged muscle deconditioning",
      "Fine iron-rich dust inhalation risk during surface excursions",
      "Psychological effects of prolonged isolation in a highly confined habitat",
    ],
    missionHighlights: [
      "Safely orbit and observe the Sun from the closest luxury habitat in existence",
      "Witness the largest temperature swing in the Solar System from a climate-controlled lounge",
      "Set foot on a world where ice and fire coexist within kilometers of each other",
      "Photograph Earth as a faint blue speck from the innermost planetary frontier",
      "Contribute to citizen science: track sunspots and solar flares from Mercury orbit",
    ],
    recommendedPackage: "Deep Space Expedition",
    suitableTravelers: "Extreme adventurers, solar enthusiasts, scientists, and those seeking the ultimate 'closest to the Sun' status symbol",
    bestSeason: "Year-round (thermal shielding eliminates seasonal concerns)",
    requiredTraining: "Physiological Adaptation + Emergency Evacuation Protocols (radiation exposure modules)",
    scientificInfo: {
      diameter: "4,879 km",
      mass: "3.30 × 10²³ kg",
      distanceFromSun: "57.9 million km",
      orbitalPeriod: "87.97 Earth days",
      rotationPeriod: "58.65 Earth days",
      surfaceTemperature: "-180°C to 430°C",
    },
  },

  venus: {
    planetTheme: "golden",
    themeAccent: "gold",
    overview:
      "Venus is Earth's twin in size and mass, yet it evolved into a hellish world of crushing pressure, acid clouds, and a runaway greenhouse effect that maintains a surface temperature of 465°C—hot enough to melt lead. But above the clouds, at 50 kilometers altitude, conditions are remarkably Earth-like. Here, NovaX's Ishtar Aerostat Lounge floats amid golden sulfuric haze, offering 360-degree views of the most dramatic cloudscape in the Solar System. Venus represents the ultimate vantage point: close enough to feel the Sun's warmth, yet safely suspended above an alien world.",
    history:
      "Venus has captivated humanity since prehistoric times, appearing as the 'Morning Star' and 'Evening Star' in ancient skies. The Babylonians named it Ishtar, the Greeks called it Aphrodite—goddesses of love and beauty. The first spacecraft to visit, Mariner 2 in 1962, revealed its true nature: a planet-sized greenhouse. Soviet Venera landers survived mere minutes on the surface, transmitting the only images from Venusian soil. Today, radar mapping by Magellan unveiled a world of volcanic plains, massive rift valleys, and strange 'pancake' domes—a geologically active planet with over 1,600 major volcanoes.",
    climate:
      "Venus's climate is the Solar System's most extreme greenhouse effect. A 92-bar atmosphere (92 times Earth's pressure) composed primarily of CO₂ with sulfuric acid clouds creates a thermal blanket that maintains a uniform 465°C across the entire surface—hotter than Mercury, despite being nearly twice as far from the Sun. At the cloud tops, however, conditions normalize to a comfortable 30°C at 0.5 bar pressure, making the aerostat zone the only habitable region. Hurricane-force winds at 360 km/h circle the planet in just 4 Earth days, creating a super-rotation phenomenon unique in the Solar System.",
    surface:
      "Venus's surface is a geologically young volcanic landscape, reshaped by eruptions within the last 300 million years. Rolling plains cover 80% of the surface, punctuated by thousands of volcanic features—from massive shield volcanoes like Maat Mons (8 km tall) to strange 'pancake' domes formed by viscous lava. Two 'continents,' Ishtar Terra and Aphrodite Terra, rise above the plains, with Maxwell Montes reaching 11 km—taller than Everest. Vast rift valleys, impact craters, and the mysterious 'coronae' (ring-shaped tectonic features) complete a landscape constantly reshaped by internal heat.",
    interestingFacts: [
      "A Venusian day (243 Earth days) is longer than its year (225 Earth days)—and it rotates backwards (retrograde rotation)",
      "Venus has no moons or rings, making it one of only two planets in the inner Solar System without natural satellites",
      "The atmospheric pressure at Venus's surface is equivalent to being 900 meters underwater on Earth",
      "Sulfuric acid rain falls in Venus's upper atmosphere but evaporates before reaching the surface at 465°C",
      "Venus is sometimes called Earth's 'evil twin' due to its similar size but radically different climate",
    ],
    activities: [
      "Cloud-level aerostat lounging with 360-degree panoramic observation decks",
      "Atmospheric sampling expeditions using specialized drone craft",
      "Sunset photography from the cloud tops—the Sun appears 50% larger than on Earth",
      "Zero-gravity yoga sessions in the aerostat's microgravity observation dome",
      "Volcanic observation sorties to study Maat Mons from a safe orbital distance",
    ],
    healthRisks: [
      "Psychological effects of permanent cloud cover and limited visibility of the surface",
      "Sulfuric acid aerosol exposure risk requiring sealed environmental suits",
      "High cabin pressure differentials requiring careful decompression protocols",
      "Coriolis effects from super-rotating atmosphere causing disorientation",
      "Carbon dioxide toxicity risk in the event of atmospheric containment breach",
    ],
    missionHighlights: [
      "Float above the clouds in a luxury aerostat habitat—the only way to experience Venus",
      "Witness the most dramatic sunsets in the Solar System from the Ishtar observation deck",
      "Descend to the 'habitable zone' at 50 km where pressure and temperature match Earth",
      "Study the greenhouse effect firsthand—Venus is a cautionary tale for climate science",
      "Contribute to atmospheric research by launching sondes into the Venusian upper atmosphere",
    ],
    recommendedPackage: "Orbital Cruise",
    suitableTravelers: "Romantic travelers, cloud-seekers, climate scientists, photographers, and those who appreciate atmospheric beauty",
    bestSeason: "Year-round (constant cloud cover eliminates seasonal variation)",
    requiredTraining: "Physiological Adaptation + Systems Operations (high-pressure environment protocols)",
    scientificInfo: {
      diameter: "12,104 km",
      mass: "4.87 × 10²⁴ kg",
      distanceFromSun: "108.2 million km",
      orbitalPeriod: "224.7 Earth days",
      rotationPeriod: "243 Earth days (retrograde)",
      surfaceTemperature: "465°C (mean)",
    },
  },

  earth: {
    planetTheme: "earth",
    themeAccent: "blue",
    overview:
      "Earth is the cradle of humanity, the blue marble that started it all. As the primary departure hub for all interplanetary voyages, our home planet offers the Stratosphere Expanse—a premier orbital departure lounge where guests acclimatize to low gravity while enjoying panoramic views of the continents they're about to leave behind. Earth orbits at precisely the right distance from the Sun to maintain liquid water, a stable climate, and the biosphere that gave rise to intelligent life. Before venturing to the stars, every traveler should see their home world from above—the Overview Effect is transformative.",
    history:
      "Earth formed 4.54 billion years ago from the solar nebula, and within 200 million years, life emerged. Over billions of years, photosynthesis oxygenated the atmosphere, multicellular life diversified, and eventually, humans evolved—the first species capable of leaving their home planet. From the first photograph of Earth from space (1946, captured by a V-2 rocket) to the iconic 'Blue Marble' image taken by Apollo 17 in 1972, seeing Earth from space has inspired generations. Today, NovaX offers this experience to everyone, making the Overview Effect accessible beyond government astronauts.",
    climate:
      "Earth's climate is uniquely stable due to its axial tilt (23.5°), atmospheric composition (78% N₂, 21% O₂), and liquid water oceans covering 71% of the surface. The greenhouse effect, maintained by CO₂ and H₂O vapor, keeps the average temperature at a comfortable 15°C. Orbiting the planet at 400 km, the Stratosphere Expanse offers 16 sunrises and sunsets per day, with uninterrupted views of weather systems, auroras, and the thin blue line of the atmosphere—the only thing standing between humanity and the vacuum of space.",
    surface:
      "Earth's surface is the most diverse in the known universe. Tectonic plates constantly reshape the planet, creating mountain ranges (Himalayas, Andes), deep ocean trenches (Mariana Trench, 11 km deep), and volcanic arcs. The biosphere—millions of species—has transformed the surface over billions of years, creating oxygen-rich air, soil, and the Great Barrier Reef (visible from space). Forests, deserts, ice caps, and vast grasslands cover the land, while microscopic phytoplankton paint the oceans in swirls visible from orbit as 'phytoplankton blooms.'",
    interestingFacts: [
      "Earth is the only planet in the Solar System not named after a Greek or Roman deity",
      "The highest point (Mount Everest, 8.8 km) would fit inside the Mariana Trench with 2.2 km to spare",
      "Earth's magnetic field flips polarity approximately every 200,000 to 300,000 years",
      "Over 80% of Earth's oceans remain unexplored and unmapped",
      "Earth's rotation is gradually slowing, adding approximately 1.7 milliseconds per century",
    ],
    activities: [
      "Orbital acclimatization with 360-degree Earth observation from glass domes",
      "Zero-gravity spa treatments and floating meditation sessions",
      "Aurora borealis and australis observation from polar orbital passes",
      "Microgravity sports in the Expanse's zero-G activity center",
      "Launch viewing: witness spacecraft departing for interplanetary destinations",
    ],
    healthRisks: [
      "Space adaptation syndrome (space sickness) during first 24-48 hours",
      "Radiation exposure at orbital altitudes above low Earth orbit protection",
      "Bone density loss at approximately 1-2% per month in microgravity",
      "Vestibular system disruption causing balance and coordination issues",
      "Ocular changes and intracranial pressure variations in microgravity",
    ],
    missionHighlights: [
      "Experience the Overview Effect—the profound cognitive shift from seeing Earth from space",
      "Witness 16 sunrises and sunsets in a single 24-hour period",
      "Identify continents, cities, and landmarks from orbit without magnification",
      "Float weightless in the Stratosphere Expanse's zero-G observation lounge",
      "Depart for the stars from humanity's home world at the NovaX Orbital Terminal",
    ],
    recommendedPackage: "Orbital Cruise",
    suitableTravelers: "First-time space travelers, luxury tourists, corporate retreats, families with children aged 12+",
    bestSeason: "Any (orbital operations continue year-round, independent of terrestrial seasons)",
    requiredTraining: "Physiological Adaptation module only (introductory level)",
    scientificInfo: {
      diameter: "12,742 km",
      mass: "5.97 × 10²⁴ kg",
      distanceFromSun: "149.6 million km",
      orbitalPeriod: "365.25 Earth days",
      rotationPeriod: "23.93 hours",
      surfaceTemperature: "-89°C to 57°C (mean 15°C)",
    },
  },

  mars: {
    planetTheme: "desert",
    themeAccent: "orange",
    overview:
      "Mars is humanity's first interplanetary colony destination—a world waiting to be explored. The Red Planet's ancient river valleys, towering volcanoes, and vast canyons tell a story of a world that once had flowing water and a thick atmosphere. Today, Mars is a cold desert, but beneath its rust-colored surface lie vast deposits of water ice, frozen carbon dioxide, and the promise of human settlement. Olympus Dome Estates provide pressurized luxury lodging at the edge of Olympus Mons—the tallest mountain in the Solar System—offering Martian sunset views that paint the sky in shades of orange and blue.",
    history:
      "Mars has fascinated humans for millennia, its red hue associated with war and bloodshed by ancient cultures. Galileo first observed it through a telescope in 1610. Giovanni Schiaparelli's 'canali' (channels) sparked imagination of Martian civilization in 1877. The Space Age brought Mariner 4's first flyby (1965), Viking landers (1976), and a fleet of rovers—Sojourner, Spirit, Opportunity, Curiosity, and Perseverance—that have revolutionized our understanding. Today, Mars hosts active human research stations, and NovaX luxury domes mark the beginning of civilian Martian tourism.",
    climate:
      "Mars has a thin atmosphere, 95% CO₂ at just 0.6% of Earth's surface pressure. The average temperature is -63°C, ranging from 20°C at the equator in summer to -140°C at the poles in winter. Dust storms can engulf the entire planet for weeks, creating dramatic red skies. The low gravity (38% of Earth) means weather systems behave differently—thin clouds form, frost settles at dawn, and carbon dioxide snow falls at the poles. The Olympus Dome Estates maintain a pressurized, climate-controlled environment with floor-to-ceiling views of the Martian landscape.",
    surface:
      "Mars boasts the Solar System's most dramatic geology. Olympus Mons rises 21.9 km—nearly 3 times Everest's height—spanning 600 km at its base with a caldera large enough to hold London. Valles Marineris stretches 4,000 km, 10 times longer and 5 times deeper than the Grand Canyon. Ancient river deltas and lake beds (Jezero Crater, Gale Crater) evidence a wetter past. The northern hemisphere is smooth lowlands (possibly an ancient ocean bed), while the southern hemisphere is heavily cratered highlands. Polar ice caps of water and CO₂ ice grow and shrink with the seasons.",
    interestingFacts: [
      "Olympus Mons is 2.5 times taller than Mount Everest, rising 21.9 km above Mars's mean surface elevation",
      "A day on Mars (a 'sol') is 24.6 hours—nearly identical to Earth, making it the most Earth-like day in the Solar System",
      "Mars has the largest dust storms in the Solar System, sometimes covering the entire planet for weeks",
      "The Curiosity rover discovered organic molecules preserved in 3.5-billion-year-old Martian mudstone",
      "Mars's two moons, Phobos and Deimos, are likely captured asteroids—Phobos will eventually crash into Mars or break apart into a ring",
    ],
    activities: [
      "Olympus Mons summit excursion via pressurized rover with guided geology tour",
      "Valles Marineris canyon hiking with thermal-protected suits and base camp stays",
      "Ancient river delta exploration at Jezero Crater with paleontology sampling",
      "Low-gravity rock climbing on the Tharsis volcanic plateau",
      "Martian sunset photography—the blue-tinted dusk is unlike anything on Earth",
    ],
    healthRisks: [
      "Prolonged exposure to cosmic radiation due to thin atmosphere and lack of global magnetic field",
      "Fine regolith dust inhalation causing respiratory issues (potential silicosis-like effects)",
      "Low gravity (38% Earth) leading to muscle atrophy and bone density reduction",
      "Psychological effects of isolation on a distant world with 4-24 minute communication delays to Earth",
      "Reduced atmospheric pressure requires full pressure suits for all surface excursions",
    ],
    missionHighlights: [
      "Stand beside the tallest mountain in the Solar System and gaze across its vast caldera",
      "Walk through an ancient river delta where water flowed billions of years ago",
      "Witness a Martian sunset where the sky turns blue near the Sun and red elsewhere",
      "Collect your own Mars rock sample—a piece of another world to take home",
      "Send a message back to Earth with a confirmed 3-22 minute light-speed delay",
    ],
    recommendedPackage: "Surface Expedition",
    suitableTravelers: "Explorers, adventure travelers, scientists, engineers, and those who want to be among the first civilians on another world",
    bestSeason: "Northern hemisphere summer (sols 0-200) for warmer temperatures and milder dust activity",
    requiredTraining: "Physiological Adaptation + Systems Operations + Emergency Evacuation Protocols (full certification)",
    scientificInfo: {
      diameter: "6,779 km",
      mass: "6.42 × 10²³ kg",
      distanceFromSun: "227.9 million km",
      orbitalPeriod: "687 Earth days",
      rotationPeriod: "24.62 hours",
      surfaceTemperature: "-140°C to 20°C (mean -63°C)",
    },
  },

  jupiter: {
    planetTheme: "storm",
    themeAccent: "orange",
    overview:
      "Jupiter is the king of planets—a gas giant with no solid surface, 318 times Earth's mass, and a Great Red Spot storm larger than our entire planet. Its banded atmosphere of hydrogen and helium creates a mesmerizing tapestry of oranges, browns, and creams that shift and swirl over hours. The Amalthea Transit Hub orbits within Jupiter's intense magnetosphere, offering guests front-row seats to the most dramatic weather in the Solar System while protected by advanced radiation shielding. Jupiter's four largest moons—Io, Europa, Ganymede, and Callisto—form a complete solar system unto themselves.",
    history:
      "Jupiter has been known since ancient times, named for the king of the Roman gods. Galileo's 1610 discovery of its four largest moons revolutionized astronomy—proving not everything orbits Earth. The Great Red Spot has been observed continuously since 1665, making it the longest-lived storm known. NASA's Juno spacecraft (2016-present) has revolutionized our understanding, revealing ammonia storms, cyclonic clusters at the poles, and a magnetic field so powerful it creates auroras 1,000 times more energetic than Earth's. NOVA's Amalthea Transit Hub represents humanity's first permanent presence in the Jovian system.",
    climate:
      "Jupiter has no surface, but its visible 'surface' is a cloud deck at about -145°C, where ammonia, ammonium hydrosulfide, and water ice form distinct colored bands. The iconic Great Red Spot is a storm larger than Earth that has raged for centuries, with wind speeds reaching 430 km/h. Jupiter's rapid 9.9-hour rotation stretches clouds into bands (zones and belts) that wrap the planet. Deeper within, the pressure and temperature increase until hydrogen becomes metallic—a state never achieved on Earth. The Amalthea Transit Hub orbits at a safe distance, observing this colorful chaos from a radiation-shielded perch.",
    surface:
      "Jupiter has no solid surface—it's a gas giant composed primarily of hydrogen (89%) and helium (10%) with trace amounts of methane, ammonia, and water. Descending through its atmosphere, the pressure increases until hydrogen becomes a liquid and eventually a metallic form at 40,000 km deep, where the pressure is 2 million times Earth's surface pressure. The 'surface' visible from space is the cloud top at 0.1 bar pressure. Below this, the atmosphere transitions gradually from gas to liquid without a clear boundary—a truly alien environment where there is no 'land' to stand on.",
    interestingFacts: [
      "Jupiter's Great Red Spot is a storm that has raged for at least 350 years—it could swallow Earth whole",
      "Jupiter's magnetic field is 20,000 times stronger than Earth's, extending 7 million km toward the Sun",
      "The planet's rapid rotation (9.9 hours) makes it the fastest-spinning planet in the Solar System",
      "Jupiter has at least 95 known moons, including Ganymede—the largest moon in the Solar System, bigger than Mercury",
      "The 'Pearly White' storm on Jupiter's southern hemisphere appeared in 2018 and rivals the Great Red Spot in scale",
    ],
    activities: [
      "Great Red Spot observation from radiation-shielded viewing galleries",
      "Io volcanic flyby with real-time thermal imaging of active eruptions",
      "Europa sub-glacial ocean research station visit (astronomy module)",
      "Ganymede magnetic field research outpost tour with scientist guides",
      "Jupiter aurora observation—the most powerful auroras in the Solar System",
    ],
    healthRisks: [
      "Severe radiation exposure in Jupiter's magnetosphere requires shielded habitats and limited EVA",
      "Low gravity is highly variable depending on orbital position and moon proximity",
      "Psychological effects of operating deep within an intense magnetic and radiation field",
      "Extended transit times (640 days one-way) require advanced life support redundancy",
      "Cryogenic preservation requirements for the outbound journey may cause side effects",
    ],
    missionHighlights: [
      "Witness the Great Red Spot from orbit—a storm larger than Earth, active for centuries",
      "Observe Io's volcanic eruptions in real-time from a safe orbital distance",
      "Glimpse the subsurface ocean of Europa—the most promising habitat for extraterrestrial life",
      "Experience Jupiter's auroras—spectacular light shows powered by the planet's massive magnetosphere",
      "Stand on Ganymede, the largest moon in the Solar System, and look up at Jupiter dominating the sky",
    ],
    recommendedPackage: "Deep Space Expedition",
    suitableTravelers: "Deep space adventurers, astronomers, astrobiologists, and those seeking the ultimate giant planet experience",
    bestSeason: "Year-round (Jupiter has negligible axial tilt, no true seasons)",
    requiredTraining: "Full certification + Advanced Radiation Exposure Management module",
    scientificInfo: {
      diameter: "139,820 km",
      mass: "1.90 × 10²⁷ kg",
      distanceFromSun: "778.5 million km",
      orbitalPeriod: "11.86 Earth years",
      rotationPeriod: "9.93 hours",
      surfaceTemperature: "-145°C (cloud top)",
    },
  },

  saturn: {
    planetTheme: "ringed",
    themeAccent: "gold",
    overview:
      "Saturn is the jewel of the Solar System—a golden world encircled by an impossibly elegant ring system spanning 282,000 km yet only 10 meters thick in places. Its pale amber atmosphere, whipped by winds reaching 1,800 km/h at the equator, creates subtle banding that shifts like silk in a breeze. The Cassini Rings Resort sits at the ring-plane edge, providing the most photographed view in the Solar System: Saturn's rings bisecting the sky. Its moon Titan, with its thick atmosphere and liquid hydrocarbon seas, and Enceladus, with its cryovolcanic geysers, make the Saturn system a complete destination in itself.",
    history:
      "Saturn has been known since ancient times, named for the Roman god of agriculture. Galileo saw it through his primitive telescope in 1610 and described it as 'three bodies'—unable to resolve the rings. Christiaan Huygens correctly identified the ring system in 1655, the same year he discovered Titan. The Cassini-Huygens mission (2004-2017) spent 13 years revolutionizing our understanding of the Saturn system, discovering Enceladus's ocean plumes, Titan's methane cycle, and the rings' dynamic nature. NovaX's Cassini Rings Resort, now under construction at the ring-plane edge, will be the most luxurious habitat ever built.",
    climate:
      "Saturn's atmosphere mirrors Jupiter's—composed primarily of hydrogen and helium—but with distinctive golden hues from ammonia crystals and unknown chromophores. Temperatures at the cloud tops average -175°C, with wind speeds at the equator reaching a staggering 1,800 km/h—10 times faster than Jupiter's. The planet's low density (0.687 g/cm³) is less than water, meaning Saturn would float in a bathtub large enough to hold it. Seasonal variations, driven by Saturn's 26.7° axial tilt, create dramatic changes in ring illumination and atmospheric coloration over its 29.5-year orbit.",
    surface:
      "Like Jupiter, Saturn has no solid surface. Its visible 'surface' is the cloud deck at approximately 1 bar pressure, where temperatures hover around -175°C. Below this, the hydrogen-helium atmosphere gradually transitions to liquid and then metallic hydrogen at extreme depths. Saturn's interior is thought to contain a rocky core of 10-20 Earth masses surrounded by metallic hydrogen and helium. The rings are predominantly water ice with trace organic compounds—billions of particles ranging from dust grains to house-sized boulders, each orbiting Saturn in a silent cosmic ballet.",
    interestingFacts: [
      "Saturn's rings span 282,000 km but are only 10 meters thick in most places—a razor-thin cosmic marvel",
      "Saturn is so light it would float in water—its density is only 0.687 g/cm³",
      "The Cassini spacecraft spent 13 years studying Saturn before intentionally plunging into the atmosphere in 2017",
      "Saturn's moon Enceladus has liquid water oceans beneath its icy crust, with cryovolcanoes spewing water ice into space",
      "Titan, Saturn's largest moon, has a thick nitrogen atmosphere and stable liquid hydrocarbon lakes on its surface",
    ],
    activities: [
      "Ring-plane edge observation from the Cassini Rings Resort's glass observation spire",
      "Titan atmospheric flight with guided tour of methane lakes and dunes",
      "Enceladus cryovolcanic geyser flyby with sample collection opportunity",
      "Ring particle photography—the most iconic backdrop in the Solar System",
      "Ice mineral spa treatments using ring-derived mineral particulates",
    ],
    healthRisks: [
      "Extended transit (3.2 years one-way) requires deep cryo-preservation with associated medical risks",
      "Radiation levels in Saturn's magnetosphere are lower than Jupiter's but still significant",
      "Low-gravity adaptation after prolonged cryo-sleep requires careful rehabilitation",
      "Ring-plane navigation hazards—particle debris requires careful trajectory planning",
      "Psychological challenges of multi-year isolation from Earth with delayed communication",
    ],
    missionHighlights: [
      "Witness Saturn's rings from the closest luxury habitat ever constructed—a view no photograph can capture",
      "Float in Titan's thick atmosphere—the only moon in the Solar System with stable surface liquids",
      "Taste Enceladus's subsurface ocean by sampling its cryovolcanic plume (filtered for safety)",
      "Photograph the rings at sunrise—when sunlight illuminates the ring plane edge-on",
      "Stargaze from a billion kilometers from Earth in the Resort's cryo-stabilized observatory",
    ],
    recommendedPackage: "Deep Space Expedition",
    suitableTravelers: "Romantic travelers, photographers, astronomers, and those who dream of the iconic ringed planet",
    bestSeason: "Ring-plane crossing (every 15 years) offers edge-on ring views; otherwise year-round",
    requiredTraining: "Full certification + Cryo-Preservation Adaptation module",
    scientificInfo: {
      diameter: "116,460 km",
      mass: "5.68 × 10²⁶ kg",
      distanceFromSun: "1.43 billion km",
      orbitalPeriod: "29.46 Earth years",
      rotationPeriod: "10.66 hours",
      surfaceTemperature: "-175°C (cloud top)",
    },
  },

  uranus: {
    planetTheme: "ice",
    themeAccent: "cyan",
    overview:
      "Uranus is the tilted giant—an ice world spinning on its side with an axial tilt of 97.77°, essentially rolling around the Sun like a cosmic bowling ball. Its pale blue-green atmosphere, colored by methane absorption, presents the most serene facade in the outer Solar System. But beneath this calm exterior lies a world of extreme internal heat, diamond rain, and winds that tear at supersonic speeds. The Titania Ice Outpost, established on Uranus's largest moon, offers researchers and luxury travelers a base to study the most enigmatic planet in our Solar System from a stable, icy platform.",
    history:
      "Uranus holds the distinction of being the first planet discovered with a telescope. William Herschel spotted it in 1781, initially thinking it was a comet or star. He named it Georgium Sidus (George's Star) after King George III, but the astronomical community settled on Uranus, father of Saturn in Roman mythology. Only one spacecraft—Voyager 2 in 1986—has visited, revealing a surprisingly bland cloudscape (at the time) and a magnetic field tilted 59° from the rotation axis, offset from the planet's center. The ice giant remains the Solar System's most unexplored major planet.",
    climate:
      "Uranus's atmosphere is the coldest in the Solar System, with cloud-top temperatures plunging to -224°C—colder even than Neptune, despite Uranus being closer to the Sun. This unusual temperature gradient suggests internal heat dynamics we don't fully understand. Seasonal variations are extreme due to the 97.77° axial tilt: during the summer solstice, the north pole faces the Sun directly for 21 years, while the south pole faces away. Winter brings the opposite, creating the most extreme seasons in the Solar System. Methane in the upper atmosphere gives Uranus its distinctive cyan hue.",
    surface:
      "Like Jupiter and Saturn, Uranus has no solid surface. Beneath its hydrogen-helium atmosphere lies a mantle of 'icy' materials—water, methane, and ammonia in fluid form—under extreme pressure. This superionic water layer may generate the planet's unusual magnetic field. Below the icy mantle, a rocky core of approximately 0.5 Earth masses may exist. The internal structure is poorly understood due to the lack of dedicated orbiter missions, making every observation from the Titania Ice Outpost scientifically invaluable. Diamond rain—precipitation of carbon compressed into diamond—is theorized to occur in Uranus's deep interior.",
    interestingFacts: [
      "Uranus rotates on its side with an axial tilt of 97.77°—likely from a massive ancient collision",
      "The planet has 27 known moons, all named after characters from Shakespeare and Pope",
      "Uranus emits less internal heat than it receives from the Sun—unlike all other gas giants",
      "The magnetic field is tilted 59° from the rotation axis and offset by 0.3 planetary radii",
      "Diamond rain may fall through Uranus's interior as methane is compressed under extreme pressure",
    ],
    activities: [
      "Titania ice plain exploration with specially-designed cold-resistant rovers",
      "Uranus magnetosphere research sorties measuring the unique offset magnetic field",
      "Cryo-stabilized observatory viewings of Uranus's ring system (faint but distinct)",
      "Miranda Verona Ropes observation—the tallest known cliff in the Solar System",
      "Atmospheric probe launches to study Uranus's unusual thermal dynamics",
    ],
    healthRisks: [
      "Extreme cold (-224°C) requires advanced thermal protection for any exterior operations",
      "Extended cryo-preservation for the 7.5-year transit creates unique medical challenges",
      "Psychological effects of long-term isolation in the outer Solar System",
      "Methane atmosphere toxicity in enclosed habitats requires careful atmospheric monitoring",
      "Communication delays of 2-3 hours with Earth create operational independence requirements",
    ],
    missionHighlights: [
      "Witness the most extreme axial tilt in the Solar System—a planet that rolls on its side",
      "Explore the coldest planetary atmosphere at -224°C from a safe orbital distance",
      "Discover the rings of Uranus—faint, dark, and barely visible, a challenge to observe",
      "Stand on Titania—Uranus's largest moon—and look up at the cyan giant dominating the sky",
      "Contribute to cutting-edge planetary science by analyzing data from the least-explored major planet",
    ],
    recommendedPackage: "Deep Space Expedition",
    suitableTravelers: "Researchers, extreme explorers, ice enthusiasts, and those who seek the road less traveled",
    bestSeason: "Uranian summer (pole facing Sun) for 21-year window of constant daylight",
    requiredTraining: "Full certification + Extreme Cold Environment Operations + Cryo-Preservation",
    scientificInfo: {
      diameter: "50,724 km",
      mass: "8.68 × 10²⁵ kg",
      distanceFromSun: "2.87 billion km",
      orbitalPeriod: "84.01 Earth years",
      rotationPeriod: "17.24 hours (retrograde)",
      surfaceTemperature: "-224°C (cloud top)",
    },
  },

  neptune: {
    planetTheme: "deepblue",
    themeAccent: "blue",
    overview:
      "Neptune is the windiest planet in the Solar System—a deep blue world where supersonic winds reach 2,100 km/h, tearing through an atmosphere of hydrogen, helium, and methane. Its vivid azure hue, more intense than Uranus's, comes from an unknown component that absorbs red light. The Great Dark Spot, a storm system the size of Earth, comes and goes mysteriously. The Triton Thermal Spires provide heated sanctuary on Neptune's largest moon—a world of nitrogen geysers, retrograde orbit, and the coldest known surface in the Solar System at -235°C.",
    history:
      "Neptune was the first planet located by mathematical prediction rather than observation. Urbain Le Verrier calculated its position based on perturbations in Uranus's orbit, leading Johann Galle to discover it in 1846. The discovery was a triumph of celestial mechanics. Voyager 2's 1989 flyby revealed the Great Dark Spot, supersonic winds, and Triton's active nitrogen geysers. Neptune has completed only one orbit since its discovery (orbital period: 165 years), making it the only planet not yet observed through a full Neptunian year by human instruments.",
    climate:
      "Neptune's climate is dominated by the strongest winds in the Solar System—reaching 2,100 km/h, faster than any recorded on any other planet. The atmosphere undergoes dramatic seasonal changes, with dark spots (storms) appearing and disappearing over years. Despite being 30 times farther from the Sun than Earth, Neptune radiates 2.6 times more energy than it receives, driven by internal heat left over from its formation. This internal energy source powers the most dynamic weather in the outer Solar System, with white clouds of methane ice forming and dissipating on timescales of days.",
    surface:
      "Neptune, like the other gas and ice giants, has no solid surface. Its visible cloud deck is composed of methane ice crystals at approximately 1 bar pressure, creating the deepest blue coloration in the Solar System. Beneath the atmosphere lies an icy mantle of water, methane, and ammonia under extreme pressure—a superionic state where water molecules dissociate and hydrogen ions conduct electricity, generating Neptune's misaligned magnetic field. A rocky core of approximately 1.2 Earth masses lies at the center, surrounded by diamond rain—a precipitation of carbon compressed into diamonds falling through the planet's interior.",
    interestingFacts: [
      "Neptune has the fastest winds in the Solar System, reaching 2,100 km/h—faster than the speed of sound on Earth",
      "The planet has completed only one orbit (165 years) since its discovery in 1846",
      "Neptune radiates 2.6 times more energy than it receives from the Sun—its internal heat drives extreme weather",
      "Triton, Neptune's largest moon, orbits in the opposite direction (retrograde) of Neptune's rotation—evidence it's a captured Kuiper Belt object",
      "Neptune's Great Dark Spot is an anti-cyclonic storm system that appears and disappears unpredictably",
    ],
    activities: [
      "Deep blue atmosphere observation from Triton's heated observation domes",
      "Triton nitrogen geyser sampling—collecting material from an active cryovolcanic world",
      "Retrograde orbital photography—capturing Neptune from Triton's unique orbital perspective",
      "Kuiper Belt boundary survey—Triton is a captured KBO, offering a window into the outer Solar System",
      "Stellar occultation timing—scientific observation campaigns from Triton's stable platform",
    ],
    healthRisks: [
      "Extreme cold (-235°C on Triton) requires the most advanced thermal protection available",
      "12.1-year one-way transit requires multi-generational cryo-preservation or generation ship protocols",
      "Communication delays of 4+ hours with Earth require complete operational autonomy",
      "Psychological challenges of the farthest permanent outpost from Earth",
      "Radiation exposure from cosmic rays at the edge of the heliosphere, less protected than inner planets",
    ],
    missionHighlights: [
      "Stand on Triton—a captured Kuiper Belt object—and observe Neptune's deep blue disk from its surface",
      "Witness the fastest winds in the Solar System from a heated, pressurized observation dome",
      "Photograph the Great Dark Spot if it's active during your visit—a storm Earth could fit inside",
      "Collect a sample from an active cryovolcano—nitrogen ice geysers that reach 8 km altitude",
      "Be among the farthest humans from Earth—a true pioneer of the outer Solar System",
    ],
    recommendedPackage: "Deep Space Expedition",
    suitableTravelers: "Pioneers, extreme weather enthusiasts, deep space researchers, and those drawn to the furthest frontier",
    bestSeason: "Neptunian summer (brief window when the southern hemisphere faces the Sun)",
    requiredTraining: "Full certification + Cryo-Preservation + Extreme Isolation Protocol",
    scientificInfo: {
      diameter: "49,244 km",
      mass: "1.02 × 10²⁶ kg",
      distanceFromSun: "4.50 billion km",
      orbitalPeriod: "164.8 Earth years",
      rotationPeriod: "16.11 hours",
      surfaceTemperature: "-218°C (cloud top)",
    },
  },

  pluto: {
    planetTheme: "frozen",
    themeAccent: "white",
    overview:
      "Pluto is the beloved underdog—demoted to dwarf planet status in 2006 but elevated in our hearts. This frozen world at the edge of the Kuiper Belt reveals a surprisingly complex landscape: heart-shaped nitrogen glaciers (Sputnik Planitia), water-ice mountains as tall as the Rockies, and a thin atmosphere that freezes and collapses as Pluto orbits farther from the Sun. The Charon Horizon Lodge, in synchronous orbit around the Pluto-Charon binary system, offers the most unique vantage point in the Solar System—watching two worlds dance around their common center of gravity.",
    history:
      "Pluto was discovered in 1930 by Clyde Tombaugh at Lowell Observatory, the culmination of a search for 'Planet X' beyond Neptune. Named by an 11-year-old British girl, Venetia Burney, Pluto reigned as the ninth planet for 76 years. The New Horizons spacecraft's flyby in 2015 revolutionized our understanding, revealing Pluto as a geologically active world with mountains, glaciers, and a multi-layered atmosphere. The 2006 reclassification as a dwarf planet sparked global debate, making Pluto the most famous and beloved dwarf planet. Charon, its largest moon, is so large that the pair orbit a point in space between them—a true binary system.",
    climate:
      "Pluto's climate is the most seasonal in the Solar System. Its highly elliptical orbit (248 years) and extreme axial tilt (122.5°) create dramatic changes as it approaches and recedes from the Sun. During the brief 'summer,' the thin nitrogen atmosphere expands as surface ice sublimates. During the long winter, the atmosphere freezes and falls as snow, covering the surface in nitrogen, methane, and carbon monoxide frosts. Surface temperatures average -230°C but can briefly reach -218°C at the equator during summer. The atmosphere, when present, creates a faint blue haze layered over the icy landscape.",
    surface:
      "Pluto's surface is a frozen wonderland of dramatic contrasts. Sputnik Planitia, a 1,000-km-wide nitrogen ice glacier, forms the left lobe of the iconic 'heart' feature. Water-ice mountains (Tartarus Dorsa, Norgay Montes) rise 3-5 km above the plains, their peaks coated in methane frost. Cthulhu Macula, a dark equatorial region, is covered in tholins—organic compounds formed by cosmic ray irradiation of methane. Cryovolcanoes like Wright Mons and Piccard Mons suggest internal thermal activity. The surface age varies dramatically: some regions are billions of years old, while others were reshaped within the last 10 million years.",
    interestingFacts: [
      "Pluto has a 'heart' (Tombaugh Regio / Sputnik Planitia) the size of Texas, composed of frozen nitrogen ice that constantly convects and renews its surface",
      "The Pluto-Charon system is a binary planet—their barycenter lies outside Pluto's surface, making them a true double world",
      "Pluto's mountains are made of water ice that 'floats' on the softer nitrogen ice plains—like icebergs on a frozen sea",
      "New Horizons is the only spacecraft to have visited Pluto, speeding past at 49,600 km/h in 2015 after a 9.5-year journey",
      "Pluto has five known moons: Charon, Styx, Nix, Kerberos, and Hydra—each discovered at different times since 1978",
    ],
    activities: [
      "Sputnik Planitia nitrogen glacier trek—the only known convecting ice plain in the Solar System",
      "Water-ice mountain summit climb with panoramic views of the heart-shaped plain",
      "Charon binary-system observation—watching the companion world orbit the empty point between them",
      "Kuiper Belt deep-field astronomy—Pluto offers the clearest view of the outer Solar System",
      "Organic chemistry sampling at Cthulhu Macula to study prebiotic compounds",
    ],
    healthRisks: [
      "Extreme cold (-230°C) requires the most advanced thermal protection available",
      "Ultra-low gravity (6% Earth) causes rapid muscle atrophy and requires rigorous countermeasures",
      "9.5-year one-way transit requires multi-generational planning or advanced cryo-preservation",
      "Atmospheric freeze-thaw cycles create unpredictable surface conditions during the Pluto year",
      "Complete isolation from Earth with 5+ hour communication delays",
    ],
    missionHighlights: [
      "Stand on the frozen heart of Pluto—walk across convecting nitrogen glaciers that renew themselves",
      "Witness the Pluto-Charon binary system—two worlds locked in a gravitational dance around empty space",
      "Gaze at the most distant Sun ever observed—a point of light in the eternal blackness of the Kuiper Belt",
      "Collect organic tholins—prebiotic compounds that may hold clues to the origin of life",
      "Be the farthest human from Earth—the ultimate pioneer of the Solar System frontier",
    ],
    recommendedPackage: "Deep Space Expedition",
    suitableTravelers: "True pioneers, romantic explorers, astronomers, and those who never forgave Pluto's demotion",
    bestSeason: "Plutonian summer (brief window when the atmosphere is present, ~20 Earth years)",
    requiredTraining: "Full certification + Cryo-Preservation + Extreme Isolation + Micro-Gravity Adaptation",
    scientificInfo: {
      diameter: "2,377 km",
      mass: "1.30 × 10²² kg",
      distanceFromSun: "5.91 billion km",
      orbitalPeriod: "247.94 Earth years",
      rotationPeriod: "6.39 Earth days (retrograde)",
      surfaceTemperature: "-230°C (mean)",
    },
  },
};
