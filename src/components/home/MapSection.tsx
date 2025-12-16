// src/components/home/MapSection.tsx
// Global cannabis legality map section with mobile/desktop views

import { lazy, Suspense } from "react";
import { motion, Variants } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MobileContinentMap } from "@/components/MobileContinentMap";
import MapLegend from "@/components/MapLegend";

// Lazy load heavy map component
const InteractiveWorldMap = lazy(() => import("@/components/InteractiveWorldMap"));

const FADE_IN: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
};

const STAGGER: Variants = {
    animate: { transition: { staggerChildren: 0.15 } }
};

export const MapSection = () => {
    return (
        <section className="py-16 bg-gradient-to-b from-black via-gray-950 to-black">
            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={STAGGER}
                className="container mx-auto"
            >
                <SectionHeader
                    id="legality-heading"
                    title="Global Cannabis Legality Map"
                    subtitle="Explore marijuana laws worldwide. Filter by legal status (Recreational, Medical, Decriminalized) and continent."
                />

                {/* Mobile view: Continent grid */}
                <MobileContinentMap />

                {/* Desktop view: Interactive world map */}
                <div className="hidden md:block w-full">
                    <motion.div variants={FADE_IN}>
                        <Card className="bg-card/50 border-border/50 p-6 rounded-2xl shadow-2xl backdrop-blur-xl">
                            <div className="w-full h-[600px] bg-card rounded-lg overflow-hidden border border-border/50 relative">
                                <Suspense
                                    fallback={
                                        <div className="flex items-center justify-center h-full w-full text-accent">
                                            <Loader2 className="w-10 h-10 animate-spin mr-2" />
                                            Loading Global Map Data...
                                        </div>
                                    }
                                >
                                    <InteractiveWorldMap />
                                </Suspense>
                            </div>
                            <div className="mt-6 flex justify-center">
                                <MapLegend />
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};
