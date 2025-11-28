// src/lib/dispensary_data.ts

interface Dispensary {
  id: number;
  name: string;
  city: string;
  state: string;
  rating: number;
  specialty: string; // e.g., "Medical & Recreational", "Recreational Only"
  website: string;
  flag: string;
  priceRange?: string;
}

interface StateDispensaries {
  state: string;
  slug: string;
  flag: string;
  dispensaries: Dispensary[];
}

export interface CountryData {
  country: string;
  slug: string;
  flag: string;
  states: StateDispensaries[];
}

export const DISPENSARY_DATA: CountryData[] = [
  // USA – notable cannabis states
  {
    country: "USA",
    slug: "usa",
    flag: "https://flagcdn.com/w40/us.png",
    states: [
      {
        state: "California",
        slug: "california",
        flag: "https://flagcdn.com/w40/us.png",
        dispensaries: [
          {
            id: 11,
            name: "The Green Door",
            city: "Los Angeles",
            state: "CA",
            rating: 4.9,
            specialty: "Recreational & Medical",
            website: "https://example.com",
            flag: "https://flagcdn.com/w40/us.png",
            priceRange: "$$$",
          },
          {
            id: 12,
            name: "Bloom Room",
            city: "San Francisco",
            state: "CA",
            rating: 4.7,
            specialty: "Recreational Only",
            website: "https://example.com",
            flag: "https://flagcdn.com/w40/us.png",
            priceRange: "$$",
          },
        ],
      },
      {
        state: "Colorado",
        slug: "colorado",
        flag: "https://flagcdn.com/w40/us.png",
        dispensaries: [
          {
            id: 13,
            name: "Native Roots",
            city: "Denver",
            state: "CO",
            rating: 4.8,
            specialty: "Recreational & Medical",
            website: "https://example.com",
            flag: "https://flagcdn.com/w40/us.png",
            priceRange: "$$",
          },
        ],
      },
    ],
  },
  // Canada
  {
      country: "Canada",
      slug: "canada",
      flag: "https://flagcdn.com/w40/ca.png",
      states: [
        {
          state: "Canada",
          slug: "canada",
          flag: "https://flagcdn.com/w40/ca.png",
          dispensaries: [
            {
              id: 21,
              name: "Tokyo Smoke",
              city: "Toronto",
              state: "ON",
              rating: 4.5,
              specialty: "Recreational Only",
              website: "https://example.com",
              flag: "https://flagcdn.com/w40/ca.png",
              priceRange: "$$",
            },
          ],
        },
      ],
    },
];
