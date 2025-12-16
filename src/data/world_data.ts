export const countryData: Record<string, CountryProfile> = {
  // ==================== NORTH AMERICA ====================
  'USA': {
    id: 'USA', isoCode: 'US', name: 'United States', slug: 'united-states', region: 'north-america',
    overview: { status: 'mixed', shortDescription: '24+ states legalized (CA, NY, CO), but federally illegal.', heroImage: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&q=80', lastUpdated: '2024-04-01' },
    legal: { possessionLimit: 'Varies', publicConsumption: 'private_only', medicalReciprocity: true, enforcement: 'varies', ageLimit: 21 },
    culture: { purchaseMethods: ['dispensary', 'delivery'], tourismFriendlyRating: 9 }
  },
  'Canada': {
    id: 'Canada', isoCode: 'CA', name: 'Canada', slug: 'canada', region: 'north-america',
    overview: { status: 'recreational', shortDescription: 'Fully legal nationwide. Government and private retailers.', heroImage: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&q=80', lastUpdated: '2023-10-17' },
    legal: { possessionLimit: '30g', publicConsumption: 'designated_areas', medicalReciprocity: false, enforcement: 'relaxed', ageLimit: 19 },
    culture: { purchaseMethods: ['dispensary', 'delivery'], tourismFriendlyRating: 10 }
  },
  'Mexico': {
    id: 'Mexico', isoCode: 'MX', name: 'Mexico', slug: 'mexico', region: 'north-america',
    overview: { status: 'decriminalized', shortDescription: 'Possession <5g is decriminalized. Retail market stalled.', heroImage: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=400&q=80', lastUpdated: '2024-01-01' },
    legal: { possessionLimit: '5g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 4 }
  },

  // ==================== CENTRAL AMERICA ====================
  'CostaRica': {
    id: 'CostaRica', isoCode: 'CR', name: 'Costa Rica', slug: 'costa-rica', region: 'central-america',
    overview: { status: 'decriminalized', shortDescription: 'Personal consumption tolerated in private.', heroImage: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: 'Small amounts', publicConsumption: 'private_only', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 6 }
  },
  'Panama': {
    id: 'Panama', isoCode: 'PA', name: 'Panama', slug: 'panama', region: 'central-america',
    overview: { status: 'medical', shortDescription: 'Medical legalized 2021. Recreational illegal.', heroImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80', lastUpdated: '2021-10-15' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['pharmacy'], tourismFriendlyRating: 3 }
  },
  'Belize': {
    id: 'Belize', isoCode: 'BZ', name: 'Belize', slug: 'belize', region: 'central-america',
    overview: { status: 'decriminalized', shortDescription: 'Up to 10g legal on private property.', heroImage: 'https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '10g', publicConsumption: 'private_only', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 7 }
  },
  'Guatemala': {
    id: 'Guatemala', isoCode: 'GT', name: 'Guatemala', slug: 'guatemala', region: 'central-america',
    overview: { status: 'illegal', shortDescription: 'Prison sentences for possession.', heroImage: 'https://images.unsplash.com/photo-1591377035549-9bf5c53f96e7?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 1 }
  },
  'ElSalvador': {
    id: 'ElSalvador', isoCode: 'SV', name: 'El Salvador', slug: 'el-salvador', region: 'central-america',
    overview: { status: 'illegal', shortDescription: 'State of Exception - Risk of arbitrary arrest.', heroImage: 'https://images.unsplash.com/photo-1612362954221-c8b8f6b3c30c?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'zero-tolerance' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 0 }
  },
  'Honduras': {
    id: 'Honduras', isoCode: 'HN', name: 'Honduras', slug: 'honduras', region: 'central-america',
    overview: { status: 'illegal', shortDescription: 'Strictly illegal, prison sentences.', heroImage: 'https://images.unsplash.com/photo-1572176596507-d0a9c1b79c40?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 1 }
  },
  'Nicaragua': {
    id: 'Nicaragua', isoCode: 'NI', name: 'Nicaragua', slug: 'nicaragua', region: 'central-america',
    overview: { status: 'illegal', shortDescription: 'Strictly illegal, severe penalties.', heroImage: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 1 }
  },

  // ==================== CARIBBEAN ====================
  'Jamaica': {
    id: 'Jamaica', isoCode: 'JM', name: 'Jamaica', slug: 'jamaica', region: 'caribbean',
    overview: { status: 'decriminalized', shortDescription: 'Decriminalized. Medical & Sacramental (Rasta) legal.', heroImage: 'https://images.unsplash.com/photo-1580995583564-3f47c0ab6d9e?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '2oz', publicConsumption: 'private_only', medicalReciprocity: true, enforcement: 'relaxed' },
    culture: { purchaseMethods: ['dispensary', 'street'], tourismFriendlyRating: 9 }
  },
  'Cuba': {
    id: 'Cuba', isoCode: 'CU', name: 'Cuba', slug: 'cuba', region: 'caribbean',
    overview: { status: 'illegal', shortDescription: 'Strictly illegal. Zero tolerance.', heroImage: 'https://images.unsplash.com/photo-1500759285222-a95626b934cb?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'zero-tolerance' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 1 }
  },
  'Bahamas': {
    id: 'Bahamas', isoCode: 'BS', name: 'Bahamas', slug: 'bahamas', region: 'caribbean',
    overview: { status: 'illegal', shortDescription: 'Strictly illegal, fines and deportation.', heroImage: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 2 }
  },
  'DominicanRepublic': {
    id: 'DominicanRepublic', isoCode: 'DO', name: 'Dominican Republic', slug: 'dominican-republic', region: 'caribbean',
    overview: { status: 'illegal', shortDescription: 'Strictly illegal.', heroImage: 'https://images.unsplash.com/photo-1504391975026-8f7ca1e4c7c0?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 2 }
  },
  'PuertoRico': {
    id: 'PuertoRico', isoCode: 'PR', name: 'Puerto Rico', slug: 'puerto-rico', region: 'caribbean',
    overview: { status: 'medical', shortDescription: 'Medical only. US Medical Cards accepted.', heroImage: 'https://images.unsplash.com/photo-1569402928262-a88b4a36e7cd?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: 'Medical only', publicConsumption: 'private_only', medicalReciprocity: true, enforcement: 'moderate' },
    culture: { purchaseMethods: ['dispensary'], tourismFriendlyRating: 7 }
  },
  'TrinidadTobago': {
    id: 'TrinidadTobago', isoCode: 'TT', name: 'Trinidad & Tobago', slug: 'trinidad-tobago', region: 'caribbean',
    overview: { status: 'decriminalized', shortDescription: 'Decriminalized up to 30g.', heroImage: 'https://images.unsplash.com/photo-1593882898826-89a4e9c2a54a?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '30g', publicConsumption: 'private_only', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['home_grow'], tourismFriendlyRating: 6 }
  },
  'Bermuda': {
    id: 'Bermuda', isoCode: 'BM', name: 'Bermuda', slug: 'bermuda', region: 'caribbean',
    overview: { status: 'recreational', shortDescription: 'Legalized 2022. No sales yet, home grow only.', heroImage: 'https://images.unsplash.com/photo-1574068468760-e9d9f3eb4ca4?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '7g', publicConsumption: 'private_only', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['home_grow'], tourismFriendlyRating: 5 }
  },

  // ==================== SOUTH AMERICA ====================
  'Uruguay': {
    id: 'Uruguay', isoCode: 'UY', name: 'Uruguay', slug: 'uruguay', region: 'south-america',
    overview: { status: 'recreational', shortDescription: 'Fully legal. Sales for residents only.', heroImage: 'https://images.unsplash.com/photo-1603057448655-d51ec3c8c1dc?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '40g/mo', publicConsumption: 'legal', medicalReciprocity: false, enforcement: 'relaxed' },
    culture: { purchaseMethods: ['pharmacy', 'social_club'], tourismFriendlyRating: 6 }
  },
  'Colombia': {
    id: 'Colombia', isoCode: 'CO', name: 'Colombia', slug: 'colombia', region: 'south-america',
    overview: { status: 'medical', shortDescription: 'Medical legal. Personal use (20g) decriminalized.', heroImage: 'https://images.unsplash.com/photo-1533699224246-a1e9a5bc8bfb?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '20g', publicConsumption: 'private_only', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['street', 'home_grow'], tourismFriendlyRating: 6 }
  },
  'Argentina': {
    id: 'Argentina', isoCode: 'AR', name: 'Argentina', slug: 'argentina', region: 'south-america',
    overview: { status: 'medical', shortDescription: 'Medical/Home grow (REPROCANN).', heroImage: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: 'REPROCANN only', publicConsumption: 'private_only', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['home_grow'], tourismFriendlyRating: 5 }
  },
  'Chile': {
    id: 'Chile', isoCode: 'CL', name: 'Chile', slug: 'chile', region: 'south-america',
    overview: { status: 'medical', shortDescription: 'Private consumption tolerated. Medical legal.', heroImage: 'https://images.unsplash.com/photo-1565013844965-b1eaeb2dcbb0?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: 'Private use', publicConsumption: 'private_only', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['home_grow'], tourismFriendlyRating: 5 }
  },
  'Brazil': {
    id: 'Brazil', isoCode: 'BR', name: 'Brazil', slug: 'brazil', region: 'south-america',
    overview: { status: 'decriminalized', shortDescription: 'Decriminalized up to 40g (2024).', heroImage: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&q=80', lastUpdated: '2024-07-01' },
    legal: { possessionLimit: '40g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 4 }
  },
  'Peru': {
    id: 'Peru', isoCode: 'PE', name: 'Peru', slug: 'peru', region: 'south-america',
    overview: { status: 'medical', shortDescription: 'Medical legal. Possession <8g not punished.', heroImage: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '8g', publicConsumption: 'private_only', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['pharmacy', 'street'], tourismFriendlyRating: 5 }
  },
  'Ecuador': {
    id: 'Ecuador', isoCode: 'EC', name: 'Ecuador', slug: 'ecuador', region: 'south-america',
    overview: { status: 'medical', shortDescription: 'Medical legal. Personal use (10g) tolerated.', heroImage: 'https://images.unsplash.com/photo-1570442296287-6e8ba16d0b2e?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '10g', publicConsumption: 'private_only', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 4 }
  },
  'Bolivia': {
    id: 'Bolivia', isoCode: 'BO', name: 'Bolivia', slug: 'bolivia', region: 'south-america',
    overview: { status: 'medical', shortDescription: 'Medical legal. Recreational illegal.', heroImage: 'https://images.unsplash.com/photo-1591133524085-f1a61c1f47ac?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 2 }
  },
  'Venezuela': {
    id: 'Venezuela', isoCode: 'VE', name: 'Venezuela', slug: 'venezuela', region: 'south-america',
    overview: { status: 'illegal', shortDescription: 'Crisis zone. Avoid.', heroImage: 'https://images.unsplash.com/photo-1568291607791-6a26c2de9e08?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'zero-tolerance' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 0 }
  },

  // ==================== EUROPE ====================
  'Germany': {
    id: 'Germany', isoCode: 'DE', name: 'Germany', slug: 'germany', region: 'europe',
    overview: { status: 'recreational', shortDescription: 'Legal to possess/grow. Clubs members only.', heroImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&q=80', lastUpdated: '2024-04-01' },
    legal: { possessionLimit: '25g', publicConsumption: 'designated_areas', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['social_club', 'home_grow'], tourismFriendlyRating: 6 }
  },
  'Netherlands': {
    id: 'Netherlands', isoCode: 'NL', name: 'Netherlands', slug: 'netherlands', region: 'europe',
    overview: { status: 'decriminalized', shortDescription: 'Coffeeshop culture. Tolerated.', heroImage: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '5g', publicConsumption: 'designated_areas', medicalReciprocity: false, enforcement: 'relaxed' },
    culture: { purchaseMethods: ['dispensary'], tourismFriendlyRating: 9 }
  },
  'Spain': {
    id: 'Spain', isoCode: 'ES', name: 'Spain', slug: 'spain', region: 'europe',
    overview: { status: 'decriminalized', shortDescription: 'Cannabis Social Clubs. Public use fined.', heroImage: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '100g (Private)', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['social_club'], tourismFriendlyRating: 8 }
  },
  'Portugal': {
    id: 'Portugal', isoCode: 'PT', name: 'Portugal', slug: 'portugal', region: 'europe',
    overview: { status: 'decriminalized', shortDescription: 'All drugs decriminalized (small amounts).', heroImage: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '25g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'relaxed' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 7 }
  },
  'France': {
    id: 'France', isoCode: 'FR', name: 'France', slug: 'france', region: 'europe',
    overview: { status: 'illegal', shortDescription: 'Strict. €200 on-the-spot fine.', heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 2 }
  },
  'UK': {
    id: 'UK', isoCode: 'GB', name: 'United Kingdom', slug: 'uk', region: 'europe',
    overview: { status: 'medical', shortDescription: 'Medical only. Class B drug.', heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 3 }
  },
  'Italy': {
    id: 'Italy', isoCode: 'IT', name: 'Italy', slug: 'italy', region: 'europe',
    overview: { status: 'decriminalized', shortDescription: 'Cannabis Light (CBD) legal. THC tolerated.', heroImage: 'https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: 'Small amount', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 5 }
  },
  'Switzerland': {
    id: 'Switzerland', isoCode: 'CH', name: 'Switzerland', slug: 'switzerland', region: 'europe',
    overview: { status: 'decriminalized', shortDescription: 'Legal <1% THC. Pilot trials active.', heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '10g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'relaxed' },
    culture: { purchaseMethods: ['dispensary'], tourismFriendlyRating: 7 }
  },
  'CzechRepublic': {
    id: 'CzechRepublic', isoCode: 'CZ', name: 'Czech Republic', slug: 'czech-republic', region: 'europe',
    overview: { status: 'decriminalized', shortDescription: 'Possession <10g is a fine only.', heroImage: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '10g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'relaxed' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 6 }
  },
  'Austria': {
    id: 'Austria', isoCode: 'AT', name: 'Austria', slug: 'austria', region: 'europe',
    overview: { status: 'decriminalized', shortDescription: 'Decriminalized personal use.', heroImage: 'https://images.unsplash.com/photo-1609856878074-cf31e21ccb6b?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: 'Small amounts', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'relaxed' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 5 }
  },
  'Belgium': {
    id: 'Belgium', isoCode: 'BE', name: 'Belgium', slug: 'belgium', region: 'europe',
    overview: { status: 'decriminalized', shortDescription: 'Up to 3g is lowest police priority.', heroImage: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '3g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'relaxed' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 5 }
  },
  'Malta': {
    id: 'Malta', isoCode: 'MT', name: 'Malta', slug: 'malta', region: 'europe',
    overview: { status: 'recreational', shortDescription: 'First in EU to legalize (Social Clubs).', heroImage: 'https://images.unsplash.com/photo-1555881400-69a8a0691b82?w=400&q=80', lastUpdated: '2021-12-14' },
    legal: { possessionLimit: '7g', publicConsumption: 'private_only', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['social_club'], tourismFriendlyRating: 6 }
  },
  'Luxembourg': {
    id: 'Luxembourg', isoCode: 'LU', name: 'Luxembourg', slug: 'luxembourg', region: 'europe',
    overview: { status: 'recreational', shortDescription: 'Home grow legal. Public use illegal.', heroImage: 'https://images.unsplash.com/photo-1577278219660-7fd07c82ea59?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '3g (Public)', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'relaxed' },
    culture: { purchaseMethods: ['home_grow'], tourismFriendlyRating: 5 }
  },
  'Ireland': {
    id: 'Ireland', isoCode: 'IE', name: 'Ireland', slug: 'ireland', region: 'europe',
    overview: { status: 'medical', shortDescription: 'Medical pilot. Recreational illegal.', heroImage: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 3 }
  },
  'Denmark': {
    id: 'Denmark', isoCode: 'DK', name: 'Denmark', slug: 'denmark', region: 'europe',
    overview: { status: 'medical', shortDescription: 'Christiania (Pusher Street) closed 2024.', heroImage: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=400&q=80', lastUpdated: '2024-04-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 4 }
  },
  'Sweden': {
    id: 'Sweden', isoCode: 'SE', name: 'Sweden', slug: 'sweden', region: 'europe',
    overview: { status: 'illegal', shortDescription: 'Zero tolerance. Drug tests common.', heroImage: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'zero-tolerance' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 1 }
  },
  'Norway': {
    id: 'Norway', isoCode: 'NO', name: 'Norway', slug: 'norway', region: 'europe',
    overview: { status: 'medical', shortDescription: 'Strictly medical. Recreational illegal.', heroImage: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 2 }
  },
  'Finland': {
    id: 'Finland', isoCode: 'FI', name: 'Finland', slug: 'finland', region: 'europe',
    overview: { status: 'medical', shortDescription: 'Strict. Medical rare.', heroImage: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 2 }
  },
  'Poland': {
    id: 'Poland', isoCode: 'PL', name: 'Poland', slug: 'poland', region: 'europe',
    overview: { status: 'medical', shortDescription: 'Medical prescription easy to get.', heroImage: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: 'Medical only', publicConsumption: 'private_only', medicalReciprocity: true, enforcement: 'moderate' },
    culture: { purchaseMethods: ['pharmacy'], tourismFriendlyRating: 6 }
  },
  'Greece': {
    id: 'Greece', isoCode: 'GR', name: 'Greece', slug: 'greece', region: 'europe',
    overview: { status: 'medical', shortDescription: 'Medical legalized. Recreational illegal.', heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['pharmacy'], tourismFriendlyRating: 4 }
  },
  'Turkey': {
    id: 'Turkey', isoCode: 'TR', name: 'Turkey', slug: 'turkey', region: 'europe',
    overview: { status: 'illegal', shortDescription: 'Strict penalties. Avoid.', heroImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 1 }
  },
  'Russia': {
    id: 'Russia', isoCode: 'RU', name: 'Russia', slug: 'russia', region: 'europe',
    overview: { status: 'illegal', shortDescription: 'Severe prison sentences.', heroImage: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'zero-tolerance' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 0 }
  },
  'Ukraine': {
    id: 'Ukraine', isoCode: 'UA', name: 'Ukraine', slug: 'ukraine', region: 'europe',
    overview: { status: 'medical', shortDescription: 'Medical legalized 2024.', heroImage: 'https://images.unsplash.com/photo-1561542320-9a18cd340469?w=400&q=80', lastUpdated: '2024-02-01' },
    legal: { possessionLimit: 'Medical only', publicConsumption: 'private_only', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['pharmacy'], tourismFriendlyRating: 3 }
  },
  'Croatia': {
    id: 'Croatia', isoCode: 'HR', name: 'Croatia', slug: 'croatia', region: 'europe',
    overview: { status: 'medical', shortDescription: 'Medical legal. Decriminalized personal use.', heroImage: 'https://images.unsplash.com/photo-1555990538-1e6c5549c81c?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: 'Small fine', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['pharmacy'], tourismFriendlyRating: 5 }
  },
  'Hungary': {
    id: 'Hungary', isoCode: 'HU', name: 'Hungary', slug: 'hungary', region: 'europe',
    overview: { status: 'illegal', shortDescription: 'Very strict laws.', heroImage: 'https://images.unsplash.com/photo-1551867633-194f125bddfa?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 1 }
  },
  'Romania': {
    id: 'Romania', isoCode: 'RO', name: 'Romania', slug: 'romania', region: 'europe',
    overview: { status: 'medical', shortDescription: 'Medical only (strict).', heroImage: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 2 }
  },

  // ==================== AFRICA ====================
  'SouthAfrica': {
    id: 'SouthAfrica', isoCode: 'ZA', name: 'South Africa', slug: 'south-africa', region: 'africa',
    overview: { status: 'decriminalized', shortDescription: 'Private use/grow legal. Sales illegal.', heroImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&q=80', lastUpdated: '2024-05-28' },
    legal: { possessionLimit: '100g', publicConsumption: 'private_only', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['social_club'], tourismFriendlyRating: 7 }
  },
  'Morocco': {
    id: 'Morocco', isoCode: 'MA', name: 'Morocco', slug: 'morocco', region: 'africa',
    overview: { status: 'illegal', shortDescription: 'Major hash producer. Illegal but tolerated in Rif.', heroImage: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'varies' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 6 }
  },
  'Egypt': {
    id: 'Egypt', isoCode: 'EG', name: 'Egypt', slug: 'egypt', region: 'africa',
    overview: { status: 'illegal', shortDescription: 'Strictly illegal. Harsh prisons.', heroImage: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 2 }
  },
  'Nigeria': {
    id: 'Nigeria', isoCode: 'NG', name: 'Nigeria', slug: 'nigeria', region: 'africa',
    overview: { status: 'illegal', shortDescription: 'Illegal.', heroImage: 'https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 2 }
  },
  'Ghana': {
    id: 'Ghana', isoCode: 'GH', name: 'Ghana', slug: 'ghana', region: 'africa',
    overview: { status: 'illegal', shortDescription: 'Illegal.', heroImage: 'https://images.unsplash.com/photo-1598890777032-6b7f7cc6a0a3?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 2 }
  },
  'Kenya': {
    id: 'Kenya', isoCode: 'KE', name: 'Kenya', slug: 'kenya', region: 'africa',
    overview: { status: 'illegal', shortDescription: 'Illegal but widely available.', heroImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 4 }
  },
  'Rwanda': {
    id: 'Rwanda', isoCode: 'RW', name: 'Rwanda', slug: 'rwanda', region: 'africa',
    overview: { status: 'medical', shortDescription: 'Medical legal. Recreational illegal.', heroImage: 'https://images.unsplash.com/photo-1628263118393-f6cdf3f5d0c9?w=400&q=80', lastUpdated: '2021-06-25' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['pharmacy'], tourismFriendlyRating: 2 }
  },
  'Malawi': {
    id: 'Malawi', isoCode: 'MW', name: 'Malawi', slug: 'malawi', region: 'africa',
    overview: { status: 'medical', shortDescription: 'Gold standard hash. Medical export legal.', heroImage: 'https://images.unsplash.com/photo-1613467656395-e32f94f21c5a?w=400&q=80', lastUpdated: '2020-02-27' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 5 }
  },
  'Zimbabwe': {
    id: 'Zimbabwe', isoCode: 'ZW', name: 'Zimbabwe', slug: 'zimbabwe', region: 'africa',
    overview: { status: 'medical', shortDescription: 'Medical legal.', heroImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80', lastUpdated: '2018-04-27' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 2 }
  },
  'Lesotho': {
    id: 'Lesotho', isoCode: 'LS', name: 'Lesotho', slug: 'lesotho', region: 'africa',
    overview: { status: 'medical', shortDescription: 'Major producer. Medical legal.', heroImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80', lastUpdated: '2017-05-12' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 4 }
  },

  // ==================== ASIA ====================
  'Thailand': {
    id: 'Thailand', isoCode: 'TH', name: 'Thailand', slug: 'thailand', region: 'asia',
    overview: { status: 'medical', shortDescription: 'Cannabis boom. Rules tightening 2024.', heroImage: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&q=80', lastUpdated: '2024-02-15' },
    legal: { possessionLimit: 'Unclear', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['dispensary'], tourismFriendlyRating: 8 }
  },
  'Japan': {
    id: 'Japan', isoCode: 'JP', name: 'Japan', slug: 'japan', region: 'asia',
    overview: { status: 'illegal', shortDescription: 'Zero tolerance. Prison for possession.', heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80', lastUpdated: '2023-12-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'zero-tolerance' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 0 }
  },
  'SouthKorea': {
    id: 'SouthKorea', isoCode: 'KR', name: 'South Korea', slug: 'south-korea', region: 'asia',
    overview: { status: 'medical', shortDescription: 'Strict medical only. Illegal recreational.', heroImage: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 1 }
  },
  'China': {
    id: 'China', isoCode: 'CN', name: 'China', slug: 'china', region: 'asia',
    overview: { status: 'illegal', shortDescription: 'Zero tolerance.', heroImage: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'zero-tolerance' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 0 }
  },
  'India': {
    id: 'India', isoCode: 'IN', name: 'India', slug: 'india', region: 'asia',
    overview: { status: 'mixed', shortDescription: 'Bhang is legal. Ganja varies by state.', heroImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: 'Varies', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'varies' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 6 }
  },
  'Indonesia': {
    id: 'Indonesia', isoCode: 'ID', name: 'Indonesia', slug: 'indonesia', region: 'asia',
    overview: { status: 'illegal', shortDescription: 'Death penalty possible. Avoid.', heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'zero-tolerance' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 0 }
  },
  'Malaysia': {
    id: 'Malaysia', isoCode: 'MY', name: 'Malaysia', slug: 'malaysia', region: 'asia',
    overview: { status: 'illegal', shortDescription: 'Death penalty for trafficking.', heroImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'zero-tolerance' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 0 }
  },
  'Singapore': {
    id: 'Singapore', isoCode: 'SG', name: 'Singapore', slug: 'singapore', region: 'asia',
    overview: { status: 'illegal', shortDescription: 'Death penalty. Do not bring residue.', heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=80', lastUpdated: '2024-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'zero-tolerance' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 0 }
  },
  'Philippines': {
    id: 'Philippines', isoCode: 'PH', name: 'Philippines', slug: 'philippines', region: 'asia',
    overview: { status: 'illegal', shortDescription: 'Harsh penalties.', heroImage: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 1 }
  },
  'Vietnam': {
    id: 'Vietnam', isoCode: 'VN', name: 'Vietnam', slug: 'vietnam', region: 'asia',
    overview: { status: 'illegal', shortDescription: 'Illegal but enforcement varies.', heroImage: 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 4 }
  },
  'UAE': {
    id: 'UAE', isoCode: 'AE', name: 'UAE', slug: 'uae', region: 'asia',
    overview: { status: 'illegal', shortDescription: 'Zero tolerance. Prison.', heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'zero-tolerance' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 0 }
  },
  'Israel': {
    id: 'Israel', isoCode: 'IL', name: 'Israel', slug: 'israel', region: 'asia',
    overview: { status: 'medical', shortDescription: 'Medical legal. Decriminalized.', heroImage: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '15g', publicConsumption: 'private_only', medicalReciprocity: true, enforcement: 'relaxed' },
    culture: { purchaseMethods: ['dispensary'], tourismFriendlyRating: 8 }
  },
  'Lebanon': {
    id: 'Lebanon', isoCode: 'LB', name: 'Lebanon', slug: 'lebanon', region: 'asia',
    overview: { status: 'medical', shortDescription: 'Medical cultivation legal (2020).', heroImage: 'https://images.unsplash.com/photo-1560797257-dcf33a9c2d35?w=400&q=80', lastUpdated: '2020-04-21' },
    legal: { possessionLimit: 'Small amounts', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 5 }
  },
  'Nepal': {
    id: 'Nepal', isoCode: 'NP', name: 'Nepal', slug: 'nepal', region: 'asia',
    overview: { status: 'illegal', shortDescription: 'Illegal but culturally present.', heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'moderate' },
    culture: { purchaseMethods: ['street'], tourismFriendlyRating: 6 }
  },
  'SriLanka': {
    id: 'SriLanka', isoCode: 'LK', name: 'Sri Lanka', slug: 'sri-lanka', region: 'asia',
    overview: { status: 'medical', shortDescription: 'Ayurvedic medical use only.', heroImage: 'https://images.unsplash.com/photo-1586423702687-0e29e1a5e577?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 3 }
  },

  // ==================== OCEANIA ====================
  'Australia': {
    id: 'Australia', isoCode: 'AU', name: 'Australia', slug: 'australia', region: 'oceania',
    overview: { status: 'mixed', shortDescription: 'Medical legal. Recreational legal in ACT.', heroImage: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '50g (ACT)', publicConsumption: 'private_only', medicalReciprocity: true, enforcement: 'moderate' },
    culture: { purchaseMethods: ['pharmacy', 'home_grow'], tourismFriendlyRating: 6 }
  },
  'NewZealand': {
    id: 'NewZealand', isoCode: 'NZ', name: 'New Zealand', slug: 'new-zealand', region: 'oceania',
    overview: { status: 'medical', shortDescription: 'Medical legal. Referendum failed.', heroImage: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: true, enforcement: 'moderate' },
    culture: { purchaseMethods: ['pharmacy'], tourismFriendlyRating: 6 }
  },
  'Fiji': {
    id: 'Fiji', isoCode: 'FJ', name: 'Fiji', slug: 'fiji', region: 'oceania',
    overview: { status: 'illegal', shortDescription: 'Strictly illegal.', heroImage: 'https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['none'], tourismFriendlyRating: 2 }
  },
  'Samoa': {
    id: 'Samoa', isoCode: 'WS', name: 'Samoa', slug: 'samoa', region: 'oceania',
    overview: { status: 'medical', shortDescription: 'Medical legal (2023).', heroImage: 'https://images.unsplash.com/photo-1579023154615-c3e3e39c4e50?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['pharmacy'], tourismFriendlyRating: 3 }
  },
  'Vanuatu': {
    id: 'Vanuatu', isoCode: 'VU', name: 'Vanuatu', slug: 'vanuatu', region: 'oceania',
    overview: { status: 'medical', shortDescription: 'Medical legal (2023).', heroImage: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400&q=80', lastUpdated: '2023-01-01' },
    legal: { possessionLimit: '0g', publicConsumption: 'illegal', medicalReciprocity: false, enforcement: 'strict' },
    culture: { purchaseMethods: ['pharmacy'], tourismFriendlyRating: 3 }
  },
};
