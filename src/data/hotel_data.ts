// src/data/hotel_data.ts
import { CountryHotels } from "@/types/data";

export const HOTEL_DATA: CountryHotels[] = [
  // USA – notable cannabis states
  {
    country: "USA",
    slug: "usa",
    flagPath: "https://flagcdn.com/w40/us.png",
    states: [
      {
        stateName: "California",
        slug: "california",
        hotels: [
          {
            id: 11,
            name: "Leaf & Rest Boutique",
            city: "Los Angeles",
            state: "CA",
            rating: 4.7,
            policies: "Complimentary smoking lounge. 24-hour room service.",
            website: "https://example.com",
            priceRange: "$$$",
          },
          {
            id: 12,
            name: "Pacific Retreat",
            city: "San Francisco",
            state: "CA",
            rating: 4.8,
            policies: "Rooftop lounge for guests. Wellness packages available.",
            website: "https://example.com",
            priceRange: "$$$",
          },
        ],
      },
      {
        stateName: "Colorado",
        slug: "colorado",
        hotels: [
          {
            id: 13,
            name: "Green Valley Resort",
            city: "Denver",
            state: "CO",
            rating: 4.8,
            policies: "Cannabis consumption allowed in designated areas. Pet-friendly rooms available.",
            website: "https://example.com",
            priceRange: "$$",
          },
        ],
      },
      {
        stateName: "Oregon",
        slug: "oregon",
        hotels: [
          {
            id: 14,
            name: "Mountain High Lodge",
            city: "Portland",
            state: "OR",
            rating: 4.9,
            policies: "Private balconies perfect for consumption. Eco-friendly amenities.",
            website: "https://example.com",
            priceRange: "$$",
          },
        ],
      },
      {
        stateName: "Washington",
        slug: "washington",
        hotels: [
          {
            id: 15,
            name: "Urban Chill Hotel",
            city: "Seattle",
            state: "WA",
            rating: 4.6,
            policies: "420-friendly suites with premium ventilation systems.",
            website: "https://example.com",
            priceRange: "$$$",
          },
        ],
      },
      {
        stateName: "Arizona",
        slug: "arizona",
        hotels: [
          {
            id: 16,
            name: "Desert Oasis Inn",
            city: "Phoenix",
            state: "AZ",
            rating: 4.5,
            policies: "Poolside relaxation zones. Cannabis concierge service.",
            website: "https://example.com",
            priceRange: "$$",
          },
        ],
      },
      {
        stateName: "Nevada",
        slug: "nevada",
        hotels: [
          {
            id: 17,
            name: "Sin City Suites",
            city: "Las Vegas",
            state: "NV",
            rating: 4.7,
            policies: "Private balconies, 24-hour concierge, cannabis welcome kit.",
            website: "https://example.com",
            priceRange: "$$$",
          },
        ],
      },
    ],
  },
  {
      country: "Canada",
      slug: "canada",
      flagPath: "https://flagcdn.com/w40/ca.png",
      states: [
        {
          stateName: "Canada",
          slug: "canada",
          hotels: [
            {
              id: 21,
              name: "Maple Leaf Lodge",
              city: "Toronto",
              state: "ON",
              rating: 4.8,
              policies: "Designated consumption lounges. Government-licensed retailer on-site.",
              website: "https://example.com",
              priceRange: "$$",
            },
            {
              id: 22,
              name: "Rocky Mountain Retreat",
              city: "Vancouver",
              state: "BC",
              rating: 4.9,
              policies: "Balcony-friendly, pet-friendly, edible welcome kit.",
              website: "https://example.com",
              priceRange: "$$$",
            },
          ],
        },
      ],
    },
    {
      country: "Netherlands",
      slug: "netherlands",
      flagPath: "https://flagcdn.com/w40/nl.png",
      states: [
        {
          stateName: "Netherlands",
          slug: "netherlands",
          hotels: [
            {
              id: 31,
              name: "Canal View Cannabis Hotel",
              city: "Amsterdam",
              state: "NH",
              rating: 4.7,
              policies: "Coffee-shop partners, no tobacco inside, canal-view rooms.",
              website: "https://example.com",
              priceRange: "$$$",
            },
          ],
        },
      ],
    },
  ];
