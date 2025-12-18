// src/components/SEOHead.tsx
// Reusable SEO component for meta tags and structured data

import { useEffect } from "react";

interface SEOHeadProps {
    title?: string;
    description?: string;
    keywords?: string;
    url?: string;
    image?: string;
    type?: "website" | "article";
}

const DEFAULT_SEO = {
    title: "BudQuest | Global Cannabis Travel Guide & 420-Friendly Intelligence",
    description: "Navigate global cannabis travel with BudQuest. Verified legal weed regulations, 420-friendly hotels, dispensary finders, and cannabis tourism guides for 150+ countries.",
    keywords: "cannabis travel, weed tourism, 420 friendly hotels, legal cannabis countries, marijuana travel guide, recreational weed regulations, budquest",
    url: "https://budquest.guide",
    image: "https://budquest.guide/og-social-share.jpg",
};

export const SEOHead = ({
    title = DEFAULT_SEO.title,
    description = DEFAULT_SEO.description,
    keywords = DEFAULT_SEO.keywords,
    url = DEFAULT_SEO.url,
    image = DEFAULT_SEO.image,
    type = "website",
}: SEOHeadProps) => {
    useEffect(() => {
        // Update document title
        document.title = title;

        // Helper to update or create meta tags
        const updateMeta = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
            let element = document.querySelector(`meta[${attribute}="${name}"]`);
            if (!element) {
                element = document.createElement("meta");
                element.setAttribute(attribute, name);
                document.head.appendChild(element);
            }
            element.setAttribute("content", content);
        };

        // Standard meta tags
        updateMeta("description", description);
        updateMeta("keywords", keywords);

        // Canonical link
        let canonical = document.querySelector("link[rel='canonical']");
        if (!canonical) {
            canonical = document.createElement("link");
            canonical.setAttribute("rel", "canonical");
            document.head.appendChild(canonical);
        }
        canonical.setAttribute("href", url);

        // Open Graph meta tags
        updateMeta("og:type", type, "property");
        updateMeta("og:url", url, "property");
        updateMeta("og:title", title, "property");
        updateMeta("og:description", description, "property");
        updateMeta("og:image", image, "property");

        // Twitter Card meta tags
        updateMeta("twitter:card", "summary_large_image");
        updateMeta("twitter:title", title);
        updateMeta("twitter:description", description);
        updateMeta("twitter:image", image);

        // Structured Data (Schema.org)
        const scriptId = "seo-structured-data";
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify([
                {
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "BudQuest",
                    "url": url,
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": `${url}/search?q={search_term_string}`,
                        "query-input": "required name=search_term_string"
                    }
                },
                {
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "BudQuest",
                    "url": url,
                    "logo": "https://budquest.guide/logo.png",
                    "sameAs": [
                        "https://twitter.com/budquestguide",
                        "https://instagram.com/budquestguide"
                    ]
                },
                {
                    "@context": "https://schema.org",
                    "@type": "TravelGuide",
                    "name": "Global Cannabis Travel Guide",
                    "url": url,
                    "description": description,
                    "publisher": {
                        "@type": "Organization",
                        "name": "BudQuest"
                    }
                }
            ]);
            document.head.appendChild(script);
        }

        // Cleanup function
        return () => {
            const existingScript = document.getElementById(scriptId);
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, [title, description, keywords, url, image, type]);

    return null;
};
