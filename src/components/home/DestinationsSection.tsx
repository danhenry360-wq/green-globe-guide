// src/components/home/DestinationsSection.tsx
// Featured cannabis destinations grid

import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/SectionHeader";

const FADE_IN: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
};

const STAGGER: Variants = {
    animate: { transition: { staggerChildren: 0.15 } }
};

// Featured destinations data
const FEATURED_DESTINATIONS = [
    {
        name: "California",
        status: "Recreational",
        country: "USA",
        image: "/dest-california.png",
        imageAlt: "California cannabis tourism guide beach view",
        color: "bg-green-500/90",
        link: "/usa/california"
    },
    {
        name: "Colorado",
        status: "Recreational",
        country: "USA",
        image: "/dest-colorado.png",
        imageAlt: "Colorado mountains dispensary guide",
        color: "bg-green-500/90",
        link: "/usa/colorado"
    },
    {
        name: "Netherlands",
        status: "Decriminalized",
        country: "Europe",
        image: "/dest-netherlands.png",
        imageAlt: "Amsterdam coffee shops canal view",
        color: "bg-amber-500/90",
        link: "/world/europe/netherlands"
    },
    {
        name: "Canada",
        status: "Recreational",
        country: "North America",
        image: "/dest-canada-toronto.jpg",
        imageAlt: "Canada legal weed travel guide Toronto",
        color: "bg-green-500/90",
        link: "/world/north-america/canada"
    },
    {
        name: "Uruguay",
        status: "Recreational",
        country: "South America",
        image: "/dest-uruguay.jpg",
        imageAlt: "Uruguay cannabis club travel",
        color: "bg-green-500/90",
        link: "/world/south-america/uruguay"
    },
    {
        name: "Thailand",
        status: "Medical",
        country: "Asia",
        image: "/dest-thailand.jpg",
        imageAlt: "Thailand cannabis laws and temples",
        color: "bg-amber-700/90",
        link: "/world/asia/thailand"
    },
];

export const DestinationsSection = () => {
    return (
        <section id="main-content" className="py-16 bg-black">
            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={STAGGER}
                className="container mx-auto"
            >
                <SectionHeader
                    id="destinations-heading"
                    title="Popular Cannabis Destinations"
                    subtitle="Explore BudQuest's curated list of top 420-friendly travel hotspots worldwide"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURED_DESTINATIONS.map((dest) => (
                        <motion.div key={dest.name} variants={FADE_IN} whileHover={{ y: -8 }}>
                            <Link to={dest.link} aria-label={`View cannabis laws and guides for ${dest.name}`}>
                                <Card className="relative h-96 overflow-hidden rounded-2xl border-white/10 bg-gray-900 shadow-xl hover:border-accent/30 group">
                                    <img
                                        src={dest.image}
                                        alt={dest.imageAlt}
                                        loading="lazy"
                                        width="400"
                                        height="500"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                    <div className="absolute top-4 right-4 z-10">
                                        <Badge className={`${dest.color} text-white border-none`}>
                                            {dest.status}
                                        </Badge>
                                    </div>
                                    <div className="absolute bottom-0 left-0 p-6 text-white">
                                        <h3 className="text-3xl font-bold mb-1">{dest.name}</h3>
                                        <p className="text-lg text-gray-300">{dest.country}</p>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};
