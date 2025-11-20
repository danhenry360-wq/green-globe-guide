// lib/usa_state_data.ts
export interface CityData {
  name: string;
  slug: string;
  type: 'major' | 'medium' | 'notable';
  content: string;
}

export interface StateData {
  id: number;
  name: string;
  slug: string;
  status: 'recreational' | 'medical' | 'decriminalized' | 'illegal';
  possession_limits: string | null;
  age_requirement: string | null;
  purchase_rules: string | null;
  penalties: string | null;
  consumption_rules: string | null;
  dispensary_guide: string | null;
  travel_rules: string | null;
  subtitle: string | null;
  traveler_summary?: string;
  consumption_summary?: string;
  dispensary_access?: string;
  cities: CityData[];
}

export const USA_STATE_DATA: StateData[] = [
  { 
    id: 1, 
    name: 'Alabama', 
    slug: 'alabama', 
    status: 'illegal', 
    possession_limits: 'Any amount is a misdemeanor/felony.', 
    age_requirement: null, 
    purchase_rules: null, 
    penalties: 'Strict penalties. Decriminalization efforts failed.', 
    consumption_rules: 'Strictly prohibited in public.', 
    dispensary_guide: 'No legal dispensaries.', 
    travel_rules: 'Do not cross state lines with cannabis.', 
    subtitle: 'The Heart of Dixie: Strict cannabis laws.', 
    cities: [
      { name: 'Birmingham', slug: 'birmingham', type: 'major', content: 'As the largest city, Birmingham is the cultural and economic hub of Alabama. While cannabis remains illegal, the city has a progressive, albeit cautious, atmosphere. Travelers should be extremely careful, as penalties are severe. Focus on the city\'s vibrant food scene and civil rights history instead of cannabis tourism.' },
      { name: 'Montgomery', slug: 'montgomery', type: 'medium', content: 'The state capital and heart of the Civil Rights Movement. Law enforcement is strict. Visitors should be aware that possession of any amount is a serious offense. The city is a historical destination, not a cannabis one.' },
    ]
  },
  { 
    id: 2, 
    name: 'Alaska', 
    slug: 'alaska', 
    status: 'recreational', 
    possession_limits: '1 oz (flower), 7g (concentrate).', 
    age_requirement: '21+', 
    purchase_rules: 'Licensed dispensaries only.', 
    penalties: 'Minor offenses are civil fines.', 
    consumption_rules: 'Private property only. Public consumption is illegal.', 
    dispensary_guide: 'Legal recreational dispensaries are open.', 
    travel_rules: 'Illegal to consume on federal land (e.g., national parks).', 
    subtitle: 'The Last Frontier: Recreational cannabis is legal.', 
    cities: [
      { name: 'Anchorage', slug: 'anchorage', type: 'major', content: 'Alaska\'s largest city and a hub for cannabis tourism. Numerous dispensaries are available. Focus on private consumption, as public use is strictly prohibited. Enjoy the vast wilderness and local culture.' },
      { name: 'Juneau', slug: 'juneau', type: 'medium', content: 'The state capital, accessible only by air or sea. Has a smaller selection of dispensaries. Consumption must be private. A beautiful, remote destination for nature lovers.' },
    ]
  },
  { 
    id: 3, 
    name: 'Arizona', 
    slug: 'arizona', 
    status: 'recreational', 
    possession_limits: '1 oz (flower), 5g (concentrate).', 
    age_requirement: '21+', 
    purchase_rules: 'Licensed dispensaries only.', 
    penalties: 'Minor offenses are civil fines.', 
    consumption_rules: 'Private property only. Public consumption is illegal.', 
    dispensary_guide: 'Legal recreational dispensaries are open.', 
    travel_rules: 'Illegal to consume on federal land.', 
    subtitle: 'The Grand Canyon State: Recreational cannabis is legal.', 
    cities: [
      { name: 'Phoenix', slug: 'phoenix', type: 'major', content: 'The capital and largest city, offering a wide array of dispensaries and cannabis-friendly events. Be mindful of public consumption laws, especially around tourist areas. Excellent destination for desert landscapes and city life.' },
      { name: 'Tucson', slug: 'tucson', type: 'medium', content: 'Home to the University of Arizona and a more relaxed atmosphere. Several dispensaries are available. Great for exploring the Sonoran Desert and local art scene.' },
    ]
  },
  { 
    id: 4, 
    name: 'Arkansas', 
    slug: 'arkansas', 
    status: 'medical', 
    possession_limits: '2.5 oz every 14 days (medical).', 
    age_requirement: '18+ with medical card.', 
    purchase_rules: 'Licensed medical dispensaries only.', 
    penalties: 'Strict penalties for non-medical use.', 
    consumption_rules: 'Private property only. Public consumption is illegal.', 
    dispensary_guide: 'Medical dispensaries are open.', 
    travel_rules: 'Medical card not recognized for non-residents.', 
    subtitle: 'The Natural State: Medical cannabis is legal.', 
    cities: [
      { name: 'Little Rock', slug: 'little-rock', type: 'major', content: 'The capital and central hub for medical cannabis in Arkansas. Visitors must have a valid state medical card to purchase. Focus on the city\'s history and riverfront activities.' },
      { name: 'Fayetteville', slug: 'fayetteville', type: 'medium', content: 'Home to the University of Arkansas. Progressive city with medical dispensaries. Strict adherence to medical-only laws is essential.' },
    ]
  },
  { 
    id: 5, 
    name: 'California', 
    slug: 'california', 
    status: 'recreational', 
    possession_limits: '1 oz (flower), 8g (concentrate).', 
    age_requirement: '21+', 
    purchase_rules: 'Licensed dispensaries only.', 
    penalties: 'Minor offenses are civil fines.', 
    consumption_rules: 'Private property only. Public consumption is illegal.', 
    dispensary_guide: 'Legal recreational dispensaries are open.', 
    travel_rules: 'Illegal to consume on federal land.', 
    subtitle: 'The Golden State: Recreational cannabis is legal.', 
    cities: [
      { name: 'Los Angeles', slug: 'los-angeles', type: 'major', content: 'The epicenter of cannabis culture. Countless dispensaries, consumption lounges, and 420-friendly hotels. Be aware of the complex local regulations and strict public consumption laws.' },
      { name: 'San Francisco', slug: 'san-francisco', type: 'major', content: 'A historic cannabis destination with a wide range of products and experiences. Known for its progressive attitude, but public consumption is still illegal. Explore the city\'s unique neighborhoods.' },
      { name: 'San Diego', slug: 'san-diego', type: 'major', content: 'Southern California\'s major city with a laid-back beach vibe. Many dispensaries are available. Focus on private consumption and enjoying the coastal scenery.' },
    ]
  },
  { 
    id: 6, 
    name: 'Colorado', 
    slug: 'colorado', 
    status: 'recreational', 
    possession_limits: '1 oz (flower), 8g (concentrate).', 
    age_requirement: '21+', 
    purchase_rules: 'Licensed dispensaries only.', 
    penalties: 'Minor offenses are civil fines.', 
    consumption_rules: 'Private property only. Public consumption is illegal.', 
    dispensary_guide: 'Legal recreational dispensaries are open.', 
    travel_rules: 'Illegal to consume on federal land.', 
    subtitle: 'The Centennial State: Recreational cannabis is legal.', 
    cities: [
      { name: 'Denver', slug: 'denver', type: 'major', content: 'The cannabis capital of Colorado with numerous dispensaries and a vibrant cannabis culture. Home to many cannabis events and tours. Be mindful of public consumption laws and enjoy the city\'s many cannabis-friendly accommodations.' },
      { name: 'Boulder', slug: 'boulder', type: 'medium', content: 'A progressive college town with several dispensaries. Known for its outdoor activities and cannabis-friendly atmosphere. Popular among both students and cannabis tourists.' },
    ]
  },
  { 
    id: 7, 
    name: 'Connecticut', 
    slug: 'connecticut', 
    status: 'recreational', 
    possession_limits: '1.5 oz (flower) on person, 5 oz at home.', 
    age_requirement: '21+', 
    purchase_rules: 'Licensed dispensaries only.', 
    penalties: 'Minor offenses are civil fines.', 
    consumption_rules: 'Private property only. Public consumption is illegal.', 
    dispensary_guide: 'Legal recreational dispensaries are open.', 
    travel_rules: 'Do not cross state lines with cannabis.', 
    subtitle: 'The Constitution State: Recreational cannabis is legal.', 
    cities: [
      { name: 'Hartford', slug: 'hartford', type: 'major', content: 'The state capital with legal recreational cannabis. Several dispensaries serve both medical and recreational customers. Enjoy the city\'s historic architecture and cultural attractions.' },
      { name: 'New Haven', slug: 'new-haven', type: 'medium', content: 'Home to Yale University and a growing cannabis scene. Dispensaries are available throughout the city. A great destination for both education and responsible cannabis consumption.' },
    ]
  },
  { 
    id: 8, 
    name: 'Delaware', 
    slug: 'delaware', 
    status: 'recreational', 
    possession_limits: '1 oz (flower).', 
    age_requirement: '21+', 
    purchase_rules: 'Licensed dispensaries only.', 
    penalties: 'Minor offenses are civil fines.', 
    consumption_rules: 'Private property only. Public consumption is illegal.', 
    dispensary_guide: 'Legal recreational dispensaries are open.', 
    travel_rules: 'Do not cross state lines with cannabis.', 
    subtitle: 'The First State: Recreational cannabis is legal.', 
    cities: [
      { name: 'Wilmington', slug: 'wilmington', type: 'major', content: 'Delaware\'s largest city with legal recreational cannabis. Dispensaries are available throughout the area. Enjoy the city\'s riverfront and historic districts.' },
      { name: 'Dover', slug: 'dover', type: 'medium', content: 'The state capital with cannabis dispensaries serving both medical and recreational customers. A quieter alternative to Wilmington with good access to legal cannabis.' },
    ]
  },
  { 
    id: 9, 
    name: 'Florida', 
    slug: 'florida', 
    status: 'medical', 
    possession_limits: 'Varies by doctor recommendation (medical).', 
    age_requirement: '18+ with medical card.', 
    purchase_rules: 'Licensed medical dispensaries only.', 
    penalties: 'Strict penalties for non-medical use.', 
    consumption_rules: 'Private property only. Public consumption is illegal.', 
    dispensary_guide: 'Medical dispensaries are open.', 
    travel_rules: 'Medical card not recognized for non-residents.', 
    subtitle: 'The Sunshine State: Medical cannabis is legal.', 
    cities: [
      { name: 'Miami', slug: 'miami', type: 'major', content: 'A major tourist destination with medical cannabis dispensaries. Visitors must have a valid Florida medical card. Enjoy the beaches and nightlife while being mindful of cannabis laws.' },
      { name: 'Orlando', slug: 'orlando', type: 'major', content: 'Home to major theme parks and medical cannabis access. Numerous dispensaries serve medical patients. Remember that public consumption is strictly prohibited.' },
    ]
  },
  { 
    id: 10, 
    name: 'Georgia', 
    slug: 'georgia', 
    status: 'medical', 
    possession_limits: '20 fl oz of low-THC oil (medical).', 
    age_requirement: '18+ with medical card.', 
    purchase_rules: 'Licensed low-THC dispensaries only.', 
    penalties: 'Strict penalties for non-medical use.', 
    consumption_rules: 'Strictly prohibited in public.', 
    dispensary_guide: 'Low-THC oil dispensaries are open.', 
    travel_rules: 'Do not cross state lines with cannabis.', 
    subtitle: 'The Peach State: Low-THC oil is legal for medical use.', 
    cities: [
      { name: 'Atlanta', slug: 'atlanta', type: 'major', content: 'The capital and largest city with limited medical cannabis access (low-THC oil only). Strict regulations apply. Focus on the city\'s rich history and cultural attractions.' },
      { name: 'Savannah', slug: 'savannah', type: 'medium', content: 'A historic coastal city with the same limited medical cannabis access as the rest of Georgia. Known for its beautiful architecture and Southern charm.' },
    ]
  },
  { 
    id: 11, 
    name: 'Hawaii', 
    slug: 'hawaii', 
    status: 'medical', 
    possession_limits: '4 oz every 15 days (medical).', 
    age_requirement: '18+ with medical card.', 
    purchase_rules: 'Licensed medical dispensaries only.', 
    penalties: 'Decriminalized for small amounts (non-medical).', 
    consumption_rules: 'Private property only. Public consumption is illegal.', 
    dispensary_guide: 'Medical dispensaries are open.', 
    travel_rules: 'Illegal to consume on federal land (e.g., national parks).', 
    subtitle: 'The Aloha State: Medical cannabis is legal.', 
    cities: [
      { name: 'Honolulu', slug: 'honolulu', type: 'major', content: 'The capital and main hub for medical cannabis in Hawaii. Several dispensaries serve medical patients. Enjoy the beautiful beaches while being mindful of consumption laws.' },
      { name: 'Lahaina', slug: 'lahaina', type: 'notable', content: 'A historic whaling town on Maui with medical cannabis access. Strict public consumption laws apply in this popular tourist destination.' },
    ]
  },
  { 
    id: 12, 
    name: 'Idaho', 
    slug: 'idaho', 
    status: 'illegal', 
    possession_limits: 'Any amount is a misdemeanor/felony.', 
    age_requirement: null, 
    purchase_rules: null, 
    penalties: 'Strict penalties. One of the strictest states.', 
    consumption_rules: 'Strictly prohibited in public.', 
    dispensary_guide: 'No legal dispensaries.', 
    travel_rules: 'Do not cross state lines with cannabis.', 
    subtitle: 'The Gem State: Strictly illegal.', 
    cities: [
      { name: 'Boise', slug: 'boise', type: 'major', content: 'The state capital with zero tolerance for cannabis. Law enforcement is strict, and penalties are severe. Focus on outdoor activities and the city\'s vibrant downtown instead.' },
      { name: 'Idaho Falls', slug: 'idaho-falls', type: 'notable', content: 'A conservative city with strict cannabis laws. Not a destination for cannabis tourism under any circumstances.' },
    ]
  },
  { 
    id: 13, 
    name: 'Illinois', 
    slug: 'illinois', 
    status: 'recreational', 
    possession_limits: '30g (flower), 5g (concentrate) for residents.', 
    age_requirement: '21+', 
    purchase_rules: 'Licensed dispensaries only.', 
    penalties: 'Minor offenses are civil fines.', 
    consumption_rules: 'Private property only. Public consumption is illegal.', 
    dispensary_guide: 'Legal recreational dispensaries are open.', 
    travel_rules: 'Do not cross state lines with cannabis.', 
    subtitle: 'The Prairie State: Recreational cannabis is legal.', 
    cities: [
      { name: 'Chicago', slug: 'chicago', type: 'major', content: 'A major metropolitan area with numerous recreational dispensaries. Enjoy the city\'s world-class attractions while being mindful of public consumption laws. Many cannabis-friendly accommodations available.' },
      { name: 'Springfield', slug: 'springfield', type: 'medium', content: 'The state capital with legal recreational cannabis. Several dispensaries serve both residents and visitors. Explore Lincoln history while enjoying legal cannabis access.' },
    ]
  },
  { 
    id: 14, 
    name: 'Indiana', 
    slug: 'indiana', 
    status: 'illegal', 
    possession_limits: 'Any amount is a misdemeanor/felony.', 
    age_requirement: null, 
    purchase_rules: null, 
    penalties: 'Strict penalties. Decriminalization efforts failed.', 
    consumption_rules: 'Strictly prohibited in public.', 
    dispensary_guide: 'No legal dispensaries.', 
    travel_rules: 'Do not cross state lines with cannabis.', 
    subtitle: 'The Hoosier State: Strictly illegal.', 
    cities: [
      { name: 'Indianapolis', slug: 'indianapolis', type: 'major', content: 'The state capital with strict cannabis laws. Possession of any amount can lead to serious legal consequences. Focus on the city\'s sports culture and museums instead.' },
      { name: 'Fort Wayne', slug: 'fort-wayne', type: 'medium', content: 'Indiana\'s second-largest city with zero tolerance for cannabis. Law enforcement takes cannabis offenses seriously.' },
    ]
  },
  { 
    id: 15, 
    name: 'Iowa', 
    slug: 'iowa', 
    status: 'medical', 
    possession_limits: 'Varies by doctor recommendation (medical).', 
    age_requirement: '18+ with medical card.', 
    purchase_rules: 'Licensed medical dispensaries only.', 
    penalties: 'Strict penalties for non-medical use.', 
    consumption_rules: 'Strictly prohibited in public.', 
    dispensary_guide: 'Medical dispensaries are open.', 
    travel_rules: 'Medical card not recognized for non-residents.', 
    subtitle: 'The Hawkeye State: Medical cannabis is legal.', 
    cities: [
      { name: 'Des Moines', slug: 'des-moines', type: 'major', content: 'The state capital with medical cannabis access. Visitors must have a valid Iowa medical card to purchase. Enjoy the city\'s cultural attractions and farm-to-table dining.' },
      { name: 'Cedar Rapids', slug: 'cedar-rapids', type: 'medium', content: 'Iowa\'s second-largest city with medical cannabis dispensaries. Strict medical-only laws apply throughout the state.' },
    ]
  },
  { 
    id: 16, 
    name: 'Kansas', 
    slug: 'kansas', 
    status: 'illegal', 
    possession_limits: 'Any amount is a misdemeanor/felony.', 
    age_requirement: null, 
    purchase_rules: null, 
    penalties: 'Strict penalties. One of the strictest states.', 
    consumption_rules: 'Strictly prohibited in public.', 
    dispensary_guide: 'No legal dispensaries.', 
    travel_rules: 'Do not cross state lines with cannabis.', 
    subtitle: 'The Sunflower State: Strictly illegal.', 
    cities: [
      { name: 'Wichita', slug: 'wichita', type: 'major', content: 'The largest city in Kansas with zero tolerance for cannabis. Law enforcement is strict, and penalties are severe. Not a cannabis tourism destination.' },
      { name: 'Kansas City', slug: 'kansas-city-kansas', type: 'medium', content: 'Note: This is the Kansas side of Kansas City. Strict cannabis laws apply. The Missouri side has legal recreational cannabis.' },
    ]
  },
  { 
    id: 17, 
    name: 'Kentucky', 
    slug: 'kentucky', 
    status: 'medical', 
    possession_limits: 'Varies by doctor recommendation (medical).', 
    age_requirement: '18+ with medical card.', 
    purchase_rules: 'Licensed medical dispensaries only (sales starting 2025).', 
    penalties: 'Strict penalties for non-medical use.', 
    consumption_rules: 'Strictly prohibited in public.', 
    dispensary_guide: 'Sales are pending. No current dispensaries.', 
    travel_rules: 'Do not cross state lines with cannabis.', 
    subtitle: 'The Bluegrass State: Medical cannabis is legal (sales pending).', 
    cities: [
      { name: 'Louisville', slug: 'louisville', type: 'major', content: 'The largest city in Kentucky with medical cannabis laws passed but sales not yet started (expected 2025). Currently, no legal dispensaries are operating.' },
      { name: 'Lexington', slug: 'lexington', type: 'medium', content: 'Known for horse racing and bourbon. Medical cannabis sales are expected to begin in 2025. Currently, no legal access available.' },
    ]
  },
  { 
    id: 18, 
    name: 'Louisiana', 
    slug: 'louisiana', 
    status: 'medical', 
    possession_limits: 'Varies by doctor recommendation (medical).', 
    age_requirement: '18+ with medical card.', 
    purchase_rules: 'Licensed medical dispensaries only.', 
    penalties: 'Decriminalized for small amounts (non-medical).', 
    consumption_rules: 'Strictly prohibited in public.', 
    dispensary_guide: 'Medical dispensaries are open.', 
    travel_rules: 'Medical card not recognized for non-residents.', 
    subtitle: 'The Pelican State: Medical cannabis is legal.', 
    cities: [
      { name: 'New Orleans', slug: 'new-orleans', type: 'major', content: 'A major tourist destination with medical cannabis access. Visitors must have a valid Louisiana medical card. Enjoy the city\'s famous music and food scene responsibly.' },
      { name: 'Baton Rouge', slug: 'baton-rouge', type: 'medium', content: 'The state capital with medical cannabis dispensaries. Strict medical-only laws apply throughout Louisiana.' },
    ]
  },
  { 
    id: 19, 
    name: 'Maine', 
    slug: 'maine', 
    status: 'recreational', 
    possession_limits: '2.5 oz (flower), 5g (concentrate).', 
    age_requirement: '21+', 
    purchase_rules: 'Licensed dispensaries only.', 
    penalties: 'Minor offenses are civil fines.', 
    consumption_rules: 'Private property only. Public consumption is illegal.', 
    dispensary_guide: 'Legal recreational dispensaries are open.', 
    travel_rules: 'Illegal to consume on federal land.', 
    subtitle: 'The Pine Tree State: Recreational cannabis is legal.', 
    cities: [
      { name: 'Portland', slug: 'portland-maine', type: 'major', content: 'Maine\'s largest city with legal recreational cannabis. Numerous dispensaries and a growing cannabis tourism industry. Enjoy the coastal scenery and fresh seafood.' },
      { name: 'Bangor', slug: 'bangor', type: 'medium', content: 'A central Maine city with legal recreational cannabis access. Several dispensaries serve both residents and visitors to the region.' },
    ]
  },
  { 
    id: 20, 
    name: 'Maryland', 
    slug: 'maryland', 
    status: 'recreational', 
    possession_limits: '1.5 oz (flower), 12g (concentrate).', 
    age_requirement: '21+', 
    purchase_rules: 'Licensed dispensaries only.', 
    penalties: 'Minor offenses are civil fines.', 
    consumption_rules: 'Private property only. Public consumption is illegal.', 
    dispensary_guide: 'Legal recreational dispensaries are open.', 
    travel_rules: 'Do not cross state lines with cannabis.', 
    subtitle: 'The Old Line State: Recreational cannabis is legal.', 
    cities: [
      { name: 'Baltimore', slug: 'baltimore', type: 'major', content: 'Maryland\'s largest city with legal recreational cannabis. Numerous dispensaries throughout the city. Enjoy the Inner Harbor and historic sites while being mindful of consumption laws.' },
      { name: 'Annapolis', slug: 'annapolis', type: 'medium', content: 'The state capital and a historic waterfront city. Legal recreational cannabis is available at local dispensaries. A charming destination with maritime heritage.' },
    ]
  },
  // States 21-50 (remaining states with empty cities arrays)
  { id: 21, name: 'Massachusetts', slug: 'massachusetts', status: 'recreational', possession_limits: '1 oz (flower) on person, 10 oz at home.', age_requirement: '21+', purchase_rules: 'Licensed dispensaries only.', penalties: 'Minor offenses are civil fines.', consumption_rules: 'Private property only. Public consumption is illegal.', dispensary_guide: 'Legal recreational dispensaries are open.', travel_rules: 'Do not cross state lines with cannabis.', subtitle: 'The Bay State: Recreational cannabis is legal.', cities: [] },
  { id: 22, name: 'Michigan', slug: 'michigan', status: 'recreational', possession_limits: '2.5 oz (flower) on person, 10 oz at home.', age_requirement: '21+', purchase_rules: 'Licensed dispensaries only.', penalties: 'Minor offenses are civil fines.', consumption_rules: 'Private property only. Public consumption is illegal.', dispensary_guide: 'Legal recreational dispensaries are open.', travel_rules: 'Do not cross state lines with cannabis.', subtitle: 'The Great Lakes State: Recreational cannabis is legal.', cities: [] },
  { id: 23, name: 'Minnesota', slug: 'minnesota', status: 'recreational', possession_limits: '2 oz (flower), 8g (concentrate).', age_requirement: '21+', purchase_rules: 'Licensed dispensaries only (sales starting 2025).', penalties: 'Minor offenses are civil fines.', consumption_rules: 'Private property only. Public consumption is illegal.', dispensary_guide: 'Sales are pending. Medical dispensaries are open.', travel_rules: 'Do not cross state lines with cannabis.', subtitle: 'The North Star State: Recreational cannabis is legal (sales pending).', cities: [] },
  { id: 24, name: 'Mississippi', slug: 'mississippi', status: 'medical', possession_limits: '3.5g of flower per day (medical).', age_requirement: '18+ with medical card.', purchase_rules: 'Licensed medical dispensaries only.', penalties: 'Strict penalties for non-medical use.', consumption_rules: 'Strictly prohibited in public.', dispensary_guide: 'Medical dispensaries are open.', travel_rules: 'Medical card not recognized for non-residents.', subtitle: 'The Magnolia State: Medical cannabis is legal.', cities: [] },
  { id: 25, name: 'Missouri', slug: 'missouri', status: 'recreational', possession_limits: '3 oz (flower).', age_requirement: '21+', purchase_rules: 'Licensed dispensaries only.', penalties: 'Minor offenses are civil fines.', consumption_rules: 'Private property only. Public consumption is illegal.', dispensary_guide: 'Legal recreational dispensaries are open.', travel_rules: 'Do not cross state lines with cannabis.', subtitle: 'The Show Me State: Recreational cannabis is legal.', cities: [] },
  { id: 26, name: 'Montana', slug: 'montana', status: 'recreational', possession_limits: '1 oz (flower), 8g (concentrate).', age_requirement: '21+', purchase_rules: 'Licensed dispensaries only.', penalties: 'Minor offenses are civil fines.', consumption_rules: 'Private property only. Public consumption is illegal.', dispensary_guide: 'Legal recreational dispensaries are open.', travel_rules: 'Illegal to consume on federal land.', subtitle: 'The Treasure State: Recreational cannabis is legal.', cities: [] },
  { id: 27, name: 'Nebraska', slug: 'nebraska', status: 'decriminalized', possession_limits: 'Decriminalized up to 1 oz.', age_requirement: null, purchase_rules: null, penalties: 'Civil infraction for small amounts.', consumption_rules: 'Strictly prohibited in public.', dispensary_guide: 'No legal dispensaries.', travel_rules: 'Do not cross state lines with cannabis.', subtitle: 'The Cornhusker State: Decriminalized, but not legal.', cities: [] },
  { id: 28, name: 'Nevada', slug: 'nevada', status: 'recreational', possession_limits: '1 oz (flower), 1/8 oz (concentrate).', age_requirement: '21+', purchase_rules: 'Licensed dispensaries only.', penalties: 'Minor offenses are civil fines.', consumption_rules: 'Private property only. Public consumption is illegal.', dispensary_guide: 'Legal recreational dispensaries are open.', travel_rules: 'Illegal to consume on federal land.', subtitle: 'The Silver State: Recreational cannabis is legal.', cities: [] },
  { id: 29, name: 'New Hampshire', slug: 'new-hampshire', status: 'decriminalized', possession_limits: 'Decriminalized up to 3/4 oz.', age_requirement: null, purchase_rules: null, penalties: 'Civil infraction for small amounts.', consumption_rules: 'Strictly prohibited in public.', dispensary_guide: 'Medical dispensaries are open.', travel_rules: 'Do not cross state lines with cannabis.', subtitle: 'The Granite State: Decriminalized, but not legal.', cities: [] },
  { id: 30, name: 'New Jersey', slug: 'new-jersey', status: 'recreational', possession_limits: '6 oz (flower), 17g (concentrate).', age_requirement: '21+', purchase_rules: 'Licensed dispensaries only.', penalties: 'Minor offenses are civil fines.', consumption_rules: 'Private property only. Public consumption is illegal.', dispensary_guide: 'Legal recreational dispensaries are open.', travel_rules: 'Do not cross state lines with cannabis.', subtitle: 'The Garden State: Recreational cannabis is legal.', cities: [] },
  { id: 31, name: 'New Mexico', slug: 'new-mexico', status: 'recreational', possession_limits: '2 oz (flower), 16g (concentrate).', age_requirement: '21+', purchase_rules: 'Licensed dispensaries only.', penalties: 'Minor offenses are civil fines.', consumption_rules: 'Private property only. Public consumption is illegal.', dispensary_guide: 'Legal recreational dispensaries are open.', travel_rules: 'Illegal to consume on federal land.', subtitle: 'The Land of Enchantment: Recreational cannabis is legal.', cities: [] },
  { id: 32, name: 'New York', slug: 'new-york', status: 'recreational', possession_limits: '3 oz (flower), 24g (concentrate).', age_requirement: '21+', purchase_rules: 'Licensed dispensaries only.', penalties: 'Minor offenses are civil fines.', consumption_rules: 'Private property only. Public consumption is illegal.', dispensary_guide: 'Legal recreational dispensaries are open.', travel_rules: 'Do not cross state lines with cannabis.', subtitle: 'The Empire State: Recreational cannabis is legal.', cities: [] },
  { id: 33, name: 'North Carolina', slug: 'north-carolina', status: 'decriminalized', possession_limits: 'Decriminalized up to 1/2 oz.', age_requirement: null, purchase_rules: null, penalties: 'Civil infraction for small amounts.', consumption_rules: 'Strictly prohibited in public.', dispensary_guide: 'No legal dispensaries.', travel_rules: 'Do not cross state lines with cannabis.', subtitle: 'The Tar Heel State: Decriminalized, but not legal.', cities: [] },
  { id: 34, name: 'North Dakota', slug: 'north-dakota', status: 'medical', possession_limits: '3 oz every 30 days (medical).', age_requirement: '18+ with medical card.', purchase_rules: 'Licensed medical dispensaries only.', penalties: 'Strict penalties for non-medical use.', consumption_rules: 'Strictly prohibited in public.', dispensary_guide: 'Medical dispensaries are open.', travel_rules: 'Medical card not recognized for non-residents.', subtitle: 'The Peace Garden State: Medical cannabis is legal.', cities: [] },
  { id: 35, name: 'Ohio', slug: 'ohio', status: 'recreational', possession_limits: '2.5 oz (flower), 15g (concentrate).', age_requirement: '21+', purchase_rules: 'Licensed dispensaries only (sales starting late 2024).', penalties: 'Minor offenses are civil fines.', consumption_rules: 'Private property only. Public consumption is illegal.', dispensary_guide: 'Sales are pending. Medical dispensaries are open.', travel_rules: 'Do not cross state lines with cannabis.', subtitle: 'The Buckeye State: Recreational cannabis is legal (sales pending).', cities: [] },
  { id: 36, name: 'Oklahoma', slug: 'oklahoma', status: 'medical', possession_limits: '3 oz (flower) on person, 8 oz at home (medical).', age_requirement: '18+ with medical card.', purchase_rules: 'Licensed medical dispensaries only.', penalties: 'Strict penalties for non-medical use.', consumption_rules: 'Strictly prohibited in public.', dispensary_guide: 'Medical dispensaries are open.', travel_rules: 'Medical card not recognized for non-residents.', subtitle: 'The Sooner State: Medical cannabis is legal.', cities: [] },
  { id: 37, name: 'Oregon', slug: 'oregon', status: 'recreational', possession_limits: '2 oz (flower) on person, 8 oz at home.', age_requirement: '21+', purchase_rules: 'Licensed dispensaries only.', penalties: 'Minor offenses are civil fines.', consumption_rules: 'Private property only. Public consumption is illegal.', dispensary_guide: 'Legal recreational dispensaries are open.', travel_rules: 'Illegal to consume on federal land.', subtitle: 'The Beaver State: Recreational cannabis is legal.', cities: [] },
  { id: 38, name: 'Pennsylvania', slug: 'pennsylvania', status: 'medical', possession_limits: 'Varies by doctor recommendation (medical).', age_requirement: '18+ with medical card.', purchase_rules: 'Licensed medical dispensaries only.', penalties: 'Decriminalized for small amounts (non-medical).', consumption_rules: 'Strictly prohibited in public.', dispensary_guide: 'Medical dispensaries are open.', travel_rules: 'Medical card not recognized for non-residents.', subtitle: 'The Keystone State: Medical cannabis is legal.', cities: [] },
  { id: 39, name: 'Rhode Island', slug: 'rhode-island', status: 'recreational', possession_limits: '1 oz (flower) on person, 10 oz at home.', age_requirement: '21+', purchase_rules: 'Licensed dispensaries only.', penalties: 'Minor offenses are civil fines.', consumption_rules: 'Private property only. Public consumption is illegal.', dispensary_guide: 'Legal recreational dispensaries are open.', travel_rules: 'Do not cross state lines with cannabis.', subtitle: 'The Ocean State: Recreational cannabis is legal.', cities: [] },
  { id: 40, name: 'South Carolina', slug: 'south-carolina', status: 'illegal', possession_limits: 'Any amount is a misdemeanor/felony.', age_requirement: null, purchase_rules: null, penalties: 'Strict penalties. One of the strictest states.', consumption_rules: 'Strictly prohibited in public.', dispensary_guide: 'No legal dispensaries.', travel_rules: 'Do not cross state lines with cannabis.', subtitle: 'The Palmetto State: Strictly illegal.', cities: [] },
  { id: 41, name: 'South Dakota', slug: 'south-dakota', status: 'medical', possession_limits: '3 oz (flower) (medical).', age_requirement: '18+ with medical card.', purchase_rules: 'Licensed medical dispensaries only.', penalties: 'Strict penalties for non-medical use.', consumption_rules: 'Strictly prohibited in public.', dispensary_guide: 'Medical dispensaries are open.', travel_rules: 'Medical card not recognized for non-residents.', subtitle: 'The Mount Rushmore State: Medical cannabis is legal.', cities: [] },
  { id: 42, name: 'Tennessee', slug: 'tennessee', status: 'illegal', possession_limits: 'Any amount is a misdemeanor/felony.', age_requirement: null, purchase_rules: null, penalties: 'Strict penalties. One of the strictest states.', consumption_rules: 'Strictly prohibited in public.', dispensary_guide: 'No legal dispensaries.', travel_rules: 'Do not cross state lines with cannabis.', subtitle: 'The Volunteer State: Strictly illegal.', cities: [] },
  { id: 43, name: 'Texas', slug: 'texas', status: 'medical', possession_limits: 'Low-THC oil only (medical).', age_requirement: '18+ with medical card.', purchase_rules: 'Licensed low-THC dispensaries only.', penalties: 'Strict penalties for non-medical use.', consumption_rules: 'Strictly prohibited in public.', dispensary_guide: 'Low-THC oil dispensaries are open.', travel_rules: 'Do not cross state lines with cannabis.', subtitle: 'The Lone Star State: Low-THC oil is legal for medical use.', cities: [] },
  { id: 44, name: 'Utah', slug: 'utah', status: 'medical', possession_limits: 'Varies by doctor recommendation (medical).', age_requirement: '18+ with medical card.', purchase_rules: 'Licensed medical dispensaries only.', penalties: 'Strict penalties for non-medical use.', consumption_rules: 'Strictly prohibited in public.', dispensary_guide: 'Medical dispensaries are open.', travel_rules: 'Medical card not recognized for non-residents.', subtitle: 'The Beehive State: Medical cannabis is legal.', cities: [] },
  { id: 45, name: 'Vermont', slug: 'vermont', status: 'recreational', possession_limits: '1 oz (flower), 5g (concentrate).', age_requirement: '21+', purchase_rules: 'Licensed dispensaries only.', penalties: 'Minor offenses are civil fines.', consumption_rules: 'Private property only. Public consumption is illegal.', dispensary_guide: 'Legal recreational dispensaries are open.', travel_rules: 'Do not cross state lines with cannabis.', subtitle: 'The Green Mountain State: Recreational cannabis is legal.', cities: [] },
  { id: 46, name: 'Virginia', slug: 'virginia', status: 'recreational', possession_limits: '1 oz (flower).', age_requirement: '21+', purchase_rules: 'No retail sales yet (gifting is legal).', penalties: 'Minor offenses are civil fines.', consumption_rules: 'Private property only. Public consumption is illegal.', dispensary_guide: 'No retail sales yet. Medical dispensaries are open.', travel_rules: 'Do not cross state lines with cannabis.', subtitle: 'The Old Dominion: Recreational cannabis is legal (sales pending).', cities: [] },
  { id: 47, name: 'Washington', slug: 'washington', status: 'recreational', possession_limits: '1 oz (flower), 7g (concentrate).', age_requirement: '21+', purchase_rules: 'Licensed dispensaries only.', penalties: 'Minor offenses are civil fines.', consumption_rules: 'Private property only. Public consumption is illegal.', dispensary_guide: 'Legal recreational dispensaries are open.', travel_rules: 'Illegal to consume on federal land.', subtitle: 'The Evergreen State: Recreational cannabis is legal.', cities: [] },
  { id: 48, name: 'West Virginia', slug: 'west-virginia', status: 'medical', possession_limits: 'Varies by doctor recommendation (medical).', age_requirement: '18+ with medical card.', purchase_rules: 'Licensed medical dispensaries only.', penalties: 'Strict penalties for non-medical use.', consumption_rules: 'Strictly prohibited in public.', dispensary_guide: 'Medical dispensaries are open.', travel_rules: 'Medical card not recognized for non-residents.', subtitle: 'The Mountain State: Medical cannabis is legal.', cities: [] },
  { id: 49, name: 'Wisconsin', slug: 'wisconsin', status: 'illegal', possession_limits: 'Any amount is a misdemeanor/felony.', age_requirement: null, purchase_rules: null, penalties: 'Strict penalties. One of the strictest states.', consumption_rules: 'Strictly prohibited in public.', dispensary_guide: 'No legal dispensaries.', travel_rules: 'Do not cross state lines with cannabis.', subtitle: 'The Badger State: Strictly illegal.', cities: [] },
  { id: 50, name: 'Wyoming', slug: 'wyoming', status: 'illegal', possession_limits: 'Any amount is a misdemeanor/felony.', age_requirement: null, purchase_rules: null, penalties: 'Strict penalties. One of the strictest states.', consumption_rules: 'Strictly prohibited in public.', dispensary_guide: 'No legal dispensaries.', travel_rules: 'Do not cross state lines with cannabis.', subtitle: 'The Equality State: Strictly illegal.', cities: [] },
];
