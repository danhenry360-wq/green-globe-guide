// src/components/home/CTASection.tsx
// Call to action section with search prompt

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
    const handleSearchFocus = () => {
        // Scroll to top and focus on search input
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Small delay to allow scroll to complete
        setTimeout(() => {
            const searchInput = document.querySelector('input[aria-label="Search destinations"]') as HTMLInputElement;
            searchInput?.focus();
        }, 500);
    };

    return (
        <section className="py-12 sm:py-20 px-4 bg-background">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="container mx-auto text-center"
            >
                <div className="bg-gradient-to-br from-accent/20 to-gold/20 p-6 sm:p-12 rounded-2xl sm:rounded-3xl border border-border/50 shadow-2xl">
                    <h2 className="text-3xl sm:text-5xl font-bold mb-4">Ready to Explore?</h2>
                    <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
                        Start your journey with BudQuest. Search for your next destination and travel with confidence.
                    </p>
                    <Button
                        size="lg"
                        onClick={handleSearchFocus}
                        className="w-full sm:w-auto h-12 sm:h-14 px-10 text-lg rounded-xl bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20"
                    >
                        Search Destinations
                    </Button>
                </div>
            </motion.div>
        </section>
    );
};
