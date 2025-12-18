// src/components/home/HeroSection.tsx
// Hero section with search bar, branding, and quick navigation

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Sparkles, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSearch } from "@/hooks/useSearch";
import { SearchItem, ALL_WORLD_SEARCH_ITEMS } from "@/data/search-data";
import { USA_STATE_DATA } from "@/lib/usa_state_data";
import { getStatusOutlineClasses } from "@/lib/legal-status-colors";
import heroImage from "@/assets/hero-cannabis-travel.jpg";

// Build search items from USA states
const buildStateSearchItems = (): SearchItem[] =>
    USA_STATE_DATA.map(state => ({
        name: state.name,
        type: 'state' as const,
        status: state.status.charAt(0).toUpperCase() + state.status.slice(1),
        path: `/usa/${state.slug}`,
        region: 'USA'
    }));

// Quick navigation links
const QUICK_LINKS = [
    { label: "🔥 California", path: "/usa/california" },
    { label: "🌎 World Guide", path: "/world" },
    { label: "🇪🇺 Europe", path: "/world/europe" },
    { label: "🏨 420 Hotels", path: "/hotels" },
];

export const HeroSection = () => {
    const navigate = useNavigate();

    // Combine all searchable items
    const allSearchItems = useMemo(() => {
        const stateItems = buildStateSearchItems();
        return [...stateItems, ...ALL_WORLD_SEARCH_ITEMS];
    }, []);

    const {
        searchTerm,
        setSearchTerm,
        showSuggestions,
        setShowSuggestions,
        selectedIndex,
        setSelectedIndex,
        suggestions,
        searchRef,
        inputRef,
        handleKeyDown,
        handleSelectSuggestion,
        handleSearchSubmit,
        getTypeIcon,
    } = useSearch(allSearchItems);

    const scrollToStats = () => {
        document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            className="relative min-h-[100svh] flex items-center justify-center px-4 pt-20 pb-16 overflow-hidden"
            role="banner"
        >
            {/* Background layers */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImage})` }}
                aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/15 rounded-full blur-[120px] animate-pulse" aria-hidden="true" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] animate-pulse" aria-hidden="true" />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="container mx-auto text-center relative z-10 px-2"
            >
                {/* Badge */}
                <Badge className="mb-6 px-5 py-2 text-sm font-medium bg-accent/10 text-accent border-accent/30 shadow-[0_0_30px_-10px_rgba(34,197,94,0.6)] animate-pulse">
                    <Sparkles className="w-4 h-4 mr-2 inline" aria-hidden="true" />
                    Global Cannabis Travel Intelligence
                </Badge>

                {/* Main heading */}
                <h1 className="text-[clamp(3rem,10vw,6.5rem)] font-bold leading-[1.1] tracking-tighter drop-shadow-2xl mb-2">
                    <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                        BudQuest
                    </span>
                </h1>

                {/* Subheadings */}
                <p className="text-[clamp(1rem,2.2vw,1.4rem)] text-muted-foreground/90 font-light mt-4 max-w-4xl mx-auto leading-relaxed">
                    Premium intelligence for legal cannabis tourism. Navigate 420-friendly regulations, discover verified dispensaries, and explore travel destinations in 150+ countries.
                </p>



                {/* Search bar */}
                <div className="max-w-3xl mx-auto mt-10" ref={searchRef}>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-accent/40 via-gold/40 to-accent/40 blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-700 rounded-2xl" />
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-accent z-10 pointer-events-none" />
                        <Input
                            ref={inputRef}
                            aria-label="Search destinations"
                            placeholder="Search destinations (e.g., Thailand, California, Amsterdam)..."
                            className="pl-16 pr-32 sm:pr-40 h-16 sm:h-20 text-lg bg-card/80 border-2 border-border/50 focus:border-accent focus:ring-4 focus:ring-accent/20 backdrop-blur-xl rounded-2xl relative z-10 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-accent/20 font-light placeholder:text-muted-foreground/60"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setShowSuggestions(true);
                                setSelectedIndex(-1);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            onKeyDown={handleKeyDown}
                        />
                        <Button
                            onClick={handleSearchSubmit}
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 sm:h-12 px-4 sm:px-6 rounded-xl bg-accent hover:bg-accent/90 transition-all z-20 text-sm sm:text-base"
                            aria-label="Submit search"
                        >
                            Search
                        </Button>

                        {/* Suggestions dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-xl border-2 border-border/50 rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden"
                            >
                                {suggestions.map((item, index) => (
                                    <button
                                        key={`${item.type}-${item.name}`}
                                        onClick={() => handleSelectSuggestion(item)}
                                        className={`w-full px-5 py-4 flex items-center gap-4 text-left transition-colors ${index === selectedIndex
                                            ? 'bg-accent/20 border-l-2 border-accent'
                                            : 'hover:bg-white/5 border-l-2 border-transparent'
                                            }`}
                                    >
                                        <span className="text-2xl">{getTypeIcon(item.type)}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-semibold text-foreground">{item.name}</span>
                                                <Badge className={`text-xs border ${getStatusOutlineClasses(item.status)}`}>
                                                    {item.status}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground truncate">
                                                {item.type === 'state' ? 'US State' : item.region}
                                            </p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Quick Link & Trending Navigation */}
                <div className="mt-8">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground/50 mb-3 font-semibold">Trending Destinations</p>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                        {QUICK_LINKS.map((item) => (
                            <motion.button
                                key={item.label}
                                onClick={() => navigate(item.path)}
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(34, 197, 94, 0.15)' }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition text-xs sm:text-sm text-muted-foreground hover:text-white cursor-pointer shadow-lg hover:shadow-accent/5"
                            >
                                {item.label}
                            </motion.button>
                        ))}
                    </div>
                </div>


                {/* Scroll indicator */}
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={scrollToStats}
                        className="text-muted-foreground/50 hover:text-white transition-colors cursor-pointer"
                        aria-label="Scroll down to statistics"
                    >
                        <ChevronDown className="w-8 h-8 animate-bounce" />
                    </button>
                </div>
            </motion.div>
        </section>
    );
};
