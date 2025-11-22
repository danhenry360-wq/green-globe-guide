// src/types/data.ts

/**
 * Core Data Models for Green Globe Guide
 * These interfaces define the structure for all scalable data throughout the application.
 */

// --- 1. Destination Data ---

/**
 * Represents a single travel destination, used for the "Popular Destinations" section.
 */
export interface Destination {
  id: number;
  name: string;
  slug: string; // URL-friendly identifier
  country: string;
  continent: 'North America' | 'South America' | 'Europe' | 'Asia' | 'Africa' | 'Oceania';
  imagePath: string; // Path to the image asset (e.g., '/dest-1.jpg')
  imageAlt: string;
  legalStatus: 'Recreational' | 'Medical' | 'Decriminalized' | 'Illegal';
  statusColor: 'bg-green-500/90' | 'bg-amber-500/90' | 'bg-amber-700/90' | 'bg-red-700/90';
  link: string; // The route to the guide page
}

// --- 2. Hotel Data ---

/**
 * Represents a single Dispensary.
 */
export interface Dispensary {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  rating: number; // Star rating (e.g., 4.7)
  reviewCount: number;
  address: string;
  status: string; // e.g., "Licensed", "Temporary Approval"
  isRecreational: boolean;
  isMedical: boolean;
  hasDelivery: boolean;
  hasATM: boolean;
  hasParking: boolean;
  policyHighlights: string;
  description: string;
  image: string; // Path to the image asset
  website: string; // Link to the dispensary website
}

/**
 * Represents a collection of dispensaries within a specific City.
 */
export interface CityDispensaries {
  cityName: string;
  dispensaries: Dispensary[];
}

/**
 * Represents a collection of dispensaries within a specific State or Province.
 */
export interface StateDispensaries {
  stateName: string; // Full name of the state/province (e.g., 'California')
  cities: CityDispensaries[];
}

/**
 * Represents a collection of dispensaries within a specific Country.
 */
export interface CountryDispensaries {
  country: string;
  flagPath: string; // Path to the flag image (e.g., 'https://flagcdn.com/w40/us.png')
  states: StateDispensaries[];
}

// --- 3. Hotel Data (renumbered to 4) ---

/**
 * Represents a single 420-Friendly Hotel.
 */
export interface Hotel {
  id: number;
  name: string;
  city: string;
  state: string; // State/Province code (e.g., 'CA', 'ON')
  rating: number; // Star rating (e.g., 4.7)
  policies: string; // Policy highlights (e.g., "Complimentary smoking lounge")
  website: string; // Booking link
  priceRange: '$$' | '$$$' | '$$$$';
}

/**
 * Represents a collection of hotels within a specific State or Province.
 */
export interface StateHotels {
  stateName: string; // Full name of the state/province (e.g., 'California')
  slug: string;
  hotels: Hotel[];
}

/**
 * Represents a collection of hotels within a specific Country.
 */
export interface CountryHotels {
  country: string;
  slug: string;
  flagPath: string; // Path to the flag image (e.g., 'https://flagcdn.com/w40/us.png')
  states: StateHotels[];
}

// --- 4. Blog/Article Data ---

/**
 * Represents a single blog post or travel guide article.
 */
export interface Article {
  id: number;
  title: string;
  summary: string;
  imagePath: string; // Path to the image asset (e.g., '/blog-amsterdam.jpg')
  imageAlt: string;
  link: string; // The route to the article page
}

// --- 5. Statistics Data ---

/**
 * Represents a single statistic item for the homepage.
 */
export interface StatItem {
  icon: string; // Name of the Lucide icon (e.g., 'Globe2')
  label: string;
  count: number;
  suffix: string;
}

// --- 6. Feature Data ---

/**
 * Represents a single feature/resource item for the homepage.
 */
export interface FeatureItem {
  icon: string; // Name of the Lucide icon (e.g., 'Shield')
  title: string;
  desc: string;
  link: string;
}
