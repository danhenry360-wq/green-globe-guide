// src/components/home/CTASection.tsx
// Enhanced CTA section with multiple actions and social proof

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Building2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
    const navigate = useNavigate();

    const handleSearchFocus = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            const searchInput = document.querySelector('input[aria-label="Search destinations"]') as HTMLInputElement;
            searchInput?.focus();
        }, 500);
    };

    return (
        <section className="py-16 sm:py-24 px-4 bg-background">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="container mx-auto"
            >
                <div className="relative bg-gradient-to-br from-accent/15 via-accent/10 to-gold/10 p-8 sm:p-14 rounded-3xl border border-accent/20 shadow-2xl overflow-hidden">
                    {/* Background glow effects */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/15 rounded-full blur-[80px]" />
                    
                    <div className="relative z-10">
                        {/* Trust indicator */}
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Sparkles className="w-4 h-4 text-accent" />
                            <span className="text-sm text-accent font-medium">Trusted by 10,000+ Cannabis Travelers</span>
                        </div>

                        <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-center">
                            Ready to Plan Your <span className="text-accent">420 Adventure?</span>
                        </h2>
                        <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-center">
                            Search verified dispensaries, find 420-friendly hotels, and explore cannabis laws in 150+ destinations worldwide.
                        </p>

                        {/* Primary CTA */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                            <Button
                                size="lg"
                                onClick={handleSearchFocus}
                                className="h-14 px-10 text-lg rounded-xl bg-accent hover:bg-accent/90 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40 transition-all group"
                            >
                                <span>Search Destinations</span>
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>

                        {/* Secondary CTAs */}
                        <div className="flex flex-wrap justify-center gap-3">
                            <Button
                                variant="ghost"
                                onClick={() => navigate('/dispensary')}
                                className="text-muted-foreground hover:text-accent hover:bg-accent/10"
                            >
                                <MapPin className="w-4 h-4 mr-2" />
                                Find Dispensaries
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => navigate('/hotels')}
                                className="text-muted-foreground hover:text-accent hover:bg-accent/10"
                            >
                                <Building2 className="w-4 h-4 mr-2" />
                                Browse 420 Hotels
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
