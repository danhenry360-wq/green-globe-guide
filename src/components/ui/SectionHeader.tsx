// src/components/ui/SectionHeader.tsx
// Reusable section header with gradient text styling

import { motion, Variants } from "framer-motion";

const FADE_IN: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
};

interface SectionHeaderProps {
    id: string;
    title: string;
    subtitle: string;
    className?: string;
}

export const SectionHeader = ({
    id,
    title,
    subtitle,
    className = "",
}: SectionHeaderProps) => (
    <motion.div
        variants={FADE_IN}
        className={`text-center mb-12 sm:mb-16 ${className}`}
    >
        <h2
            id={id}
            className="text-3xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent"
        >
            {title}
        </h2>
        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            {subtitle}
        </p>
    </motion.div>
);
