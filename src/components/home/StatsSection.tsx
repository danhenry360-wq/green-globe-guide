// src/components/home/StatsSection.tsx
// Stats grid showing key platform metrics

import { motion } from "framer-motion";
import { Globe2, Store, Building2, Shield } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useDynamicStats } from "@/hooks/useDynamicStats";

const COUNTRY_COUNT = 150;
const DATA_ACCURACY = 94;

export const StatsSection = () => {
    const { dispensaryCount, hotelCount } = useDynamicStats();

    const stats = [
        { icon: Globe2, label: "Countries Covered", count: COUNTRY_COUNT, suffix: "+" },
        { icon: Store, label: "Verified Dispensaries", count: dispensaryCount, suffix: "+" },
        { icon: Building2, label: "420-Friendly Hotels", count: hotelCount, suffix: "+" },
        { icon: Shield, label: "Data Accuracy", count: DATA_ACCURACY, suffix: "%" },
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
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center group"
                        >
                            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20">
                                <stat.icon className="w-10 h-10 text-accent" />
                            </div>
                            <div className="text-4xl sm:text-5xl font-bold mb-2">
                                <AnimatedCounter end={stat.count} />{stat.suffix}
                            </div>
                            <div className="text-muted-foreground">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};
