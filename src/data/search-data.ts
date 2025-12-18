// src/data/search-data.ts
// Centralized search data for global destination autocomplete

export interface SearchItem {
    name: string;
    type: 'state' | 'country' | 'city';
    status: string;
    path: string;
    region?: string;
}

// EXPANDED World countries for search
export const WORLD_COUNTRIES: SearchItem[] = [
    // --- North America ---
    { name: "Canada", type: "country", status: "Recreational", path: "/world/north-america/canada", region: "North America" },
    { name: "United States", type: "country", status: "Mixed", path: "/world/north-america/united-states", region: "North America" },
    { name: "Mexico", type: "country", status: "Decriminalized", path: "/world/north-america/mexico", region: "North America" },

    // --- Central America ---
    { name: "Costa Rica", type: "country", status: "Decriminalized", path: "/world/central-america/costa-rica", region: "Central America" },
    { name: "Belize", type: "country", status: "Decriminalized", path: "/world/central-america/belize", region: "Central America" },
    { name: "Panama", type: "country", status: "Medical", path: "/world/central-america/panama", region: "Central America" },

    // --- Europe ---
    { name: "Netherlands", type: "country", status: "Decriminalized", path: "/world/europe/netherlands", region: "Europe" },
    { name: "Germany", type: "country", status: "Recreational", path: "/world/europe/germany", region: "Europe" },
    { name: "Spain", type: "country", status: "Decriminalized", path: "/world/europe/spain", region: "Europe" },
    { name: "Portugal", type: "country", status: "Decriminalized", path: "/world/europe/portugal", region: "Europe" },
    { name: "Italy", type: "country", status: "Decriminalized", path: "/world/europe/italy", region: "Europe" },
    { name: "Switzerland", type: "country", status: "Decriminalized", path: "/world/europe/switzerland", region: "Europe" },
    { name: "Czech Republic", type: "country", status: "Decriminalized", path: "/world/europe/czech-republic", region: "Europe" },
    { name: "Austria", type: "country", status: "Decriminalized", path: "/world/europe/austria", region: "Europe" },
    { name: "Belgium", type: "country", status: "Decriminalized", path: "/world/europe/belgium", region: "Europe" },
    { name: "Malta", type: "country", status: "Recreational", path: "/world/europe/malta", region: "Europe" },
    { name: "Luxembourg", type: "country", status: "Recreational", path: "/world/europe/luxembourg", region: "Europe" },
    { name: "United Kingdom", type: "country", status: "Medical", path: "/world/europe/uk", region: "Europe" },
    { name: "France", type: "country", status: "Medical", path: "/world/europe/france", region: "Europe" },
    { name: "Croatia", type: "country", status: "Medical", path: "/world/europe/croatia", region: "Europe" },
    { name: "Greece", type: "country", status: "Medical", path: "/world/europe/greece", region: "Europe" },
    { name: "Poland", type: "country", status: "Medical", path: "/world/europe/poland", region: "Europe" },
    { name: "Denmark", type: "country", status: "Medical", path: "/world/europe/denmark", region: "Europe" },
    { name: "Norway", type: "country", status: "Medical", path: "/world/europe/norway", region: "Europe" },
    { name: "Georgia", type: "country", status: "Recreational", path: "/world/europe/georgia", region: "Europe" },

    // --- South America ---
    { name: "Uruguay", type: "country", status: "Recreational", path: "/world/south-america/uruguay", region: "South America" },
    { name: "Colombia", type: "country", status: "Medical", path: "/world/south-america/colombia", region: "South America" },
    { name: "Argentina", type: "country", status: "Medical", path: "/world/south-america/argentina", region: "South America" },
    { name: "Chile", type: "country", status: "Decriminalized", path: "/world/south-america/chile", region: "South America" },
    { name: "Peru", type: "country", status: "Medical", path: "/world/south-america/peru", region: "South America" },
    { name: "Brazil", type: "country", status: "Decriminalized", path: "/world/south-america/brazil", region: "South America" },
    { name: "Ecuador", type: "country", status: "Decriminalized", path: "/world/south-america/ecuador", region: "South America" },
    { name: "Paraguay", type: "country", status: "Medical", path: "/world/south-america/paraguay", region: "South America" },

    // --- Caribbean ---
    { name: "Jamaica", type: "country", status: "Decriminalized", path: "/world/caribbean/jamaica", region: "Caribbean" },
    { name: "St. Vincent", type: "country", status: "Decriminalized", path: "/world/caribbean/st-vincent", region: "Caribbean" },
    { name: "Antigua and Barbuda", type: "country", status: "Recreational", path: "/world/caribbean/antigua", region: "Caribbean" },
    { name: "Saint Lucia", type: "country", status: "Decriminalized", path: "/world/caribbean/saint-lucia", region: "Caribbean" },
    { name: "Dominica", type: "country", status: "Decriminalized", path: "/world/caribbean/dominica", region: "Caribbean" },
    { name: "Barbados", type: "country", status: "Medical", path: "/world/caribbean/barbados", region: "Caribbean" },
    { name: "Puerto Rico", type: "country", status: "Medical", path: "/world/caribbean/puerto-rico", region: "Caribbean" },
    { name: "Trinidad and Tobago", type: "country", status: "Decriminalized", path: "/world/caribbean/trinidad", region: "Caribbean" },

    // --- Asia ---
    { name: "Thailand", type: "country", status: "Mixed", path: "/world/asia/thailand", region: "Asia" },
    { name: "India", type: "country", status: "Mixed", path: "/world/asia/india", region: "Asia" },
    { name: "Japan", type: "country", status: "Illegal", path: "/world/asia/japan", region: "Asia" },
    { name: "South Korea", type: "country", status: "Medical", path: "/world/asia/south-korea", region: "Asia" },
    { name: "Israel", type: "country", status: "Medical", path: "/world/asia/israel", region: "Asia" },
    { name: "Lebanon", type: "country", status: "Medical", path: "/world/asia/lebanon", region: "Asia" },

    // --- Africa ---
    { name: "South Africa", type: "country", status: "Decriminalized", path: "/world/africa/south-africa", region: "Africa" },
    { name: "Morocco", type: "country", status: "Illegal", path: "/world/africa/morocco", region: "Africa" },
    { name: "Lesotho", type: "country", status: "Medical", path: "/world/africa/lesotho", region: "Africa" },
    { name: "Zimbabwe", type: "country", status: "Medical", path: "/world/africa/zimbabwe", region: "Africa" },
    { name: "Rwanda", type: "country", status: "Medical", path: "/world/africa/rwanda", region: "Africa" },

    // --- Oceania ---
    { name: "Australia", type: "country", status: "Mixed", path: "/world/oceania/australia", region: "Oceania" },
    { name: "New Zealand", type: "country", status: "Medical", path: "/world/oceania/new-zealand", region: "Oceania" },
    { name: "Guam", type: "country", status: "Recreational", path: "/world/oceania/guam", region: "Oceania" },
];

// EXPANDED Popular cities for search
export const POPULAR_CITIES: SearchItem[] = [
    { name: "Amsterdam", type: "city", status: "Decriminalized", path: "/world/europe/netherlands/north-holland/amsterdam", region: "Netherlands" },
    { name: "Barcelona", type: "city", status: "Decriminalized", path: "/world/europe/spain/catalonia/barcelona", region: "Spain" },
    { name: "Los Angeles", type: "city", status: "Recreational", path: "/usa/california/los-angeles", region: "California" },
    { name: "Denver", type: "city", status: "Recreational", path: "/denver", region: "Colorado" },
    { name: "San Francisco", type: "city", status: "Recreational", path: "/usa/california/san-francisco", region: "California" },
    { name: "Toronto", type: "city", status: "Recreational", path: "/world/north-america/canada/ontario/toronto", region: "Canada" },
    { name: "Vancouver", type: "city", status: "Recreational", path: "/world/north-america/canada/british-columbia/vancouver", region: "Canada" },
    { name: "Berlin", type: "city", status: "Recreational", path: "/world/europe/germany/berlin-region/berlin", region: "Germany" },
    { name: "Munich", type: "city", status: "Recreational", path: "/world/europe/germany/bavaria/munich", region: "Germany" },
    { name: "Bangkok", type: "city", status: "Mixed", path: "/world/asia/thailand/bangkok-region/bangkok", region: "Thailand" },
    { name: "Chiang Mai", type: "city", status: "Mixed", path: "/world/asia/thailand/chiang-mai", region: "Thailand" },
    { name: "Lisbon", type: "city", status: "Decriminalized", path: "/world/europe/portugal/lisbon-region/lisbon", region: "Portugal" },
    { name: "Prague", type: "city", status: "Decriminalized", path: "/world/europe/czech-republic/prague", region: "Czech Republic" },
    { name: "Cape Town", type: "city", status: "Decriminalized", path: "/world/africa/south-africa/western-cape/cape-town", region: "South Africa" },
    { name: "Tel Aviv", type: "city", status: "Medical", path: "/world/asia/israel/tel-aviv", region: "Israel" },
    { name: "Canberra", type: "city", status: "Recreational", path: "/world/oceania/australia/act/canberra", region: "Australia" },
];

// Combined search items for easy consumption
export const ALL_WORLD_SEARCH_ITEMS: SearchItem[] = [
    ...WORLD_COUNTRIES,
    ...POPULAR_CITIES,
];
