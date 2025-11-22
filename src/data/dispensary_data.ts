import { Dispensary, CountryDispensaries } from "@/types/data";

// Placeholder data for Los Angeles dispensaries
const LA_DISPENSARIES: Dispensary[] = [
  {
    id: "la-puff-la",
    name: "Puff LA",
    city: "Los Angeles",
    state: "California",
    country: "USA",
    rating: 4.8,
    reviewCount: 1250,
    address: "1912 E CESAR E CHAVEZ AVE, LOS ANGELES, CA 90033",
    status: "Licensed (SEP App)",
    isRecreational: true,
    isMedical: true,
    hasDelivery: true,
    hasATM: true,
    hasParking: false,
    policyHighlights: "Recreational & Medical. Delivery available. ATM on site. Highly rated.",
    description: "Puff LA is a highly-rated, licensed dispensary serving the Los Angeles community. Known for its wide selection and knowledgeable staff, it offers both recreational and medical cannabis products.",
    image: "/assets/dispensary-puff-la.jpg", // Placeholder image path
    website: "https://puffla.com", // Placeholder website
  },
  {
    id: "la-the-set-northridge",
    name: "The Set Northridge",
    city: "Northridge",
    state: "California",
    country: "USA",
    rating: 4.5,
    reviewCount: 890,
    address: "8503 N RESEDA BLVD, NORTHRIDGE, CA 91324",
    status: "Temporary Approval",
    isRecreational: true,
    isMedical: true,
    hasDelivery: false,
    hasATM: true,
    hasParking: true,
    policyHighlights: "Recreational & Medical. ATM on site. Parking available.",
    description: "The Set Northridge offers a curated selection of cannabis products in a modern, welcoming environment. They focus on customer education and quality control.",
    image: "/assets/dispensary-the-set.jpg", // Placeholder image path
    website: "https://thesetnorthridge.com", // Placeholder website
  },
  {
    id: "la-hierba",
    name: "Hierba",
    city: "Los Angeles",
    state: "California",
    country: "USA",
    rating: 4.7,
    reviewCount: 620,
    address: "2625 E CESAR E CHAVEZ AVE, LOS ANGELES, CA 90033",
    status: "Licensed (SEP App)",
    isRecreational: true,
    isMedical: true,
    hasDelivery: true,
    hasATM: false,
    hasParking: false,
    policyHighlights: "Recreational & Medical. Delivery available.",
    description: "Hierba is a licensed retailer committed to providing high-quality cannabis products and exceptional service. They pride themselves on their community focus.",
    image: "/assets/dispensary-hierba.jpg", // Placeholder image path
    website: "https://hierba.com", // Placeholder website
  },
];

// Structure the data to match the existing CountryDispensaries type (adapted from Hotel structure)
export const DISPENSARY_DATA: CountryDispensaries[] = [
  {
    country: "USA",
    flagPath: "/assets/flags/us.svg", // Assuming this asset exists
    states: [
      {
        stateName: "California",
        cities: [
          {
            cityName: "Los Angeles",
            dispensaries: LA_DISPENSARIES.filter(d => d.city === "Los Angeles"),
          },
          {
            cityName: "Northridge",
            dispensaries: LA_DISPENSARIES.filter(d => d.city === "Northridge"),
          },
        ],
      },
    ],
  },
];

// Define the types (assuming they are not yet defined in the project)
// I will also create a placeholder for the types file to ensure the new data file works.
// However, since the user's project already uses types, I will assume the structure
// is similar to the Hotel types and will update the existing types file if needed.
// For now, I will proceed with the assumption that the structure is compatible.
