// src/data/world_data.ts
import { getStatusHexColor } from '@/lib/legal-status-colors';

// --- Types ---
export type LegalStatus = 'recreational' | 'medical' | 'decriminalized' | 'illegal' | 'mixed';
export type EnforcementLevel = 'zero-tolerance' | 'strict' | 'moderate' | 'relaxed' | 'varies';
export type PurchaseMethod = 'dispensary' | 'social_club' | 'pharmacy' | 'home_grow' | 'delivery' | 'street' | 'none';

export interface CountryProfile {
  id: string;
  isoCode: string;
  name: string;
  slug: string;
  region: 'north-america' | 'south-america' | 'central-america' | 'europe' | 'asia' | 'africa' | 'oceania' | 'caribbean';
  overview: {
    status: LegalStatus;
    shortDescription: string;
    heroImage: string;
    lastUpdated: string;
  };
  legal: {
    possessionLimit: string;
    publicConsumption: 'legal' | 'designated_areas' | 'private_only' | 'illegal';
    medicalReciprocity: boolean;
    enforcement: EnforcementLevel;
    ageLimit?: number;
  };
  culture: {
    purchaseMethods: PurchaseMethod[];
    tourismFriendlyRating: number;
    localSlang?: string[];
  };
}

// --- Data ---
export const countryData: Record<string, CountryProfile> = {
  'USA': {
    id: 'USA',
    isoCode: 'US',
    name: 'United States',
    slug: 'united-states',
    region: 'north-america',
    overview: {
      status: 'mixed',
      shortDescription: '24+ states legalized (CA, NY, CO), but federally illegal.',
      heroImage: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&q=80',
      lastUpdated: '2024-04-01',
    },
    legal: {
      possessionLimit: 'Varies by state',
      publicConsumption: 'private_only',
      medicalReciprocity: true,
      enforcement: 'varies',
      ageLimit: 21,
    },
    culture: {
      purchaseMethods: ['dispensary', 'delivery', 'home_grow'],
      tourismFriendlyRating: 9,
      localSlang: ['Weed', 'Pot', 'Gas', 'Bud'],
    },
  },
  'Canada': {
    id: 'Canada',
    isoCode: 'CA',
    name: 'Canada',
    slug: 'canada',
    region: 'north-america',
    overview: {
      status: 'recreational',
      shortDescription: 'Fully legal nationwide. Government and private retailers available.',
      heroImage: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&q=80',
      lastUpdated: '2023-10-17',
    },
    legal: {
      possessionLimit: '30g public',
      publicConsumption: 'designated_areas',
      medicalReciprocity: false,
      enforcement: 'relaxed',
      ageLimit: 19,
    },
    culture: {
      purchaseMethods: ['dispensary', 'delivery', 'home_grow'],
      tourismFriendlyRating: 10,
    },
  },
  'Mexico': {
    id: 'Mexico',
    isoCode: 'MX',
    name: 'Mexico',
    slug: 'mexico',
    region: 'north-america',
    overview: {
      status: 'decriminalized',
      shortDescription: 'Technically legal but retail market stalls. Possession <5g is decriminalized.',
      heroImage: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=400&q=80',
      lastUpdated: '2024-01-01',
    },
    legal: {
      possessionLimit: '5g',
      publicConsumption: 'illegal',
      medicalReciprocity: false,
      enforcement: 'moderate',
    },
    culture: {
      purchaseMethods: ['street'],
      tourismFriendlyRating: 4,
      localSlang: ['Mota'],
    },
  },
  'Germany': {
    id: 'Germany',
    isoCode: 'DE',
    name: 'Germany',
    slug: 'germany',
    region: 'europe',
    overview: {
      status: 'recreational',
      shortDescription: 'Legal to possess and grow (Apr 2024). No tourist sales (Social Clubs members only).',
      heroImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&q=80',
      lastUpdated: '2024-04-01',
    },
    legal: {
      possessionLimit: '25g public / 50g private',
      publicConsumption: 'designated_areas',
      medicalReciprocity: false,
      enforcement: 'moderate',
      ageLimit: 18,
    },
    culture: {
      purchaseMethods: ['social_club', 'home_grow'],
      tourismFriendlyRating: 6,
    },
  },
  'Netherlands': {
    id: 'Netherlands',
    isoCode: 'NL',
    name: 'Netherlands',
    slug: 'netherlands',
    region: 'europe',
    overview: {
      status: 'decriminalized',
      shortDescription: 'World famous Coffeeshop culture. Technically illegal but "tolerated".',
      heroImage: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&q=80',
      lastUpdated: '2023-01-01',
    },
    legal: {
      possessionLimit: '5g',
      publicConsumption: 'designated_areas',
      medicalReciprocity: false,
      enforcement: 'relaxed',
      ageLimit: 18,
    },
    culture: {
      purchaseMethods: ['dispensary'],
      tourismFriendlyRating: 9,
      localSlang: ['Wiet', 'Hasj'],
    },
  },
  'Thailand': {
    id: 'Thailand',
    isoCode: 'TH',
    name: 'Thailand',
    slug: 'thailand',
    region: 'asia',
    overview: {
      status: 'medical',
      shortDescription: 'Cannabis boom shifting back to Medical/Health focus in 2024.',
      heroImage: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&q=80',
      lastUpdated: '2024-02-15',
    },
    legal: {
      possessionLimit: 'Unclear',
      publicConsumption: 'illegal',
      medicalReciprocity: false,
      enforcement: 'moderate',
    },
    culture: {
      purchaseMethods: ['dispensary'],
      tourismFriendlyRating: 8,
      localSlang: ['Ganja'],
    },
  },
  'Japan': {
    id: 'Japan',
    isoCode: 'JP',
    name: 'Japan',
    slug: 'japan',
    region: 'asia',
    overview: {
      status: 'illegal',
      shortDescription: 'Zero tolerance. Risk of deportation and prison.',
      heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80',
      lastUpdated: '2023-12-01',
    },
    legal: {
      possessionLimit: '0g',
      publicConsumption: 'illegal',
      medicalReciprocity: false,
      enforcement: 'zero-tolerance',
    },
    culture: {
      purchaseMethods: ['none'],
      tourismFriendlyRating: 0,
    },
  },
  'Uruguay': {
    id: 'Uruguay',
    isoCode: 'UY',
    name: 'Uruguay',
    slug: 'uruguay',
    region: 'south-america',
    overview: {
      status: 'recreational',
      shortDescription: 'First country to legalize. Sales are for residents/citizens only.',
      heroImage: 'https://images.unsplash.com/photo-1603057448655-d51ec3c8c1dc?w=400&q=80',
      lastUpdated: '2023-01-01',
    },
    legal: {
      possessionLimit: '40g/month (Registered)',
      publicConsumption: 'legal',
      medicalReciprocity: false,
      enforcement: 'relaxed',
    },
    culture: {
      purchaseMethods: ['pharmacy', 'social_club', 'home_grow'],
      tourismFriendlyRating: 5,
    },
  },
  'SouthAfrica': {
    id: 'SouthAfrica',
    isoCode: 'ZA',
    name: 'South Africa',
    slug: 'south-africa',
    region: 'africa',
    overview: {
      status: 'decriminalized',
      shortDescription: 'Private use and cultivation legal (2018 ruling). Buying/selling remains illegal.',
      heroImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&q=80',
      lastUpdated: '2024-05-28',
    },
    legal: {
      possessionLimit: '100g public / 600g private',
      publicConsumption: 'private_only',
      medicalReciprocity: false,
      enforcement: 'moderate',
    },
    culture: {
      purchaseMethods: ['social_club', 'home_grow'],
      tourismFriendlyRating: 7,
      localSlang: ['Dagga'],
    },
  },
  'Australia': {
    id: 'Australia',
    isoCode: 'AU',
    name: 'Australia',
    slug: 'australia',
    region: 'oceania',
    overview: {
      status: 'mixed',
      shortDescription: 'Medical federal legal. Recreational legal in ACT (Canberra) only.',
      heroImage: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400&q=80',
      lastUpdated: '2023-01-01',
    },
    legal: {
      possessionLimit: '50g (ACT only)',
      publicConsumption: 'private_only',
      medicalReciprocity: true,
      enforcement: 'moderate',
    },
    culture: {
      purchaseMethods: ['pharmacy', 'home_grow'],
      tourismFriendlyRating: 6,
    },
  },
  // Add other countries here...
};
