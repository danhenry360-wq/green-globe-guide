// Detailed cannabis travel guide data for major US cities
// Each entry provides comprehensive travel information for cannabis tourists

export interface DetailedCityGuide {
  stateSlug: string;
  citySlug: string;
  legalStatus: string;
  agePurchase: string;
  possessionLimits: string;
  whereToConsume: string;
  dispensaryInfo: string;
  airportTransport: string;
  safetyTips: string[];
  bestNeighborhoods: string[];
  localEtiquette: string;
  disclaimer: string;
}

export const DETAILED_CITY_GUIDES: Record<string, DetailedCityGuide> = {
  "alabama-birmingham": {
    stateSlug: "alabama",
    citySlug: "birmingham",
    legalStatus: "Cannabis possession and use is fully illegal in Alabama. Any amount is a criminal offense with potential jail time and fines.",
    agePurchase: "No legal age for purchase as all cannabis sales are prohibited. Medical marijuana is not yet operational.",
    possessionLimits: "Zero tolerance - any amount is a misdemeanor for first offense, felony for subsequent offenses.",
    whereToConsume: "Cannabis consumption is illegal in all public and private spaces in Alabama. Do not consume anywhere.",
    dispensaryInfo: "No legal dispensaries exist in Birmingham or anywhere in Alabama. Medical program approved but not yet operational.",
    airportTransport: "Strictly prohibited. TSA will refer to local law enforcement if cannabis is found. Do not attempt to bring cannabis through Birmingham-Shuttlesworth International Airport.",
    safetyTips: [
      "Alabama has some of the strictest cannabis laws in the US - possession of any amount can result in arrest and criminal record",
      "Law enforcement actively enforces cannabis prohibition - even small amounts can lead to significant legal consequences",
      "Out-of-state cannabis cards are not recognized - do not attempt to bring medical cannabis into Alabama",
      "Focus on Birmingham's rich civil rights history, craft breweries, and award-winning restaurants instead"
    ],
    bestNeighborhoods: [
      "Five Points South: Historic entertainment district with restaurants and nightlife - cannabis-free zone",
      "Downtown Birmingham: Civil Rights District, museums, and cultural attractions - strictly enforced laws"
    ],
    localEtiquette: "Cannabis is not part of Birmingham's culture and is illegal. Do not ask about or attempt to purchase cannabis. Respect local laws and focus on the city's other attractions.",
    disclaimer: "Always verify current laws before traveling. Cannabis remains illegal in Alabama."
  },
  
  "alaska-anchorage": {
    stateSlug: "alaska",
    citySlug: "anchorage",
    legalStatus: "Recreational cannabis is fully legal in Alaska for adults 21+. Anchorage is the state's cannabis hub with mature market.",
    agePurchase: "Must be 21+ with valid government-issued photo ID. Out-of-state licenses accepted. No medical card needed for recreational purchase.",
    possessionLimits: "1 oz of flower or 7g of concentrate in public. Unlimited possession at your private residence. Up to 6 plants (3 flowering) at home.",
    whereToConsume: "Private property only. Hotels and vacation rentals may prohibit smoking - verify before booking. All public parks, federal lands, and streets are prohibited. Several 420-friendly lodging options available.",
    dispensaryInfo: "15+ recreational dispensaries throughout Anchorage. Average prices: $35-60/eighth. Most open 10am-8pm daily. Popular shops in Midtown and South Anchorage. Delivery services available.",
    airportTransport: "Ted Stevens Anchorage International Airport is federal property - possession illegal. Do not bring cannabis to airport. TSA will contact law enforcement if found. No transport on any aircraft.",
    safetyTips: [
      "All national parks and federal lands prohibit cannabis - leave it at your accommodation when hiking or visiting federal areas",
      "Edibles look like regular food - keep them clearly labeled and away from children",
      "Winter consumption - cold temperatures can affect experience; consume indoors during extreme weather",
      "Wildlife encounters are serious - never consume in areas with bear activity as impaired judgment is dangerous"
    ],
    bestNeighborhoods: [
      "Midtown Anchorage: Multiple dispensaries, 420-friendly hotels, restaurants, and shopping - most convenient for tourists",
      "South Anchorage: Residential area with several quality dispensaries and private vacation rentals - quieter option",
      "Downtown Anchorage: Tourist center with museums and dining, but fewer dispensaries - plan purchases before heading downtown"
    ],
    localEtiquette: "Alaska has a mature, responsible cannabis culture. Consume discreetly in private. Don't consume before or during outdoor activities. Keep cannabis secured and away from wildlife. Locals appreciate visitors who respect the environment and laws.",
    disclaimer: "Always verify current laws before traveling. Federal land restrictions apply throughout Alaska."
  },

  "arizona-phoenix": {
    stateSlug: "arizona",
    citySlug: "phoenix",
    legalStatus: "Recreational cannabis legal since 2021 for adults 21+. Phoenix Metro area has one of the largest markets in the Southwest.",
    agePurchase: "21+ with valid government ID required. Medical cardholders get tax breaks. Tourists can purchase same amounts as residents.",
    possessionLimits: "1 oz of flower or 5g of concentrate outside your home. Unlimited at your private residence. Home cultivation allowed (6 plants if 25+ miles from dispensary).",
    whereToConsume: "Private property only - apartments, homes, 420-friendly Airbnbs. Public consumption is $300 citation. No hotel balconies (considered public). No parks, hiking trails, or near schools.",
    dispensaryInfo: "100+ licensed dispensaries across Phoenix Metro. Average prices $25-50/eighth. Most open 8am-10pm daily. Scottsdale, Tempe, and Mesa have many options. Delivery available throughout Metro. Curaleaf, Harvest, and Cannabist are major chains.",
    airportTransport: "Phoenix Sky Harbor International Airport is federal property - cannabis absolutely prohibited. TSA will contact law enforcement. Do not attempt to fly with cannabis. No transport across state lines - Arizona borders non-legal states.",
    safetyTips: [
      "Summer heat - store cannabis products in cool place; edibles can melt in cars (120°F+ interior temps common)",
      "Public consumption enforcement - Phoenix PD issues citations; avoid consuming in parks or hiking trails",
      "Tribal lands - many Arizona tribal nations prohibit cannabis; check before visiting reservations",
      "Hotel policies vary - always book explicitly 420-friendly accommodation or use Airbnb with clear cannabis-friendly policies"
    ],
    bestNeighborhoods: [
      "Tempe: College town with many dispensaries, younger crowd, ASU area - Mill Avenue has nightlife and restaurants",
      "Scottsdale: Upscale area with premium dispensaries, luxury hotels, and golf resorts - higher prices but quality products",
      "Downtown Phoenix: Urban center with dispensaries, restaurants, and attractions - Roosevelt Row arts district nearby"
    ],
    localEtiquette: "Phoenix has a growing cannabis culture but remains conservative in many areas. Consume very discreetly - no public use. Don't drive impaired. Respect that many hotels and businesses prohibit cannabis. Locals appreciate discrete, responsible use.",
    disclaimer: "Always verify current laws before traveling. Tribal lands and federal areas have different rules."
  },

  "california-los-angeles": {
    stateSlug: "california",
    citySlug: "los-angeles",
    legalStatus: "Recreational cannabis fully legal since 2016. LA is the global cannabis capital with mature, sophisticated market.",
    agePurchase: "21+ with government-issued ID. No medical card required for recreational. Out-of-state IDs accepted. Medical cardholders get tax savings.",
    possessionLimits: "1 oz flower or 8g concentrate in public. 6 living plants at home. Unlimited possession at private residence.",
    whereToConsume: "Private property only. LA has licensed consumption lounges (The Woods, Lowell Cafe). Many 420-friendly hotels and Airbnbs. No beaches, parks, streets, or cars. Public consumption is $100 citation.",
    dispensaryInfo: "500+ licensed dispensaries throughout LA County. Average prices $30-60/eighth. MedMen, Stiiizy, The Woods are premium options. Delivery services abundant (Eaze, Caliva). Hours typically 8am-10pm. Venice, Hollywood, Downtown, and Silver Lake have high concentrations.",
    airportTransport: "LAX officially permits cannabis in checked bags for California travel only, BUT federal law prohibits flying with cannabis anywhere. TSA focuses on security threats, not cannabis, but if found may refer to law enforcement. Do not fly with cannabis to be safe. No transport across state lines.",
    safetyTips: [
      "Driving under influence is DUI - Uber/Lyft everywhere; LAPD does sobriety checkpoints",
      "Unlicensed shops exist - only buy from licensed dispensaries (check Bureau of Cannabis Control website)",
      "Beach and park enforcement - lifeguards and park rangers will cite for consumption",
      "Some LA neighborhoods (Pasadena, Beverly Hills) have strict local ordinances - research before visiting"
    ],
    bestNeighborhoods: [
      "Venice Beach: Progressive cannabis culture, many dispensaries, consumption lounges, artistic vibe - tourist-friendly",
      "West Hollywood: Lowell Cafe (consumption restaurant), premium dispensaries, nightlife - very cannabis-friendly",
      "Hollywood: Tourist center, many dispensaries, 420-friendly hotels - convenient for visitors",
      "Arts District/Downtown: Urban warehouses converted to cannabis lounges and dispensaries - creative scene"
    ],
    localEtiquette: "LA has sophisticated cannabis culture - locals consume casually but discreetly. Don't smoke in public. Tipping budtenders is appreciated. Asking for recommendations is encouraged. Cannabis tourism is normalized - no stigma.",
    disclaimer: "Always verify current laws before traveling. Local ordinances vary by city within LA County."
  },

  "california-san-francisco": {
    stateSlug: "california",
    citySlug: "san-francisco",
    legalStatus: "Recreational cannabis legal. San Francisco has oldest cannabis culture in America dating back to 1960s counterculture.",
    agePurchase: "21+ with valid ID. Medical patients get tax breaks. Very tourist-friendly market.",
    possessionLimits: "1 oz flower or 8g concentrate in public. Up to 6 plants at home. Unlimited at private residence.",
    whereToConsume: "Private property only. Cannabis lounges: Moe Greens, Barbary Coast Dispensary (consumption on-site). Many 420-friendly hotels in Mission and SOMA. Golden Gate Park technically prohibits consumption but enforcement is minimal.",
    dispensaryInfo: "80+ licensed dispensaries. Haight-Ashbury has legendary shops. Average $35-65/eighth. Delivery widespread. Hours typically 9am-9pm. Barbary Coast, Apothecarium, and Stiiizy are popular. Concentrate and edible selection is excellent.",
    airportTransport: "SFO is federal property - no cannabis. TSA guidelines same as LAX. Do not fly with cannabis. BART from SFO to city allows cannabis but keep it discrete.",
    safetyTips: [
      "Property crime is high in SF - don't leave cannabis products visible in parked cars",
      "Haight-Ashbury has unlicensed sellers on street - only buy from legal dispensaries",
      "Consumption in Golden Gate Park or Dolores Park is common but technically illegal - be discrete",
      "Cruise ship ports have federal jurisdiction - don't bring cannabis to waterfront piers"
    ],
    bestNeighborhoods: [
      "Haight-Ashbury: Historic epicenter of cannabis culture, multiple dispensaries, vintage shops - tourist must-visit",
      "Mission District: Latino neighborhood with cannabis lounges, best food scene, Dolores Park - vibrant and progressive",
      "SOMA/Downtown: Business district with dispensaries and 420-friendly hotels near Moscone Center - convenient for conventions"
    ],
    localEtiquette: "SF invented modern cannabis culture - very relaxed attitudes. Public consumption happens but be discrete. Don't blow smoke in people's faces. Cannabis tourism fully normalized and welcomed.",
    disclaimer: "Always verify current laws before traveling. SF is cannabis-friendly but federal law still applies."
  },

  "california-san-diego": {
    stateSlug: "california",
    citySlug: "san-diego",
    legalStatus: "Recreational cannabis legal throughout San Diego County. Beach city with laid-back cannabis culture.",
    agePurchase: "21+ with ID. Medical cardholders save on taxes. Tourist-friendly - no residency requirement.",
    possessionLimits: "1 oz flower or 8g concentrate. Home cultivation allowed (6 plants). Unlimited at private residence.",
    whereToConsume: "Private property only. Many 420-friendly vacation rentals near beaches. No beaches, boardwalks, or parks. Cannabis lounges emerging but limited compared to LA or SF.",
    dispensaryInfo: "50+ licensed dispensaries. Pacific Beach, Ocean Beach, and North Park have concentrations. Average $30-55/eighth. March and Wize, The Gallery, and URBN Leaf are popular. Delivery services available. Most open 9am-9pm.",
    airportTransport: "San Diego International Airport is federal property - no cannabis allowed. TSA may notify law enforcement. Do not attempt to fly with cannabis. Tijuana border crossing - absolutely do not bring cannabis into Mexico (Mexican federal crime).",
    safetyTips: [
      "Beach enforcement - lifeguards will cite for consumption on beaches or boardwalks ($100 fine)",
      "Border proximity - never bring cannabis near Tijuana border (serious Mexican penalties)",
      "Navy presence - Coronado and military areas have stricter enforcement",
      "Ocean swimming and cannabis - impaired swimming is dangerous in Pacific currents"
    ],
    bestNeighborhoods: [
      "Ocean Beach: Laid-back beach community with dispensaries and cannabis-friendly vibe - hippie surfer culture",
      "Pacific Beach: Young, party atmosphere with dispensaries and vacation rentals - tourists and college crowd",
      "North Park: Hip urban neighborhood with craft breweries, dispensaries, and food scene - artistic and progressive",
      "Gaslamp Quarter: Downtown entertainment district - fewer dispensaries but 420-friendly hotels available"
    ],
    localEtiquette: "San Diego has relaxed surf culture but still values discretion. No public consumption. Beach communities are more cannabis-friendly than suburban areas. Locals appreciate responsible, private use.",
    disclaimer: "Always verify current laws before traveling. Border areas require extra caution."
  },

  "colorado-denver": {
    stateSlug: "colorado",
    citySlug: "denver",
    legalStatus: "Recreational cannabis legal since 2014. Denver pioneered legal cannabis tourism and has most mature market in the US.",
    agePurchase: "21+ with valid ID. Medical patients get higher purchase limits and tax breaks. Tourist purchases same as residents.",
    possessionLimits: "1 oz flower or 8g concentrate in public. Home cultivation allowed (up to 12 plants per household).",
    whereToConsume: "Private property only. Cannabis-friendly hotels and Airbnbs common. Denver has cannabis-friendly B&Bs. Public consumption is $150-1000 fine. No ski resorts, federal parks, or Red Rocks Amphitheatre.",
    dispensaryInfo: "200+ licensed dispensaries. Average $25-45/eighth (competitive prices). Native Roots, The Green Solution, and Lightshade are chains. Delivery services available. LoDo, Cap Hill, and Highlands have many options. Cannabis tours and grow facility visits available. Hours typically 8am-10pm.",
    airportTransport: "Denver International Airport has prominent 'No Cannabis' signage - federal property, strictly enforced. TSA will contact law enforcement. Do not fly with cannabis. DIA has amnesty boxes before security - dispose of cannabis there.",
    safetyTips: [
      "Altitude and edibles - high elevation intensifies effects, start with half dose and wait 2+ hours",
      "Public consumption enforcement - Denver PD issues tickets regularly, particularly in downtown and parks",
      "Driving impaired is DUI - use Uber/Lyft; Colorado has strict DUI laws and roadside testing",
      "Federal land - Rocky Mountain National Park, ski resorts on Forest Service land prohibit cannabis"
    ],
    bestNeighborhoods: [
      "Capitol Hill: Hip neighborhood with many dispensaries, bars, restaurants - young professional and artistic community",
      "RiNo (River North): Arts district with dispensaries, breweries, murals - creative and progressive",
      "Highland: Upscale neighborhood near downtown with dispensaries and restaurants - family-friendly with cannabis options",
      "LoDo (Lower Downtown): Tourist center with Union Station, dispensaries, hotels - convenient but pricier"
    ],
    localEtiquette: "Denver has sophisticated cannabis culture - locals consume regularly but discretely. Tipping budtenders $1-2 is standard. Cannabis tourism is welcomed and normalized. Don't consume publicly. Asking for recommendations is encouraged.",
    disclaimer: "Always verify current laws before traveling. Federal land restrictions apply throughout Colorado."
  },

  "connecticut-hartford": {
    stateSlug: "connecticut",
    citySlug: "hartford",
    legalStatus: "Recreational cannabis legal since 2021, sales began 2023. Hartford market is new but growing.",
    agePurchase: "21+ with government ID. Medical patients get better pricing and access to higher-potency products.",
    possessionLimits: "1.5 oz on person, 5 oz locked at home. Home cultivation not yet permitted for recreational users.",
    whereToConsume: "Private property only. No state parks, no vehicles. Hotels largely prohibit smoking - book 420-friendly Airbnb.",
    dispensaryInfo: "5 recreational stores in Hartford area. Average $50-70/eighth (higher prices than mature markets). Fine Fettle and The Botanist are main chains. Limited hours, often 10am-7pm. Delivery services emerging.",
    airportTransport: "Bradley International Airport prohibits cannabis - federal property. Do not fly with cannabis.",
    safetyTips: [
      "New market - selection limited compared to mature states like Colorado or California",
      "Higher prices - Connecticut cannabis is more expensive than neighboring Massachusetts",
      "No public consumption - enforcement is strict in new legal states",
      "Don't transport across state lines - Rhode Island is also legal but interstate transport is federal crime"
    ],
    bestNeighborhoods: [
      "Downtown Hartford: Riverfront area with restaurants and entertainment - limited dispensaries",
      "West Hartford: Suburban area with dispensary and dining - residential and quieter"
    ],
    localEtiquette: "Connecticut is new to legal cannabis - locals still adjusting. Be very discrete. Public consumption not tolerated. Cannabis tourism not yet developed.",
    disclaimer: "Always verify current laws before traveling. Connecticut market is young and evolving."
  },
};
