import React, { useState, useEffect } from "react";
// Mocked imports for runnability (In a real app, these would be separate files)
import { Map, MapPin, Scale, Filter, Search, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

// --- MOCK DEPENDENCIES ---

// Mock shadcn/ui components
const Input = (props) => <input {...props} className={"w-full p-2 border rounded-lg bg-card text-foreground border-border placeholder:text-muted-foreground focus:ring-2 focus:ring-accent/50 " + props.className} />;
const Button = (props) => <button {...props} className={"p-2 rounded-lg font-semibold transition-colors " + props.className}>{props.children}</button>;
const Card = (props) => <div {...props} className={"p-4 rounded-xl shadow-md border border-border " + props.className}>{props.children}</div>;
const Badge = (props) => <span {...props} className={"inline-flex items-center text-xs px-3 py-1 font-medium rounded-full border transition-colors " + props.className}>{props.children}</span>;
const Link = ({ to, children }) => <a href={to} className="block">{children}</a>;

// Mock React Router hooks
const useLocation = () => ({ search: '' });
const URLSearchParams = window.URLSearchParams;

// Mock Layout Components
const Navigation = () => (
    <div className="fixed top-0 left-0 w-full h-14 bg-card/90 backdrop-blur-md border-b border-border z-50 flex items-center justify-center text-lg font-bold">
        <span className="text-accent">Cannabis Guide</span>
    </div>
);
const Footer = () => (
    <div className="py-8 text-center text-sm text-muted-foreground border-t border-border">
        © 2024 Cannabis Guide. All rights reserved.
    </div>
);

// Mock Data Structure (Minimal for filtering logic)
const USA_STATE_DATA = [
    { id: 1, name: "California", status: "recreational", slug: "ca", possession_limits: "1 oz flower", tourist_notes: "Very friendly. Dispensaries are everywhere. Enjoy the sun!" },
    { id: 2, name: "Texas", status: "illegal", slug: "tx", possession_limits: "Zero tolerance", tourist_notes: "Extremely strict laws. Do not risk it." },
    { id: 3, name: "New York", status: "recreational", slug: "ny", possession_limits: "3 oz flower", tourist_notes: "Legal but consumption rules are still developing. Use responsibly." },
    { id: 4, name: "Florida", status: "medical", slug: "fl", possession_limits: "2.5 oz flower (90 day)", tourist_notes: "Only medical cards are accepted. No recreational use." },
    { id: 5, name: "Idaho", status: "illegal", slug: "id", possession_limits: "Zero tolerance", tourist_notes: "One of the most conservative states." },
    { id: 6, name: "Illinois", status: "recreational", slug: "il", possession_limits: "30g for residents", tourist_notes: "Adult-use is legal. Home grow is illegal." },
    { id: 7, name: "Alaska", status: "recreational", slug: "ak", possession_limits: "1 oz flower", tourist_notes: "Legal since 2014. Remote areas may have limited access." },
    { id: 8, name: "Kansas", status: "illegal", slug: "ks", possession_limits: "Zero tolerance", tourist_notes: "No medical or recreational programs." },
    { id: 9, name: "Mississippi", status: "medical", slug: "ms", possession_limits: "3.5g per day", tourist_notes: "Only medical use is permitted." },
    { id: 10, name: "Virginia", status: "decriminalized", slug: "va", possession_limits: "1 oz (personal use)", tourist_notes: "Decriminalized, not fully legalized for retail." },
];


// --- MAIN COMPONENT START ---

const USAGuide = () => {
    // Mock location/search params setup
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const initialSearchTerm = query.get('search') || "";

    const [statusFilter, setStatusFilter] = useState("all");
    const [regionFilter, setRegionFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false); // NEW STATE for mobile filter toggle

    const states = USA_STATE_DATA.sort((a, b) => a.name.localeCompare(b.name));
    const isLoading = false; // Mock loading state

    // --- Utility Functions (Copied from original) ---

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'recreational': return 'bg-green-600/20 text-green-400 border-green-400/30';
            case 'medical': return 'bg-amber-600/20 text-amber-400 border-amber-400/30';
            case 'decriminalized': return 'bg-sky-600/20 text-sky-400 border-sky-400/30';
            default: return 'bg-red-600/20 text-red-400 border-red-400/30';
        }
    };

    const getRegion = (name: string) => {
        const west = ['California', 'Oregon', 'Washington', 'Nevada', 'Colorado', 'Arizona', 'Alaska', 'Hawaii', 'Montana', 'Wyoming', 'Idaho', 'Utah', 'New Mexico'];
        const midwest = ['Illinois', 'Michigan', 'Ohio', 'Wisconsin', 'Minnesota', 'Iowa', 'Missouri', 'North Dakota', 'South Dakota', 'Nebraska', 'Kansas', 'Indiana'];
        const south = ['Texas', 'Florida', 'Georgia', 'North Carolina', 'Virginia', 'Tennessee', 'Louisiana', 'Alabama', 'Mississippi', 'Arkansas', 'Oklahoma', 'South Carolina', 'Kentucky', 'West Virginia', 'Maryland', 'Delaware', 'DC']; // Added DC for completeness
        const northeast = ['New York', 'Pennsylvania', 'New Jersey', 'Massachusetts', 'Connecticut', 'Rhode Island', 'New Hampshire', 'Vermont', 'Maine'];

        if (west.includes(name)) return 'West';
        if (midwest.includes(name)) return 'Midwest';
        if (south.includes(name)) return 'South';
        if (northeast.includes(name)) return 'Northeast';
        return 'Other';
    };

    // --- Filtering Logic (Copied from original) ---

    const filteredStates = states.filter(state => {
        const matchesStatus = statusFilter === 'all' || state.status === statusFilter;
        const matchesRegion = regionFilter === 'all' || getRegion(state.name) === regionFilter;
        const matchesSearch = state.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesRegion && matchesSearch;
    });

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    // --- Filter Components (Inline for single-file mandate) ---

    const FilterBadges = () => (
        <div className="space-y-4">
            {/* Status Filter */}
            <div>
                <label className="text-sm text-muted-foreground mb-2 block">Legal Status</label>
                <div className="flex flex-wrap gap-2">
                    {['all', 'recreational', 'medical', 'decriminalized', 'illegal'].map(status => (
                        <Badge
                            key={status}
                            className={`cursor-pointer transition-all ${
                                statusFilter === status
                                    ? getStatusColor(status === 'all' ? 'recreational' : status) + ' ring-2 ring-offset-2 ring-accent/50 ring-offset-background'
                                    : 'bg-muted/50 text-muted-foreground border-border hover:bg-muted'
                            }`}
                            onClick={() => setStatusFilter(status)}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Region Filter */}
            <div>
                <label className="text-sm text-muted-foreground mb-2 block">Region</label>
                <div className="flex flex-wrap gap-2">
                    {['all', 'West', 'Midwest', 'South', 'Northeast'].map(region => (
                        <Badge
                            key={region}
                            className={`cursor-pointer transition-all ${
                                regionFilter === region
                                    ? 'bg-accent/20 text-accent border-accent/30 ring-2 ring-offset-2 ring-accent/50 ring-offset-background'
                                    : 'bg-muted/50 text-muted-foreground border-border hover:bg-muted'
                            }`}
                            onClick={() => setRegionFilter(region)}
                        >
                            {region}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    );

    const Legend = () => (
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Badge className={getStatusColor('recreational')}>Recreational</Badge>
            <Badge className={getStatusColor('medical')}>Medical Only</Badge>
            <Badge className={getStatusColor('decriminalized')}>Decriminalized</Badge>
            <Badge className={getStatusColor('illegal')}>Illegal</Badge>
        </div>
    );

    // --- RENDER ---

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Nav is fixed, so content starts below it */}
            <Navigation />

            {/* --- MOBILE STICKY FILTER BAR (Visible below 768px) --- */}
            <motion.div
                className="md:hidden sticky top-[56px] z-40 bg-card/95 backdrop-blur-md border-b border-border/50 py-3 px-4 shadow-xl"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex gap-2 items-center">
                    {/* Search Bar */}
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search state..."
                            className="pl-10 h-10 text-sm bg-background border-border"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {/* Filter Toggle Button */}
                    <Button
                        variant="outline"
                        className="h-10 w-10 flex-shrink-0 bg-accent text-accent-foreground hover:bg-accent/80 p-0"
                        onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                        aria-expanded={isFilterPanelOpen}
                        aria-controls="mobile-filter-panel"
                    >
                        <Filter className="w-5 h-5" />
                    </Button>
                </div>

                {/* Collapsible Filter Panel */}
                <motion.div
                    id="mobile-filter-panel"
                    initial={false}
                    animate={{ height: isFilterPanelOpen ? "auto" : 0, opacity: isFilterPanelOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`mt-4 overflow-hidden ${isFilterPanelOpen ? 'pt-4 border-t border-border' : ''}`}
                >
                    <FilterBadges />
                    <div className="mt-4">
                        <Legend />
                    </div>
                </motion.div>
            </motion.div>


            <div className="pt-4 pb-20 px-4 mt-10 md:mt-0"> {/* Adjusted padding for non-sticky header space */}
                <div className="container mx-auto">
                    {/* --- HEADER --- */}
                    <motion.div
                        className="max-w-4xl mx-auto mb-12 text-center"
                        initial="initial"
                        animate="animate"
                        variants={fadeIn}
                    >
                        {/* Header Content (Badge, Title, Description) */}
                        <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">
                            <MapPin className="w-3 h-3 mr-1" />
                            All 50 States
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                            USA Cannabis Laws by State
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Complete guide to cannabis legality across all 50 states. Updated regularly with the latest laws and regulations.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {/* Search Bar for Desktop (hidden on mobile, uses sticky bar) */}
                            <div className="relative hidden md:block w-full max-w-lg mx-auto mb-8">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    placeholder="Search for a state..."
                                    className="pl-12 h-12 text-base bg-card border-border focus:border-accent focus:ring-2 focus:ring-accent/20"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" className="gap-2">
                                <Map className="w-4 h-4" />
                                View Interactive Map
                            </Button>
                            <Button variant="outline" className="gap-2">
                                <Scale className="w-4 h-4" />
                                Compare States
                            </Button>
                        </div>
                    </motion.div>

                    {/* --- DESKTOP FILTER & LEGEND (Hidden on mobile) --- */}
                    <motion.div
                        className="hidden md:block mb-8 bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Filter className="w-5 h-5 text-accent" />
                            <h3 className="text-lg font-semibold">Filter States</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <FilterBadges />
                            <div>
                                <label className="text-sm text-muted-foreground mb-2 block">Legend</label>
                                <Legend />
                            </div>
                        </div>
                    </motion.div>

                    {/* --- STATES GRID --- */}
                    <div className="text-sm text-muted-foreground mb-4 text-center">
                        Showing {filteredStates.length} of {states.length} states
                    </div>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial="initial"
                        animate="animate"
                        variants={{ animate: { transition: { staggerChildren: 0.05 } } }}
                    >
                        {filteredStates.map((state) => (
                            <motion.div key={state.id} variants={fadeIn}>
                                <Link to={`/usa/${state.slug}`}>
                                    <Card className="p-6 hover:border-accent/50 hover:shadow-glow-subtle transition-all cursor-pointer h-full group bg-gradient-card">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-2xl font-semibold group-hover:text-accent transition-colors mb-1">
                                                    {state.name}
                                                </h3>
                                                <p className="text-xs text-muted-foreground">{getRegion(state.name)}</p>
                                            </div>
                                            <Badge className={getStatusColor(state.status)}>
                                                {state.status.charAt(0).toUpperCase() + state.status.slice(1)}
                                            </Badge>
                                        </div>
                                        {state.possession_limits && (
                                            <p className="text-sm text-muted-foreground mb-2">
                                                <span className="font-medium text-foreground">Possession:</span> {state.possession_limits}
                                            </p>
                                        )}
                                        {state.tourist_notes && (
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {state.tourist_notes}
                                            </p>
                                        )}
                                        <div className="mt-4 text-sm text-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                            View full guide →
