// lib/usa_state_data.ts
// Author:  Your-Name
// Purpose: Centralized, strongly-typed cannabis policy & travel data for all 50 U.S. states + DC
// Last-updated:  2025-11-30

export const USA_GUIDE_LAST_UPDATED = '2025-11-30';

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

/**
 * Canonical dataset for cannabis policies, travel guidance, and key city insights.
 * Data is reviewed quarterly; verify local ordinances before travel.
 */
export const USA_STATE_DATA: StateData[] = [
  {
    id: 1,
    name: 'Alabama',
    slug: 'alabama',
    status: 'illegal',
    possession_limits: 'Any amount is a misdemeanor/felony.',
    age_requirement: null,
    purchase_rules: null,
    penalties: 'Strict penalties; prior decriminalization efforts failed.',
    consumption_rules: 'Strictly prohibited in public and private vehicles.',
    dispensary_guide: 'No legal dispensaries.',
    travel_rules: 'Do not cross state lines with cannabis.',
    subtitle: 'The Heart of Dixie: Cannabis remains fully prohibited.',
    cities: [
      {
        name: 'Birmingham',
        slug: 'birmingham',
        type: 'major',
        content:
          'Alabama’s largest city and economic engine. Cannabis possession is criminal; focus on civil-rights history, craft breweries, and the award-winning food scene instead of cannabis tourism.',
      },
      {
        name: 'Montgomery',
        slug: 'montgomery',
        type: 'medium',
        content:
          'State capital and cradle of the Civil-Rights Movement. Law enforcement is aggressive—possession of any amount carries jail risk. Plan alternate activities.',
      },
      {
        name: 'Huntsville',
        slug: 'huntsville',
        type: 'medium',
        content:
          'High-tech hub with NASA’s Marshall Space Flight Center. Cannabis laws are strictly enforced; enjoy the U.S. Space & Rocket Center instead.',
      },
      {
        name: 'Mobile',
        slug: 'mobile',
        type: 'medium',
        content:
          'Gulf Coast port city with Mardi Gras heritage. Zero tolerance for cannabis; explore the USS Alabama and seafood scene.',
      },
    ],
  },
  {
    id: 2,
    name: 'Alaska',
    slug: 'alaska',
    status: 'recreational',
    possession_limits: '1 oz flower | 7 g concentrate.',
    age_requirement: '21+',
    purchase_rules: 'State-licensed retailers only.',
    penalties: 'Civil fine < $100 for minor violations.',
    consumption_rules: 'Private property only; banned in national parks & public view.',
    dispensary_guide: 'Recreational stores operate statewide.',
    travel_rules: 'Federal land (parks, forests) is off-limits for possession or use.',
    subtitle: 'The Last Frontier: Purchase, possess, and consume responsibly.',
    cities: [
      {
        name: 'Anchorage',
        slug: 'anchorage',
        type: 'major',
        content:
          'Alaska’s cannabis hub: 15+ dispensaries, consumption-friendly lodging, and glacier tours. Public use remains illegal—consume discreetly on private property.',
      },
      {
        name: 'Juneau',
        slug: 'juneau',
        type: 'medium',
        content:
          'Capital city reachable only by air or sea. Limited store count; plan purchases in advance. Spectacular whale-watching and hiking await.',
      },
      {
        name: 'Fairbanks',
        slug: 'fairbanks',
        type: 'medium',
        content:
          'Northern Lights destination with a handful of stores. Extreme cold—consume indoors only.',
      },
      {
        name: 'Sitka',
        slug: 'sitka',
        type: 'notable',
        content:
          'Scenic coastal town with one dispensary. Great for fishing and wildlife viewing.',
      },
    ],
  },
  {
    id: 3,
    name: 'Arizona',
    slug: 'arizona',
    status: 'recreational',
    possession_limits: '1 oz flower | 5 g concentrate.',
    age_requirement: '21+',
    purchase_rules: 'Licensed dispensaries only.',
    penalties: 'Civil citation for minor infractions.',
    consumption_rules: 'Private property; prohibited in parks, vehicles, and hotel balconies.',
    dispensary_guide: 'Recreational market active since 2021.',
    travel_rules: 'Illegal on tribal and federal land.',
    subtitle: 'The Grand Canyon State: Recreational cannabis is legal.',
    cities: [
      {
        name: 'Phoenix',
        slug: 'phoenix',
        type: 'major',
        content:
          'Metropolitan area with 100+ dispensaries. Book 420-friendly Airbnbs; public consumption is a $300 fine. Desert botanical gardens and golf courses recommended.',
      },
      {
        name: 'Tucson',
        slug: 'tucson',
        type: 'medium',
        content:
          'College-town vibe and lower prices than Phoenix. Visit Saguaro National Park—cannabis prohibited inside park boundaries.',
      },
      {
        name: 'Scottsdale',
        slug: 'scottsdale',
        type: 'medium',
        content:
          'Upscale resort city with several dispensaries. Enjoy spas and golf; consume in private rentals.',
      },
      {
        name: 'Flagstaff',
        slug: 'flagstaff',
        type: 'notable',
        content:
          'Mountain town near Grand Canyon. One dispensary; federal land surrounds the area—keep cannabis in your lodging.',
      },
    ],
  },
  {
    id: 4,
    name: 'Arkansas',
    slug: 'arkansas',
    status: 'medical',
    possession_limits: '2.5 oz per 14-day period (cardholders).',
    age_requirement: '18+ with state-issued card',
    purchase_rules: 'Medical dispensaries only; no reciprocity.',
    penalties: 'Misdemeanor for non-cardholders.',
    consumption_rules: 'Private residence; not in vehicles or public.',
    dispensary_guide: '30+ medical storefronts statewide.',
    travel_rules: 'Out-of-state cards not accepted.',
    subtitle: 'The Natural State: Medical-only program.',
    cities: [
      {
        name: 'Little Rock',
        slug: 'little-rock',
        type: 'major',
        content:
          'Central Arkansas dispensary cluster. Tourists cannot purchase—plan accordingly. River Market District offers live music and Southern cuisine.',
      },
      {
        name: 'Fayetteville',
        slug: 'fayetteville',
        type: 'medium',
        content:
          'Home to University of Arkansas. Progressive culture, but cannabis laws are medical-only. Enjoy the Ozark trails and local craft beer.',
      },
      {
        name: 'Fort Smith',
        slug: 'fort-smith',
        type: 'notable',
        content:
          'Western heritage town with one dispensary. Historic sites and Arkansas River views.',
      },
      {
        name: 'Hot Springs',
        slug: 'hot-springs',
        type: 'notable',
        content:
          'Spa city with one dispensary. Relax in thermal baths; cannabis use must be private.',
      },
    ],
  },
  {
    id: 5,
    name: 'California',
    slug: 'california',
    status: 'recreational',
    possession_limits: '1 oz flower | 8 g concentrate | 6 living plants.',
    age_requirement: '21+',
    purchase_rules: 'Licensed retailers & delivery; local bans exist.',
    penalties: '$100 fine for public consumption.',
    consumption_rules: 'Private property; consumption lounges allowed locally.',
    dispensary_guide: '900+ licensed stores; use Bureau of Cannabis Control map.',
    travel_rules: 'Illegal to transport across state lines or onto federal land.',
    subtitle: 'The Golden State: Mature recreational market.',
    cities: [
      {
        name: 'Los Angeles',
        slug: 'los-angeles',
        type: 'major',
        content:
          'Global cannabis epicenter: dispensaries, consumption lounges, 420-friendly hotels. Check local ordinances—some neighborhoods ban stores.',
      },
      {
        name: 'San Francisco',
        slug: 'san-francisco',
        type: 'major',
        content:
          'Historic cannabis culture; lounges like Moe Greens and Barbary Coast. Golden Gate Park is not consumption-friendly—stick to private venues.',
      },
      {
        name: 'San Diego',
        slug: 'san-diego',
        type: 'major',
        content:
          'Beach-city vibe with 50+ stores. County parks and beaches prohibit use; private rooftops or vacation rentals are safest.',
      },
      {
        name: 'Sacramento',
        slug: 'sacramento',
        type: 'major',
        content:
          'State capital with 40+ dispensaries. Old Town and river cruises are top attractions.',
      },
      {
        name: 'San Jose',
        slug: 'san-jose',
        type: 'major',
        content:
          'Silicon Valley hub with 20+ stores. Tech museums and nearby wineries; consume privately.',
      },
      {
        name: 'Oakland',
        slug: 'oakland',
        type: 'medium',
        content:
          'Social-equity pioneer; home to Magnolia lounge. Waterfront dining and art scene.',
      },
      {
        name: 'Fresno',
        slug: 'fresno',
        type: 'medium',
        content:
          'Central Valley city with 10+ stores. Gateway to Yosemite—cannabis illegal inside the park.',
      },
    ],
  },
  {
    id: 6,
    name: 'Colorado',
    slug: 'colorado',
    status: 'recreational',
    possession_limits: '1 oz flower | 8 g concentrate',
    age_requirement: '21+',
    purchase_rules: 'Licensed dispensaries only.',
    penalties: 'Civil fine for minor offenses.',
    consumption_rules: 'Private property; not in parks, ski resorts, or vehicles.',
    dispensary_guide: 'Recreational stores statewide.',
    travel_rules: 'Illegal on federal land.',
    subtitle: 'The Centennial State: Recreational cannabis is legal.',
    cities: [
      {
        name: 'Denver',
        slug: 'denver',
        type: 'major',
        content:
          'Cannabis tourism capital: 200+ stores, grow tours, 420-friendly hotels. Public consumption ticket ≈ $150—consume privately.',
      },
      {
        name: 'Boulder',
        slug: 'boulder',
        type: 'medium',
        content:
          'College town with premium dispensaries and mountain access. Flatirons hiking is cannabis-free federal land.',
      },
      {
        name: 'Colorado Springs',
        slug: 'colorado-springs',
        type: 'major',
        content:
          'Medical-only sales within city limits; recreational stores just outside city boundary. Pikes Peak and Garden of the Gods are federal land—no cannabis.',
      },
      {
        name: 'Fort Collins',
        slug: 'fort-collins',
        type: 'medium',
        content:
          'Craft-beer and college vibe. Several rec stores; consume at private lodgings.',
      },
      {
        name: 'Aspen',
        slug: 'aspen',
        type: 'notable',
        content:
          'Luxury ski town with 3 dispensaries. Hotel balconies are considered public—consume indoors.',
      },
    ],
  },
  {
    id: 7,
    name: 'Connecticut',
    slug: 'connecticut',
    status: 'recreational',
    possession_limits: '1.5 oz on person | 5 oz locked at home',
    age_requirement: '21+',
    purchase_rules: 'Licensed retailers only.',
    penalties: 'Civil infraction <$150.',
    consumption_rules: 'Private property; not in state parks or vehicles.',
    dispensary_guide: 'Recreational stores open since 2023.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Constitution State: Recreational cannabis is legal.',
    cities: [
      {
        name: 'Hartford',
        slug: 'hartford',
        type: 'major',
        content:
          'State capital with 5 recreational stores. Riverfront dining and Mark Twain House tours.',
      },
      {
        name: 'New Haven',
        slug: 'new-haven',
        type: 'major',
        content:
          'Yale University town with 4 stores. Pizza trail and art museums; consume privately.',
      },
      {
        name: 'Bridgeport',
        slug: 'bridgeport',
        type: 'medium',
        content:
          'Coastal city with 2 stores. Ferry to Long Island—cannabis illegal once you land in NY waters.',
      },
      {
        name: 'Stamford',
        slug: 'stamford',
        type: 'medium',
        content:
          'NYC commuter city with 3 stores. Harbor Point dining; public use banned.',
      },
    ],
  },
  {
    id: 8,
    name: 'Delaware',
    slug: 'delaware',
    status: 'recreational',
    possession_limits: '1 oz flower',
    age_requirement: '21+',
    purchase_rules: 'Licensed dispensaries only.',
    penalties: 'Civil fine $100.',
    consumption_rules: 'Private property; not on beaches or boardwalks.',
    dispensary_guide: 'Recreational stores operating statewide.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The First State: Recreational cannabis is legal.',
    cities: [
      {
        name: 'Wilmington',
        slug: 'wilmington',
        type: 'major',
        content:
          'Largest city with 3 stores. Riverfront dining and tax-free shopping; consume indoors.',
      },
      {
        name: 'Dover',
        slug: 'dover',
        type: 'medium',
        content:
          'State capital with 1 store. Speedway and casino nearby; public use banned.',
      },
      {
        name: 'Rehoboth Beach',
        slug: 'rehoboth-beach',
        type: 'notable',
        content:
          'Popular beach town; nearest store 15 min inland. Consumption on beach is illegal.',
      },
    ],
  },
  {
    id: 9,
    name: 'Florida',
    slug: 'florida',
    status: 'medical',
    possession_limits: 'Per physician order (max 2.5 oz / 35-day supply)',
    age_requirement: '18+ with state card',
    purchase_rules: 'Medical dispensaries only.',
    penalties: 'Misdemeanor for non-cardholders.',
    consumption_rules: 'Private property; not in parks or on beaches.',
    dispensary_guide: '400+ medical stores; no reciprocity.',
    travel_rules: 'Medical card not recognized for non-residents.',
    subtitle: 'The Sunshine State: Medical cannabis only.',
    cities: [
      {
        name: 'Miami',
        slug: 'miami',
        type: 'major',
        content:
          'Tourist hotspot with 20+ medical stores. Visitors cannot purchase—enjoy beaches and nightlife without cannabis.',
      },
      {
        name: 'Orlando',
        slug: 'orlando',
        type: 'major',
        content:
          'Theme-park capital with 15 medical stores. Parks prohibit possession—leave cannabis at hotel.',
      },
      {
        name: 'Tampa',
        slug: 'tampa',
        type: 'major',
        content:
          'Gulf Coast city with 12 stores. Riverwalk and Ybor City; consume at private lodging.',
      },
      {
        name: 'Jacksonville',
        slug: 'jacksonville',
        type: 'major',
        content:
          'Largest city by area with 10 stores. Beaches and NFL games; public use banned.',
      },
      {
        name: 'Fort Lauderdale',
        slug: 'fort-lauderdale',
        type: 'medium',
        content:
          'Boating hub with 8 stores. Water taxis and beaches; consume indoors.',
      },
      {
        name: 'Key West',
        slug: 'key-west',
        type: 'notable',
        content:
          'Southernmost island with 1 store. Cruise-ship crowds; cannabis illegal in Duval St. bars.',
      },
    ],
  },
  {
    id: 10,
    name: 'Georgia',
    slug: 'georgia',
    status: 'medical',
    possession_limits: '20 fl oz low-THC oil (< 5 % THC)',
    age_requirement: '18+ with registry card',
    purchase_rules: 'Licensed low-THC dispensaries.',
    penalties: 'Misdemeanor for possession of any flower.',
    consumption_rules: 'Private property; not in vehicles.',
    dispensary_guide: 'Low-THC oil only; no flower.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Peach State: Low-THC oil only.',
    cities: [
      {
        name: 'Atlanta',
        slug: 'atlanta',
        type: 'major',
        content:
          'Capital and economic hub. Strict penalties for flower; focus on civil-rights sites and food halls.',
      },
      {
        name: 'Savannah',
        slug: 'savannah',
        type: 'medium',
        content:
          'Historic riverfront city. Zero tolerance for flower; enjoy ghost tours and seafood.',
      },
      {
        name: 'Augusta',
        slug: 'augusta',
        type: 'notable',
        content:
          'Masters golf tournament host. Low-THC oil only; public use prohibited.',
      },
      {
        name: 'Macon',
        slug: 'macon',
        type: 'notable',
        content:
          'Music heritage town. Same low-THC restrictions; consume privately.',
      },
    ],
  },
  {
    id: 11,
    name: 'Hawaii',
    slug: 'hawaii',
    status: 'medical',
    possession_limits: '4 oz every 15 days (cardholders)',
    age_requirement: '18+ with state card',
    purchase_rules: 'Medical dispensaries only.',
    penalties: 'Decriminalized 3 g or less (non-cardholders).',
    consumption_rules: 'Private property; illegal on beaches and trails.',
    dispensary_guide: 'Medical stores on Oahu, Maui, Big Island, Kauai.',
    travel_rules: 'Illegal on federal park land.',
    subtitle: 'The Aloha State: Medical cannabis only.',
    cities: [
      {
        name: 'Honolulu',
        slug: 'honolulu',
        type: 'major',
        content:
          'Oahu’s capital with 5 medical stores. Waikiki beaches are cannabis-free; consume at private rentals.',
      },
      {
        name: 'Lahaina',
        slug: 'lahaina',
        type: 'notable',
        content:
          'Maui tourist town with 1 store. Sunset cruises and Front Street; public use banned.',
      },
      {
        name: 'Hilo',
        slug: 'hilo',
        type: 'notable',
        content:
          'Big Island east side with 1 store. Volcanoes National Park is federal—no cannabis.',
      },
      {
        name: 'Kailua-Kona',
        slug: 'kailua-kona',
        type: 'notable',
        content:
          'Big Island west side with 1 store. Coffee farms and snorkeling; consume indoors.',
      },
    ],
  },
  {
    id: 12,
    name: 'Idaho',
    slug: 'idaho',
    status: 'illegal',
    possession_limits: 'Any amount is misdemeanor/felony.',
    age_requirement: null,
    purchase_rules: null,
    penalties: 'Strictest in nation; no decrim.',
    consumption_rules: 'Fully prohibited.',
    dispensary_guide: 'No legal dispensaries.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Gem State: Cannabis is fully prohibited.',
    cities: [
      {
        name: 'Boise',
        slug: 'boise',
        type: 'major',
        content:
          'Capital and largest city. Zero tolerance; enjoy Basque Block and river trails instead.',
      },
      {
        name: 'Idaho Falls',
        slug: 'idaho-falls',
        type: 'notable',
        content:
          'Eastern gateway to Yellowstone. Strict enforcement; focus on outdoor scenery.',
      },
      {
        name: 'Coeur d’Alene',
        slug: 'coeur-dalene',
        type: 'notable',
        content:
          'Lake resort town. Possession arrests common; stick to lake cruises and golf.',
      },
    ],
  },
  {
    id: 13,
    name: 'Illinois',
    slug: 'illinois',
    status: 'recreational',
    possession_limits: '30 g flower (residents) | 15 g (visitors)',
    age_requirement: '21+',
    purchase_rules: 'Licensed dispensaries only.',
    penalties: 'Civil fine ≤ $200.',
    consumption_rules: 'Private property; not in vehicles or parks.',
    dispensary_guide: 'Recreational stores statewide.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Prairie State: Recreational cannabis is legal.',
    cities: [
      {
        name: 'Chicago',
        slug: 'chicago',
        type: 'major',
        content:
          'Midwest cannabis capital: 30+ stores, consumption lounges, 420-friendly hotels. Navy Pier and lakefront are cannabis-free.',
      },
      {
        name: 'Springfield',
        slug: 'springfield',
        type: 'medium',
        content:
          'State capital with 3 stores. Lincoln sites and Route 66 history; consume privately.',
      },
      {
        name: 'Rockford',
        slug: 'rockford',
        type: 'medium',
        content:
          'Northern city with 2 stores. Anderson Japanese Gardens; public use banned.',
      },
      {
        name: 'Peoria',
        slug: 'peoria',
        type: 'medium',
        content:
          'Riverfront city with 2 stores. Riverboat casinos; cannabis prohibited on gaming floors.',
      },
    ],
  },
  {
    id: 14,
    name: 'Indiana',
    slug: 'indiana',
    status: 'illegal',
    possession_limits: 'Any amount is misdemeanor/felony.',
    age_requirement: null,
    purchase_rules: null,
    penalties: 'Strict; no decrim.',
    consumption_rules: 'Fully prohibited.',
    dispensary_guide: 'No legal dispensaries.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Hoosier State: Cannabis is fully prohibited.',
    cities: [
      {
        name: 'Indianapolis',
        slug: 'indianapolis',
        type: 'major',
        content:
          'Capital and racing capital. Zero tolerance; enjoy Indy 500 and museums instead.',
      },
      {
        name: 'Fort Wayne',
        slug: 'fort-wayne',
        type: 'medium',
        content:
          'Second-largest city. Strict enforcement; focus on riverfront parks.',
      },
      {
        name: 'Bloomington',
        slug: 'bloomington',
        type: 'notable',
        content:
          'IU college town. Possession arrests frequent; stick to basketball and arts.',
      },
      {
        name: 'South Bend',
        slug: 'south-bend',
        type: 'notable',
        content:
          'Home to Notre Dame. Same zero-tolerance policy; enjoy campus tours.',
      },
    ],
  },
  {
    id: 15,
    name: 'Iowa',
    slug: 'iowa',
    status: 'medical',
    possession_limits: 'Per physician order (max 4.5 g THC / 90 days)',
    age_requirement: '18+ with state card',
    purchase_rules: 'Medical dispensaries only.',
    penalties: 'Misdemeanor for non-cardholders.',
    consumption_rules: 'Private property; not in vehicles.',
    dispensary_guide: '5 medical dispensaries statewide.',
    travel_rules: 'No reciprocity.',
    subtitle: 'The Hawkeye State: Medical cannabis only.',
    cities: [
      {
        name: 'Des Moines',
        slug: 'des-moines',
        type: 'major',
        content:
          'Capital with 2 medical stores. Downtown farmers market and sculpture park; tourists cannot purchase.',
      },
      {
        name: 'Cedar Rapids',
        slug: 'cedar-rapids',
        type: 'medium',
        content:
          'Eastern city with 1 store. Art museum and brewery tours; public use banned.',
      },
      {
        name: 'Davenport',
        slug: 'davenport',
        type: 'medium',
        content:
          'Quad Cities riverfront with 1 store. Casino resorts; cannabis prohibited on gaming floors.',
      },
      {
        name: 'Iowa City',
        slug: 'iowa-city',
        type: 'notable',
        content:
          'University town with 1 store. Pedestrian mall and bookstores; consume privately.',
      },
    ],
  },
  {
    id: 16,
    name: 'Kansas',
    slug: 'kansas',
    status: 'illegal',
    possession_limits: 'Any amount is misdemeanor/felony.',
    age_requirement: null,
    purchase_rules: null,
    penalties: 'Strict; no decrim.',
    consumption_rules: 'Fully prohibited.',
    dispensary_guide: 'No legal dispensaries.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Sunflower State: Cannabis is fully prohibited.',
    cities: [
      {
        name: 'Wichita',
        slug: 'wichita',
        type: 'major',
        content:
          'Largest city. Zero tolerance; enjoy aviation museums and riverfest.',
      },
      {
        name: 'Kansas City',
        slug: 'kansas-city-kansas',
        type: 'medium',
        content:
          'Note: KS side has strict laws; MO side (10 min away) has legal recreational stores.',
      },
      {
        name: 'Topeka',
        slug: 'topeka',
        type: 'medium',
        content:
          'State capital. Possession arrests common; focus on history museum.',
      },
      {
        name: 'Lawrence',
        slug: 'lawrence',
        type: 'notable',
        content:
          'KU college town. Same zero tolerance; enjoy Massachusetts Street dining.',
      },
    ],
  },
  {
    id: 17,
    name: 'Kentucky',
    slug: 'kentucky',
    status: 'medical',
    possession_limits: 'Per physician order',
    age_requirement: '18+ with card',
    purchase_rules: 'Medical dispensaries only.',
    penalties: 'Misdemeanor for non-cardholders.',
    consumption_rules: 'Private property; not in vehicles.',
    dispensary_guide: 'Medical dispensaries now operating statewide.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Bluegrass State: Medical cannabis available.',
    cities: [
      {
        name: 'Louisville',
        slug: 'louisville',
        type: 'major',
        content:
          'Largest city. Dispensaries expected 2025; enjoy bourbon trail and Derby museum.',
      },
      {
        name: 'Lexington',
        slug: 'lexington',
        type: 'medium',
        content:
          'Horse country. Same 2025 timeline; Keeneland tours and craft beer.',
      },
      {
        name: 'Bowling Green',
        slug: 'bowling-green',
        type: 'notable',
        content:
          'Corvette museum town. No stores yet; focus on caves and cars.',
      },
      {
        name: 'Owensboro',
        slug: 'owensboro',
        type: 'notable',
        content:
          'Riverfront BBQ capital. Same medical-only outlook; consume privately.',
      },
    ],
  },
  {
    id: 18,
    name: 'Louisiana',
    slug: 'louisiana',
    status: 'medical',
    possession_limits: 'Per physician order (max 2.5 oz / 30 days)',
    age_requirement: '18+ with card',
    purchase_rules: 'Medical dispensaries only.',
    penalties: 'Decrim 14 g or less (non-cardholders).',
    consumption_rules: 'Private property; not in French Quarter streets.',
    dispensary_guide: '9 regional pharmacies statewide.',
    travel_rules: 'No reciprocity.',
    subtitle: 'The Pelican State: Medical cannabis only.',
    cities: [
      {
        name: 'New Orleans',
        slug: 'new-orleans',
        type: 'major',
        content:
          'Tourist magnet with 2 medical pharmacies. Visitors cannot purchase; enjoy jazz and cuisine instead.',
      },
      {
        name: 'Baton Rouge',
        slug: 'baton-rouge',
        type: 'major',
        content:
          'State capital with 2 pharmacies. LSU campus and river casinos; public use banned.',
      },
      {
        name: 'Lafayette',
        slug: 'lafayette',
        type: 'medium',
        content:
          'Cajun country with 1 pharmacy. Music festivals; consume privately.',
      },
      {
        name: 'Shreveport',
        slug: 'shreveport',
        type: 'medium',
        content:
          'Northwest hub with 1 pharmacy. Riverboat casinos; cannabis prohibited on gaming floors.',
      },
    ],
  },
  {
    id: 19,
    name: 'Maine',
    slug: 'maine',
    status: 'recreational',
    possession_limits: '2.5 oz flower | 5 g concentrate',
    age_requirement: '21+',
    purchase_rules: 'Licensed stores only.',
    penalties: 'Civil fine ≤ $100.',
    consumption_rules: 'Private property; not in state parks.',
    dispensary_guide: 'Recreational stores statewide.',
    travel_rules: 'Illegal on federal land.',
    subtitle: 'The Pine Tree State: Recreational cannabis is legal.',
    cities: [
      {
        name: 'Portland',
        slug: 'portland-maine',
        type: 'major',
        content:
          'Coastal cultural hub with 10 stores. Old Port dining and ferry islands; consume at rentals.',
      },
      {
        name: 'Bangor',
        slug: 'bangor',
        type: 'medium',
        content:
          'Central city with 3 stores. Stephen King tours and riverfront concerts.',
      },
      {
        name: 'Augusta',
        slug: 'augusta',
        type: 'medium',
        content:
          'State capital with 2 stores. Historic dome and Kennebec River trails.',
      },
      {
        name: 'Bar Harbor',
        slug: 'bar-harbor',
        type: 'notable',
        content:
          'Gateway to Acadia National Park—federal land, no cannabis. Nearest store 10 min away.',
      },
    ],
  },
  {
    id: 20,
    name: 'Maryland',
    slug: 'maryland',
    status: 'recreational',
    possession_limits: '1.5 oz flower | 12 g concentrate',
    age_requirement: '21+',
    purchase_rules: 'Licensed stores only.',
    penalties: 'Civil fine ≤ $50.',
    consumption_rules: 'Private property; not on Ocean City boardwalk.',
    dispensary_guide: 'Recreational sales active.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Old Line State: Recreational cannabis is legal.',
    cities: [
      {
        name: 'Baltimore',
        slug: 'baltimore',
        type: 'major',
        content:
          'Largest city with 15+ stores. Inner Harbor and crab houses; public use banned.',
      },
      {
        name: 'Annapolis',
        slug: 'annapolis',
        type: 'medium',
        content:
          'Naval academy capital with 2 stores. Waterfront dining; consume at private lodgings.',
      },
      {
        name: 'Silver Spring',
        slug: 'silver-spring',
        type: 'medium',
        content:
          'DC suburb with 3 stores. Transit to DC—cannabis illegal on Metro.',
      },
      {
        name: 'Ocean City',
        slug: 'ocean-city',
        type: 'notable',
        content:
          'Beach resort town. Boardwalk and beaches are cannabis-free; nearest store 20 min inland.',
      },
    ],
  },
  {
    id: 21,
    name: 'Massachusetts',
    slug: 'massachusetts',
    status: 'recreational',
    possession_limits: '1 oz on person | 10 oz at home',
    age_requirement: '21+',
    purchase_rules: 'Licensed stores only.',
    penalties: 'Civil fine ≤ $100.',
    consumption_rules: 'Private property; not on Cape Cod beaches.',
    dispensary_guide: 'Recreational stores statewide.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Bay State: Recreational cannabis is legal.',
    cities: [
      {
        name: 'Boston',
        slug: 'boston',
        type: 'major',
        content:
          'Historic capital with 15+ stores. Freedom Trail and Fenway; public consumption ticketed.',
      },
      {
        name: 'Worcester',
        slug: 'worcester',
        type: 'major',
        content:
          'Central city with 5 stores. Art museum and canal district; consume privately.',
      },
      {
        name: 'Springfield',
        slug: 'springfield',
        type: 'medium',
        content:
          'Western hub with 3 stores. Dr. Seuss museum and casino; no public use.',
      },
      {
        name: 'Provincetown',
        slug: 'provincetown',
        type: 'notable',
        content:
          'Cape Cod tip with 2 stores. National seashore is federal—no cannabis.',
      },
    ],
  },
  {
    id: 22,
    name: 'Michigan',
    slug: 'michigan',
    status: 'recreational',
    possession_limits: '2.5 oz on person | 10 oz at home',
    age_requirement: '21+',
    purchase_rules: 'Licensed stores only.',
    penalties: 'Civil fine ≤ $100.',
    consumption_rules: 'Private property; not in state parks.',
    dispensary_guide: 'Recreational stores statewide.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Great Lakes State: Recreational cannabis is legal.',
    cities: [
      {
        name: 'Detroit',
        slug: 'detroit',
        type: 'major',
        content:
          'Motor city with 25+ stores. Casinos and music venues; public use banned.',
      },
      {
        name: 'Grand Rapids',
        slug: 'grand-rapids',
        type: 'major',
        content:
          'West-side hub with 10 stores. Craft-beer trail; consume at private lodgings.',
      },
      {
        name: 'Ann Arbor',
        slug: 'ann-arbor',
        type: 'medium',
        content:
          'University town with 8 stores. Hash Bash festival; city parks are consumption-free.',
      },
      {
        name: 'Traverse City',
        slug: 'traverse-city',
        type: 'notable',
        content:
          'Cherry capital with 4 stores. Sleeping Bear dunes—federal land, no cannabis.',
      },
    ],
  },
  {
    id: 23,
    name: 'Minnesota',
    slug: 'minnesota',
    status: 'recreational',
    possession_limits: '2 oz flower | 8 g concentrate',
    age_requirement: '21+',
    purchase_rules: 'Licensed stores only.',
    penalties: 'Civil fine ≤ $50.',
    consumption_rules: 'Private property; not in state parks.',
    dispensary_guide: 'Recreational stores now operating statewide.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The North Star State: Recreational cannabis is legal.',
    cities: [
      {
        name: 'Minneapolis',
        slug: 'minneapolis',
        type: 'major',
        content:
          'Twin-city metro with 10 medical stores; rec stores expected 2025. Lakes and music scene; consume privately.',
      },
      {
        name: 'St. Paul',
        slug: 'st-paul',
        type: 'major',
        content:
          'Capital city with 5 medical stores. Winter carnival; public use banned.',
      },
      {
        name: 'Duluth',
        slug: 'duluth',
        type: 'medium',
        content:
          'Lake Superior port with 2 medical stores. Scenic lift bridge; cannabis illegal on federal lakefront.',
      },
      {
        name: 'Rochester',
        slug: 'rochester',
        type: 'medium',
        content:
          'Mayo Clinic city with 2 medical stores. Medical campus is cannabis-free.',
      },
    ],
  },
  {
    id: 24,
    name: 'Mississippi',
    slug: 'mississippi',
    status: 'medical',
    possession_limits: '3.5 g flower per day (cardholders)',
    age_requirement: '18+ with state card',
    purchase_rules: 'Medical dispensaries only.',
    penalties: 'Decrim 1 oz or less (non-cardholders).',
    consumption_rules: 'Private property; not in vehicles.',
    dispensary_guide: 'Medical stores statewide.',
    travel_rules: 'No reciprocity.',
    subtitle: 'The Magnolia State: Medical cannabis only.',
    cities: [
      {
        name: 'Jackson',
        slug: 'jackson',
        type: 'major',
        content:
          'Capital with 5 medical stores. Blues trail and museums; tourists cannot purchase.',
      },
      {
        name: 'Gulfport',
        slug: 'gulfport',
        type: 'medium',
        content:
          'Coast casino city with 3 stores. Beachfront hotels; public use banned.',
      },
      {
        name: 'Oxford',
        slug: 'oxford',
        type: 'notable',
        content:
          'University town with 1 store. Square Books and football; consume privately.',
      },
      {
        name: 'Tupelo',
        slug: 'tupelo',
        type: 'notable',
        content:
          'Elvis birthplace with 1 store. Natchez Trace parkway—federal, no cannabis.',
      },
    ],
  },
  {
    id: 25,
    name: 'Missouri',
    slug: 'missouri',
    status: 'recreational',
    possession_limits: '3 oz flower',
    age_requirement: '21+',
    purchase_rules: 'Licensed stores only.',
    penalties: 'Civil fine ≤ $100.',
    consumption_rules: 'Private property; not in state parks.',
    dispensary_guide: 'Recreational stores statewide.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Show Me State: Recreational cannabis is legal.',
    cities: [
      {
        name: 'Kansas City',
        slug: 'kansas-city-missouri',
        type: 'major',
        content:
          'Metro with 20+ stores. BBQ and jazz district; public consumption ticketed.',
      },
      {
        name: 'St. Louis',
        slug: 'st-louis',
        type: 'major',
        content:
          'Gateway arch city with 15 stores. Brewery tours; arch grounds are cannabis-free.',
      },
      {
        name: 'Springfield',
        slug: 'springfield-missouri',
        type: 'medium',
        content:
          'Ozarks hub with 5 stores. Bass Pro HQ; consume at private lodgings.',
      },
      {
        name: 'Columbia',
        slug: 'columbia',
        type: 'medium',
        content:
          'University town with 4 stores. Art and music festivals; no public use.',
      },
    ],
  },
  {
    id: 26,
    name: 'Montana',
    slug: 'montana',
    status: 'recreational',
    possession_limits: '1 oz flower | 8 g concentrate',
    age_requirement: '21+',
    purchase_rules: 'Licensed stores only.',
    penalties: 'Civil fine ≤ $50.',
    consumption_rules: 'Private property; illegal in state and federal parks.',
    dispensary_guide: 'Recreational stores statewide.',
    travel_rules: 'Illegal on federal land.',
    subtitle: 'The Treasure State: Recreational cannabis is legal.',
    cities: [
      {
        name: 'Billings',
        slug: 'billings',
        type: 'major',
        content:
          'Largest city with 8 stores. Rimrocks hiking; public use banned.',
      },
      {
        name: 'Missoula',
        slug: 'missoula',
        type: 'medium',
        content:
          'University mountain town with 6 stores. River tubing; consume privately.',
      },
      {
        name: 'Bozeman',
        slug: 'bozeman',
        type: 'medium',
        content:
          'Yellowstone gateway with 5 stores. Bridger Bowl ski area is federal—no cannabis.',
      },
      {
        name: 'Great Falls',
        slug: 'great-falls',
        type: 'notable',
        content:
          'Central city with 3 stores. Missouri River breaks; national monuments are federal.',
      },
    ],
  },
  {
    id: 27,
    name: 'Nebraska',
    slug: 'nebraska',
    status: 'decriminalized',
    possession_limits: '1 oz or less (civil infraction)',
    age_requirement: null,
    purchase_rules: null,
    penalties: '$300 ticket for 1 oz or less.',
    consumption_rules: 'Prohibited in public.',
    dispensary_guide: 'No legal dispensaries.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Cornhusker State: Decriminalized, but not legal.',
    cities: [
      {
        name: 'Omaha',
        slug: 'omaha',
        type: 'major',
        content:
          'Largest city. Civil ticket for small amounts; no stores—focus on zoo and steaks.',
      },
      {
        name: 'Lincoln',
        slug: 'lincoln',
        type: 'medium',
        content:
          'State capital and university. Same civil fine; no legal sales.',
      },
      {
        name: 'Grand Island',
        slug: 'grand-island',
        type: 'notable',
        content:
          'Central city. Possession still ticketed; enjoy state fair and crane migration.',
      },
    ],
  },
  {
    id: 28,
    name: 'Nevada',
    slug: 'nevada',
    status: 'recreational',
    possession_limits: '1 oz flower | 1/8 oz concentrate',
    age_requirement: '21+',
    purchase_rules: 'Licensed stores only.',
    penalties: 'Civil fine ≤ $600.',
    consumption_rules: 'Private property; not on Strip sidewalks.',
    dispensary_guide: 'Recreational stores statewide.',
    travel_rules: 'Illegal on federal land.',
    subtitle: 'The Silver State: Recreational cannabis is legal.',
    cities: [
      {
        name: 'Las Vegas',
        slug: 'las-vegas',
        type: 'major',
        content:
          '24-hour cannabis capital: 40+ stores, consumption lounges. Strip and casinos are cannabis-free; use lounges or private rentals.',
      },
      {
        name: 'Reno',
        slug: 'reno',
        type: 'major',
        content:
          'Biggest little city with 10 stores. Lake Tahoe nearby—Nevada side allows possession, but ski resorts are federal.',
      },
      {
        name: 'Henderson',
        slug: 'henderson',
        type: 'medium',
        content:
          'Vegas suburb with 8 stores. Lake Mead NRA is federal—no cannabis.',
      },
      {
        name: 'Sparks',
        slug: 'sparks',
        type: 'medium',
        content:
          'Reno neighbor with 3 stores. Victorian Square events; public use banned.',
      },
    ],
  },
  {
    id: 29,
    name: 'New Hampshire',
    slug: 'new-hampshire',
    status: 'decriminalized',
    possession_limits: '3/4 oz or less (civil infraction)',
    age_requirement: null,
    purchase_rules: null,
    penalties: '$100 ticket for small amounts.',
    consumption_rules: 'Prohibited in public.',
    dispensary_guide: 'Medical dispensaries only.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Granite State: Decriminalized, but not legal.',
    cities: [
      {
        name: 'Manchester',
        slug: 'manchester',
        type: 'major',
        content:
          'Largest city. Civil ticket; no recreational stores—enjoy tax-free shopping.',
      },
      {
        name: 'Nashua',
        slug: 'nashua',
        type: 'medium',
        content:
          'Southern border city. Same civil fine; nearest rec stores 10 min away in MA.',
      },
      {
        name: 'Concord',
        slug: 'concord',
        type: 'medium',
        content:
          'State capital. Possession ticketed; focus on history museum and trails.',
      },
      {
        name: 'Portsmouth',
        slug: 'portsmouth',
        type: 'notable',
        content:
          'Seacoast tourist town. Civil fine; waterfront dining and tax-free outlets.',
      },
    ],
  },
  {
    id: 30,
    name: 'New Jersey',
    slug: 'new-jersey',
    status: 'recreational',
    possession_limits: '6 oz flower | 17 g concentrate',
    age_requirement: '21+',
    purchase_rules: 'Licensed stores only.',
    penalties: 'Civil fine ≤ $50.',
    consumption_rules: 'Private property; not on beaches.',
    dispensary_guide: 'Recreational stores statewide.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Garden State: Recreational cannabis is legal.',
    cities: [
      {
        name: 'Newark',
        slug: 'newark',
        type: 'major',
        content:
          'Largest city with 8 stores. Airport and NYC transit; public use ticketed.',
      },
      {
        name: 'Jersey City',
        slug: 'jersey-city',
        type: 'major',
        content:
          'Hudson River skyline with 6 stores. Liberty State Park is cannabis-free.',
      },
      {
        name: 'Atlantic City',
        slug: 'atlantic-city',
        type: 'medium',
        content:
          'Casino beach town with 4 stores. Boardwalk and beaches are cannabis-free.',
      },
      {
        name: 'Asbury Park',
        slug: 'asbury-park',
        type: 'notable',
        content:
          'Music beach town with 2 stores. Stone Pony venue; public use banned.',
      },
    ],
  },
  {
    id: 31,
    name: 'New Mexico',
    slug: 'new-mexico',
    status: 'recreational',
    possession_limits: '2 oz flower | 16 g concentrate',
    age_requirement: '21+',
    purchase_rules: 'Licensed stores only.',
    penalties: 'Civil fine ≤ $50.',
    consumption_rules: 'Private property; not in state parks.',
    dispensary_guide: 'Recreational stores statewide.',
    travel_rules: 'Illegal on federal land.',
    subtitle: 'The Land of Enchantment: Recreational cannabis is legal.',
    cities: [
      {
        name: 'Albuquerque',
        slug: 'albuquerque',
        type: 'major',
        content:
          'High-desert metro with 20+ stores. Balloon Fiesta park is cannabis-free; consume at rentals.',
      },
      {
        name: 'Santa Fe',
        slug: 'santa-fe',
        type: 'major',
        content:
          'Art capital with 8 stores. Plaza and canyon road; public use ticketed.',
      },
      {
        name: 'Las Cruces',
        slug: 'las-cruces',
        type: 'medium',
        content:
          'Southern city with 5 stores. Organ Mountains desert trails—federal, no cannabis.',
      },
      {
        name: 'Taos',
        slug: 'taos',
        type: 'notable',
        content:
          'Ski village with 2 stores. Taos Pueblo is tribal land—separate rules apply.',
      },
    ],
  },
  {
    id: 32,
    name: 'New York',
    slug: 'new-york',
    status: 'recreational',
    possession_limits: '3 oz flower | 24 g concentrate',
    age_requirement: '21+',
    purchase_rules: 'Licensed stores only.',
    penalties: 'Civil fine ≤ $25.',
    consumption_rules: 'Anywhere tobacco allowed unless posted.',
    dispensary_guide: 'Recreational stores expanding rapidly.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Empire State: Recreational cannabis is legal.',
    cities: [
      {
        name: 'New York City',
        slug: 'new-york-city',
        type: 'major',
        content:
          'Global cannabis scene: 30+ stores, delivery, consumption lounges. Parks and Times Square are smoke-free; sidewalk use allowed unless posted.',
      },
      {
        name: 'Buffalo',
        slug: 'buffalo',
        type: 'major',
        content:
          'Western hub with 8 stores. Niagara Falls state park is cannabis-free.',
      },
      {
        name: 'Rochester',
        slug: 'rochester',
        type: 'major',
        content:
          'Lake Ontario city with 6 stores. Lilac festival; public use allowed where tobacco is.',
      },
      {
        name: 'Albany',
        slug: 'albany',
        type: 'medium',
        content:
          'State capital with 4 stores. Empire plaza events; consume in designated areas.',
      },
      {
        name: 'Syracuse',
        slug: 'syracuse',
        type: 'medium',
        content:
          'Central city with 4 stores. University hill; dorm possession banned.',
      },
    ],
  },
  {
    id: 33,
    name: 'North Carolina',
    slug: 'north-carolina',
    status: 'decriminalized',
    possession_limits: '1/2 oz or less (civil infraction)',
    age_requirement: null,
    purchase_rules: null,
    penalties: '$200 ticket for small amounts.',
    consumption_rules: 'Prohibited in public.',
    dispensary_guide: 'No legal dispensaries.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Tar Heel State: Decriminalized, but not legal.',
    cities: [
      {
        name: 'Charlotte',
        slug: 'charlotte',
        type: 'major',
        content:
          'Banking hub. Civil ticket; no stores—focus on NASCAR hall and breweries.',
      },
      {
        name: 'Raleigh',
        slug: 'raleigh',
        type: 'major',
        content:
          'State capital and tech triangle. Same civil fine; enjoy museums and trails.',
      },
      {
        name: 'Greensboro',
        slug: 'greensboro',
        type: 'medium',
        content:
          'Central city. Possession ticketed; civil-rights museum worth visiting.',
      },
      {
        name: 'Asheville',
        slug: 'asheville',
        type: 'medium',
        content:
          'Mountain hippie haven. Civil fine; Blue Ridge Parkway is federal—no cannabis.',
      },
      {
        name: 'Wilmington',
        slug: 'wilmington',
        type: 'medium',
        content:
          'Coastal film town. Beach and riverwalk; public use ticketed.',
      },
    ],
  },
  {
    id: 34,
    name: 'North Dakota',
    slug: 'north-dakota',
    status: 'medical',
    possession_limits: '3 oz every 30 days (cardholders)',
    age_requirement: '18+ with state card',
    purchase_rules: 'Medical dispensaries only.',
    penalties: 'Misdemeanor for non-cardholders.',
    consumption_rules: 'Private property; not in vehicles.',
    dispensary_guide: 'Medical stores statewide.',
    travel_rules: 'No reciprocity.',
    subtitle: 'The Peace Garden State: Medical cannabis only.',
    cities: [
      {
        name: 'Fargo',
        slug: 'fargo',
        type: 'major',
        content:
          'Largest city with 2 medical stores. Plains art museum; tourists cannot purchase.',
      },
      {
        name: 'Bismarck',
        slug: 'bismarck',
        type: 'medium',
        content:
          'State capital with 1 store. Lewis & Clark history; consume privately.',
      },
      {
        name: 'Grand Forks',
        slug: 'grand-forks',
        type: 'medium',
        content:
          'University border city with 1 store. Hockey arena; public use banned.',
      },
      {
        name: 'Minot',
        slug: 'minot',
        type: 'notable',
        content:
          'Air-force city with 1 store. Scandinavian heritage park; same medical rules.',
      },
    ],
  },
  {
    id: 35,
    name: 'Ohio',
    slug: 'ohio',
    status: 'recreational',
    possession_limits: '2.5 oz flower | 15 g concentrate',
    age_requirement: '21+',
    purchase_rules: 'Licensed stores only.',
    penalties: 'Civil fine ≤ $150.',
    consumption_rules: 'Private property; not in state parks.',
    dispensary_guide: 'Recreational stores now operating statewide.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Buckeye State: Recreational cannabis is legal.',
    cities: [
      {
        name: 'Columbus',
        slug: 'columbus',
        type: 'major',
        content:
          'Capital and university city with 20 medical stores. Rec stores expected late 2024.',
      },
      {
        name: 'Cleveland',
        slug: 'cleveland',
        type: 'major',
        content:
          'Lake Erie city with 15 medical stores. Rock hall and breweries; consume privately.',
      },
      {
        name: 'Cincinnati',
        slug: 'cincinnati',
        type: 'major',
        content:
          'Riverfront city with 12 medical stores. MLB stadium and zoo; public use banned.',
      },
      {
        name: 'Toledo',
        slug: 'toledo',
        type: 'medium',
        content:
          'Glass city with 5 medical stores. Art museum and casino; same pending rec rules.',
      },
      {
        name: 'Akron',
        slug: 'akron',
        type: 'medium',
        content:
          'Rubber city with 4 medical stores. National park trails—federal, no cannabis.',
      },
    ],
  },
  {
    id: 36,
    name: 'Oklahoma',
    slug: 'oklahoma',
    status: 'medical',
    possession_limits: '3 oz on person | 8 oz at home (cardholders)',
    age_requirement: '18+ with state card',
    purchase_rules: 'Medical dispensaries only.',
    penalties: 'Misdemeanor for non-cardholders.',
    consumption_rules: 'Private property; not in vehicles.',
    dispensary_guide: '2,000+ medical stores; no reciprocity.',
    travel_rules: 'No reciprocity.',
    subtitle: 'The Sooner State: Medical cannabis only.',
    cities: [
      {
        name: 'Oklahoma City',
        slug: 'oklahoma-city',
        type: 'major',
        content:
          'Capital with 200+ medical stores. Tourists cannot purchase; enjoy cowboy museum and river sports.',
      },
      {
        name: 'Tulsa',
        slug: 'tulsa',
        type: 'major',
        content:
          'Art-deco city with 150 stores. Music history and casinos; public use banned.',
      },
      {
        name: 'Norman',
        slug: 'norman',
        type: 'medium',
        content:
          'University town with 30 stores. Football Saturdays; campus is cannabis-free.',
      },
      {
        name: 'Stillwater',
        slug: 'stillwater',
        type: 'notable',
        content:
          'Cowboy college town with 15 stores. Same medical-only rules; consume privately.',
      },
    ],
  },
  {
    id: 37,
    name: 'Oregon',
    slug: 'oregon',
    status: 'recreational',
    possession_limits: '2 oz on person | 8 oz at home',
    age_requirement: '21+',
    purchase_rules: 'Licensed stores only.',
    penalties: 'Civil fine ≤ $65.',
    consumption_rules: 'Private property; not in state parks.',
    dispensary_guide: 'Recreational stores statewide.',
    travel_rules: 'Illegal on federal land.',
    subtitle: 'The Beaver State: Recreational cannabis is legal.',
    cities: [
      {
        name: 'Portland',
        slug: 'portland-oregon',
        type: 'major',
        content:
          'Rose city with 150+ stores. Food trucks and microbreweries; public use ticketed.',
      },
      {
        name: 'Eugene',
        slug: 'eugene',
        type: 'major',
        content:
          'University hippie hub with 20 stores. Track town USA; consume at rentals.',
      },
      {
        name: 'Salem',
        slug: 'salem',
        type: 'medium',
        content:
          'State capital with 10 stores. Cherry festivals and riverfront; no public use.',
      },
      {
        name: 'Bend',
        slug: 'bend',
        type: 'medium',
        content:
          'Mountain bike mecca with 8 stores. Deschutes national forest—federal, no cannabis.',
      },
      {
        name: 'Medford',
        slug: 'medford',
        type: 'notable',
        content:
          'Southern valley with 5 stores. Wine tours; consume privately.',
      },
    ],
  },
  {
    id: 38,
    name: 'Pennsylvania',
    slug: 'pennsylvania',
    status: 'medical',
    possession_limits: 'Per physician order (max 30-day supply)',
    age_requirement: '18+ with state card',
    purchase_rules: 'Medical dispensaries only.',
    penalties: 'Decrim 30 g or less in major cities.',
    consumption_rules: 'Private property; not in vehicles.',
    dispensary_guide: 'Medical stores statewide; no reciprocity.',
    travel_rules: 'No reciprocity.',
    subtitle: 'The Keystone State: Medical cannabis only.',
    cities: [
      {
        name: 'Philadelphia',
        slug: 'philadelphia',
        type: 'major',
        content:
          'Historic city with 20 medical stores. Liberty Bell and cheesesteaks; tourists cannot purchase.',
      },
      {
        name: 'Pittsburgh',
        slug: 'pittsburgh',
        type: 'major',
        content:
          'Steel city with 15 medical stores. Three rivers and inclines; public use banned.',
      },
      {
        name: 'Allentown',
        slug: 'allentown',
        type: 'medium',
        content:
          'Lehigh valley with 5 medical stores. Minor league ballpark; consume privately.',
      },
      {
        name: 'Erie',
        slug: 'erie',
        type: 'medium',
        content:
          'Lake city with 3 medical stores. Presque Isle state park—cannabis-free beach.',
      },
      {
        name: 'Harrisburg',
        slug: 'harrisburg',
        type: 'medium',
        content:
          'State capital with 3 medical stores. Riverfront and state museum; same medical rules.',
      },
    ],
  },
  {
    id: 39,
    name: 'Rhode Island',
    slug: 'rhode-island',
    status: 'recreational',
    possession_limits: '1 oz on person | 10 oz at home',
    age_requirement: '21+',
    purchase_rules: 'Licensed stores only.',
    penalties: 'Civil fine ≤ $150.',
    consumption_rules: 'Private property; not on state beaches.',
    dispensary_guide: 'Recreational stores statewide.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Ocean State: Recreational cannabis is legal.',
    cities: [
      {
        name: 'Providence',
        slug: 'providence',
        type: 'major',
        content:
          'Capital with 5 stores. Brown University and WaterFire; public use ticketed.',
      },
      {
        name: 'Warwick',
        slug: 'warwick',
        type: 'medium',
        content:
          'Coast city with 2 stores. T.F. Green airport—cannabis illegal once inside.',
      },
      {
        name: 'Newport',
        slug: 'newport',
        type: 'notable',
        content:
          'Gilded-age mansions and beaches. Cliff Walk and state beach—no cannabis.',
      },
    ],
  },
  {
    id: 40,
    name: 'South Carolina',
    slug: 'south-carolina',
    status: 'illegal',
    possession_limits: 'Any amount is misdemeanor/felony.',
    age_requirement: null,
    purchase_rules: null,
    penalties: 'Strict; no decrim.',
    consumption_rules: 'Fully prohibited.',
    dispensary_guide: 'No legal dispensaries.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Palmetto State: Cannabis is fully prohibited.',
    cities: [
      {
        name: 'Charleston',
        slug: 'charleston',
        type: 'major',
        content:
          'Historic coast city. Zero tolerance; enjoy rainbow row and food scene.',
      },
      {
        name: 'Columbia',
        slug: 'columbia',
        type: 'major',
        content:
          'State capital and university. Strict enforcement; riverfront zoo and museums.',
      },
      {
        name: 'Myrtle Beach',
        slug: 'myrtle-beach',
        type: 'medium',
        content:
          'Tourist beach town. Possession arrests common; stick to golf and nightlife.',
      },
      {
        name: 'Greenville',
        slug: 'greenville',
        type: 'medium',
        content:
          'Upstate downtown revival. Same zero tolerance; waterfall park and dining.',
      },
    ],
  },
  {
    id: 41,
    name: 'South Dakota',
    slug: 'south-dakota',
    status: 'medical',
    possession_limits: '3 oz flower (cardholders)',
    age_requirement: '18+ with state card',
    purchase_rules: 'Medical dispensaries only.',
    penalties: 'Misdemeanor for non-cardholders.',
    consumption_rules: 'Private property; not in vehicles.',
    dispensary_guide: 'Medical stores statewide.',
    travel_rules: 'No reciprocity.',
    subtitle: 'The Mount Rushmore State: Medical cannabis only.',
    cities: [
      {
        name: 'Sioux Falls',
        slug: 'sioux-falls',
        type: 'major',
        content:
          'Largest city with 3 medical stores. Falls park; tourists cannot purchase.',
      },
      {
        name: 'Rapid City',
        slug: 'rapid-city',
        type: 'medium',
        content:
          'Black hills gateway with 2 stores. Mount Rushmore is federal—no cannabis.',
      },
      {
        name: 'Aberdeen',
        slug: 'aberdeen',
        type: 'notable',
        content:
          'Northern city with 1 store. Same medical rules; consume privately.',
      },
    ],
  },
  {
    id: 42,
    name: 'Tennessee',
    slug: 'tennessee',
    status: 'illegal',
    possession_limits: 'Any amount is misdemeanor/felony.',
    age_requirement: null,
    purchase_rules: null,
    penalties: 'Strict; no decrim.',
    consumption_rules: 'Fully prohibited.',
    dispensary_guide: 'No legal dispensaries.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Volunteer State: Cannabis is fully prohibited.',
    cities: [
      {
        name: 'Nashville',
        slug: 'nashville',
        type: 'major',
        content:
          'Music city. Zero tolerance; enjoy honky-tonks and hot chicken.',
      },
      {
        name: 'Memphis',
        slug: 'memphis',
        type: 'major',
        content:
          'Blues capital. Strict enforcement; Beale Street and BBQ.',
      },
      {
        name: 'Knoxville',
        slug: 'knoxville',
        type: 'medium',
        content:
          'University and Smokies gateway. Same zero tolerance; riverwalk and football.',
      },
      {
        name: 'Chattanooga',
        slug: 'chattanooga',
        type: 'medium',
        content:
          'Riverfront revival. Possession arrests common; incline railway and aquarium.',
      },
    ],
  },
  {
    id: 43,
    name: 'Texas',
    slug: 'texas',
    status: 'medical',
    possession_limits: 'Low-THC oil (< 1 % THC) only',
    age_requirement: '18+ with state card',
    purchase_rules: 'Licensed low-THC dispensaries.',
    penalties: 'Misdemeanor for flower possession.',
    consumption_rules: 'Private property; not in vehicles.',
    dispensary_guide: 'Low-THC oil only; no flower.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Lone Star State: Low-THC oil only.',
    cities: [
      {
        name: 'Houston',
        slug: 'houston',
        type: 'major',
        content:
          'Largest city. Strict flower penalties; Space Center and food halls.',
      },
      {
        name: 'Dallas',
        slug: 'dallas',
        type: 'major',
        content:
          'Metroplex with same low-THC law. Arts district and BBQ; no legal flower.',
      },
      {
        name: 'Austin',
        slug: 'austin',
        type: 'major',
        content:
          'Progressive capital. Decrim in city limits, but state law still applies; no legal sales.',
      },
      {
        name: 'San Antonio',
        slug: 'san-antonio',
        type: 'major',
        content:
          'Alamo city. Zero tolerance for flower; riverwalk and missions.',
      },
      {
        name: 'Fort Worth',
        slug: 'fort-worth',
        type: 'major',
        content:
          'Cowboy culture. Same strict law; stockyards and museums.',
      },
      {
        name: 'El Paso',
        slug: 'el-paso',
        type: 'medium',
        content:
          'Border city. Possession arrests frequent; Mexican food and tramway.',
      },
    ],
  },
  {
    id: 44,
    name: 'Utah',
    slug: 'utah',
    status: 'medical',
    possession_limits: 'Per physician order (max 113 g flower / 30 days)',
    age_requirement: '18+ with state card',
    purchase_rules: 'Medical dispensaries only.',
    penalties: 'Misdemeanor for non-cardholders.',
    consumption_rules: 'Private property; not in vehicles.',
    dispensary_guide: 'Medical stores statewide; no reciprocity.',
    travel_rules: 'Illegal on federal land.',
    subtitle: 'The Beehive State: Medical cannabis only.',
    cities: [
      {
        name: 'Salt Lake City',
        slug: 'salt-lake-city',
        type: 'major',
        content:
          'Capital with 8 medical stores. Mormon temple square is cannabis-free; consume at rentals.',
      },
      {
        name: 'Provo',
        slug: 'provo',
        type: 'medium',
        content:
          'University city with 2 stores. BYU campus is drug-free; nearby canyons are federal.',
      },
      {
        name: 'Ogden',
        slug: 'ogden',
        type: 'medium',
        content:
          'Northern hub with 2 stores. Ski resorts are federal—no cannabis.',
      },
      {
        name: 'St. George',
        slug: 'st-george',
        type: 'notable',
        content:
          'Red-rock golf mecca with 1 store. Zion national park is federal—leave cannabis at hotel.',
      },
    ],
  },
  {
    id: 45,
    name: 'Vermont',
    slug: 'vermont',
    status: 'recreational',
    possession_limits: '1 oz flower | 5 g concentrate',
    age_requirement: '21+',
    purchase_rules: 'Licensed stores only.',
    penalties: 'Civil fine ≤ $25.',
    consumption_rules: 'Private property; not in state parks.',
    dispensary_guide: 'Recreational stores statewide.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Green Mountain State: Recreational cannabis is legal.',
    cities: [
      {
        name: 'Burlington',
        slug: 'burlington',
        type: 'major',
        content:
          'Lake Champlain college town with 4 stores. Church Street marketplace; public use ticketed.',
      },
      {
        name: 'Montpelier',
        slug: 'montpelier',
        type: 'medium',
        content:
          'Nation’s smallest capital with 1 store. Nearby ski resorts are private—consume at lodges.',
      },
      {
        name: 'Rutland',
        slug: 'rutland',
        type: 'medium',
        content:
          'Southern hub with 2 stores. Killington ski area allows private lodge consumption.',
      },
      {
        name: 'Stowe',
        slug: 'stowe',
        type: 'notable',
        content:
          'Ski resort village with 1 store. Mountain road condos; public trails are cannabis-free.',
      },
    ],
  },
  {
    id: 46,
    name: 'Virginia',
    slug: 'virginia',
    status: 'recreational',
    possession_limits: '1 oz flower',
    age_requirement: '21+',
    purchase_rules: 'Retail framework being established (gifting legal).',
    penalties: 'Civil fine ≤ $25.',
    consumption_rules: 'Private property; not in vehicles.',
    dispensary_guide: 'Medical stores open; retail sales framework in progress.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Old Dominion: Recreational cannabis is legal (retail in progress).',
    cities: [
      {
        name: 'Virginia Beach',
        slug: 'virginia-beach',
        type: 'major',
        content:
          'Resort city. No rec stores yet; beach and boardwalk are cannabis-free.',
      },
      {
        name: 'Richmond',
        slug: 'richmond',
        type: 'major',
        content:
          'State capital. Gifting is legal; 5 medical stores. Canal walk and breweries.',
      },
      {
        name: 'Norfolk',
        slug: 'norfolk',
        type: 'major',
        content:
          'Naval city. Same gifting rule; waterfront and navy base—federal, no cannabis.',
      },
      {
        name: 'Alexandria',
        slug: 'alexandria',
        type: 'medium',
        content:
          'DC suburb. Gifting events; Old Town and Potomac riverfront.',
      },
      {
        name: 'Roanoke',
        slug: 'roanoke',
        type: 'medium',
        content:
          'Blue Ridge hub. Same pending sales; mountain trails—consume at private lodgings.',
      },
    ],
  },
  {
    id: 47,
    name: 'Washington',
    slug: 'washington',
    status: 'recreational',
    possession_limits: '1 oz flower | 7 g concentrate',
    age_requirement: '21+',
    purchase_rules: 'Licensed stores only.',
    penalties: 'Civil fine ≤ $27.',
    consumption_rules: 'Private property; not in state parks.',
    dispensary_guide: 'Recreational stores statewide.',
    travel_rules: 'Illegal on federal land.',
    subtitle: 'The Evergreen State: Recreational cannabis is legal.',
    cities: [
      {
        name: 'Seattle',
        slug: 'seattle',
        type: 'major',
        content:
          'Pacific Northwest hub with 60+ stores. Pike Place and Space Needle; public use ticketed.',
      },
      {
        name: 'Spokane',
        slug: 'spokane',
        type: 'major',
        content:
          'Eastern city with 15 stores. Riverfront park; consume at rentals.',
      },
      {
        name: 'Tacoma',
        slug: 'tacoma',
        type: 'major',
        content:
          'South Sound city with 12 stores. Glass museum and casino; no public use.',
      },
      {
        name: 'Vancouver',
        slug: 'vancouver-washington',
        type: 'medium',
        content:
          'Portland suburb with 8 stores. Columbia river; crossing into OR is legal but federal bridges are not.',
      },
      {
        name: 'Bellingham',
        slug: 'bellingham',
        type: 'medium',
        content:
          'North college town with 5 stores. Ferry to San Juan islands—cannabis illegal once aboard.',
      },
    ],
  },
  {
    id: 48,
    name: 'West Virginia',
    slug: 'west-virginia',
    status: 'medical',
    possession_limits: 'Per physician order (max 30-day supply)',
    age_requirement: '18+ with state card',
    purchase_rules: 'Medical dispensaries only.',
    penalties: 'Misdemeanor for non-cardholders.',
    consumption_rules: 'Private property; not in vehicles.',
    dispensary_guide: 'Medical stores statewide.',
    travel_rules: 'No reciprocity.',
    subtitle: 'The Mountain State: Medical cannabis only.',
    cities: [
      {
        name: 'Charleston',
        slug: 'charleston-west-virginia',
        type: 'major',
        content:
          'State capital with 3 medical stores. Riverfront and state museum; tourists cannot purchase.',
      },
      {
        name: 'Morgantown',
        slug: 'morgantown',
        type: 'medium',
        content:
          'University city with 2 stores. WVU campus is drug-free; consume off-campus.',
      },
      {
        name: 'Huntington',
        slug: 'huntington',
        type: 'medium',
        content:
          'River city with 2 stores. Marshall campus and riverfront; same medical rules.',
      },
      {
        name: 'Wheeling',
        slug: 'wheeling',
        type: 'notable',
        content:
          'Historic Ohio valley town with 1 store. Casino and suspension bridge; public use banned.',
      },
    ],
  },
  {
    id: 49,
    name: 'Wisconsin',
    slug: 'wisconsin',
    status: 'illegal',
    possession_limits: 'Any amount is misdemeanor/felony.',
    age_requirement: null,
    purchase_rules: null,
    penalties: 'Strict; no decrim.',
    consumption_rules: 'Fully prohibited.',
    dispensary_guide: 'No legal dispensaries.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Badger State: Cannabis is fully prohibited.',
    cities: [
      {
        name: 'Milwaukee',
        slug: 'milwaukee',
        type: 'major',
        content:
          'Lakefront city. Zero tolerance; enjoy breweries and lakefest.',
      },
      {
        name: 'Madison',
        slug: 'madison',
        type: 'major',
        content:
          'Capital and university. City decrim but state law overrides; no legal sales.',
      },
      {
        name: 'Green Bay',
        slug: 'green-bay',
        type: 'medium',
        content:
          'Football town. Lambeau field is cannabis-free; tailgate discreetly off-site.',
      },
      {
        name: 'Kenosha',
        slug: 'kenosha',
        type: 'medium',
        content:
          'Illinois border city. Nearest rec stores 10 min north in IL; crossing with cannabis is illegal.',
      },
    ],
  },
  {
    id: 50,
    name: 'Wyoming',
    slug: 'wyoming',
    status: 'illegal',
    possession_limits: 'Any amount is misdemeanor/felony.',
    age_requirement: null,
    purchase_rules: null,
    penalties: 'Strictest; no decrim.',
    consumption_rules: 'Fully prohibited.',
    dispensary_guide: 'No legal dispensaries.',
    travel_rules: 'Do not cross state lines.',
    subtitle: 'The Equality State: Cannabis is fully prohibited.',
    cities: [
      {
        name: 'Cheyenne',
        slug: 'cheyenne',
        type: 'major',
        content:
          'State capital. Frontier days rodeo; possession arrests common.',
      },
      {
        name: 'Casper',
        slug: 'casper',
        type: 'medium',
        content:
          'Central oil city. Same zero tolerance; mountain biking and river.',
      },
      {
        name: 'Jackson',
        slug: 'jackson-wyoming',
        type: 'notable',
        content:
          'Upscale ski town. Grand Teton and Yellowstone are federal—strictly no cannabis.',
      },
      {
        name: 'Laramie',
        slug: 'laramie',
        type: 'notable',
        content:
          'University mountain town. Possession felony risk; consume off-grid privately.',
      },
    ],
  },
];
