import React, { useState, useMemo } from 'react';

// --- START: Data Import (Paste from globalCannabisData.ts) ---

/**
 * Defines the four main legal statuses for cannabis.
 */
export type LegalStatus = 'Recreational' | 'Medical' | 'Decriminalized' | 'Illegal';

/**
 * Defines the structure for a specific city's cannabis guide content.
 */
export interface CityData {
  slug: string;
  name: string;
  type: 'major' | 'medium' | 'notable';
  summary: string; // Short overview for the country page listing
  localScene: string; // Detailed local scene overview
  consumptionRules: string; // Where tourists can/cannot consume
  localRules: string; // Specific local laws and penalties
  consumptionSpots: string; // Lounges/Clubs/Preferred Rental criteria (not specific hotels)
  safetyTips: string; // Safety and tourist tips
}

/**
 * Defines the structure for a country's cannabis guide content.
 */
export interface CountryData {
  slug: string;
  name: string;
  region: string;
  flag: string; // Unicode flag emoji
  legalStatus: LegalStatus;
  countrySnapshot: {
    possessionLimits: string;
    consumptionRules: string;
    airportRules: string;
    touristNotes: string;
  };
  summary: string;
  keyTravelRules: string[];
  cities: CityData[];
}

/**
 * Defines the structure for a geographical region.
 */
export interface RegionData {
  slug: string;
  name: string;
  mapImage: string; // Placeholder for map image URL
  overview: string; // Overview of legalization trends in the region
  countries: CountryData[];
}


// --- POPULATED DATA (Minified for single-file import) ---

const canadaCities: CityData[] = [
  { slug: 'toronto', name: 'Toronto', type: 'major', summary: 'The largest city offers numerous licensed dispensaries and designated public consumption rules, though public smoking remains restricted.', localScene: 'Toronto is the commercial hub of Canadian cannabis, featuring hundreds of government-licensed retailers. The scene is highly regulated and professionally run, focusing on quality and consumer safety.', consumptionRules: 'Consumption is generally permitted wherever tobacco smoking is allowed, but strictly banned in indoor public spaces, near schools, and on most outdoor patios. Designated consumption areas are rare but exist.', localRules: 'Legal age is 19. Public possession limit is 30 grams. Driving under the influence is strictly enforced with severe penalties.', consumptionSpots: 'Most consumption occurs in private residences or designated outdoor smoking areas. Look for cannabis-friendly Airbnbs (check host rules) or private clubs that operate in a gray area.', safetyTips: 'Always buy from government-licensed stores (Ontario Cannabis Store (OCS) or authorized retailers). Do not consume in parks or busy downtown areas to avoid small fines.' },
  { slug: 'vancouver', name: 'Vancouver', type: 'major', summary: 'Known for its historic activism, Vancouver has a relaxed, if still regulated, culture with excellent quality products.', localScene: 'As the birthplace of much of Canada’s cannabis movement, Vancouver maintains a strong, albeit regulated, culture. It has many high-quality, licensed retail outlets.', consumptionRules: 'Similar to Toronto, public consumption is restricted. It is generally allowed in most public places where smoking tobacco is permitted, but prohibited near playgrounds, bus stops, and in vehicles.', localRules: 'Legal age is 19. Tourists should be mindful of the "four plants per household" limit, which does not apply to temporary visitors.', consumptionSpots: 'Private use is easiest. Some older, "gray market" consumption lounges exist, but their legal status is often tenuous. Stick to private property.', safetyTips: 'Be aware that cannabis products sold on First Nations land may not adhere to provincial testing standards, though they are usually high quality.' },
  { slug: 'montreal', name: 'Montreal', type: 'medium', summary: 'Quebec’s rules are among the strictest in Canada, with strong emphasis on private consumption only.', localScene: 'The Société québécoise du cannabis (SQDC) holds a monopoly on sales, which keeps the retail environment standardized and non-commercialized. The vibe is more discreet than in Western Canada.', consumptionRules: 'Quebec has the strictest public consumption laws; cannabis cannot be consumed in any public place (including parks and sidewalks) where tobacco is prohibited.', localRules: 'Legal age is 21 (stricter than most provinces). Consumption is essentially limited to private homes. Vehicle consumption is completely forbidden.', consumptionSpots: 'Strictly private spaces. Avoid any public consumption to prevent fines, which are actively handed out.', safetyTips: 'Only buy from the SQDC. Do not bring cannabis onto university campuses or federal lands, which includes many national parks.' },
];
const netherlandsCities: CityData[] = [
  { slug: 'amsterdam', name: 'Amsterdam', type: 'major', summary: 'The global capital of cannabis tourism, famous for its Coffee Shops, though rules are tightening, especially for tourists.', localScene: 'Amsterdam\'s iconic Coffee Shops operate under a policy of "gedogen" (tolerance). The focus is on hash and weed, with edibles being less common. The atmosphere is generally friendly but can be crowded.', consumptionRules: 'Allowed inside licensed Coffee Shops. Consumption is officially illegal in public spaces, though tolerated in some less crowded areas. Smoking in parks, near schools, or at public transport hubs is discouraged/fined.', localRules: 'Maximum purchase limit is 5 grams per person per day. Soft drugs (cannabis) are separated from hard drugs (illegal). The age limit is 18.', consumptionSpots: 'Coffee Shops are the primary and safest place for consumption. Some Airbnbs allow smoking (check rules). Do NOT smoke openly on the street, especially in busy areas.', safetyTips: 'The "Wietpas" (resident permit system) is not nationally enforced, but local city rules can change. Be discreet and always abide by the 5-gram limit.' },
  { slug: 'rotterdam', name: 'Rotterdam', type: 'medium', summary: 'A more modern, less tourist-focused city with Coffee Shops that cater mostly to locals.', localScene: 'Rotterdam has a Coffee Shop scene, but it\'s less overwhelming and more integrated into local life than Amsterdam. Quality is still high, and prices can be slightly lower.', consumptionRules: 'Only inside licensed Coffee Shops. Public consumption is heavily discouraged and more likely to be met with police intervention than in Amsterdam.', localRules: 'Strict adherence to the 5-gram purchase limit. Coffee Shops are not allowed to advertise outside their premises.', consumptionSpots: 'Coffee Shops or private accommodation. The city has a zero-tolerance policy for public consumption in certain areas.', safetyTips: 'Avoid drawing attention to yourself. The atmosphere is less focused on tourism, so discretion is key.' },
  { slug: 'the-hague', name: 'The Hague', type: 'notable', summary: 'Home to the government, offering a quieter, more subdued Coffee Shop experience.', localScene: 'A smaller number of Coffee Shops focused on local residents and government workers. A good option for tourists seeking a less frantic cannabis experience.', consumptionRules: 'Coffee Shop only. Public consumption carries a fine.', localRules: 'Age 18+ and 5-gram limit. The police presence is often higher due to the many international courts and government buildings.', consumptionSpots: 'Private or Coffee Shops only.', safetyTips: 'Given the diplomatic nature of the city, err on the side of extreme caution and avoid public display.' },
];
const germanyCities: CityData[] = [
  { slug: 'berlin', name: 'Berlin', type: 'major', summary: 'The capital is embracing the recent 2024 legalization, focused heavily on private consumption and upcoming social clubs.', localScene: 'Germany’s new law (since April 2024) allows possession and home cultivation. The scene is transitioning from gray market to regulated non-commercial supply via "Cannabis Social Clubs" (CSCs).', consumptionRules: 'Legal in public, but forbidden within 100 meters of schools, playgrounds, and sports facilities. Consumption is not allowed in pedestrian zones between 7 AM and 8 PM.', localRules: 'Legal age 18. Maximum public possession of 25 grams. Home possession limit of 50 grams. Tourists cannot join CSCs immediately, limiting access to legal supply.', consumptionSpots: 'Private homes or discreet public areas (outside exclusion zones). CSCs are for residents only for now.', safetyTips: 'As a tourist, legal acquisition is currently difficult. Wait until CSCs are operational and see if tourist rules change. **Never** buy from illegal street vendors.' },
  { slug: 'cologne', name: 'Cologne', type: 'medium', summary: 'Known for its liberal culture, this city will likely see a quick adoption of CSCs and the new consumption laws.', localScene: 'A progressive city known for its carnivals and open-mindedness. It is expected to be a key location for early CSC development.', consumptionRules: 'Adheres strictly to the national 100-meter exclusion zone rule. Consumption is generally more discreet than in Berlin.', localRules: 'All national rules apply (18+, 25g public limit). Driving under the influence is heavily penalized.', consumptionSpots: 'Private residences or quiet, non-restricted public spaces. Tourists face the same supply barrier as in Berlin.', safetyTips: 'Be patient while the new market matures. Avoid public consumption near the Cathedral or crowded tourist sites.' },
  { slug: 'hamburg', name: 'Hamburg', type: 'notable', summary: 'A major port city with a focus on organized implementation of the new CSC model.', localScene: 'The scene is expected to be well-organized and law-abiding, given the city’s meticulous nature. Focus is on CSCs for non-commercial supply.', consumptionRules: 'Strict enforcement of exclusion zones around schools and parks. Consumption in the busy port area (St. Pauli/Reeperbahn) will be scrutinized.', localRules: 'National laws apply (18+, 25g limit). Possession in the Reeperbahn entertainment district may face closer inspection.', consumptionSpots: 'Private homes. CSC membership is not open to non-residents.', safetyTips: 'The primary risk for tourists is illegal acquisition. Wait for the regulated market before attempting to consume.' },
];
const uruguayCities: CityData[] = [
  { slug: 'montevideo', name: 'Montevideo', type: 'major', summary: 'The capital and center of the world’s first state-controlled recreational market, though access is limited for tourists.', localScene: 'Uruguay legalized cannabis in 2013, creating a closed-loop system of state-approved consumption via pharmacies, private clubs, and home grow. It is highly controlled and non-commercial.', consumptionRules: 'Generally allowed in private homes. Public consumption is largely tolerated but not explicitly legal; discretion is key. It is strictly prohibited in workplaces and public offices.', localRules: 'Legal access (via pharmacies or clubs) is strictly for Uruguayan residents only. Tourists **cannot** legally purchase cannabis.', consumptionSpots: 'Private residences. Avoid public consumption at tourist spots like the Ciudad Vieja. Be aware that the law intends to reduce tourism-related consumption.', safetyTips: 'Tourists cannot legally buy. While public consumption may be tolerated, sourcing is illegal. Do not rely on street vendors or attempt to use the pharmacy system.' },
  { slug: 'punta-del-este', name: 'Punta del Este', type: 'medium', summary: 'A resort city where consumption is common, especially among locals, but still restricted by the resident-only purchasing laws.', localScene: 'A coastal resort where consumption is often integrated into the beach culture, though the legal restrictions for non-residents still apply.', consumptionRules: 'Consumption is common in private beach settings or homes, but open consumption on busy beaches is not permitted.', localRules: 'The focus remains on registered residents. Tourists should be extremely cautious about sourcing.', consumptionSpots: 'Private rentals or quiet, discreet beach spots (use extreme caution).', safetyTips: 'Do not attempt to purchase from a pharmacy or a cannabis social club. The risk of fines or legal trouble for illegal sourcing is high.' },
  { slug: 'colonia-del-sacramento', name: 'Colonia del Sacramento', type: 'notable', summary: 'A historic, quiet town where discretion is highly valued regarding any public consumption.', localScene: 'A UNESCO World Heritage site with a very low-key scene. Public openness is minimal.', consumptionRules: 'Strictly private consumption recommended. The small, historic center is heavily monitored.', localRules: 'Resident-only access to legal supply remains the primary rule.', consumptionSpots: 'Only private accommodation.', safetyTips: 'Given its proximity to Argentina and focus on heritage tourism, public consumption is strongly discouraged.' },
];
const thailandCities: CityData[] = [
  { slug: 'bangkok', name: 'Bangkok', type: 'major', summary: 'The heart of Thailand’s rapidly evolving medical-only system, with thousands of retail stores in a semi-regulated market.', localScene: 'Thailand decriminalized cannabis in 2022, leading to an explosion of retail shops. However, in late 2024, the government began re-regulating to a strict medical-only focus, making the market highly volatile.', consumptionRules: 'Strictly **medical use only** is the current legal standard. Public smoking is prohibited and punishable by fines. Most consumption occurs discreetly in private areas.', localRules: 'The law now requires a medical card or prescription, which can often be obtained easily from clinics attached to dispensaries. Extracts containing over 0.2% THC are illegal. **All** non-medical use is technically illegal.', consumptionSpots: 'Private accommodation or designated smoking zones at some dispensaries (check local rules carefully). Never smoke on the street or in public parks.', safetyTips: 'The regulatory environment is unstable. Always verify the current status. Avoid traveling with cannabis to other provinces or abroad, as penalties are severe.' },
  { slug: 'chiang-mai', name: 'Chiang Mai', type: 'medium', summary: 'A northern hub with many small, locally-run dispensaries, focusing on quality craft cannabis.', localScene: 'The scene is popular with expats and digital nomads, offering a wide range of products but is subject to the same medical-only restrictions as Bangkok.', consumptionRules: 'Private consumption is mandatory. The law is strictly against public smoking.', localRules: 'Medical prescription required. Be mindful of stricter enforcement by local police regarding public nuisance.', consumptionSpots: 'Guesthouses or private rentals that explicitly allow it. Do not consume near temples or historic sites.', safetyTips: 'Be extremely respectful of the culture and local laws. Public intoxication is viewed very negatively.' },
  { slug: 'phuket', name: 'Phuket', type: 'notable', summary: 'A popular tourist island with a massive density of shops, often operating in a confusing legal grey zone.', localScene: 'The island has a dense retail presence, particularly in areas like Patong. The emphasis is often on rapid tourist sales.', consumptionRules: 'Public consumption, especially on beaches, is illegal and frequently fined. Strictly private use.', localRules: 'Medical status required. Authorities are highly visible in tourist areas, and laws are enforced to prevent negative tourist experiences for others.', consumptionSpots: 'Only in the privacy of your hotel room or rental. Some shops have enclosed areas.', safetyTips: 'Avoid buying edibles unless you are certain of the THC content and local laws regarding extracts. Given the number of tourists, police are vigilant.' },
];
const southAfricaCities: CityData[] = [
  { slug: 'cape-town', name: 'Cape Town', type: 'major', summary: 'Known for its vibrant culture, Cape Town is the center of the country\'s private-use decriminalization.', localScene: 'The 2018 Constitutional Court ruling decriminalized private-use possession and cultivation. The market is currently unregulated but thriving through private clubs and delivery services.', consumptionRules: 'Consumption is only legal in a private dwelling. Public consumption, including parks and beaches, is illegal and carries penalties.', localRules: 'Only legal for adults in private. The definition of "private" is strictly enforced, meaning consumption in a public space, even if discreet, is risky. There is no regulated commercial market.', consumptionSpots: 'Private homes, hotels/rentals that permit it (check policy). Some private "cannabis clubs" or social spaces exist, operating in a legally gray area.', safetyTips: 'The legal supply chain is unregulated. Use common sense regarding the quality of products. Never consume in view of the public or police.' },
  { slug: 'johannesburg', name: 'Johannesburg', type: 'medium', summary: 'The commercial heart of South Africa, where cannabis use is more discreet due to higher urban density and focus on private clubs.', localScene: 'Less focused on tourism and more on local delivery and membership clubs. Discretion is highly valued.', consumptionRules: 'Strictly private dwelling only. Public visibility is heavily frowned upon.', localRules: 'The ruling applies to possession for private consumption only. Trafficking or sale remains illegal.', consumptionSpots: 'Private residences or legal consumption sites operating within the privacy ruling.', safetyTips: 'Be cautious about the private delivery market; prioritize known, reputable sources. Avoid all public use.' },
  { slug: 'durban', name: 'Durban', type: 'notable', summary: 'A coastal city with a strong indigenous cannabis history, now operating under the same private-use framework.', localScene: 'Known for its traditional "dagga" (cannabis) culture, but the legal rules are the same as the rest of the country—private use only.', consumptionRules: 'Private homes only. Consumption on the beachfront or in public tourist areas is illegal.', localRules: 'The law applies to adults in private spaces. Do not attempt to transport large quantities.', consumptionSpots: 'Private rentals or homes.', safetyTips: 'Understand that while use is decriminalized, the commercial sale remains illegal, creating a complex sourcing environment.' },
];
const spainCities: CityData[] = [
  { slug: 'barcelona', name: 'Barcelona', type: 'major', summary: 'The epicenter of Spain\'s Cannabis Social Club (CSC) model, where private clubs offer legal access to members.', localScene: 'Spain has decentralized laws. The CSC model allows for private, non-profit cultivation and distribution to members. Barcelona has hundreds of these clubs.', consumptionRules: 'Consumption is only legal *within* the premises of a licensed CSC or in a private home. Public consumption is illegal and results in fines.', localRules: 'Public consumption is a highly enforced administrative offense. Clubs are private associations, and you must be a member (often requiring a local resident sponsor and 24h waiting period).', consumptionSpots: 'The safest and most legal option is inside a Cannabis Social Club. Private accommodation is also acceptable.', safetyTips: 'Do not approach people soliciting you on the street to join a club; seek reputable, established clubs. Never consume cannabis on the streets, beaches, or outside of a club.' },
  { slug: 'madrid', name: 'Madrid', type: 'medium', summary: 'A more discreet CSC scene than Barcelona, with clubs operating under strict private rules.', localScene: 'The CSC scene is smaller and generally less tourist-focused than Barcelona, catering more to local residents and requiring more formal membership.', consumptionRules: 'Strictly private: inside a CSC or a private home. Public consumption is illegal.', localRules: 'The club model is less transparent to tourists than in Catalonia, requiring deeper research for reliable membership.', consumptionSpots: 'CSCs or private rentals.', safetyTips: 'Be highly discreet. The legal gray area of CSCs means they must follow strict rules to avoid police attention; respect their rules explicitly.' },
  { slug: 'valencia', name: 'Valencia', type: 'notable', summary: 'A coastal city with a small but growing network of private cannabis associations.', localScene: 'The CSCs here are generally smaller and more community-focused. The scene is relaxed but adheres strictly to the private-use framework.', consumptionRules: 'Private consumption only. Consumption on the beach or in the public parks is fined.', localRules: 'Focus on non-profit, closed-circuit consumption. Tourists must secure membership via local rules.', consumptionSpots: 'CSCs or private property.', safetyTips: 'As with all of Spain, never buy from a street seller; this is a criminal offense and the product is unregulated.' },
];

const allCountries: CountryData[] = [
  { slug: 'canada', name: 'Canada', region: 'North America', flag: '🇨🇦', legalStatus: 'Recreational', countrySnapshot: { possessionLimits: '30g in public, 150g at home (varies by province)', consumptionRules: 'Generally allowed wherever tobacco is permitted, but restricted near playgrounds, schools, and vehicles.', airportRules: 'Illegal to take across the border. Domestic flights allow small amounts (check airline rules).', touristNotes: 'Legal age is 19 (18 in Alberta, 21 in Quebec). Must buy from government-licensed stores.' }, summary: 'The first major industrialized nation to legalize recreational cannabis nationally. The market is fully regulated, tax-controlled, and highly professional.', keyTravelRules: ['Must purchase from government-licensed retailers (private or public).', 'The legal age is 19 in most provinces (Quebec is 21).', 'Do NOT drive after consuming; penalties are severe.', 'Always check local municipal bylaws on public smoking, as they are often stricter than provincial laws.'], cities: canadaCities },
  { slug: 'netherlands', name: 'Netherlands', region: 'Europe', flag: '🇳🇱', legalStatus: 'Decriminalized', countrySnapshot: { possessionLimits: '5g maximum purchase/possession in a Coffee Shop.', consumptionRules: 'Only permitted inside licensed Coffee Shops. Officially illegal in public, but often tolerated (use discretion).', airportRules: 'Illegal. Do not bring to the airport or attempt to transport internationally.', touristNotes: 'The sale is "tolerated" (decriminalized), not fully legal. Be polite, discreet, and respect Coffee Shop rules.' }, summary: 'Famous for its "gedogen" (tolerance) policy that allows Coffee Shops to sell cannabis under strict rules. A highly controlled, semi-regulated market focused on harm reduction.', keyTravelRules: ['Only consume inside licensed Coffee Shops.', 'Do not exceed the 5-gram purchase limit per day.', 'Public consumption is technically illegal; fines are possible.', 'Avoid hard drug use entirely; the laws are separate and strictly enforced.'], cities: netherlandsCities },
  { slug: 'germany', name: 'Germany', region: 'Europe', flag: '🇩🇪', legalStatus: 'Decriminalized', countrySnapshot: { possessionLimits: '25g in public, 50g at home.', consumptionRules: 'Legal in public, but banned within 100m of schools/sports facilities, and in pedestrian zones during daytime.', airportRules: 'Domestic transport is complicated; international transport is strictly illegal.', touristNotes: 'The legal supply mechanism (Cannabis Social Clubs) is currently resident-only. Tourists face legal acquisition barriers.' }, summary: 'Legalized possession and home cultivation in April 2024. The commercial supply is non-profit via Social Clubs, and the market is in a major transition phase.', keyTravelRules: ['Legal age is 18.', 'Tourists currently cannot legally purchase cannabis from the new system.', 'Respect the 100-meter exclusion zones around specific public buildings.', 'Illegal sourcing from the street is strongly discouraged and carries criminal risk.'], cities: germanyCities },
  { slug: 'uruguay', name: 'Uruguay', region: 'South America', flag: '🇺🇾', legalStatus: 'Recreational', countrySnapshot: { possessionLimits: '40g per month (registered residents only).', consumptionRules: 'Allowed in private homes. Public consumption is tolerated in many areas but not explicitly legal.', airportRules: 'Illegal. Strict rules on bringing cannabis in or out.', touristNotes: 'The legal market (pharmacies, clubs) is **strictly limited to registered Uruguayan citizens/residents**. Tourists cannot legally purchase.' }, summary: 'The first nation globally to legalize recreational use, but operates a unique, state-controlled closed-loop system designed to discourage cannabis tourism.', keyTravelRules: ['Tourists are **NOT** permitted to purchase cannabis through any legal means.', 'Possession limits are for registered residents only.', 'Avoid public consumption in busy areas; be extremely discreet.', 'Do not attempt to bring cannabis across the border from any neighboring country.'], cities: uruguayCities },
  { slug: 'thailand', name: 'Thailand', region: 'Asia', flag: '🇹🇭', legalStatus: 'Medical', countrySnapshot: { possessionLimits: 'None specified for medical use, but strictly non-recreational.', consumptionRules: 'Strictly private consumption. Public smoking is illegal and subject to high fines.', airportRules: 'Illegal. Do not travel internationally with cannabis.', touristNotes: 'The legal status is volatile, currently re-regulated to **medical use only**. Tourists often need a simple consultation to obtain a prescription.' }, summary: 'Experienced a period of rapid decriminalization followed by strict re-regulation to medical-only use. The market has many shops, but the legal framework is complex and often confusing.', keyTravelRules: ['Public smoking is a punishable offense (fines apply).', 'Carry a receipt or simple medical document to justify possession.', 'Avoid products with high THC extracts (>0.2%), as they may be illegal.', 'Always prioritize discretion and cultural respect.'], cities: thailandCities },
  { slug: 'south-africa', name: 'South Africa', region: 'Africa', flag: '🇿🇦', legalStatus: 'Decriminalized', countrySnapshot: { possessionLimits: 'Not defined, but must be "reasonable" for personal, private consumption.', consumptionRules: 'Only legal within a private dwelling. Public consumption (parks, beaches, streets) is illegal.', airportRules: 'Illegal to transport across international borders. Domestic travel is in a legal gray area.', touristNotes: 'Decriminalization covers **use and cultivation in private**; commercial sale and public consumption are still illegal.' }, summary: 'The 2018 Constitutional Court ruling decriminalized the private use and cultivation of cannabis by adults. The market is informal, relying on private delivery and membership clubs.', keyTravelRules: ['Strictly limit consumption to private accommodations.', 'There is no regulated commercial market; sourcing is currently illegal/gray area.', 'Be aware that police often enforce public consumption laws strictly.', 'Do not attempt to transport large, non-personal quantities.'], cities: southAfricaCities },
  { slug: 'spain', name: 'Spain', region: 'Europe', flag: '🇪🇸', legalStatus: 'Decriminalized', countrySnapshot: { possessionLimits: 'Private consumption and cultivation are decriminalized; public possession is fined.', consumptionRules: 'Only legal in private residences or within licensed Cannabis Social Clubs (CSCs).', airportRules: 'Illegal. Do not attempt to transport internationally or domestically.', touristNotes: 'CSCs are private associations for consumption. Tourists must secure membership (often requiring a waiting period and sponsorship).' }, summary: 'Operates under a private consumption model, allowing Cannabis Social Clubs (CSCs) to function as non-profit, closed-circuit associations for legal access and consumption by members.', keyTravelRules: ['Public consumption is illegal and carries heavy fines.', 'Access is via private, member-only Cannabis Social Clubs (CSCs).', 'Do not buy from street vendors; this is a highly illegal and high-risk activity.', 'Membership rules for CSCs are strict and may require a local sponsor or waiting period.'], cities: spainCities },
];

// Helper to group and generate region data for the UI
const countriesByRegion: Record<string, CountryData[]> = allCountries.reduce((acc, country) => {
  if (!acc[country.region]) {
    acc[country.region] = [];
  }
  acc[country.region].push(country);
  return acc;
}, {} as Record<string, CountryData[]>);

export const GLOBAL_REGION_DATA: RegionData[] = [
  { slug: 'north-america', name: 'North America', mapImage: 'https://placehold.co/600x400/1e293b/a5f3fc?text=North+America+Map', overview: 'This region contains the two North American countries where cannabis is federally legal (Canada) or rapidly legalizing on a state-by-state basis (USA/Mexico). It is the most advanced recreational market.', countries: countriesByRegion['North America'] || [] },
  { slug: 'south-america', name: 'South America', mapImage: 'https://placehold.co/600x400/1e293b/a5f3fc?text=South+America+Map', overview: 'Pioneering legalization with Uruguay leading the way, the region sees a mix of formal state control (Uruguay) and widespread decriminalization across other nations, often focused on harm reduction.', countries: countriesByRegion['South America'] || [] },
  { slug: 'europe', name: 'Europe', mapImage: 'https://placehold.co/600x400/1e293b/a5f3fc?text=Europe+Map', overview: 'Highly fragmented: ranging from the long-standing tolerance policy of the Netherlands to the new legalization in Germany and the private social club model of Spain. Rules vary drastically by country.', countries: countriesByRegion['Europe'] || [] },
  { slug: 'africa', name: 'Africa', mapImage: 'https://placehold.co/600x400/1e293b/a5f3fc?text=Africa+Map', overview: 'South Africa leads the movement with decriminalization for private use. The continent is largely moving towards medical and cultivation legalization, but recreational use remains illegal in most jurisdictions.', countries: countriesByRegion['Africa'] || [] },
  { slug: 'asia', name: 'Asia', flag: '🌏', mapImage: 'https://placehold.co/600x400/1e293b/a5f3fc?text=Asia+Map', overview: 'The most legally restrictive region globally. Thailand is the major outlier, having rapidly decriminalized and then re-regulated to medical-only, making it a high-risk travel destination for cannabis users.', countries: countriesByRegion['Asia'] || [] },
  { slug: 'oceania', name: 'Oceania', mapImage: 'https://placehold.co/600x400/1e293b/a5f3fc?text=Oceania+Map', overview: 'Australia has strong medical programs and decriminalization in some territories. New Zealand remains largely illegal with decriminalization efforts stalled. A moderate, evolving region.', countries: countriesByRegion['Oceania'] || [] },
];

// --- END: Data Import ---


// --- UI COMPONENTS STUBS (Simplified Tailwind implementation) ---

const Navigation = ({ onNavigate }) => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm shadow-xl">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <h1 onClick={() => onNavigate('world')} className="text-2xl font-bold text-green-400 cursor-pointer">
        🌿 Global Guide
      </h1>
      <nav className="hidden sm:flex space-x-6">
        <button onClick={() => onNavigate('world')} className="text-gray-300 hover:text-white transition">World Guide</button>
        <button className="text-gray-300 hover:text-white transition">USA Guide</button>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-950 border-t border-gray-800 py-6">
    <div className="container mx-auto px-4 text-center text-sm text-gray-500">
      <p>&copy; {new Date().getFullYear()} Global Cannabis Guide. Travel smart, stay informed.</p>
    </div>
  </footer>
);

const Badge = ({ status }) => {
  const getStyle = () => {
    switch (status) {
      case 'Recreational':
        return 'bg-green-600 hover:bg-green-700';
      case 'Medical':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'Decriminalized':
        return 'bg-yellow-600 hover:bg-yellow-700 text-gray-900';
      case 'Illegal':
        return 'bg-red-600 hover:bg-red-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full shadow-md transition ${getStyle()}`}>
      {status}
    </span>
  );
};

const Card = ({ children, className = '', onClick = () => {} }) => (
  <div
    onClick={onClick}
    className={`bg-gray-800 rounded-xl shadow-lg hover:shadow-green-500/20 transition-all duration-300 overflow-hidden ${className} ${onClick && 'cursor-pointer active:scale-[0.98]'}`}
  >
    {children}
  </div>
);

// --- NAVIGATION STATE & VIEWS SETUP ---

const findData = (view, slug1, slug2) => {
  switch (view) {
    case 'region':
      return GLOBAL_REGION_DATA.find(r => r.slug === slug1);
    case 'country':
      for (const region of GLOBAL_REGION_DATA) {
        const country = region.countries.find(c => c.slug === slug1);
        if (country) return country;
      }
      return null;
    case 'city':
      for (const country of allCountries) {
        const city = country.cities.find(c => c.slug === slug2);
        if (city) return { country, city };
      }
      return null;
    default:
      return null;
  }
};

// --- VIEW COMPONENTS ---

const CityGuide = ({ city, country, onNavigate }) => (
  <div className="space-y-8">
    <button onClick={() => onNavigate('country', country.slug)} className="text-green-400 hover:text-green-300 transition flex items-center mb-6">
      &larr; Back to {country.name} Guide
    </button>
    <h2 className="text-4xl font-extrabold text-white mb-2">{city.name}, {country.name}</h2>
    <p className="text-lg text-gray-400 mb-8">{city.summary}</p>

    <div className="grid md:grid-cols-2 gap-8">
      <Card className="p-6">
        <h3 className="text-2xl font-bold mb-3 text-green-400">Local Scene Overview</h3>
        <p className="text-gray-300">{city.localScene}</p>
      </Card>

      <Card className="p-6">
        <h3 className="text-2xl font-bold mb-3 text-green-400">Consumption & Local Rules</h3>
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-gray-200">Where to Consume:</p>
            <p className="text-gray-300">{city.consumptionSpots}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-200">Consumption Rules:</p>
            <p className="text-gray-300">{city.consumptionRules}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-200">Specific Local Laws:</p>
            <p className="text-gray-300">{city.localRules}</p>
          </div>
        </div>
      </Card>
    </div>
    
    <Card className="p-6">
        <h3 className="text-2xl font-bold mb-3 text-green-400">Safety & Tourist Tips</h3>
        <p className="text-gray-300">{city.safetyTips}</p>
    </Card>
  </div>
);

const CountryGuide = ({ country, onNavigate }) => (
  <div className="space-y-12">
    <button onClick={() => onNavigate('region', country.region)} className="text-green-400 hover:text-green-300 transition flex items-center mb-6">
      &larr; Back to {country.region} Guide
    </button>

    <div className="text-center">
      <h2 className="text-5xl md:text-6xl font-extrabold mb-3 flex items-center justify-center space-x-4">
        <span>{country.flag} {country.name}</span>
      </h2>
      <Badge status={country.legalStatus} />
    </div>

    {/* Country Snapshot */}
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="p-6 space-y-4">
        <h3 className="text-2xl font-bold text-green-400">Country Snapshot</h3>
        <p className="text-lg text-gray-300">{country.summary}</p>
        <ul className="list-disc list-inside text-gray-300 space-y-1 pl-4">
          {country.keyTravelRules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </Card>
      <Card className="p-6 space-y-3">
        <h3 className="text-2xl font-bold text-green-400">Key Rules Summary</h3>
        <div className="space-y-2 text-gray-300">
          <p><strong className="text-white">Possession Limits:</strong> {country.countrySnapshot.possessionLimits}</p>
          <p><strong className="text-white">Consumption Rules:</strong> {country.countrySnapshot.consumptionRules}</p>
          <p><strong className="text-white">Airport/Border Rules:</strong> {country.countrySnapshot.airportRules}</p>
          <p><strong className="text-white">Tourist Note:</strong> {country.countrySnapshot.touristNotes}</p>
        </div>
      </Card>
    </div>

    {/* City Guides */}
    <div className="pt-6">
      <h3 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-3">Top Cities to Explore</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {country.cities.map(city => (
          <Card key={city.slug} onClick={() => onNavigate('city', country.slug, city.slug)} className="p-5 flex flex-col justify-between h-full hover:bg-gray-700">
            <div className="space-y-2">
              <h4 className="text-xl font-semibold text-white">{city.name}</h4>
              <Badge status={city.type.charAt(0).toUpperCase() + city.type.slice(1)} />
              <p className="text-sm text-gray-400 mt-2">{city.summary}</p>
            </div>
            <span className="mt-4 text-green-400 font-medium group-hover:underline flex items-center">
              View City Guide &rarr;
            </span>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

const RegionGuide = ({ region, onNavigate }) => (
  <div className="space-y-12">
    <button onClick={() => onNavigate('world')} className="text-green-400 hover:text-green-300 transition flex items-center mb-6">
      &larr; Back to World Guide
    </button>
    <div className="text-center">
      <h2 className="text-5xl font-extrabold text-white mb-4">{region.name} Guide</h2>
      <p className="text-xl text-gray-400 max-w-3xl mx-auto">{region.overview}</p>
    </div>

    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <h3 className="text-3xl font-bold text-green-400 border-b border-gray-700 pb-2">Countries in {region.name}</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {region.countries.map(country => (
            <Card key={country.slug} onClick={() => onNavigate('country', country.slug)} className="p-4 flex items-center space-x-4 hover:bg-gray-700">
              <span className="text-4xl">{country.flag}</span>
              <div className="flex-grow">
                <p className="text-lg font-semibold text-white">{country.name}</p>
                <div className="mt-1">
                  <Badge status={country.legalStatus} />
                </div>
              </div>
              <span className="text-green-400 font-medium text-sm">View Guide &rarr;</span>
            </Card>
          ))}
        </div>
      </div>
      <div className="lg:col-span-1">
        <h3 className="text-3xl font-bold text-green-400 mb-4 border-b border-gray-700 pb-2">Region Map</h3>
        <img
          src={region.mapImage}
          alt={`${region.name} map placeholder`}
          className="rounded-xl w-full h-auto object-cover"
        />
      </div>
    </div>
  </div>
);

const WorldGuide = ({ onNavigate }) => (
  <div className="space-y-16">
    {/* Hero Section */}
    <div className="bg-gray-900 rounded-2xl p-8 md:p-12 shadow-2xl border border-green-700/50">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
          The Global Guide to Cannabis Travel
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Navigate the world's laws, limits, and local cultures. Your passport to informed cannabis travel.
        </p>
        <div className="relative max-w-lg mx-auto">
          <input
            type="search"
            placeholder="Search country, city, or legal status..."
            className="w-full p-4 pl-12 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 border border-gray-600"
          />
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
    
    {/* Region Grid */}
    <div>
      <h2 className="text-4xl font-bold text-white mb-8 border-b border-gray-700 pb-4">Explore by Region</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GLOBAL_REGION_DATA.map(region => (
          <Card key={region.slug} onClick={() => onNavigate('region', region.slug)}>
            <div className="h-40 bg-gray-700 flex items-center justify-center p-4 rounded-t-xl relative">
               {/* Placeholder for World Map Section of the Region */}
               <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{backgroundImage: `url(${region.mapImage})`}}></div>
               <span className="text-4xl font-extrabold text-green-400 z-10">{region.name}</span>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-sm text-gray-400 line-clamp-2">{region.overview}</p>
              <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                <span className="text-sm font-medium text-gray-300">{region.countries.length} Countries Listed</span>
                <button className="text-green-400 hover:text-green-300 font-semibold flex items-center">
                  View Countries &rarr;
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </div>
);


const App = () => {
  // State for navigation: ['world', 'region', 'country', 'city']
  const [view, setView] = useState('world');
  const [mainSlug, setMainSlug] = useState(null); // Used for region/country slug
  const [subSlug, setSubSlug] = useState(null); // Used for city slug

  const handleNavigate = (newView, slug1 = null, slug2 = null) => {
    setView(newView);
    setMainSlug(slug1);
    setSubSlug(slug2);
    window.scrollTo(0, 0); // Scroll to top on navigation
  };

  const content = useMemo(() => {
    switch (view) {
      case 'region':
        const regionData = findData('region', mainSlug);
        return regionData ? <RegionGuide region={regionData} onNavigate={handleNavigate} /> : <div className="text-red-400">Region not found.</div>;
      case 'country':
        const countryData = findData('country', mainSlug);
        return countryData ? <CountryGuide country={countryData} onNavigate={handleNavigate} /> : <div className="text-red-400">Country not found.</div>;
      case 'city':
        const cityData = findData('city', mainSlug, subSlug);
        return cityData ? <CityGuide {...cityData} onNavigate={handleNavigate} /> : <div className="text-red-400">City not found.</div>;
      case 'world':
      default:
        return <WorldGuide onNavigate={handleNavigate} />;
    }
  }, [view, mainSlug, subSlug]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <style>{`
        /* Global Styles (Matching existing dark theme) */
        body { background-color: #111827; }
        .container { max-width: 1200px; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>
      <Navigation onNavigate={handleNavigate} />
      
      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          {content}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
