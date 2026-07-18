export type MissionType = {
  id: string; label: string; icon: string; description: string;
  difficulty: number; durationMultiplier: number; costMultiplier: number;
};

export type CrewConfig = {
  id: string; label: string; icon: string; minCrew: number; maxCrew: number;
  description: string;
};

export type PlanetData = {
  id: string; name: string; distanceAU: number; distanceKm: number;
  gravity: number; gravityUnit: string; temperatureMin: string; temperatureMax: string;
  atmosphere: string; dayLength: string; escapeVelocity: string;
  terrain: string; weather: string; radiation: string; wind: string;
  color: string; image: string; description: string;
};

export type Spacecraft = {
  id: string; name: string; maxSpeed: number; maxSpeedLabel: string;
  fuelCapacity: string; passengerCapacity: number; artificialGravity: boolean;
  safetyRating: number; rangeAU: number; description: string; color: string;
  icon: string; efficiency: number;
};

export type EquipmentItem = {
  id: string; label: string; mandatory: boolean;
};

export type ReadinessScore = {
  missionSuccess: number; missionRisk: number; crewReadiness: number;
  equipmentReadiness: number; overall: number;
};

export type MissionCalculations = {
  distanceAU: number; distanceKm: number; travelTimeDays: number;
  fuelRequired: number; energyConsumption: number; crewCount: number;
  oxygenRequired: number; foodRequired: number; waterRequired: number;
  cargoWeight: number; communicationDelay: number; missionDifficulty: string;
  estimatedCost: number;
};

export type AIRecommendation = {
  bestSpacecraft: string; launchWindow: string; recommendedHabitat: string;
  crewSize: string; requiredTraining: string[]; suggestedEquipment: string[];
  possibleRisks: string[]; radiationLevel: string; gravityAdaptation: string;
};

export type TimelinePhase = {
  id: string; label: string; duration: string; icon: string;
};

export const PLANETS: PlanetData[] = [
  { id: "mercury", name: "Mercury", distanceAU: 0.61, distanceKm: 91700000, gravity: 0.38, gravityUnit: "g", temperatureMin: "-180°C", temperatureMax: "430°C", atmosphere: "Almost none", dayLength: "58.6 Earth days", escapeVelocity: "4.25 km/s", terrain: "Craters, cliffs, plains", weather: "Extreme温差, solar wind", radiation: "Extreme", wind: "Solar wind only", color: "#A0522D", image: "/images/Inner Solar System Background (Mercury & Venus).png", description: "The smallest planet and closest to the Sun. A world of extreme temperatures." },
  { id: "venus", name: "Venus", distanceAU: 0.28, distanceKm: 41400000, gravity: 0.91, gravityUnit: "g", temperatureMin: "462°C", temperatureMax: "462°C", atmosphere: "96% CO₂, 90 atm", dayLength: "243 Earth days", escapeVelocity: "10.36 km/s", terrain: "Volcanic plains, mountains", weather: "Sulfuric acid clouds, 370 km/h winds", radiation: "Low (thick atmosphere)", wind: "370 km/h", color: "#E8A317", image: "/images/Inner Solar System Background (Mercury & Venus).png", description: "Earth's twin shrouded in thick toxic clouds. A runaway greenhouse world." },
  { id: "moon", name: "The Moon", distanceAU: 0.0026, distanceKm: 384400, gravity: 0.16, gravityUnit: "g", temperatureMin: "-173°C", temperatureMax: "127°C", atmosphere: "None (exosphere)", dayLength: "27.3 Earth days", escapeVelocity: "2.38 km/s", terrain: "Regolith, craters, maria", weather: "No weather, solar radiation", radiation: "High", wind: "None", color: "#C0C0C0", image: "/images/Moon Surface Background.png", description: "Earth's closest celestial neighbor. Humanity's first step beyond our world." },
  { id: "mars", name: "Mars", distanceAU: 0.52, distanceKm: 78300000, gravity: 0.38, gravityUnit: "g", temperatureMin: "-87°C", temperatureMax: "-5°C", atmosphere: "95% CO₂, 0.006 atm", dayLength: "24.6 hours", escapeVelocity: "5.03 km/s", terrain: "Volcanoes, canyons, polar ice", weather: "Dust storms, -60°C average", radiation: "High", wind: "100 km/h (storm)", color: "#E07040", image: "/images/Mars Surface Background.png", description: "The Red Planet. Our next frontier for human colonization." },
  { id: "jupiter", name: "Jupiter", distanceAU: 4.2, distanceKm: 628000000, gravity: 2.53, gravityUnit: "g", temperatureMin: "-145°C", temperatureMax: "-108°C", atmosphere: "90% H₂, 10% He", dayLength: "9.9 hours", escapeVelocity: "59.5 km/s", terrain: "Gas giant (no solid surface)", weather: "Great Red Spot, massive storms", radiation: "Extreme", wind: "620 km/h", color: "#D4A574", image: "/images/Jupiter Orbit Background.png", description: "The largest planet. A gas giant with a 400-year-old storm." },
  { id: "saturn", name: "Saturn", distanceAU: 8.5, distanceKm: 1280000000, gravity: 1.07, gravityUnit: "g", temperatureMin: "-178°C", temperatureMax: "-139°C", atmosphere: "96% H₂, 3% He", dayLength: "10.7 hours", escapeVelocity: "35.5 km/s", terrain: "Gas giant (no solid surface)", weather: "Ammonia clouds, 1,800 km/h winds", radiation: "Moderate", wind: "1,800 km/h", color: "#E8D5A3", image: "/images/Saturn Rings Background.png", description: "The ringed jewel of the solar system. A world of breathtaking beauty." },
  { id: "uranus", name: "Uranus", distanceAU: 18.2, distanceKm: 2720000000, gravity: 0.89, gravityUnit: "g", temperatureMin: "-224°C", temperatureMax: "-197°C", atmosphere: "83% H₂, 15% He, 2% CH₄", dayLength: "17.2 hours", escapeVelocity: "21.3 km/s", terrain: "Ice giant (no solid surface)", weather: "Extreme axial tilt, seasonal", radiation: "Low", wind: "900 km/h", color: "#7EC8E3", image: "/images/Uranus & Neptune Background.png", description: "The tilted ice giant. Rolls on its side as it orbits the Sun." },
  { id: "neptune", name: "Neptune", distanceAU: 29.1, distanceKm: 4350000000, gravity: 1.14, gravityUnit: "g", temperatureMin: "-218°C", temperatureMax: "-200°C", atmosphere: "80% H₂, 19% He, 1% CH₄", dayLength: "16.1 hours", escapeVelocity: "23.5 km/s", terrain: "Ice giant (no solid surface)", weather: "Fastest winds, 2,100 km/h", radiation: "Low", wind: "2,100 km/h", color: "#3355FF", image: "/images/Uranus & Neptune Background.png", description: "The windiest planet. Deep blue and racing at supersonic speeds." },
  { id: "pluto", name: "Pluto", distanceAU: 39.5, distanceKm: 5910000000, gravity: 0.06, gravityUnit: "g", temperatureMin: "-233°C", temperatureMax: "-223°C", atmosphere: "Thin N₂, CH₄, CO", dayLength: "6.4 Earth days", escapeVelocity: "1.21 km/s", terrain: "Ice plains, mountains, glaciers", weather: "Frozen, extreme cold", radiation: "Low", wind: "Faint", color: "#CD853F", image: "/images/Kuiper Belt  Pluto Background.png", description: "The dwarf planet at the edge. A heart-shaped world of frozen mystery." },
];

export const MISSION_TYPES: MissionType[] = [
  { id: "exploration", label: "Exploration Mission", icon: "🔭", description: "Discover new terrain, map the surface, and conduct surveys.", difficulty: 4, durationMultiplier: 1.5, costMultiplier: 1.3 },
  { id: "research", label: "Research Expedition", icon: "🔬", description: "Perform scientific experiments and collect valuable data.", difficulty: 3, durationMultiplier: 2.0, costMultiplier: 1.5 },
  { id: "photography", label: "Photography Tour", icon: "📷", description: "Capture stunning cosmic vistas and celestial phenomena.", difficulty: 2, durationMultiplier: 0.8, costMultiplier: 0.9 },
  { id: "luxury", label: "Luxury Vacation", icon: "✨", description: "Experience premium off-world comfort and zero-G relaxation.", difficulty: 1, durationMultiplier: 0.6, costMultiplier: 2.0 },
  { id: "colony", label: "Colony Support Mission", icon: "🏗️", description: "Deliver supplies and infrastructure for a new settlement.", difficulty: 5, durationMultiplier: 1.8, costMultiplier: 1.8 },
  { id: "moon", label: "Moon Expedition", icon: "🌙", description: "A focused mission to Earth's moon for research or tourism.", difficulty: 2, durationMultiplier: 0.5, costMultiplier: 0.7 },
];

export const CREW_CONFIGS: CrewConfig[] = [
  { id: "solo", label: "Solo", icon: "🧑‍🚀", minCrew: 1, maxCrew: 1, description: "A solo mission. Maximum risk, maximum glory." },
  { id: "couple", label: "Couple", icon: "💑", minCrew: 2, maxCrew: 2, description: "Share the experience with a partner." },
  { id: "family", label: "Family", icon: "👨‍👩‍👧‍👦", minCrew: 3, maxCrew: 5, description: "A family adventure across the stars." },
  { id: "team", label: "Team (4–10)", icon: "👥", minCrew: 4, maxCrew: 10, description: "A coordinated team mission with specialized roles." },
  { id: "research", label: "Research Crew", icon: "🎓", minCrew: 6, maxCrew: 15, description: "Scientists and engineers for extended research operations." },
];

export const SPACECRAFT: Spacecraft[] = [
  { id: "dragon-x", name: "Dragon-X", maxSpeed: 15, maxSpeedLabel: "15 km/s", fuelCapacity: "120,000 kg", passengerCapacity: 7, artificialGravity: false, safetyRating: 4.5, rangeAU: 2.5, description: "Reliable chemical rocket. Best for inner system missions.", color: "#4B7BE5", icon: "🚀", efficiency: 0.6 },
  { id: "nova-cruiser", name: "Nova Cruiser", maxSpeed: 35, maxSpeedLabel: "35 km/s", fuelCapacity: "450,000 kg", passengerCapacity: 12, artificialGravity: true, safetyRating: 4.8, rangeAU: 10, description: "Nuclear thermal powered. Perfect for missions to the outer planets.", color: "#E07040", icon: "🛸", efficiency: 0.75 },
  { id: "ion-glider", name: "Ion Glider", maxSpeed: 50, maxSpeedLabel: "50 km/s", fuelCapacity: "80,000 kg", passengerCapacity: 4, artificialGravity: false, safetyRating: 4.2, rangeAU: 5, description: "Ion propulsion. Slow acceleration but incredible efficiency.", color: "#7EC8E3", icon: "✈️", efficiency: 0.9 },
  { id: "fusion-star", name: "Fusion Star", maxSpeed: 120, maxSpeedLabel: "120 km/s", fuelCapacity: "300,000 kg", passengerCapacity: 20, artificialGravity: true, safetyRating: 4.9, rangeAU: 50, description: "Fusion-powered. The premier choice for deep space exploration.", color: "#E8D5A3", icon: "⭐", efficiency: 0.85 },
  { id: "light-sail", name: "LightSail Pro", maxSpeed: 200, maxSpeedLabel: "200 km/s", fuelCapacity: "5,000 kg", passengerCapacity: 3, artificialGravity: false, safetyRating: 3.8, rangeAU: 40, description: "Solar sail. No fuel needed but limited payload and crew.", color: "#E8A317", icon: "⛵", efficiency: 1.0 },
  { id: "warp-sim", name: "Warp-Sim X1", maxSpeed: 500, maxSpeedLabel: "500 km/s", fuelCapacity: "1,000,000 kg", passengerCapacity: 50, artificialGravity: true, safetyRating: 3.5, rangeAU: 100, description: "Experimental warp simulation. Fastest option with highest risk.", color: "#3355FF", icon: "🌀", efficiency: 0.4 },
];

export const EQUIPMENT_LIST: EquipmentItem[] = [
  { id: "suit", label: "Space Suit", mandatory: true },
  { id: "oxygen", label: "Oxygen Tanks", mandatory: true },
  { id: "medical", label: "Medical Kit", mandatory: true },
  { id: "rover", label: "Rover", mandatory: false },
  { id: "scientific", label: "Scientific Equipment", mandatory: false },
  { id: "food", label: "Food Supplies", mandatory: true },
  { id: "water", label: "Water", mandatory: true },
  { id: "comms", label: "Communication System", mandatory: true },
  { id: "shelter", label: "Emergency Shelter", mandatory: false },
  { id: "nav", label: "Navigation Computer", mandatory: true },
];

export const TIMELINE_PHASES: TimelinePhase[] = [
  { id: "planning", label: "Mission Planning", duration: "60 days", icon: "📋" },
  { id: "launch", label: "Launch", duration: "24 hours", icon: "🚀" },
  { id: "orbit", label: "Earth Orbit", duration: "2 days", icon: "🌍" },
  { id: "cruise", label: "Cruise Phase", duration: "Varies", icon: "✨" },
  { id: "arrival", label: "Destination Arrival", duration: "48 hours", icon: "🎯" },
  { id: "landing", label: "Landing", duration: "12 hours", icon: "🪂" },
  { id: "exploration", label: "Exploration", duration: "Varies", icon: "🔍" },
  { id: "return", label: "Return Journey", duration: "Varies", icon: "🏠" },
];

export const STEPS = [
  "Select Destination", "Mission Type", "Crew Configuration", "Select Spacecraft",
  "Mission Calculator", "AI Recommendation", "Equipment Checklist",
  "Mission Timeline", "Environmental Info", "Readiness Score", "Final Summary"
];

const OXYGEN_PER_PERSON_PER_DAY = 0.84;
const FOOD_PER_PERSON_PER_DAY = 1.8;
const WATER_PER_PERSON_PER_DAY = 3.5;
const CARGO_BASE = 500;

export function calculateMission(
  dest: PlanetData, ship: Spacecraft, crew: CrewConfig, mission: MissionType
): MissionCalculations {
  const crewCount = crew.id === "solo" ? 1 : crew.id === "couple" ? 2 : crew.id === "family" ? 4 : crew.id === "team" ? 7 : 10;
  const speedKmPerDay = ship.maxSpeed * 86400;
  const travelTimeDays = Math.round((dest.distanceKm / speedKmPerDay) * mission.durationMultiplier);
  const fuelRequired = Math.round((dest.distanceKm / 1000000) * (1 / ship.efficiency) * mission.costMultiplier);
  const energyConsumption = Math.round(fuelRequired * 3.2);
  const oxygenRequired = Math.round(crewCount * travelTimeDays * OXYGEN_PER_PERSON_PER_DAY);
  const foodRequired = Math.round(crewCount * travelTimeDays * FOOD_PER_PERSON_PER_DAY);
  const waterRequired = Math.round(crewCount * travelTimeDays * WATER_PER_PERSON_PER_DAY);
  const cargoWeight = Math.round(CARGO_BASE + crewCount * 50 + oxygenRequired + foodRequired + waterRequired);
  const communicationDelay = Math.round((dest.distanceKm / 299792) / 60);
  const diffScore = dest.distanceAU * mission.difficulty * (1 / (ship.safetyRating / 5));
  const difficulty = diffScore < 5 ? "Low" : diffScore < 15 ? "Medium" : diffScore < 30 ? "High" : "Extreme";
  const costPerKm = ship.id.includes("warp") ? 0.5 : ship.id.includes("fusion") ? 0.8 : ship.id.includes("nova") ? 1.2 : ship.id.includes("ion") ? 0.6 : 1.5;
  const estimatedCost = Math.round(dest.distanceKm / 1000 * costPerKm * mission.costMultiplier * (crewCount / 2));

  return {
    distanceAU: dest.distanceAU, distanceKm: dest.distanceKm,
    travelTimeDays: Math.max(travelTimeDays, 1), fuelRequired, energyConsumption,
    crewCount, oxygenRequired, foodRequired, waterRequired, cargoWeight,
    communicationDelay, missionDifficulty: difficulty, estimatedCost,
  };
}

export function generateAIRecommendation(
  dest: PlanetData, mission: MissionType, calc: MissionCalculations
): AIRecommendation {
  const bestShip = calc.distanceAU > 20 ? "Fusion Star" : calc.distanceAU > 5 ? "Nova Cruiser" : "Dragon-X";
  const launchWindow = dest.id === "mars" ? "Every 26 months (opposition)" : dest.id === "venus" ? "Every 19 months" : dest.id === "mercury" ? "Every 4 months" : "Optimal within 3 months";
  const habitatMap: Record<string, string> = {
    mercury: "Sol-Station Prime", venus: "Ishtar Aerostat Lounge", moon: "Artemis Regolith Villas",
    mars: "Olympus Dome Estates", jupiter: "Amalthea Transit Hub", saturn: "Cassini Rings Habitat",
    uranus: "Titania Ice Outpost", neptune: "Triton Thermal Spires", pluto: "Charon Horizon Lodge",
  };
  const risks = [];
  if (dest.radiation === "Extreme" || dest.radiation === "High") risks.push("High radiation exposure");
  if (calc.travelTimeDays > 365) risks.push("Prolonged microgravity effects");
  if (dest.gravity < 0.2) risks.push("Severe muscle atrophy risk");
  if (dest.atmosphere.includes("CO₂") || dest.atmosphere.includes("None")) risks.push("No breathable atmosphere");
  risks.push("Equipment failure probability", "Communication delays");

  const training = [];
  if (dest.gravity < 0.3) training.push("Low-G Mobility Training");
  if (calc.travelTimeDays > 100) training.push("Long-Duration Isolation Training");
  if (dest.radiation !== "Low") training.push("Radiation Safety Protocols");
  training.push("EVA Operations", "Emergency Procedures");

  return {
    bestSpacecraft: bestShip, launchWindow, recommendedHabitat: habitatMap[dest.id] || "The Stratosphere Expanse",
    crewSize: `${calc.crewCount} members`, requiredTraining: training,
    suggestedEquipment: ["Advanced EVA Suit", "Radiation Shielding", "Scientific Payload Kit", "Emergency Supply Pack"],
    possibleRisks: risks.slice(0, 5), radiationLevel: dest.radiation, gravityAdaptation: dest.gravity < 0.3 ? "Difficult" : dest.gravity > 1.5 ? "Very Difficult" : "Moderate",
  };
}

export function calculateReadiness(
  calc: MissionCalculations, ai: AIRecommendation | null, equipmentChecked: number, totalEquipment: number
): ReadinessScore {
  const baseSuccess = 70;
  const diffPenalty = calc.missionDifficulty === "Extreme" ? 25 : calc.missionDifficulty === "High" ? 15 : calc.missionDifficulty === "Medium" ? 8 : 3;
  const distPenalty = Math.min(20, Math.round(calc.distanceAU * 0.5));
  const missionSuccess = Math.max(20, Math.min(99, baseSuccess - diffPenalty - distPenalty + 10));
  const missionRisk = Math.min(95, 20 + diffPenalty + distPenalty);
  const crewReadiness = Math.min(99, 70 - (calc.travelTimeDays > 365 ? 15 : 0) - (calc.missionDifficulty === "Extreme" ? 10 : 0));
  const equipRatio = equipmentChecked / totalEquipment;
  const equipmentReadiness = Math.round(equipRatio * 95);
  const overall = Math.round((missionSuccess + (100 - missionRisk) + crewReadiness + equipmentReadiness) / 4);
  return { missionSuccess, missionRisk, crewReadiness, equipmentReadiness, overall };
}
