import React, { useState, useMemo } from 'react';
import { MapPin, Info, AlertTriangle, CheckCircle, XCircle, ChevronDown, ChevronUp, Search, ArrowLeft, Navigation } from 'lucide-react';

// --- Types & Interfaces ---

// --- Data Source ---

export const USA_STATE_DATA = [
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
      { name: 'Mobile', slug: 'mobile', type: 'notable', content: 'Historic port city with a strong focus on Mardi Gras celebrations. Strict enforcement of cannabis laws.' },
      { name: 'Huntsville', slug: 'huntsville', type: 'notable', content: 'Known as "Rocket City" for its aerospace industry. Zero tolerance for cannabis.' },
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
      { name: 'Fairbanks', slug: 'fairbanks', type: 'notable', content: 'Gateway to the Arctic and a great place to see the Northern Lights. Has a few dispensaries.' },
      { name: 'Ketchikan', slug: 'ketchikan', type: 'notable', content: 'A popular cruise ship destination in the Inside Passage. Limited cannabis options, private consumption only.' },
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
      { name: 'Flagstaff', slug: 'flagstaff', type: 'notable', content: 'A mountain town near the Grand Canyon. Limited dispensaries, but a popular stop for travelers.' },
      { name: 'Scottsdale', slug: 'scottsdale', type: 'notable', content: 'Known for its upscale resorts and nightlife. Several high-end dispensaries are located here.' },
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
      { name: 'Fort Smith', slug: 'fort-smith', type: 'medium', content: 'A historic city on the Oklahoma border. Has a few medical dispensaries. Strict adherence to medical-only laws is essential.' },
      { name: 'Fayetteville', slug: 'fayetteville', type: 'notable', content: 'Home to the University of Arkansas. Progressive city with medical dispensaries.' },
      { name: 'Hot Springs', slug: 'hot-springs', type: 'notable', content: 'Known for its thermal baths and national park. Has medical dispensaries.' },
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
      { name: 'Sacramento', slug: 'sacramento', type: 'medium', content: 'The state capital. Has a solid selection of dispensaries and a growing cannabis scene. A good stop for travelers exploring Northern California.' },
      { name: 'Oakland', slug: 'oakland', type: 'medium', content: 'Known for its pioneering role in cannabis legalization. Offers a diverse range of dispensaries and a strong local culture.' },
      { name: 'Palm Springs', slug: 'palm-springs', type: 'notable', content: 'A desert resort city with a few consumption lounges and delivery services.' },
      { name: 'Humboldt County', slug: 'humboldt-county', type: 'notable', content: 'The heart of the "Emerald Triangle." Focus is on cultivation, with limited retail options for tourists.' },
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
      { name: 'Denver', slug: 'denver', type: 'major', content: 'The "Napa Valley of Cannabis". Denver hosts a massive selection of dispensaries, cannabis tours, and 420-friendly lodging. While public consumption is illegal, enforcement varies slightly by neighborhood, but discretion is key. Social consumption lounges are slowly emerging.' },
      { name: 'Boulder', slug: 'boulder', type: 'major', content: 'A progressive college town with a very relaxed vibe and high concentration of dispensaries. A perfect spot to pick up supplies before hiking the Flatirons. Strict separation of medical and recreational shops.' },
      { name: 'Colorado Springs', slug: 'colorado-springs', type: 'medium', content: 'Despite being in a legal state, the city has banned recreational sales. You can only buy medical cannabis here. For recreational, you must drive to nearby Manitou Springs.' },
      { name: 'Aspen', slug: 'aspen', type: 'notable', content: 'High-end cannabis boutiques match the luxury ski resort vibe. Expect premium prices for premium products. Consumption on federal ski land is a federal crime.' },
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
    consumption_rules: 'Private property only. Some towns allow public smoking where tobacco is allowed.', 
    dispensary_guide: 'Recreational sales are active.', 
    travel_rules: 'Do not cross state lines with cannabis.', 
    subtitle: 'The Constitution State: Recreational cannabis is legal.', 
    cities: [
      { name: 'Hartford', slug: 'hartford', type: 'medium', content: 'The capital has embraced the adult-use market with several retailers. Be mindful of specific city ordinances regarding public smoking.' },
      { name: 'New Haven', slug: 'new-haven', type: 'medium', content: 'Home to Yale University. A progressive city with access to adult-use dispensaries. The vibe is intellectual and relaxed.' },
      { name: 'Stamford', slug: 'stamford', type: 'notable', content: 'Close to the NY border. Several recreational dispensaries serve the area. Commuter-heavy, so drive carefully and soberly.' }
    ] 
  },
  { 
    id: 8, 
    name: 'Delaware', 
    slug: 'delaware', 
    status: 'recreational', 
    possession_limits: '1 oz (flower).', 
    age_requirement: '21+', 
    purchase_rules: 'Sales expected to launch fully in 2025. Medical open now.', 
    penalties: 'Minor offenses are civil fines.', 
    consumption_rules: 'Private property only. Public consumption is illegal.', 
    dispensary_guide: 'Adult-use sales pending. Medical dispensaries are open.', 
    travel_rules: 'Do not cross state lines with cannabis.', 
    subtitle: 'The First State: Recreational legal, sales rolling out.', 
    cities: [
      { name: 'Wilmington', slug: 'wilmington', type: 'medium', content: 'As the largest city, Wilmington is central to the state\'s cannabis shift. Possession is legal, but finding a recreational shop may be difficult until late 2025. Medical patients are served well.' },
      { name: 'Rehoboth Beach', slug: 'rehoboth-beach', type: 'notable', content: 'A popular summer destination. Police are strict about public consumption on the boardwalk and beaches. Keep it private.' },
      { name: 'Dover', slug: 'dover', type: 'notable', content: 'The capital city. Like the rest of the state, you can possess but buying recreationally is in a transition phase.' }
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
    penalties: 'Strict penalties for non-medical use. Felony for >20g.', 
    consumption_rules: 'Private property only. Public consumption is illegal.', 
    dispensary_guide: 'Medical dispensaries are open.', 
    travel_rules: 'Medical card not recognized for non-residents.', 
    subtitle: 'The Sunshine State: Medical cannabis is legal.', 
    cities: [
      { name: 'Miami', slug: 'miami', type: 'major', content: 'Famous for nightlife, but strictly medical. While you may smell it often in South Beach, police can and do arrest for possession without a card. Do not consume in public/clubs openly.' },
      { name: 'Orlando', slug: 'orlando', type: 'major', content: 'Home to Disney and Universal. These private parks have zero-tolerance policies. Even medical patients should not bring products into theme parks.' },
      { name: 'Tampa', slug: 'tampa', type: 'medium', content: 'A growing hub for medical dispensaries. Strictly medical. Police enforcement on public consumption is standard.' },
      { name: 'Key West', slug: 'key-west', type: 'notable', content: 'Very laid back atmosphere. While public consumption is technically illegal, the vibe is more relaxed than the mainland—but caution is still advised.' }
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
    subtitle: 'The Peach State: Low-THC oil only.', 
    cities: [
      { name: 'Atlanta', slug: 'atlanta', type: 'major', content: 'Uniquely, the city of Atlanta has decriminalized possession of less than 1 oz ($75 fine), BUT this only applies within city limits and by city police. State troopers can still arrest you. Proceed with extreme caution.' },
      { name: 'Savannah', slug: 'savannah', type: 'medium', content: 'Famous for its open-container alcohol laws in the historic district. This DOES NOT apply to cannabis. Public smoking is illegal and enforced.' },
      { name: 'Augusta', slug: 'augusta', type: 'notable', content: 'Strict enforcement. No local decriminalization ordinances like Atlanta.' }
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
      { name: 'Honolulu', slug: 'honolulu', type: 'major', content: 'Tourists with medical cards from other states can apply for a temporary Hawaii 329 card (do this weeks in advance). Smoking on Waikiki beach is strictly prohibited.' },
      { name: 'Maui (Kahului)', slug: 'maui', type: 'notable', content: 'Relaxed "aloha" vibe, but laws are laws. Medical dispensaries are available. Do not bring cannabis into Haleakalā National Park (federal land).' },
      { name: 'Hilo', slug: 'hilo', type: 'notable', content: 'Big Island hub. Medical dispensaries available. Known for agriculture, but unauthorized growing is illegal.' }
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
      { name: 'Boise', slug: 'boise', type: 'medium', content: 'Extremely strict. Idaho is known for aggressive enforcement at the Oregon border. Do not bring cannabis here. It is one of the last true "zero tolerance" zones in the west.' },
      { name: 'Coeur d\'Alene', slug: 'coeur-dalene', type: 'notable', content: 'Beautiful lake city, but the law is ugly for cannabis users. Strictly illegal.' }
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
      { name: 'Chicago', slug: 'chicago', type: 'major', content: 'A midwestern cannabis hub. Dispensaries are plentiful. While public use is illegal, it is common to smell it. Do not smoke on the Lakefront trail or in Millennium Park. Social consumption lounges are slowly being licensed.' },
      { name: 'Springfield', slug: 'springfield', type: 'medium', content: 'The capital city has several recreational dispensaries. Standard state laws apply: keep it in the trunk while driving, sealed.' },
      { name: 'Galena', slug: 'galena', type: 'notable', content: 'Historic tourist town. A few dispensaries serve the influx of weekend visitors. Great for a cozy, elevated weekend.' }
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
      { name: 'Indianapolis', slug: 'indianapolis', type: 'major', content: 'Surrounded by legal states (IL, MI, OH), but Indiana stands firm. Possession is a crime. Police patrol highways coming from legal states specifically looking for traffickers.' },
      { name: 'Bloomington', slug: 'bloomington', type: 'medium', content: 'Home to Indiana University. While the student population is progressive, local law enforcement upholds state law. Caution is advised.' }
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
      { name: 'Des Moines', slug: 'des-moines', type: 'medium', content: 'The medical program here is restrictive (primarily oils/capsules, limited flower). It is not a cannabis tourism destination.' },
      { name: 'Iowa City', slug: 'iowa-city', type: 'notable', content: 'University of Iowa home. Liberal atmosphere but strict state laws regarding possession still apply.' }
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
      { name: 'Wichita', slug: 'wichita', type: 'medium', content: 'Illegal. CBD products with 0% THC are allowed, but anything with THC is criminal. Do not bring products from neighboring Missouri.' },
      { name: 'Kansas City (KS)', slug: 'kansas-city-ks', type: 'medium', content: 'Confusingly sits right next to Kansas City, MO (where it IS legal). Do not cross the state line with your purchase. The border is just a street, but the laws are worlds apart.' }
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
      { name: 'Louisville', slug: 'louisville', type: 'major', content: 'The city has passed ordinances making small possession the "lowest law enforcement priority," effectively decriminalizing it locally, but it is not technically legal. Medical sales begin in 2025.' },
      { name: 'Lexington', slug: 'lexington', type: 'medium', content: 'University town. Similar to Louisville, enforcement is often relaxed for small amounts, but discretion is highly advised until the medical program fully launches.' }
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
      { name: 'New Orleans', slug: 'new-orleans', type: 'major', content: 'Possession of small amounts is decriminalized (ticket only). While the city is famous for partying, public smoking of cannabis on Bourbon Street can still lead to police interaction. Medical dispensaries are available.' },
      { name: 'Baton Rouge', slug: 'baton-rouge', type: 'medium', content: 'State capital. Medical program is active. Decriminalization for small amounts applies statewide, but local police attitudes may vary.' },
      { name: 'Shreveport', slug: 'shreveport', type: 'medium', content: 'North Louisiana tends to be more conservative. Stick to private consumption if you are a medical patient.' }
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
      { name: 'Portland', slug: 'portland', type: 'major', content: 'The East Coast\'s hidden cannabis gem. High concentration of craft cannabis storefronts. Very friendly, relaxed atmosphere. Great food and great weed.' },
      { name: 'Bangor', slug: 'bangor', type: 'notable', content: 'The gateway to the north. Plenty of recreational shops available. A good place to stock up before heading to Acadia National Park (where you cannot smoke).' }
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
      { name: 'Baltimore', slug: 'baltimore', type: 'major', content: 'Recreational sales are active and booming. Vibrant culture. Public smoking is a civil offense, so keep it to private residences or designated areas.' },
      { name: 'Annapolis', slug: 'annapolis', type: 'medium', content: 'Historic capital. Dispensaries are available. Enjoy the waterfront, but keep consumption private.' },
      { name: 'Ocean City', slug: 'ocean-city', type: 'notable', content: 'Summer resort town. Smoking on the boardwalk or beach is strictly prohibited and actively enforced by summer police.' }
    ] 
  },
  // ... Remaining States (21-50) with empty cities arrays ...
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

// --- Helper Components ---

const StatusBadge = ({ status }) => {
  const colors = {
    recreational: 'bg-green-100 text-green-800 border-green-200',
    medical: 'bg-blue-100 text-blue-800 border-blue-200',
    decriminalized: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    illegal: 'bg-red-100 text-red-800 border-red-200',
  };

  const labels = {
    recreational: 'Recreational',
    medical: 'Medical Only',
    decriminalized: 'Decriminalized',
    illegal: 'Illegal',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
      {labels[status] || status}
    </span>
  );
};

const CityCard = ({ city }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md mb-3">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <div className="flex flex-col">
          <span className="font-bold text-slate-800 text-lg">{city.name}</span>
          <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">{city.type} City</span>
        </div>
        {isOpen ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
      </button>
      
      <div 
        className={`bg-white overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-4 text-slate-600 border-t border-slate-100 text-sm leading-relaxed">
          {city.content}
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStates = useMemo(() => {
    if (!searchQuery) return USA_STATE_DATA;
    const lowerQuery = searchQuery.toLowerCase();
    return USA_STATE_DATA.filter(state => 
      state.name.toLowerCase().includes(lowerQuery) || 
      state.status.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  const selectedState = useMemo(() => 
    USA_STATE_DATA.find(s => s.id === selectedStateId), 
  [selectedStateId]);

  // --- State Detail View ---
  if (selectedState) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
        {/* Header */}
        <header className="bg-emerald-700 text-white p-4 shadow-md sticky top-0 z-10">
          <div className="max-w-3xl mx-auto flex items-center">
            <button 
              onClick={() => setSelectedStateId(null)}
              className="mr-4 p-2 hover:bg-emerald-600 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold truncate">{selectedState.name} Guide</h1>
          </div>
        </header>

        <main className="max-w-3xl mx-auto p-4 space-y-6">
          {/* Hero Status */}
          <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-1">{selectedState.name}</h2>
                <p className="text-slate-500 italic">{selectedState.subtitle}</p>
              </div>
              <div className="self-start md:self-center">
                <StatusBadge status={selectedState.status} />
              </div>
            </div>
            
            {/* Key Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
               <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                 <div className="flex items-center gap-2 text-emerald-700 mb-2 font-semibold">
                   <Info size={18} />
                   <h3>Possession</h3>
                 </div>
                 <p className="text-sm text-slate-700">{selectedState.possession_limits || 'Check local laws.'}</p>
               </div>

               <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                 <div className="flex items-center gap-2 text-emerald-700 mb-2 font-semibold">
                   <AlertTriangle size={18} />
                   <h3>Penalties</h3>
                 </div>
                 <p className="text-sm text-slate-700">{selectedState.penalties || 'N/A'}</p>
               </div>

               <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                 <div className="flex items-center gap-2 text-emerald-700 mb-2 font-semibold">
                   <Navigation size={18} />
                   <h3>Travel Rules</h3>
                 </div>
                 <p className="text-sm text-slate-700">{selectedState.travel_rules || 'Do not cross state lines.'}</p>
               </div>

               <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                 <div className="flex items-center gap-2 text-emerald-700 mb-2 font-semibold">
                   <MapPin size={18} />
                   <h3>Where to Buy</h3>
                 </div>
                 <p className="text-sm text-slate-700">{selectedState.dispensary_guide || 'N/A'}</p>
               </div>
            </div>
          </section>

          {/* Cities Section */}
          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin className="text-emerald-600" /> 
              Major Cities & Zones
            </h3>
            
            {selectedState.cities && selectedState.cities.length > 0 ? (
              <div className="space-y-3">
                {selectedState.cities.map((city, idx) => (
                  <CityCard key={idx} city={city} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center text-slate-500">
                <p>Detailed city guides coming soon for {selectedState.name}.</p>
                <p className="text-sm mt-2">General state laws apply statewide.</p>
              </div>
            )}
          </section>
        </main>
      </div>
    );
  }

  // --- Main List View ---
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-emerald-700 text-white p-6 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-2">US Cannabis Guide</h1>
          <p className="text-emerald-100 mb-6">Laws, limits, and local city guides for travelers.</p>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search state (e.g. California, Legal...)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm"
            />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 sm:p-6">
        {filteredStates.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <p className="text-lg">No states found matching "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStates.map(state => (
              <div 
                key={state.id}
                onClick={() => setSelectedStateId(state.id)}
                className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                    {state.name}
                  </h2>
                  <StatusBadge status={state.status} />
                </div>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4 h-10">
                  {state.subtitle}
                </p>
                
                <div className="flex items-center text-emerald-600 text-sm font-medium mt-auto">
                  View Guide <ArrowLeft className="rotate-180 ml-1 w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
