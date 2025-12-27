// src/components/home/DestinationsSection.tsx
// Featured cannabis destinations grid with enhanced CTR

import { Link, useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";

const FADE_IN: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
};

const STAGGER: Variants = {
    animate: { transition: { staggerChildren: 0.1 } }
};

// Featured destinations data with enhanced metadata
const FEATURED_DESTINATIONS = [
    {
        name: "California",
        status: "Recreational",
        country: "USA",
        image: "/dest-california.png",
        imageAlt: "California cannabis tourism guide beach view",
        color: "bg-accent",
        link: "/usa/california",
        highlight: "50+ Dispensaries"
    },
    {
        name: "Colorado",
        status: "Recreational",
        country: "USA",
        image: "/dest-colorado.png",
        imageAlt: "Colorado mountains dispensary guide",
        color: "bg-accent",
        link: "/usa/colorado",
        highlight: "Full Legalization"
    },
    {
        name: "Netherlands",
        status: "Decriminalized",
        country: "Europe",
        image: "/dest-netherlands.png",
        imageAlt: "Amsterdam coffee shops canal view",
        color: "bg-gold",
        link: "/world/europe/netherlands",
        highlight: "Coffee Shops"
    },
    {
        name: "Canada",
        status: "Recreational",
        country: "North America",
        image: "/dest-canada-toronto.jpg",
        imageAlt: "Canada legal weed travel guide Toronto",
        color: "bg-accent",
        link: "/world/north-america/canada",
        highlight: "Nationwide Legal"
    },
    {
        name: "Uruguay",
        status: "Recreational",
        country: "South America",
        image: "/dest-uruguay.jpg",
        imageAlt: "Uruguay cannabis club travel",
        color: "bg-accent",
        link: "/world/south-america/uruguay",
        highlight: "First Legal Nation"
    },
    {
        name: "Thailand",
        status: "Medical",
        country: "Asia",
        image: "/dest-thailand.jpg",
        imageAlt: "Thailand cannabis laws and temples",
        color: "bg-gold",
        link: "/world/asia/thailand",
        highlight: "New Laws 2024"
    },
];

export const DestinationsSection = () => {
    const navigate = useNavigate();

    return (
        <section id="main-content" className="py-16 bg-background">
            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={STAGGER}
                className="container mx-auto px-4"
            >
                <SectionHeader
                    id="destinations-heading"
                    title="Popular Cannabis Destinations"
                    subtitle="Explore BudQuest's curated list of top 420-friendly travel hotspots worldwide"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {FEATURED_DESTINATIONS.map((dest) => (
                        <motion.div key={dest.name} variants={FADE_IN}>
                            <Link to={dest.link} aria-label={`View cannabis laws and guides for ${dest.name}`}>
                                <Card className="relative h-96 overflow-hidden rounded-2xl border-border/50 bg-card shadow-xl hover:border-accent/50 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10">
                                    <img
                                        src={dest.image}
                                        alt={dest.imageAlt}
                                        loading="lazy"
                                        width="400"
                                        height="500"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Gradient overlay - stronger on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent group-hover:from-black/98 transition-all duration-300" />
                                    
                                    {/* Status badge */}
                                    <div className="absolute top-4 right-4 z-10">
                                        <Badge className={`${dest.color} text-accent-foreground border-none font-medium`}>
                                            {dest.status}
                                        </Badge>
                                    </div>

                                    {/* Highlight badge */}
                                    <div className="absolute top-4 left-4 z-10">
                                        <Badge variant="outline" className="bg-black/60 text-white border-white/20 text-xs">
                                            {dest.highlight}
                                        </Badge>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span className="text-sm">{dest.country}</span>
                                        </div>
                                        <h3 className="text-3xl font-bold mb-3">{dest.name}</h3>
                                        
                                        {/* CTA that appears on hover */}
                                        <div className="flex items-center gap-2 text-accent font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                            <span>Explore Guide</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View All CTA */}
                <motion.div 
                    variants={FADE_IN}
                    className="mt-10 text-center"
                >
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => navigate('/world')}
                        className="group px-8 py-6 text-base border-accent/30 hover:border-accent hover:bg-accent/10"
                    >
                        <span>View All 150+ Destinations</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
};
