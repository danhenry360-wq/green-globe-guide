// src/components/home/StatsSection.tsx
// Interactive stats grid with clickable metrics

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe2, Store, Building2, Shield, ArrowRight } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useDynamicStats } from "@/hooks/useDynamicStats";

const COUNTRY_COUNT = 150;
const DATA_ACCURACY = 94;

export const StatsSection = () => {
    const navigate = useNavigate();
    const { dispensaryCount, hotelCount } = useDynamicStats();

    const stats = [
        { icon: Globe2, label: "Countries Covered", count: COUNTRY_COUNT, suffix: "+", path: "/world", cta: "Explore" },
        { icon: Store, label: "Verified Dispensaries", count: dispensaryCount, suffix: "+", path: "/dispensary", cta: "Browse" },
        { icon: Building2, label: "420-Friendly Hotels", count: hotelCount, suffix: "+", path: "/hotels", cta: "Find Stays" },
        { icon: Shield, label: "Data Accuracy", count: DATA_ACCURACY, suffix: "%", path: null, cta: null },
    ];

    return (
        <section
            id="stats"
            className="py-16 sm:py-20 px-4 bg-gradient-to-b from-transparent via-accent/5 to-transparent"
        >
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="container mx-auto"
            >
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {stats.map((stat, i) => {
                        const isClickable = !!stat.path;
                        const Component = isClickable ? motion.button : motion.div;
                        
                        return (
                            <Component
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={isClickable ? { scale: 1.03 } : undefined}
                                whileTap={isClickable ? { scale: 0.98 } : undefined}
                                onClick={isClickable ? () => navigate(stat.path!) : undefined}
                                className={`text-center p-6 rounded-2xl bg-card/50 border border-border/50 transition-all duration-300 ${
                                    isClickable 
                                        ? 'cursor-pointer hover:border-accent/50 hover:bg-accent/5 hover:shadow-lg hover:shadow-accent/10 group' 
                                        : ''
                                }`}
                            >
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20 transition-colors ${
                                    isClickable ? 'group-hover:bg-accent/20' : ''
                                }`}>
                                    <stat.icon className="w-8 h-8 text-accent" />
                                </div>
                                <div className="text-3xl sm:text-4xl font-bold mb-1">
                                    <AnimatedCounter end={stat.count} />{stat.suffix}
                                </div>
                                <div className="text-muted-foreground text-sm mb-2">{stat.label}</div>
                                
                                {isClickable && (
                                    <div className="flex items-center justify-center gap-1 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all">
                                        <span>{stat.cta}</span>
                                        <ArrowRight className="w-3 h-3" />
                                    </div>
                                )}
                            </Component>
                        );
                    })}
                </div>
            </motion.div>
        </section>
    );
};
