export type BodyType = "PLANET" | "MOON";

export interface DestinationMetrics {
  travel_duration_days: number;
  difficulty_level: 1 | 2 | 3 | 4 | 5;
  safety_rating: number;
  gravity_m_s2: number;
  avg_temperature_k: number;
  atmospheric_composition: string[];
}

export interface HotelNode {
  id: string;
  name: string;
  description: string;
  tier: "LUXURY" | "ULTRA_LUXURY" | "PREMIER";
  image: string;
}

export interface Destination {
  node_id: string;
  name: string;
  type: BodyType;
  parent_body: string | null;
  metrics: DestinationMetrics;
  hospitality: { hotel_nodes: HotelNode[] };
  description: string;
  image: string;
  bgImage: string;
  moons?: string[];
  color: string;
}

export interface Package {
  id: string;
  name: string;
  tagline: string;
  tier: "CRUISE" | "DEEP_SPACE" | "SURFACE";
  destinations: string[];
  duration_days: number;
  price_credits: number;
  description: string;
  image: string;
}

export interface TrainingModule {
  id: string;
  name: string;
  phase: "PHYSIOLOGICAL" | "SYSTEMS" | "EVACUATION";
  duration_hours: number;
  description: string;
  prerequisites: string[];
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  amenities: string[];
  price_per_night: number;
  capacity: number;
  images: string[];
}

export interface BookingState {
  destinationId: string | null;
  packageId: string | null;
  hotelId: string | null;
  trainingIds: string[];
  departureDate: string | null;
  status: "IDLE" | "CONFIGURING" | "VERIFYING" | "BOOKING" | "CONFIRMED";
}
