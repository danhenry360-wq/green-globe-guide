// src/components/MobileContinentMap.tsx
// Mobile-only continent navigation with drill-down to countries

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getStatusDotClass, getStatusOutlineClasses } from "@/lib/legal-status-colors";

const FADE_IN: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
};

interface ContinentInfo {
    name: string;
    emoji: string;
    count: number;
    slug: string;
}

interface CountryInfo {
    name: string;
    status: string;
    description: string;
    slug: string;
}

const CONTINENT_DISPLAY: ContinentInfo[] = [
    { name: "North America", emoji: "🌐", count: 3, slug: "north-america" },
    { name: "Central America", emoji: "☀️", count: 7, slug: "central-america" },
    { name: "Europe", emoji: "🏔️", count: 44, slug: "europe" },
    { name: "South America", emoji: "🌴", count: 13, slug: "south-america" },
    { name: "Caribbean", emoji: "🌊", count: 26, slug: "caribbean" },
    { name: "Asia", emoji: "⛰️", count: 41, slug: "asia" },
    { name: "Africa", emoji: "📍", count: 54, slug: "africa" },
    { name: "Oceania", emoji: "≈", count: 25, slug: "oceania" },
];

const COUNTRIES_BY_CONTINENT: Record<string, CountryInfo[]> = {
    "north-america": [
        { name: "United States", status: "Mixed", description: "Varies by state - 24 states recreational", slug: "united-states" },
        { name: "Canada", status: "Recreational", description: "Fully legal nationwide since 2018", slug: "canada" },
        { name: "Mexico", status: "Decriminalized", description: "Decriminalized for personal use", slug: "mexico" },
    ],
    "central-america": [
        { name: "Costa Rica", status: "Decriminalized", description: "Personal use largely tolerated", slug: "costa-rica" },
        { name: "Panama", status: "Medical", description: "Medical legalization in process", slug: "panama" },
        { name: "Belize", status: "Decriminalized", description: "Possession up to 10g decriminalized", slug: "belize" },
    ],
    "south-america": [
        { name: "Uruguay", status: "Recreational", description: "Fully legal for residents", slug: "uruguay" },
        { name: "Colombia", status: "Medical", description: "Medical legal, Decriminalized <20g", slug: "colombia" },
        { name: "Argentina", status: "Medical", description: "REPROCANN program for medical use", slug: "argentina" },
    ],
    "caribbean": [
        { name: "Jamaica", status: "Decriminalized", description: "Medical and religious use legal", slug: "jamaica" },
        { name: "St. Vincent", status: "Decriminalized", description: "Medical cannabis industry active", slug: "st-vincent" },
    ],
    "europe": [
        { name: "Netherlands", status: "Decriminalized", description: "Tolerated in coffee shops", slug: "netherlands" },
        { name: "Germany", status: "Recreational", description: "Legalized recreational use (2024)", slug: "germany" },
        { name: "Spain", status: "Decriminalized", description: "Private social clubs legal", slug: "spain" },
        { name: "Portugal", status: "Decriminalized", description: "Decriminalized all drugs in 2001", slug: "portugal" },
        { name: "Malta", status: "Recreational", description: "First EU country to legalize", slug: "malta" },
    ],
    "asia": [
        { name: "Thailand", status: "Mixed", description: "Recreational ending 2025, medical only", slug: "thailand" },
        { name: "India", status: "Mixed", description: "Bhang legal, flower illegal by state", slug: "india" },
        { name: "Japan", status: "Illegal", description: "Strict prohibition (Travel Warning)", slug: "japan" },
    ],
    "africa": [
        { name: "South Africa", status: "Decriminalized", description: "Private cultivation and use legal", slug: "south-africa" },
        { name: "Morocco", status: "Illegal", description: "Major hash producer (Kief tolerated)", slug: "morocco" },
    ],
    "oceania": [
        { name: "Australia", status: "Mixed", description: "Medical federal, ACT recreational", slug: "australia" },
        { name: "New Zealand", status: "Medical", description: "Medical legal since 2020", slug: "new-zealand" },
    ],
};

export const MobileContinentMap = () => {
    const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
    const navigate = useNavigate();

    // Country detail view
    if (selectedContinent) {
        const continentInfo = CONTINENT_DISPLAY.find(c => c.slug === selectedContinent);
        const representativeCountries = COUNTRIES_BY_CONTINENT[selectedContinent] || [];

        return (
            <div className="block md:hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    {/* Header with back button */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl">{continentInfo?.emoji}</span>
                        <h3 className="text-xl font-bold text-foreground">{continentInfo?.name}</h3>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedContinent(null)}
                            className="ml-auto"
                        >
                            ← Back
                        </Button>
                    </div>

                    {/* Country list */}
                    <div className="space-y-3">
                        {representativeCountries.map((country, index) => (
                            <motion.div
                                key={country.slug}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * index }}
                                onClick={() => navigate(`/world/${selectedContinent}/${country.slug}`)}
                                className="p-4 bg-card/60 rounded-xl border border-border/50 hover:border-accent/50 cursor-pointer"
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${getStatusDotClass(country.status)}`} />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="font-semibold text-foreground">{country.name}</span>
                                            <Badge className={`text-xs border ${getStatusOutlineClasses(country.status)} bg-transparent`}>
                                                {country.status}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{country.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* View all button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 pt-2"
                    >
                        <Button
                            onClick={() => navigate(`/world/${selectedContinent}`)}
                            className="w-full h-12 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 flex items-center justify-center gap-2 text-base font-medium"
                        >
                            View all {continentInfo?.count} countries in {continentInfo?.name}
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    // Continent grid view
    return (
        <div className="block md:hidden">
            <motion.div variants={FADE_IN} className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                    {CONTINENT_DISPLAY.map((continent) => (
                        <button
                            key={continent.slug}
                            onClick={() => setSelectedContinent(continent.slug)}
                            className="flex flex-col items-center justify-center p-6 bg-card/90 hover:bg-card rounded-xl border-2 border-accent/40 hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 backdrop-blur-sm text-center"
                        >
                            <span className="text-3xl mb-3">{continent.emoji}</span>
                            <span className="text-base font-semibold text-foreground">{continent.name}</span>
                            <span className="text-sm text-muted-foreground">{continent.count} countries</span>
                            <ArrowRight className="w-4 h-4 text-accent/50 mt-2" />
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
