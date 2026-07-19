"use client";

import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

type PlanetData = {
  node_id: string; name: string; color: string;
  distance: number; radius: number; orbitSpeed: number; rotationSpeed: number;
  tilt: number; hasRings: boolean; moons?: string[];
  gravity: number; temperature: number; duration: number; difficulty: number;
  safety: number; description: string;
  initialAngle: number;
};

const PLANET_DATA: PlanetData[] = [
  { node_id: "mercury", name: "Mercury", color: "#A0522D", distance: 6, radius: 0.35, orbitSpeed: 0.025, rotationSpeed: 0.004, tilt: 0.03, hasRings: false, gravity: 3.7, temperature: 340, duration: 142, difficulty: 5, safety: 94.2, description: "The innermost planet, a world of extreme thermal contrasts.", initialAngle: Math.random() * Math.PI * 2 },
  { node_id: "venus",   name: "Venus",   color: "#E8A317", distance: 9, radius: 0.55, orbitSpeed: 0.018, rotationSpeed: 0.002, tilt: 2.64, hasRings: false, gravity: 8.87, temperature: 737, duration: 61, difficulty: 5, safety: 91.0, description: "Earth's twin, shrouded in a thick carbon dioxide atmosphere.", initialAngle: Math.random() * Math.PI * 2 },
  { node_id: "earth",   name: "Earth",   color: "#4B7BE5", distance: 12, radius: 0.58, orbitSpeed: 0.015, rotationSpeed: 0.012, tilt: 0.41, hasRings: false, moons: ["Moon"], gravity: 9.81, temperature: 288, duration: 0, difficulty: 1, safety: 99.9, description: "The cradle of humanity, departure hub for all interplanetary voyages.", initialAngle: Math.random() * Math.PI * 2 },
  { node_id: "mars",    name: "Mars",    color: "#E07040", distance: 15, radius: 0.45, orbitSpeed: 0.012, rotationSpeed: 0.01, tilt: 0.44, hasRings: false, moons: ["Phobos", "Deimos"], gravity: 3.71, temperature: 210, duration: 180, difficulty: 3, safety: 97.8, description: "The Red Planet, humanity's first interplanetary colony destination.", initialAngle: Math.random() * Math.PI * 2 },
  { node_id: "jupiter", name: "Jupiter", color: "#D4A574", distance: 22, radius: 1.6, orbitSpeed: 0.006, rotationSpeed: 0.025, tilt: 0.05, hasRings: false, moons: ["Io", "Europa", "Ganymede", "Callisto"], gravity: 24.79, temperature: 130, duration: 640, difficulty: 4, safety: 95.0, description: "The largest planet in the Solar System, a gas giant with mesmerizing banded atmosphere.", initialAngle: Math.random() * Math.PI * 2 },
  { node_id: "saturn",  name: "Saturn",  color: "#E8D5A3", distance: 32, radius: 1.35, orbitSpeed: 0.0045, rotationSpeed: 0.02, tilt: 0.47, hasRings: true, moons: ["Titan", "Enceladus", "Rhea", "Mimas"], gravity: 10.44, temperature: 95, duration: 1168, difficulty: 4, safety: 96.1, description: "The ringed giant, a celestial masterpiece of complex ring systems.", initialAngle: Math.random() * Math.PI * 2 },
  { node_id: "uranus",  name: "Uranus",  color: "#7EC8E3", distance: 42, radius: 0.95, orbitSpeed: 0.003, rotationSpeed: 0.018, tilt: 1.71, hasRings: true, moons: ["Miranda", "Ariel", "Umbriel", "Titania", "Oberon"], gravity: 8.69, temperature: 55, duration: 2738, difficulty: 5, safety: 92.5, description: "An ice giant with a pale blue-green hue and extreme axial tilt.", initialAngle: Math.random() * Math.PI * 2 },
  { node_id: "neptune", name: "Neptune", color: "#3355FF", distance: 52, radius: 0.9, orbitSpeed: 0.002, rotationSpeed: 0.022, tilt: 0.49, hasRings: false, moons: ["Triton"], gravity: 11.15, temperature: 50, duration: 4417, difficulty: 5, safety: 91.8, description: "The farthest planet, a dark cold wind-whipped world with supersonic winds.", initialAngle: Math.random() * Math.PI * 2 },
  { node_id: "pluto",   name: "Pluto",   color: "#CD853F", distance: 60, radius: 0.25, orbitSpeed: 0.0015, rotationSpeed: 0.003, tilt: 2.16, hasRings: false, moons: ["Charon"], gravity: 0.62, temperature: 44, duration: 3468, difficulty: 5, safety: 89.9, description: "The iconic dwarf planet at the edge of the Kuiper Belt.", initialAngle: Math.random() * Math.PI * 2 },
];

type MoonData = {
  id: string; name: string; parentPlanet: string;
  diameter_km: number; distance_from_planet_km: number;
  orbital_period_days: number; surface_temp_k: number;
  gravity_m_s2: number; discovery: string; fact: string;
  tourism_description: string; activities: string[];
  difficulty_level: number; safety_rating: number;
  image: string;
};

const MOON_DATA: MoonData[] = [
  { id: "luna", name: "Luna", parentPlanet: "earth", diameter_km: 3474, distance_from_planet_km: 384400, orbital_period_days: 27.3, surface_temp_k: 220, gravity_m_s2: 1.62, discovery: "Prehistoric", fact: "The only celestial body beyond Earth visited by humans.", tourism_description: "Walk on ancient regolith, witness Earth-rise from the Sea of Tranquility, and explore historic Apollo landing sites.", activities: ["Low-Gravity Hiking", "Earth-Rise Meditation", "Apollo Site Tours", "Crater Exploration"], difficulty_level: 2, safety_rating: 99.5, image: "/images/moon.png" },
  { id: "phobos", name: "Phobos", parentPlanet: "mars", diameter_km: 22, distance_from_planet_km: 9376, orbital_period_days: 0.32, surface_temp_k: 233, gravity_m_s2: 0.0057, discovery: "1877 by Asaph Hall", fact: "Doomed to eventually crash into Mars in ~50 million years.", tourism_description: "Experience the closest moon to any planet in the solar system, completing an orbit every 8 hours.", activities: ["Zero-Gravity Jumping", "Mars Surface Photography", "Rapid Orbit Tours", "Stargazing"], difficulty_level: 3, safety_rating: 97.5, image: "/images/mars moons.png" },
  { id: "deimos", name: "Deimos", parentPlanet: "mars", diameter_km: 12, distance_from_planet_km: 23464, orbital_period_days: 1.26, surface_temp_k: 233, gravity_m_s2: 0.003, discovery: "1877 by Asaph Hall", fact: "Gradually drifting away from Mars and will eventually escape.", tourism_description: "Explore this small potato-shaped moon with the lowest gravity in the inner solar system.", activities: ["Asteroid Hopping", "Deep Space Observation", "Low-G Exploration", "Photography"], difficulty_level: 3, safety_rating: 98.0, image: "/images/mars moons.png" },
  { id: "io", name: "Io", parentPlanet: "jupiter", diameter_km: 3643, distance_from_planet_km: 421800, orbital_period_days: 1.77, surface_temp_k: 130, gravity_m_s2: 1.796, discovery: "1610 by Galileo Galilei", fact: "The most volcanically active body in the entire solar system.", tourism_description: "Witness spectacular volcanic eruptions against Jupiter's colossal backdrop from a shielded observation deck.", activities: ["Volcano Observation", "Sulfur Plain Trekking", "Jupiter Viewing", "Geological Surveys"], difficulty_level: 5, safety_rating: 88.0, image: "/images/jupiter moon.png" },
  { id: "europa", name: "Europa", parentPlanet: "jupiter", diameter_km: 3122, distance_from_planet_km: 671100, orbital_period_days: 3.55, surface_temp_k: 102, gravity_m_s2: 1.314, discovery: "1610 by Galileo Galilei", fact: "Believed to harbor a subsurface liquid ocean that may contain extraterrestrial life.", tourism_description: "Explore the icy surface with its intricate patterns of cracks and ridges above a hidden ocean.", activities: ["Ice Sheet Trekking", "Subsurface Ocean Research", "Crack Exploration", "Biosignature Surveys"], difficulty_level: 5, safety_rating: 85.0, image: "/images/jupiter moon.png" },
  { id: "ganymede", name: "Ganymede", parentPlanet: "jupiter", diameter_km: 5268, distance_from_planet_km: 1070400, orbital_period_days: 7.15, surface_temp_k: 110, gravity_m_s2: 1.428, discovery: "1610 by Galileo Galilei", fact: "The largest moon in the solar system, larger than the planet Mercury.", tourism_description: "Explore the only moon with its own magnetic field, featuring vast grooved terrains and ancient craters.", activities: ["Magnetic Field Research", "Crater Exploration", "Terrain Traversing", "Ice Mining"], difficulty_level: 4, safety_rating: 92.0, image: "/images/jupiter moon.png" },
  { id: "callisto", name: "Callisto", parentPlanet: "jupiter", diameter_km: 4821, distance_from_planet_km: 1882700, orbital_period_days: 16.69, surface_temp_k: 120, gravity_m_s2: 1.235, discovery: "1610 by Galileo Galilei", fact: "The most heavily cratered object in the solar system.", tourism_description: "The safest Jupiter moon for long-term habitation with a thick ice crust and minimal radiation.", activities: ["Crater Hiking", "Ice Mining Expeditions", "Long-Term Habitation", "Jupiter Observation"], difficulty_level: 4, safety_rating: 94.0, image: "/images/jupiter moon.png" },
  { id: "titan", name: "Titan", parentPlanet: "saturn", diameter_km: 5150, distance_from_planet_km: 1221870, orbital_period_days: 15.95, surface_temp_k: 94, gravity_m_s2: 1.352, discovery: "1655 by Christiaan Huygens", fact: "The only moon with a substantial atmosphere — thicker than Earth's.", tourism_description: "Fly through nitrogen-rich skies above liquid methane lakes and vast dune fields.", activities: ["Atmosphere Gliding", "Methane Lake Sailing", "Dune Field Exploration", "Aerial Tours"], difficulty_level: 5, safety_rating: 90.0, image: "/images/saturn moons.png" },
  { id: "enceladus", name: "Enceladus", parentPlanet: "saturn", diameter_km: 504, distance_from_planet_km: 238000, orbital_period_days: 1.37, surface_temp_k: 75, gravity_m_s2: 0.113, discovery: "1789 by William Herschel", fact: "Massive geysers of water ice erupt continuously from its south pole.", tourism_description: "Witness spectacular cryovolcanic plumes spraying icy particles into space.", activities: ["Geyser Observation", "Ice Cave Exploration", "Plume Photography", "Subsurface Access"], difficulty_level: 5, safety_rating: 88.0, image: "/images/saturn moons.png" },
  { id: "rhea", name: "Rhea", parentPlanet: "saturn", diameter_km: 1528, distance_from_planet_km: 527040, orbital_period_days: 4.52, surface_temp_k: 99, gravity_m_s2: 0.264, discovery: "1672 by Giovanni Cassini", fact: "May have its own faint ring system — the only moon known to have rings.", tourism_description: "Explore the pristine icy surface of Saturn's second-largest moon.", activities: ["Ring Observation", "Ice Field Traversing", "Crater Survey", "Saturn Viewing"], difficulty_level: 4, safety_rating: 93.0, image: "/images/saturn moons.png" },
  { id: "mimas", name: "Mimas", parentPlanet: "saturn", diameter_km: 396, distance_from_planet_km: 185520, orbital_period_days: 0.94, surface_temp_k: 64, gravity_m_s2: 0.064, discovery: "1789 by William Herschel", fact: "Its massive Herschel Crater makes it resemble the Death Star.", tourism_description: "Visit the iconic 140km-wide Herschel Crater that dominates the moon's surface.", activities: ["Crater Descent", "Low-Gravity Bouncing", "Impact Study", "Photography"], difficulty_level: 4, safety_rating: 94.0, image: "/images/saturn moons.png" },
  { id: "miranda", name: "Miranda", parentPlanet: "uranus", diameter_km: 472, distance_from_planet_km: 129900, orbital_period_days: 1.41, surface_temp_k: 60, gravity_m_s2: 0.079, discovery: "1948 by Gerard Kuiper", fact: "Features the tallest cliff in the solar system — Verona Rupes at 20km high.", tourism_description: "Witness Verona Rupes, a 20km cliff that would take 10 minutes to fall from.", activities: ["Cliff Rappelling", "Extreme Terrain Exploration", "Geological Survey", "Panoramic Viewing"], difficulty_level: 5, safety_rating: 87.0, image: "/images/uranus moon.png" },
  { id: "ariel", name: "Ariel", parentPlanet: "uranus", diameter_km: 1158, distance_from_planet_km: 190900, orbital_period_days: 2.52, surface_temp_k: 58, gravity_m_s2: 0.27, discovery: "1851 by William Lassell", fact: "Has the brightest and youngest surface of Uranus's major moons.", tourism_description: "Explore bright ice canyons, fault valleys, and recently resurfaced terrain.", activities: ["Canyon Hiking", "Ice Climbing", "Valley Exploration", "Surface Survey"], difficulty_level: 4, safety_rating: 91.0, image: "/images/uranus moon.png" },
  { id: "umbriel", name: "Umbriel", parentPlanet: "uranus", diameter_km: 1169, distance_from_planet_km: 266000, orbital_period_days: 4.14, surface_temp_k: 61, gravity_m_s2: 0.2, discovery: "1851 by William Lassell", fact: "The darkest of Uranus's major moons with a mysterious bright ring on its surface.", tourism_description: "Explore the enigmatic dark surface with ancient impact basins and craters.", activities: ["Dark Terrain Exploration", "Impact Basin Study", "Crater Survey", "Mystery Ring Investigation"], difficulty_level: 4, safety_rating: 92.0, image: "/images/uranus moon.png" },
  { id: "titania", name: "Titania", parentPlanet: "uranus", diameter_km: 1578, distance_from_planet_km: 436300, orbital_period_days: 8.70, surface_temp_k: 60, gravity_m_s2: 0.38, discovery: "1787 by William Herschel", fact: "The largest moon of Uranus with extensive canyon systems.", tourism_description: "Explore vast canyon networks, icy plains, and the largest Uranian moon landscape.", activities: ["Canyon Exploration", "Ice Plain Trekking", "Rift Valley Survey", "Uranus Observation"], difficulty_level: 4, safety_rating: 93.0, image: "/images/uranus moon.png" },
  { id: "oberon", name: "Oberon", parentPlanet: "uranus", diameter_km: 1523, distance_from_planet_km: 583500, orbital_period_days: 13.46, surface_temp_k: 61, gravity_m_s2: 0.35, discovery: "1787 by William Herschel", fact: "The outermost major moon of Uranus with dark-floored impact craters.", tourism_description: "Witness ancient dark-floored craters and icy peaks on the fringe of the Uranian system.", activities: ["Crater Exploration", "Polar Observation", "Dark Terrain Survey", "Outer Moon Photography"], difficulty_level: 4, safety_rating: 92.0, image: "/images/uranus moon.png" },
  { id: "triton", name: "Triton", parentPlanet: "neptune", diameter_km: 2707, distance_from_planet_km: 354759, orbital_period_days: 5.88, surface_temp_k: 38, gravity_m_s2: 0.779, discovery: "1846 by William Lassell", fact: "The only large moon with a retrograde orbit — it orbits Neptune backward.", tourism_description: "Witness frozen nitrogen geysers and the coldest known surface temperature in the solar system.", activities: ["Geyser Observation", "Retrograde Orbit Photography", "Ice Plain Exploration", "Neptune Viewing"], difficulty_level: 5, safety_rating: 86.0, image: "/images/neptune moon.png" },
  { id: "charon", name: "Charon", parentPlanet: "pluto", diameter_km: 1212, distance_from_planet_km: 19591, orbital_period_days: 6.39, surface_temp_k: 44, gravity_m_s2: 0.288, discovery: "1978 by James Christy", fact: "So large relative to Pluto that they form a binary dwarf planet system.", tourism_description: "Experience the unique binary system from Charon's surface with Pluto dominating the sky.", activities: ["Binary System Observation", "Surface Traverse", "Pluto Viewing", "Cryovolcano Survey"], difficulty_level: 5, safety_rating: 88.0, image: "/images/plotu moon.png" },
];

function createSunSurfaceTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024; canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  for (let y = 0; y < 512; y++) {
    for (let x = 0; x < 1024; x++) {
      const u = x / 1024, v = y / 512;

      const r = Math.sqrt((u - 0.5) ** 2 * 4 + (v - 0.5) ** 2 * 4);
      const limbDark = 1 - r * 0.25;

      const n1 = Math.sin(u * 80 + v * 60) * 0.5 + Math.sin(u * 150 - v * 90) * 0.3 + Math.sin((u + v) * 200) * 0.2;
      const n2 = Math.sin(u * 40 + v * 30 + 1.3) * 0.4 + Math.sin(v * 70 - u * 50) * 0.3;
      const n3 = Math.sin(u * 20 + v * 25) * 0.3 + Math.cos((u - v) * 35) * 0.2;
      const pattern = (n1 + n2 + n3) / 3;

      const brightSpots = (Math.sin(u * 12 + 1.7) * 0.5 + 0.5) * (Math.sin(v * 8 + 3.2) * 0.5 + 0.5);
      const spotNoise = Math.sin(u * 6 + v * 10 + pattern * 2) * 0.5 + 0.5;
      const faculae = Math.max(0, brightSpots * spotNoise * 0.15);

      const sunspotA = Math.exp(-((u - 0.3) ** 2 + (v - 0.6) ** 2) * 300) * 0.3;
      const sunspotB = Math.exp(-((u - 0.7) ** 2 + (v - 0.35) ** 2) * 500) * 0.2;

      const base = limbDark * (1 + faculae) * (1 - sunspotA - sunspotB) * (0.85 + pattern * 0.15);

      const val = Math.max(0, Math.min(1, base));

      const grad = v < 0.08 ? v / 0.08 : v > 0.92 ? (1 - v) / 0.08 : 1;
      const rC = Math.pow(val, 0.8) * (255 - 200 * (1 - grad) * 0.3) | 0;
      const gC = Math.pow(val * 0.85, 0.9) * (220 - 180 * (1 - grad) * 0.4) | 0;
      const bC = Math.pow(val * 0.5, 1.2) * (120 - 100 * (1 - grad) * 0.5) | 0;

      ctx.fillStyle = `rgb(${rC},${gC},${bC})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.needsUpdate = true;
  return tex;
}

function createCoronaTexture(colorKey: "inner" | "outer" | "streamer"): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512; canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  if (colorKey === "inner") {
    const g = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    g.addColorStop(0, "rgba(255,200,80,0.7)");
    g.addColorStop(0.1, "rgba(255,180,60,0.5)");
    g.addColorStop(0.3, "rgba(255,140,40,0.2)");
    g.addColorStop(0.6, "rgba(200,100,20,0.05)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
  } else if (colorKey === "outer") {
    const g = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    g.addColorStop(0, "rgba(255,180,100,0.15)");
    g.addColorStop(0.2, "rgba(255,120,40,0.08)");
    g.addColorStop(0.5, "rgba(200,80,20,0.03)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
  } else {
    const g = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    g.addColorStop(0, "rgba(255,220,160,0.25)");
    g.addColorStop(0.15, "rgba(255,160,80,0.12)");
    g.addColorStop(0.4, "rgba(200,100,40,0.04)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
  }

  ctx.fillRect(0, 0, 512, 512);

  if (colorKey === "streamer") {
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + Math.random() * 0.3;
      const len = 150 + Math.random() * 200;
      const width = 10 + Math.random() * 30;
      const x1 = 256 + Math.cos(angle) * 80;
      const y1 = 256 + Math.sin(angle) * 80;
      const x2 = 256 + Math.cos(angle) * len;
      const y2 = 256 + Math.sin(angle) * len;
      const g2 = ctx.createRadialGradient((x1 + x2) / 2, (y1 + y2) / 2, 0, (x1 + x2) / 2, (y1 + y2) / 2, len / 2);
      g2.addColorStop(0, "rgba(255,200,120,0.06)");
      g2.addColorStop(1, "rgba(255,100,40,0)");
      ctx.fillStyle = g2;
      ctx.translate(x1, y1);
      ctx.rotate(angle);
      ctx.fillRect(-width / 2, 0, width, len);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function createFlareTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 64; canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,220,120,1)");
  g.addColorStop(0.1, "rgba(255,180,80,0.8)");
  g.addColorStop(0.3, "rgba(255,120,40,0.4)");
  g.addColorStop(0.6, "rgba(200,60,20,0.1)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerCoronaRef = useRef<THREE.Sprite>(null);
  const outerCoronaRef = useRef<THREE.Sprite>(null);
  const streamerRef = useRef<THREE.Sprite>(null);
  const flaresRef = useRef<THREE.Points>(null);

  const sunTex = useMemo(() => createSunSurfaceTexture(), []);
  const innerCoronaTex = useMemo(() => createCoronaTexture("inner"), []);
  const outerCoronaTex = useMemo(() => createCoronaTexture("outer"), []);
  const streamerTex = useMemo(() => createCoronaTexture("streamer"), []);
  const flareTex = useMemo(() => createFlareTexture(), []);

  const flareCount = 60;
  const flareData = useMemo(() => {
    const pos = new Float32Array(flareCount * 3);
    const sizes = new Float32Array(flareCount);
    const progress = new Float32Array(flareCount);
    const speeds = new Float32Array(flareCount);
    const angles = new Float32Array(flareCount * 2);
    for (let i = 0; i < flareCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      angles[i * 2] = theta;
      angles[i * 2 + 1] = phi;
      pos[i * 3] = Math.sin(phi) * Math.cos(theta) * 2.2;
      pos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * 2.2;
      pos[i * 3 + 2] = Math.cos(phi) * 2.2;
      sizes[i] = 0.3 + Math.random() * 0.6;
      progress[i] = Math.random();
      speeds[i] = 0.2 + Math.random() * 0.5;
    }
    return { pos, sizes, progress, speeds, angles };
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 0.35) * 0.008;
      meshRef.current.scale.setScalar(pulse);
    }
    if (innerCoronaRef.current) {
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 0.4) * 0.04;
      const rotate = clock.getElapsedTime() * 0.005;
      innerCoronaRef.current.scale.setScalar(7 * pulse);
      innerCoronaRef.current.material.rotation = rotate;
    }
    if (outerCoronaRef.current) {
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 0.3 + 1) * 0.05;
      const rotate = clock.getElapsedTime() * 0.003;
      outerCoronaRef.current.scale.setScalar(14 * pulse);
      outerCoronaRef.current.material.rotation = rotate;
    }
    if (streamerRef.current) {
      const rotate = clock.getElapsedTime() * 0.002;
      streamerRef.current.scale.setScalar(9);
      streamerRef.current.material.rotation = rotate;
      streamerRef.current.material.opacity = 0.7 + Math.sin(clock.getElapsedTime() * 0.15) * 0.15;
    }

    if (flaresRef.current) {
      const pos = flaresRef.current.geometry.attributes.position.array as Float32Array;
      const sizes = flaresRef.current.geometry.attributes.size.array as Float32Array;
      for (let i = 0; i < flareCount; i++) {
        const theta = flareData.angles[i * 2] + clock.getElapsedTime() * 0.002;
        const phi = flareData.angles[i * 2 + 1];
        let p = flareData.progress[i] + 0.002 * flareData.speeds[i];
        if (p > 1) {
          p = 0;
          flareData.angles[i * 2] = Math.random() * Math.PI * 2;
          flareData.angles[i * 2 + 1] = Math.acos(2 * Math.random() - 1);
        }
        flareData.progress[i] = p;
        const dist = 2.2 + p * 5;
        const theta2 = flareData.angles[i * 2] + clock.getElapsedTime() * 0.002;
        const phi2 = flareData.angles[i * 2 + 1];
        pos[i * 3] = Math.sin(phi2) * Math.cos(theta2) * dist;
        pos[i * 3 + 1] = Math.sin(phi2) * Math.sin(theta2) * (dist * 0.6);
        pos[i * 3 + 2] = Math.cos(phi2) * dist;
        sizes[i] = (0.3 + Math.random() * 0.2) * (1 - p * 0.8);
      }
      flaresRef.current.geometry.attributes.position.needsUpdate = true;
      flaresRef.current.geometry.attributes.size.needsUpdate = true;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshBasicMaterial map={sunTex} />
      </mesh>

      <sprite ref={innerCoronaRef} scale={[7, 7, 1]}>
        <spriteMaterial map={innerCoronaTex} blending={THREE.AdditiveBlending} transparent opacity={0.5} depthWrite={false} />
      </sprite>

      <sprite ref={outerCoronaRef} scale={[14, 14, 1]}>
        <spriteMaterial map={outerCoronaTex} blending={THREE.AdditiveBlending} transparent opacity={0.3} depthWrite={false} />
      </sprite>

      <sprite ref={streamerRef} scale={[9, 9, 1]}>
        <spriteMaterial map={streamerTex} blending={THREE.AdditiveBlending} transparent opacity={0.7} depthWrite={false} />
      </sprite>

      <points ref={flaresRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={flareCount} array={flareData.pos} itemSize={3} />
          <bufferAttribute attach="attributes-size" count={flareCount} array={flareData.sizes} itemSize={1} />
        </bufferGeometry>
        <pointsMaterial
          size={0.5}
          map={flareTex}
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
          opacity={0.9}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

function GalaxyBackground() {
  const starCount = 5000;
  const positions = useMemo(() => {
    const pos = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    const colors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 80 + Math.random() * 250;
      pos[i*3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta) * 0.35;
      pos[i*3+2] = r * Math.cos(phi);
      sizes[i] = 0.3 + Math.random() * 2.5;
      const b = 0.3 + Math.random() * 0.7;
      colors[i*3] = b;
      colors[i*3+1] = b;
      colors[i*3+2] = b * (0.6 + Math.random() * 0.4);
    }
    return { pos, sizes, colors };
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.00025;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.00008) * 0.015;
    }
  });

  const starTexture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 32; c.height = 32;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.08, "rgba(255,255,255,0.8)");
    g.addColorStop(0.4, "rgba(200,220,255,0.15)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 32, 32);
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={starCount} array={positions.pos} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={starCount} array={positions.sizes} itemSize={1} />
        <bufferAttribute attach="attributes-color" count={starCount} array={positions.colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.7}
        map={starTexture}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        transparent
        opacity={0.95}
        vertexColors
        sizeAttenuation
      />
    </points>
  );
}

function NebulaBackground() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.getElapsedTime() * 0.0001;
  });

  const nebulaTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512; c.height = 512;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    g.addColorStop(0, "rgba(80,40,160,0.1)");
    g.addColorStop(0.3, "rgba(40,20,80,0.05)");
    g.addColorStop(0.6, "rgba(20,10,60,0.02)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 30; i++) {
      const x = 80 + Math.random() * 352;
      const y = 80 + Math.random() * 352;
      const r = 20 + Math.random() * 140;
      const g2 = ctx.createRadialGradient(x, y, 0, x, y, r);
      const hue = 200 + Math.random() * 160;
      g2.addColorStop(0, `hsla(${hue},70%,50%,0.035)`);
      g2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);

  const nebulae = useMemo(() => [
    { pos: [-70, 25, -90], scale: 100, rot: 0.3 },
    { pos: [90, -20, -70], scale: 120, rot: 1.2 },
    { pos: [-50, -35, -120], scale: 80, rot: 2.1 },
    { pos: [80, 30, -110], scale: 100, rot: 0.8 },
    { pos: [-100, 10, -60], scale: 70, rot: 1.6 },
  ], []);

  return (
    <group ref={groupRef}>
      {nebulae.map((n, i) => (
        <sprite key={i} position={n.pos as [number, number, number]} scale={n.scale}>
          <spriteMaterial map={nebulaTex} blending={THREE.AdditiveBlending} transparent opacity={0.4} depthWrite={false} rotation={n.rot} />
        </sprite>
      ))}
    </group>
  );
}

function loadPlanetTexture(nodeId: string): THREE.Texture {
  const imgPath = `/images/${nodeId === "pluto" ? "plotu" : nodeId}.png`;
  const loader = new THREE.TextureLoader();
  const tex = loader.load(imgPath, undefined, undefined, () => {
    console.warn(`[NovaX] Failed to load ${imgPath}, using procedural`);
    const fallback = getPlanetTexture(nodeId);
    Object.assign(tex, fallback);
    tex.needsUpdate = true;
  });
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createPlanetTexture(nodeId: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024; canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  const configs: Record<string, {
    base: [number,number,number]; bandColor?: [number,number,number]; bandCount?: number;
    spotColor?: [number,number,number]; spotPos?: [number,number]; spotSize?: number;
    noiseScale?: number; craters?: number;
  }> = {
    mercury: { base: [160, 82, 45], noiseScale: 70, craters: 60 },
    venus:   { base: [232, 163, 23], bandColor: [200, 140, 30], bandCount: 10, noiseScale: 40 },
    earth:   { base: [75, 123, 229], bandColor: [100, 160, 100], bandCount: 4, noiseScale: 50 },
    mars:    { base: [224, 112, 64], noiseScale: 60, craters: 50 },
    jupiter: { base: [212, 165, 116], bandColor: [180, 130, 80], bandCount: 24, spotColor: [210, 90, 50], spotPos: [0.65, 0.55], spotSize: 0.12, noiseScale: 20 },
    saturn:  { base: [232, 213, 163], bandColor: [200, 180, 140], bandCount: 18, noiseScale: 25 },
    uranus:  { base: [126, 200, 227], bandColor: [100, 180, 210], bandCount: 12, noiseScale: 30 },
    neptune: { base: [51, 85, 255], bandColor: [40, 70, 220], bandCount: 14, spotColor: [80, 130, 255], spotPos: [0.4, 0.45], spotSize: 0.06, noiseScale: 25 },
    pluto:   { base: [205, 133, 63], noiseScale: 60, craters: 40 },
  };

  const cfg = configs[nodeId] || { base: [150, 150, 150], noiseScale: 50 };
  const [r, g, b] = cfg.base;

  const bandSeeds = Array.from({ length: 50 }, () => Math.random() * 0.3 + 0.1);

  for (let y = 0; y < 512; y++) {
    for (let x = 0; x < 1024; x++) {
      const u = x / 1024, v = y / 512;
      const lat = Math.abs(v - 0.5) * 2;
      const lon = u;

      const n1 = Math.sin(lon * (cfg.noiseScale || 50) * 2 + lat * 40) * 0.5;
      const n2 = Math.sin(lon * (cfg.noiseScale || 50) * 0.5 - lat * 60 + 1.3) * 0.3;
      const n3 = Math.sin((lon + lat) * (cfg.noiseScale || 50) * 1.2) * 0.2;
      let noise = (n1 + n2 + n3) * 0.5 + 0.5;

      let pr = r, pg = g, pb = b;

      if (cfg.bandColor && cfg.bandCount) {
        const bandVal = v * cfg.bandCount;
        const bandIdx = Math.floor(bandVal);
        const bandFrac = bandVal - bandIdx;
        const bandSeed = bandSeeds[bandIdx % bandSeeds.length];
        const band = Math.sin(bandVal * Math.PI * 2 + bandSeed * 6.28) * 0.5 + 0.5;
        const blend = 0.2 + band * 0.35;
        pr = r * (1 - blend) + cfg.bandColor[0] * blend;
        pg = g * (1 - blend) + cfg.bandColor[1] * blend;
        pb = b * (1 - blend) + cfg.bandColor[2] * blend;
      }

      if (cfg.spotColor && cfg.spotPos && cfg.spotSize) {
        const dx = lon - cfg.spotPos[0];
        const dy = lat - cfg.spotPos[1];
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < cfg.spotSize) {
          const fade = 1 - d / cfg.spotSize;
          pr = pr * (1 - fade * 0.7) + cfg.spotColor[0] * fade * 0.7;
          pg = pg * (1 - fade * 0.7) + cfg.spotColor[1] * fade * 0.7;
          pb = pb * (1 - fade * 0.7) + cfg.spotColor[2] * fade * 0.7;
        }
      }

      if (cfg.craters) {
        const seed = Math.sin(lon * 137.5 + lat * 97.3) * 0.5 + 0.5;
        if (seed < cfg.craters / 200) {
          pr -= 20; pg -= 20; pb -= 20;
        }
      }

      if (!cfg.bandColor && !cfg.spotColor) {
        const cr = Math.sin(lon * 30 + lat * 20) * 0.5 + 0.5;
        pr += (cr - 0.5) * 30;
        pg += (cr - 0.5) * 25;
        pb += (cr - 0.5) * 20;
      }

      const limb = 1.0 - Math.pow(lat, 2.5) * 0.4;
      const valR = Math.max(0, Math.min(255, pr * limb * (0.85 + noise * 0.15)));
      const valG = Math.max(0, Math.min(255, pg * limb * (0.85 + noise * 0.15)));
      const valB = Math.max(0, Math.min(255, pb * limb * (0.85 + noise * 0.15)));

      ctx.fillStyle = `rgb(${valR|0},${valG|0},${valB|0})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

const planetTexCache = new Map<string, THREE.CanvasTexture>();

function getPlanetTexture(nodeId: string): THREE.CanvasTexture {
  if (!planetTexCache.has(nodeId)) {
    if (typeof window !== "undefined") console.log(`[NovaX Planet Assets] Generating procedural texture for: ${nodeId}`);
    planetTexCache.set(nodeId, createPlanetTexture(nodeId));
  }
  return planetTexCache.get(nodeId)!;
}

function PlanetMesh({ planet, isHovered, isSelected }: { planet: PlanetData; isHovered: boolean; isSelected: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh>(null);
  const atmosGlowRef = useRef<THREE.Sprite>(null);

  const texture = useMemo(() => loadPlanetTexture(planet.node_id), [planet.node_id]);
  const glowTex = useMemo(() => getGlowTexture(planet.color), [planet.color]);

  const hoverScale = isHovered || isSelected ? 1.6 : 1;

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += planet.rotationSpeed * (isHovered ? 2.5 : 1);
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z += 0.002;
    }
    if (atmosGlowRef.current) {
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 0.6) * 0.08;
      atmosGlowRef.current.scale.setScalar(planet.radius * 5 * hoverScale * pulse);
      atmosGlowRef.current.material.opacity = isHovered || isSelected ? 0.18 : 0.07;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} rotation={[planet.tilt, 0, 0]} scale={hoverScale}>
        <sphereGeometry args={[planet.radius, 48, 48]} />
        <meshStandardMaterial
          map={texture}
          transparent
          roughness={0.4}
          metalness={0.1}
          emissive={new THREE.Color(planet.color)}
          emissiveIntensity={isHovered ? 0.3 : 0.04}
        />
      </mesh>

      <sprite ref={atmosGlowRef} scale={[planet.radius * 5 * hoverScale, planet.radius * 5 * hoverScale, 1]}>
        <spriteMaterial map={glowTex} blending={THREE.AdditiveBlending} transparent opacity={0.07} depthWrite={false} />
      </sprite>

      {planet.hasRings && (
        <mesh ref={ringsRef} rotation={[1.2 + planet.tilt, 0.3, 0]} scale={hoverScale}>
          <ringGeometry args={[planet.radius * 1.3, planet.radius * 2.6, 128]} />
          <meshStandardMaterial
            map={getRingTexture()}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
            roughness={0.7}
            metalness={0.1}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}

const moonTexCache = new Map<string, THREE.CanvasTexture>();

function createMoonTexture(moonId: string): THREE.CanvasTexture {
  if (moonTexCache.has(moonId)) return moonTexCache.get(moonId)!;
  const canvas = document.createElement("canvas");
  canvas.width = 128; canvas.height = 128;
  const ctx = canvas.getContext("2d")!;

  const configs: Record<string, { base: [number,number,number]; accent: [number,number,number]; craters: number; spots: number }> = {
    moon:     { base: [175,172,168], accent: [140,138,135], craters: 12, spots: 6 },
    phobos:   { base: [155,138,118], accent: [130,115,95], craters: 8, spots: 3 },
    deimos:   { base: [185,180,175], accent: [160,155,150], craters: 5, spots: 2 },
    io:       { base: [230,205,80], accent: [200,170,50], craters: 0, spots: 12 },
    europa:   { base: [195,205,215], accent: [160,130,110], craters: 4, spots: 8 },
    ganymede: { base: [170,165,155], accent: [130,120,110], craters: 10, spots: 5 },
    callisto: { base: [130,130,140], accent: [100,100,115], craters: 15, spots: 4 },
    titan:    { base: [210,170,100], accent: [180,140,80], craters: 3, spots: 6 },
    enceladus:{ base: [230,235,240], accent: [200,210,220], craters: 4, spots: 2 },
    rhea:     { base: [185,185,190], accent: [155,155,160], craters: 8, spots: 3 },
    mimas:    { base: [190,190,195], accent: [160,155,150], craters: 6, spots: 2 },
    miranda:  { base: [180,175,165], accent: [150,130,110], craters: 7, spots: 4 },
    ariel:    { base: [200,200,205], accent: [170,170,175], craters: 5, spots: 3 },
    umbriel:  { base: [130,130,135], accent: [100,100,105], craters: 8, spots: 2 },
    titania:  { base: [175,170,165], accent: [145,140,135], craters: 9, spots: 4 },
    oberon:   { base: [155,150,145], accent: [125,120,115], craters: 10, spots: 3 },
    triton:   { base: [220,205,195], accent: [190,175,165], craters: 6, spots: 5 },
    charon:   { base: [165,165,170], accent: [135,135,140], craters: 7, spots: 3 },
  };

  const cfg = configs[moonId] || { base: [180,180,180], accent: [150,150,150], craters: 5, spots: 3 };
  const [br, bg, bb] = cfg.base;
  const [ar, ag, ab] = cfg.accent;

  ctx.clearRect(0, 0, 128, 128);

  const moonGrad = ctx.createRadialGradient(64, 64, 0, 64, 64, 58);
  moonGrad.addColorStop(0, `rgba(${br},${bg},${bb},1)`);
  moonGrad.addColorStop(0.6, `rgba(${br-15},${bg-15},${bb-15},1)`);
  moonGrad.addColorStop(0.92, `rgba(${ar},${ag},${ab},1)`);
  moonGrad.addColorStop(1, `rgba(${ar},${ag},${ab},0)`);
  ctx.fillStyle = moonGrad;
  ctx.fillRect(0, 0, 128, 128);

  for (let i = 0; i < cfg.spots; i++) {
    const x = 20 + Math.random() * 88;
    const y = 20 + Math.random() * 88;
    const r = 3 + Math.random() * 8;
    const spotGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
    const brightness = 20 + Math.random() * 30;
    spotGrad.addColorStop(0, `rgba(${br-brightness},${bg-brightness},${bb-brightness},0.6)`);
    spotGrad.addColorStop(1, `rgba(${br},${bg},${bb},0)`);
    ctx.fillStyle = spotGrad;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  for (let i = 0; i < cfg.craters; i++) {
    const x = 10 + Math.random() * 108;
    const y = 10 + Math.random() * 108;
    const r = 2 + Math.random() * 5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,0,0,${0.15 + Math.random() * 0.2})`;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 1, y + 1, r * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${0.08 + Math.random() * 0.1})`;
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  moonTexCache.set(moonId, tex);
  return tex;
}

function MoonSprite({ name, parentRadius, onClick }: { name: string; parentRadius: number; onClick: () => void }) {
  const ref = useRef<THREE.Sprite>(null);
  const glowRef = useRef<THREE.Sprite>(null);
  const angle = useRef(Math.random() * Math.PI * 2);
  const orbitDistance = parentRadius * 2.4 + 0.4;
  const orbitSpeed = 0.3 + Math.random() * 0.7;
  const [hovered, setHovered] = useState(false);

  const moonId = name.toLowerCase();
  const planet = PLANET_DATA.find((p) => p.moons?.map((m) => m.toLowerCase()).includes(moonId));
  const pColor = planet?.color || "#888888";

  const tex = useMemo(() => createMoonTexture(moonId), [moonId]);
  const glowTex = useMemo(() => getGlowTexture(pColor), [pColor]);

  useFrame(({ clock }) => {
    if (ref.current) {
      angle.current += 0.006 * orbitSpeed;
      ref.current.position.x = Math.cos(angle.current) * orbitDistance;
      ref.current.position.z = Math.sin(angle.current) * orbitDistance;
      ref.current.position.y = Math.sin(angle.current * 0.6 + clock.getElapsedTime() * 0.3) * 0.25;
    }
    if (glowRef.current) {
      const scale = parentRadius * 0.55 * (hovered ? 1.4 : 1);
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 0.8 + moonId.length) * 0.08;
      glowRef.current.scale.setScalar(scale * pulse);
      glowRef.current.material.opacity = hovered ? 0.25 : 0.08;
    }
  });

  const s = parentRadius * 0.22 * (hovered ? 1.5 : 1);

  return (
    <group>
      <sprite
        ref={ref}
        scale={[s, s, 1]}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
      >
        <spriteMaterial map={tex} transparent />
      </sprite>
      <sprite ref={glowRef} scale={[parentRadius * 0.55, parentRadius * 0.55, 1]}>
        <spriteMaterial map={glowTex} blending={THREE.AdditiveBlending} transparent opacity={0.08} depthWrite={false} />
      </sprite>
    </group>
  );
}

function createRingTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024; canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 1024, 0);
  g.addColorStop(0, "rgba(200,180,140,0)");
  g.addColorStop(0.05, "rgba(200,180,140,0.1)");
  g.addColorStop(0.15, "rgba(210,190,150,0.5)");
  g.addColorStop(0.25, "rgba(220,200,160,0.7)");
  g.addColorStop(0.35, "rgba(200,180,140,0.4)");
  g.addColorStop(0.45, "rgba(190,170,130,0.6)");
  g.addColorStop(0.55, "rgba(210,190,150,0.8)");
  g.addColorStop(0.65, "rgba(180,160,120,0.5)");
  g.addColorStop(0.75, "rgba(200,180,140,0.3)");
  g.addColorStop(0.85, "rgba(190,170,130,0.15)");
  g.addColorStop(1, "rgba(200,180,140,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 1024, 64);

  for (let i = 0; i < 200; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 64;
    const r = 0.5 + Math.random() * 1.5;
    ctx.fillStyle = `rgba(180,160,130,${0.1 + Math.random() * 0.3})`;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

const ringTexCache = new Map<string, THREE.CanvasTexture>();

function getRingTexture(): THREE.CanvasTexture {
  if (!ringTexCache.has("default")) ringTexCache.set("default", createRingTexture());
  return ringTexCache.get("default")!;
}

function createGlowTexture(color: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256; canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const c = new THREE.Color(color);
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, `rgba(${c.r*255|0},${c.g*255|0},${c.b*255|0},0.6)`);
  g.addColorStop(0.2, `rgba(${c.r*255|0},${c.g*255|0},${c.b*255|0},0.3)`);
  g.addColorStop(0.5, `rgba(${c.r*255|0},${c.g*255|0},${c.b*255|0},0.08)`);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

const glowCache = new Map<string, THREE.CanvasTexture>();

function getGlowTexture(color: string) {
  if (!glowCache.has(color)) glowCache.set(color, createGlowTexture(color));
  return glowCache.get(color)!;
}

function createOrbitGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 64; canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,0.15)");
  g.addColorStop(0.3, "rgba(200,220,255,0.06)");
  g.addColorStop(0.7, "rgba(100,150,255,0.02)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function OrbitRing({ distance }: { distance: number }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance - 0.04, distance + 0.04, 128]} />
        <meshBasicMaterial color="#8899cc" transparent opacity={0.04} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance - 0.12, distance - 0.04, 128]} />
        <meshBasicMaterial color="#6677aa" transparent opacity={0.015} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance + 0.04, distance + 0.12, 128]} />
        <meshBasicMaterial color="#6677aa" transparent opacity={0.015} side={THREE.DoubleSide} />
      </mesh>
      <sprite position={[0, 0, 0]} scale={[distance * 2.2, distance * 2.2, 1]}>
        <spriteMaterial map={createOrbitGlowTexture()} blending={THREE.AdditiveBlending} transparent opacity={0.12} depthWrite={false} />
      </sprite>
    </group>
  );
}

function SolarSystemInner({ onHover, onSelect, onMoonClick, hoveredId, selectedId }: {
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  onMoonClick: (moonId: string) => void;
  hoveredId: string | null;
  selectedId: string | null;
}) {
  const planets = PLANET_DATA;
  const angleRefs = useRef<(number)[]>(planets.map((p) => p.initialAngle));
  const planetRefs = useRef<(THREE.Group | null)[]>([]);
  const controlsRef = useRef<any>(null);

  useFrame(({ clock }) => {
    planets.forEach((p, i) => {
      angleRefs.current[i] += p.orbitSpeed;
      const g = planetRefs.current[i];
      if (g) {
        const angle = angleRefs.current[i];
        g.position.x = Math.cos(angle) * p.distance;
        g.position.z = Math.sin(angle) * p.distance;
      }
    });
  });

  const handlePointerOver = useCallback((id: string) => (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onHover(id);
  }, [onHover]);

  const handlePointerOut = useCallback(() => (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onHover(null);
  }, [onHover]);

  const handleClick = useCallback((id: string) => (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect(id);
  }, [onSelect]);

  return (
    <>
      <ambientLight intensity={0.04} color="#FFE0A0" />
      <SunLight />
      <pointLight position={[0, 0, 0]} intensity={300} distance={300} decay={0.5} color="#FFD080" />

      <GalaxyBackground />
      <NebulaBackground />

      <Sun />

      {planets.map((p, i) => (
        <group key={p.node_id}>
          <OrbitRing distance={p.distance} />
          <group
            ref={(el) => { planetRefs.current[i] = el; }}
            position={[
              Math.cos(p.initialAngle) * p.distance,
              0,
              Math.sin(p.initialAngle) * p.distance,
            ]}
          >
            <group
              onPointerOver={handlePointerOver(p.node_id)}
              onPointerOut={handlePointerOut()}
              onClick={handleClick(p.node_id)}
            >
              <PlanetMesh planet={p} isHovered={hoveredId === p.node_id} isSelected={selectedId === p.node_id} />
              {(p.moons && (hoveredId === p.node_id || selectedId === p.node_id)) && p.moons.map((m) => (
                <MoonSprite key={m} name={m} parentRadius={p.radius} onClick={() => onMoonClick(m.toLowerCase())} />
              ))}
            </group>
          </group>
        </group>
      ))}

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={true}
        minDistance={5}
        maxDistance={150}
        autoRotate
        autoRotateSpeed={0.12}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
        dampingFactor={0.05}
        target={[0, 0, 0]}
      />
    </>
  );
}

function SunLight() {
  const ref = useRef<THREE.DirectionalLight>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.set(Math.sin(clock.getElapsedTime() * 0.003) * 2, 6, Math.cos(clock.getElapsedTime() * 0.003) * 2);
      ref.current.target.position.set(0, 0, 0);
    }
  });
  return <directionalLight ref={ref} intensity={2} color="#FFE090" position={[2, 6, 2]} />;
}

function HoverTooltip({ planet, position }: { planet: PlanetData; position: { x: number; y: number } }) {
  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{ left: position.x + 20, top: position.y - 20, transform: "translateY(-50%)" }}
    >
      <div className="backdrop-blur-2xl bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 min-w-[220px] shadow-2xl">
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: planet.color, boxShadow: `0 0 12px ${planet.color}` }} />
          <span className="text-white font-semibold text-sm">{planet.name}</span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs font-mono mb-3">
          <span className="text-white/30">Gravity</span>
          <span className="text-white/70 text-right">{planet.gravity} m/s²</span>
          <span className="text-white/30">Distance</span>
          <span className="text-white/70 text-right">{planet.distance} AU</span>
          <span className="text-white/30">Temperature</span>
          <span className="text-white/70 text-right">{planet.temperature}K</span>
          <span className="text-white/30">Duration</span>
          <span className="text-white/70 text-right">{planet.duration} days</span>
        </div>
        <div className="w-full py-2 text-center text-xs font-semibold rounded-xl" style={{ backgroundColor: `${planet.color}15`, color: planet.color, border: `1px solid ${planet.color}30` }}>
          Explore Destination →
        </div>
      </div>
    </div>
  );
}

function NoMoonsCard({ planetName, planetColor }: { planetName: string; planetColor: string }) {
  return (
    <div className="rounded-2xl backdrop-blur-2xl bg-white/[0.02] border border-white/[0.06] p-5 text-center">
      <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: `${planetColor}20` }}>
        <svg className="w-6 h-6" style={{ color: planetColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </div>
      <h4 className="text-white font-semibold text-sm mb-1.5">No Natural Moons</h4>
      <p className="text-white/40 text-xs leading-relaxed">
        {planetName === "Mercury"
          ? "Mercury's proximity to the Sun makes it impossible for it to retain a natural moon. Any captured object would quickly spiral into the planet or be pulled away by the Sun's immense gravity."
          : "Venus is theorized to have once had a moon, but tidal forces and gravitational interactions caused it to collide with the planet or drift away billions of years ago."}
      </p>
    </div>
  );
}

function MoonPopup({ moon, onClose }: { moon: MoonData; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);

  const planet = PLANET_DATA.find((p) => p.node_id === moon.parentPlanet);
  const pColor = planet?.color || "#4B7BE5";

  const tex = useMemo(() => createMoonTexture(moon.id), [moon.id]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
    >
      <div className="absolute inset-0 backdrop-blur-xl bg-black/40" />
      <div
        className={`relative w-[520px] max-h-[85vh] overflow-y-auto rounded-3xl backdrop-blur-3xl bg-space-black/85 border border-white/[0.08] shadow-2xl transition-all duration-500 ${visible ? "scale-100 translate-y-0" : "scale-90 translate-y-4"}`}
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: `0 0 60px ${pColor}15, 0 0 0 1px ${pColor}10` }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white/50 hover:text-white transition-all z-10">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: `radial-gradient(ellipse at center, ${pColor}15 0%, transparent 70%)` }}>
            <sprite scale={[3.5, 3.5, 1]} position={[0, 0, 0]}>
              <spriteMaterial map={tex} transparent />
            </sprite>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pColor, boxShadow: `0 0 12px ${pColor}` }} />
              <h2 className="text-2xl font-display font-bold text-white">{moon.name}</h2>
            </div>
            <p className="text-white/30 text-xs font-mono mt-1">{moon.discovery}</p>
          </div>
        </div>

        <div className="p-6 pt-4">
          <p className="text-white/50 text-sm leading-relaxed mb-5">{moon.tourism_description}</p>

          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {[
              { label: "Diameter", value: `${moon.diameter_km.toLocaleString()} km` },
              { label: "Gravity", value: `${moon.gravity_m_s2} m/s²` },
              { label: "Orbital Period", value: `${moon.orbital_period_days} days` },
              { label: "Temperature", value: `${moon.surface_temp_k} K` },
              { label: "Distance", value: `${moon.distance_from_planet_km.toLocaleString()} km` },
              {
                label: "Safety Rating",
                value: `${moon.safety_rating}%`,
                valueColor: moon.safety_rating >= 92 ? "text-emerald-400" : moon.safety_rating >= 88 ? "text-amber-400" : "text-red-400",
              },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                <p className="text-white/25 text-[10px] font-mono mb-0.5">{s.label}</p>
                <p className={`text-white/80 text-xs font-semibold ${(s as any).valueColor || ""}`}>{s.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-3.5 h-3.5 text-amber-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Did You Know?</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{moon.fact}</p>
          </div>

          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2.5">
              <svg className="w-3.5 h-3.5 text-emerald-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Luxury Activities</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {moon.activities.map((a) => (
                <span key={a} className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/50 text-xs">{a}</span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="text-white/30 text-[10px] font-mono uppercase">Difficulty</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={`w-1.5 h-4 rounded-full ${i < moon.difficulty_level ? "bg-amber-400/70" : "bg-white/10"}`} />
                ))}
              </div>
            </div>
            <span className={`text-[11px] font-mono ${moon.safety_rating >= 92 ? "text-emerald-400" : moon.safety_rating >= 88 ? "text-amber-400" : "text-red-400"}`}>
              {moon.safety_rating}% Safe
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={`/moon/${moon.id}`}
              className="text-center py-3 rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
              style={{ backgroundColor: `${pColor}18`, color: pColor, border: `1px solid ${pColor}35` }}
            >
              Explore {moon.name}
            </a>
            <a
              href={`/booking?destination=${moon.parentPlanet}&moon=${moon.id}`}
              className="text-center py-3 rounded-2xl text-sm font-semibold bg-white/[0.05] text-white/70 hover:bg-white/[0.09] transition-all duration-300 border border-white/[0.08]"
            >
              Book Expedition
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoPanel({ planet, onClose }: { planet: PlanetData; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const moons = MOON_DATA.filter((m) => m.parentPlanet === planet.node_id);

  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);

  return (
    <div className={`fixed right-0 top-0 h-full w-[460px] z-50 flex items-center transition-all duration-700 ease-out ${visible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}`}>
      <div className="relative w-full h-[92vh] mr-5 rounded-3xl backdrop-blur-3xl bg-space-black/80 border border-white/[0.08] shadow-2xl overflow-y-auto">
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white/50 hover:text-white transition-all z-10">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="p-7 pt-14 pb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: planet.color, boxShadow: `0 0 16px ${planet.color}` }} />
            <h2 className="text-2xl font-display font-bold text-white">{planet.name}</h2>
          </div>
          <p className="text-white/40 text-sm leading-relaxed mb-6 line-clamp-2">{planet.description}</p>

          <div className="grid grid-cols-3 gap-2 mb-6">
            {[
              { label: "Gravity", value: `${planet.gravity} m/s²` },
              { label: "Temperature", value: `${planet.temperature}K` },
              { label: "Duration", value: `${planet.duration}d` },
              { label: "Distance", value: `${planet.distance} AU` },
              { label: "Safety", value: `${planet.safety}%` },
              { label: "Difficulty", value: "•".repeat(planet.difficulty) + "○".repeat(5 - planet.difficulty) },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-2.5 text-center">
                <p className="text-white/25 text-[10px] font-mono mb-0.5">{s.label}</p>
                <p className="text-white/80 text-xs font-semibold">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white/50 text-xs font-mono uppercase tracking-widest">
                {moons.length > 0 ? `Natural Moons (${moons.length})` : "Natural Moons"}
              </h3>
              <div className="h-px flex-1 ml-4" style={{ background: `linear-gradient(90deg, ${planet.color}30, transparent)` }} />
            </div>
            {moons.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {moons.map((m) => (
                  <span key={m.id} className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/50 text-[11px] font-mono hover:bg-white/[0.06] hover:text-white/80 transition-all cursor-default">
                    {m.name}
                  </span>
                ))}
              </div>
            ) : (
              <NoMoonsCard planetName={planet.name} planetColor={planet.color} />
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <a href={`/planet/${planet.node_id}`} className="py-3 rounded-2xl text-center text-sm font-semibold transition-all duration-300 hover:scale-[1.02]" style={{ backgroundColor: `${planet.color}18`, color: planet.color, border: `1px solid ${planet.color}35` }}>
              Explore {planet.name}
            </a>
            <a href={`/booking?destination=${planet.node_id}`} className="py-3 rounded-2xl text-center text-sm font-semibold bg-white/[0.05] text-white/70 hover:bg-white/[0.09] transition-all duration-300 border border-white/[0.08]">
              Book a Voyage
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SolarSystemScene() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedMoonId, setSelectedMoonId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const hoveredPlanet = hoveredId ? PLANET_DATA.find((p) => p.node_id === hoveredId) ?? null : null;
  const selectedPlanet = selectedId ? PLANET_DATA.find((p) => p.node_id === selectedId) ?? null : null;
  const selectedMoon = selectedMoonId ? MOON_DATA.find((m) => m.id === selectedMoonId) ?? null : null;

  const handleSelect = useCallback((id: string) => {
    setSelectedId((prev) => prev === id ? null : id);
  }, []);

  const handleMoonClick = useCallback((moonId: string) => {
    setSelectedMoonId(moonId);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-space-black" onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}>
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [10, 18, 35], fov: 45, near: 0.1, far: 500 }}
          gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
          dpr={[1, 2]}
        >
          <color attach="background" args={["#050816"]} />
          <fog attach="fog" args={["#050816", 100, 250]} />
          <SolarSystemInner
            onHover={setHoveredId}
            onSelect={handleSelect}
            onMoonClick={handleMoonClick}
            hoveredId={hoveredId}
            selectedId={selectedId}
          />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-space-black/60 via-transparent to-space-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-space-black/40 via-transparent to-space-black/20 pointer-events-none" />

      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <h1 className="text-3xl font-display font-bold text-white">Solar System</h1>
        <p className="text-white/30 text-sm font-mono mt-1">Interactive Explorer</p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center gap-4 px-5 py-3 rounded-2xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.06]">
          <span className="text-white/30 text-xs font-mono">Drag to orbit</span>
          <span className="w-1 h-1 rounded-full bg-white/10" />
          <span className="text-white/30 text-xs font-mono">Scroll to zoom</span>
          <span className="w-1 h-1 rounded-full bg-white/10" />
          <span className="text-white/30 text-xs font-mono">Click moons to explore</span>
        </div>
      </div>

      {hoveredPlanet && !selectedId && <HoverTooltip planet={hoveredPlanet} position={mousePos} />}

      {selectedPlanet && <InfoPanel planet={selectedPlanet} onClose={() => setSelectedId(null)} />}

      {selectedMoon && <MoonPopup moon={selectedMoon} onClose={() => setSelectedMoonId(null)} />}
    </div>
  );
}
