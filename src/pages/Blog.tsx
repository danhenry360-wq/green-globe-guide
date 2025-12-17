import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search, ArrowLeft, Calendar, Clock, Share2, ArrowRight,
  Sparkles, Tag, Info, TrendingUp, Shield, Users,
  MapPin, Building2, AlertCircle, Scale, Plane, Loader2
} from "lucide-react";
import greenGlobeLogo from "@/assets/global-canna-pass-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

/* ---------- FULL BLOG ARTICLES DATA ---------- */
export const BLOG_POSTS = [
  {
    id: "denver-vs-boulder-cannabis-tourists-2025",
    title: "Denver vs Boulder: Which is Better for Cannabis Tourists? (2025)",
    subtitle: "Head-to-head comparison of dispensaries, vibes, and 420-friendly stays.",
    excerpt: "Deciding between Denver and Boulder? We break down the dispensaries, culture, prices, and vibes to help you choose the perfect base for your trip.",
    date: "Dec 17, 2025",
    readTime: "10 min read",
    author: "BudQuest Team",
    avatar: "👋",
    category: "Comparison Guide",
    tags: ["Colorado", "Denver", "Boulder", "Trip Planning"],
    image: "/blog-denver-vs-boulder.png",
    content: {
      introduction: "Two iconic Colorado cities, two very different cannabis scenes. Whether you want craft quality or big-city variety, here is how to choose.",
      disclaimer: "Cannabis is for adults 21+. Limits apply. Consume responsibly.",
      sections: [],
      safetyTips: []
    }
  },
  {
    id: "first-time-dispensary-guide-colorado-2025",
    title: "First Time at a Colorado Dispensary: What to Expect (2025 Guide)",
    subtitle: "Step-by-step walkthrough of your first legal cannabis purchase.",
    excerpt: "Feeling nervous? Here is exactly what happens, step-by-step, from checking in to walking out with your first legal purchase.",
    date: "Dec 17, 2025",
    readTime: "8 min read",
    author: "BudQuest Team",
    avatar: "👋",
    category: "Beginner Guide",
    tags: ["Colorado", "Beginner", "Guide", "Dispensary"],
    image: "/blog-first-time-dispensary.png",
    content: {
      introduction: "Your first time visiting a recreational dispensary can be intimidating, but it doesn't have to be. We've helped thousands of visitors navigate their first purchase.",
      disclaimer: "Cannabis is for adults 21+. Limits apply. Consume responsibly.",
      sections: [],
      safetyTips: []
    }
  },
  {
    id: "amsterdam-vs-california-dispensaries",
    title: "Amsterdam Coffee Shops vs California Dispensaries: A Complete Comparison",
    subtitle: "Explore the key differences between Amsterdam's iconic coffee shops and California's modern dispensaries - from atmosphere and products to legal frameworks and culture.",
    excerpt: "A detailed comparison of two of the world's most famous cannabis destinations, examining what makes each experience unique for travelers.",
    date: "Nov 30, 2025",
    readTime: "15 min read",
    author: "David Chen",
    avatar: "🌍",
    category: "Comparison",
    tags: ["Amsterdam", "California", "Dispensaries", "Coffee Shops"],
    image: "/blog-amsterdam-vs-california.jpg",
    content: {
      introduction: "Amsterdam and California represent two distinct philosophies in legal cannabis retail. Amsterdam's coffee shops have operated under a tolerance policy since the 1970s, creating a laid-back, social café culture. California's dispensaries, legal since 2016 for recreation, showcase sleek, tech-forward retail experiences. This guide compares everything from atmosphere and product selection to pricing and cultural norms, helping you decide which cannabis destination suits your travel style.",
      disclaimer: "Cannabis laws differ significantly between the Netherlands and California. In Amsterdam, possession over 5g remains illegal; in California, adults 21+ can possess up to 28.5g. Neither location permits public consumption. Always verify current laws before traveling.",
      sections: [
        { title: "Legal Framework", icon: "Shield", content: "**Amsterdam**: Cannabis is technically illegal but tolerated in licensed coffee shops under the gedoogbeleid (tolerance policy). Shops cannot advertise, sell alcohol, or allow hard drugs. Maximum purchase is 5g per person per day. **California**: Fully legal for adults 21+. Licensed dispensaries are heavily regulated, tested, and taxed. Purchases up to 28.5g flower or 8g concentrates per transaction.", variant: "default" },
        { title: "Atmosphere & Experience", icon: "Building2", content: "**Amsterdam Coffee Shops**: Cozy, social spaces where you can sit, smoke, and linger. Many have bars serving coffee and snacks. Vintage décor, dim lighting, and relaxed vibes. You're buying an experience, not just a product. **California Dispensaries**: Modern retail stores resembling Apple Stores or pharmacies. Quick transactions, clinical efficiency. Some have lounges, but most are grab-and-go.", variant: "accent" },
        { title: "Product Selection", icon: "TrendingUp", content: "**Amsterdam**: Primarily flower and hash. Pre-rolls common. Edibles face restrictions. Limited concentrate options. Products are not lab-tested to US standards. **California**: Massive variety - flower, concentrates, edibles, tinctures, topicals, beverages. All products lab-tested with detailed THC/CBD percentages. Cutting-edge extracts and innovative products.", variant: "warning" },
        { title: "Pricing Comparison", icon: "Scale", content: "**Amsterdam**: Generally €8-15 per gram for quality flower. No additional taxes at point of sale. Hash often €5-12/g. **California**: $30-60+ per eighth (3.5g) before tax. Heavy taxation (25-40% total) significantly increases prices. Premium products can exceed $80/eighth. California is notably more expensive.", variant: "gold" },
        { title: "Cultural Differences", icon: "Users", content: "**Amsterdam**: Cannabis is part of café culture. Acceptable to spend hours socializing. Sharing joints with strangers is common. Locals are welcoming but appreciate discretion. **California**: Transactional retail culture. Budtenders offer consultations but it's business-focused. Less social, more consumer-oriented. Medical origins still influence professional atmosphere.", variant: "default" },
        { title: "Consumption Spaces", icon: "MapPin", content: "**Amsterdam**: Consume on-site at coffee shops. Most have comfortable seating areas. Can't take cannabis to other cafes or public spaces. **California**: Most dispensaries are retail-only - no on-site consumption. Some licensed lounges exist but are rare. Must consume in private residences. Hotels generally prohibit use.", variant: "accent" }
      ],
      safetyTips: [
        "Amsterdam: Maximum 5g purchase per day; California: 28.5g flower or 8g concentrates",
        "Neither location allows public consumption - stick to designated spaces",
        "California products are lab-tested; Amsterdam products are not",
        "Don't attempt to transport cannabis across borders from either location",
        "Amsterdam is cash-only; California accepts cards at many dispensaries",
        "California has higher prices due to heavy taxation"
      ]
    }
  },
  {
    id: "colorado-ski-resorts-cannabis",
    title: "Colorado Ski Resorts & Cannabis Guide 2025",
    subtitle: "Explore the best 420-friendly ski resorts, dispensaries near slopes, and tips for combining mountain adventures with cannabis in Colorado.",
    excerpt: "Explore the best 420-friendly ski resorts, dispensaries near slopes, and tips for combining mountain adventures with cannabis in Colorado.",
    date: "Nov 30, 2025",
    readTime: "10 min read",
    author: "Mike Thompson",
    avatar: "🎿",
    category: "Travel Guide",
    tags: ["Colorado", "Ski", "Dispensaries", "Winter"],
    image: "/blog-colorado-ski.jpg",
    content: {
      introduction: "Colorado offers a unique combination of world-class skiing and legal recreational cannabis. From Aspen to Breckenridge, this guide covers the best 420-friendly accommodations, dispensaries near popular ski resorts, and essential tips for responsibly enjoying both the slopes and cannabis during your mountain getaway.",
      disclaimer: "Cannabis is legal for adults 21+ in Colorado. However, consumption is prohibited on ski slopes, in public areas, and at most lodging. Always consume responsibly and never ski while impaired. Laws vary by municipality.",
      sections: [
        { title: "Legal Status", icon: "Shield", content: "Colorado was the first state to legalize recreational cannabis in 2012. Adults 21+ can possess up to 1 ounce and purchase from licensed dispensaries. However, ski resorts operate on federal land where cannabis remains illegal. Most mountain towns have dispensaries, but consumption areas are limited to private residences.", variant: "default" },
        { title: "Best Ski Towns with Dispensaries", icon: "MapPin", content: "**Breckenridge** - Multiple dispensaries on Main Street, 420-friendly lodges. **Aspen** - Upscale dispensaries, luxury cannabis experiences. **Telluride** - Boutique shops, craft cannabis focus. **Steamboat Springs** - Local favorites, competitive prices. **Durango** - Gateway to Purgatory, authentic mountain vibe.", variant: "accent" },
        { title: "Where to Consume", icon: "Building2", content: "Consumption on ski slopes is strictly prohibited and can result in losing your lift pass. Most hotels prohibit smoking. Look for 420-friendly vacation rentals, private condos, or designated consumption spaces. Some dispensaries offer consumption lounges. Always verify policies before booking.", variant: "warning" },
        { title: "Safety Tips for Skiing", icon: "Users", content: "Never ski while impaired - altitude intensifies effects. Consume only after your ski day ends. Stay hydrated at high altitude. Start with low doses as elevation affects tolerance. Keep cannabis secure and away from minors at family resorts.", variant: "gold" }
      ],
      safetyTips: [
        "Never ski or snowboard while impaired - it's dangerous and illegal",
        "Altitude intensifies cannabis effects - use less than at sea level",
        "Keep cannabis in original packaging with proof of purchase",
        "Don't transport cannabis to neighboring states",
        "Most lodging prohibits smoking - check policies and use edibles",
        "Stay hydrated - both altitude and cannabis cause dehydration"
      ]
    }
  },
  {
    id: "thailand-cannabis-tourism-2025",
    title: "Thailand Cannabis Tourism: What Travelers Need to Know",
    subtitle: "Complete guide to Thailand's evolving cannabis laws, best dispensaries in Bangkok and islands, and cultural tips for cannabis tourists.",
    excerpt: "Complete guide to Thailand's evolving cannabis laws, best dispensaries in Bangkok and islands, and cultural tips for cannabis tourists.",
    date: "Nov 30, 2025",
    readTime: "14 min read",
    author: "Lisa Chang",
    avatar: "🇹🇭",
    category: "International",
    tags: ["Thailand", "Asia", "Legal", "Travel"],
    image: "/blog-thailand.jpg",
    content: {
      introduction: "Thailand made history in 2022 by becoming the first Asian country to decriminalize cannabis. Since then, cannabis shops have flourished across Bangkok, Phuket, Chiang Mai, and the islands. This guide covers everything tourists need to know about legally enjoying cannabis in the Land of Smiles, from legal nuances to the best dispensaries and cultural etiquette.",
      disclaimer: "Thailand's cannabis laws are evolving rapidly and may change. Public consumption and smoking near temples/schools is prohibited. Always verify current regulations before travel. Some restrictions on THC content and edibles may apply.",
      sections: [
        { title: "Legal Framework", icon: "Shield", content: "Cannabis was removed from Thailand's narcotics list in June 2022. Adults can purchase and possess cannabis legally. However, regulations continue to evolve - extracts over 0.2% THC face restrictions, and there are ongoing debates about recreational vs. medical use. Stay updated on current laws before your trip.", variant: "default" },
        { title: "Best Areas for Cannabis", icon: "MapPin", content: "**Bangkok** - Khao San Road has dozens of shops, Sukhumvit for upscale options. **Phuket** - Beach clubs with cannabis menus, Patong dispensaries. **Chiang Mai** - Laid-back scene, wellness-focused shops. **Koh Phangan** - Full Moon Party island, beach dispensaries. **Koh Samui** - Resort-style shops, premium products.", variant: "accent" },
        { title: "Where to Consume", icon: "Building2", content: "Public smoking is prohibited, especially near temples, schools, and government buildings. Many cannabis cafes offer consumption spaces. Some hotels are 420-friendly - verify before booking. Beach consumption varies by location. Respect Thai culture and consume discreetly.", variant: "warning" },
        { title: "Cultural Etiquette", icon: "Users", content: "Thai culture values discretion and respect. Don't smoke near Buddhist temples or monks. Avoid ostentatious consumption in conservative areas. The Thai concept of 'sanuk' (fun) applies - enjoy responsibly without causing disturbance. Tipping shop staff is appreciated but not required.", variant: "gold" }
      ],
      safetyTips: [
        "Carry ID and proof of age (20+ for purchase in most shops)",
        "Avoid transporting cannabis to neighboring countries - severe penalties",
        "Start with low doses - Thai cannabis can be potent",
        "Don't drive under the influence - strict DUI laws apply",
        "Respect local customs - no consumption near temples or schools",
        "Purchase from licensed shops only - avoid street vendors"
      ]
    }
  },
  {
    id: "amsterdam-coffee-shops",
    title: "Amsterdam Coffee Shops Guide 2025",
    subtitle: "Discover the best cannabis coffee shops, local etiquette, and legal tips for enjoying Amsterdam's world-famous cannabis culture.",
    excerpt: "Discover the best cannabis coffee shops, local etiquette, and legal tips for enjoying Amsterdam's world-famous cannabis culture.",
    date: "Jan 15, 2025",
    readTime: "12 min read",
    author: "Sarah Mitchell",
    avatar: "👩‍✈️",
    category: "City Guide",
    tags: ["Netherlands", "Legal", "Travel", "Coffeeshops"],
    image: "/blog-amsterdam-new.jpg",
    content: {
      introduction: "Amsterdam has been synonymous with cannabis culture for decades. The city's unique 'tolerance policy' (gedoogbeleid) has made it a mecca for cannabis enthusiasts worldwide. This comprehensive guide covers everything from the best coffee shops to local etiquette, ensuring you have a safe and memorable experience in the Dutch capital.",
      disclaimer: "While cannabis is tolerated in licensed coffee shops, it remains technically illegal in the Netherlands. Laws change frequently. Always verify current regulations before your visit and consume responsibly.",
      sections: [
        {
          title: "Legal Status",
          icon: "Shield",
          content: "The Netherlands operates under a 'tolerance policy' where cannabis possession up to 5 grams is decriminalized for personal use. Coffee shops are licensed to sell cannabis but cannot advertise, sell alcohol, or sell to minors. The 'wietpas' (weed pass) system was introduced but later abandoned in Amsterdam. Tourists can still purchase cannabis at most coffee shops, though some may request ID proving you're 18+.",
          variant: "default"
        },
        {
          title: "Age & Purchase Requirements",
          icon: "Users",
          content: "You must be 21+ to enter coffee shops in Amsterdam (raised from 18 in 2023 for tourists). A valid passport or EU ID is required for age verification. The maximum purchase is 5 grams per person per day. Coffee shops accept cash only—ATMs are widely available. Pre-rolled joints, loose flower, hashish, and edibles are commonly available. Prices range from €8-15 per gram depending on quality.",
          variant: "default"
        },
        {
          title: "Possession Limits",
          icon: "Scale",
          content: "Personal possession limit is 5 grams. Carrying more can result in confiscation and potential fines. Growing at home is tolerated up to 5 plants for personal use, but tourists should never attempt this. Transporting cannabis outside of Amsterdam or across borders is strictly illegal and carries severe penalties including imprisonment.",
          variant: "default"
        },
        {
          title: "Where to Consume",
          icon: "MapPin",
          content: "Consumption is only permitted inside licensed coffee shops or private residences. Public consumption is technically illegal and can result in fines, especially in the city center where police actively enforce this. Many hotels are non-smoking, so check policies before booking. Some coffee shops have outdoor terraces where smoking is permitted. Never consume near schools, playgrounds, or in public transport.",
          variant: "accent"
        },
        {
          title: "Top Coffee Shops",
          icon: "Building2",
          content: "**Barney's Coffeeshop** (Haarlemmerstraat) - Award-winning strains, great breakfast menu. **The Bulldog** (Leidseplein) - Iconic chain, tourist-friendly, multiple locations. **Grey Area** (Oude Leliestraat) - American-owned, premium quality, small but legendary. **Dampkring** (Handboogstraat) - Featured in Ocean's Twelve, excellent hash selection. **Boerejongens** (Multiple locations) - 'Farmers Boys' known for organic, high-quality cannabis. **Amnesia** (Herengracht) - Upscale atmosphere, canal views, premium products.",
          variant: "default"
        },
        {
          title: "Airport & Transportation",
          icon: "Plane",
          content: "Schiphol Airport has strict no-cannabis policies. Never attempt to fly with cannabis—even domestically within the EU. Cannabis dogs patrol the airport regularly. Consuming before flights is strongly discouraged as you'll pass through security. Public transport (trams, metro, buses) prohibits cannabis use. Taxis are generally tolerant but ask first. Biking while intoxicated can result in fines.",
          variant: "warning"
        },
        {
          title: "Best Neighborhoods",
          icon: "MapPin",
          content: "**Red Light District (De Wallen)** - Highest concentration of coffee shops, touristy but iconic. **Jordaan** - Trendy, artistic neighborhood with boutique shops. **Leidseplein** - Nightlife hub, many coffee shops open late. **De Pijp** - Local favorite, Albert Cuyp Market nearby. **Haarlemmerstraat** - Less crowded, quality establishments.",
          variant: "accent"
        },
        {
          title: "Local Etiquette",
          icon: "Users",
          content: "Don't photograph inside coffee shops without permission. Tip bartenders if you buy drinks. Don't bring outside cannabis into coffee shops. Order a drink if you're staying to consume. Keep noise levels down—Amsterdam residents value peace. Don't block bike lanes while smoking. Respect the 'no hard drugs' policy strictly enforced in all establishments.",
          variant: "gold"
        }
      ],
      safetyTips: [
        "Start with low doses, especially with edibles—Amsterdam products are potent",
        "Stay hydrated and eat before consuming",
        "Don't mix cannabis with alcohol or other substances",
        "Keep valuables secure—tourist areas attract pickpockets",
        "Know your limits and have a sober friend if exploring",
        "Avoid buying from street dealers—it's illegal and often dangerous",
        "Emergency number: 112 for police, fire, or ambulance"
      ]
    }
  },
  {
    id: "california-cannabis",
    title: "California Cannabis Travel Handbook",
    subtitle: "Complete guide to California dispensaries, regulations, and the best spots for cannabis tourism in the Golden State.",
    excerpt: "Complete guide to California dispensaries, legal regulations, and the best spots for cannabis tourism in the Golden State.",
    date: "Jan 10, 2025",
    readTime: "15 min read",
    author: "James Chen",
    avatar: "🌴",
    category: "City Guide",
    tags: ["USA", "California", "Dispensaries", "Reviews"],
    image: "/blog-california-new.jpg",
    content: {
      introduction: "California pioneered legal cannabis in the United States, first with medical marijuana in 1996 and then recreational use in 2016. Today, the Golden State boasts the world's largest legal cannabis market with thousands of licensed dispensaries, innovative products, and a thriving cannabis tourism industry. From San Francisco to San Diego, this guide covers everything you need to know.",
      disclaimer: "Cannabis remains federally illegal in the United States. California state laws apply only within state borders. Never transport cannabis across state lines or onto federal property. Laws vary by city and county within California.",
      sections: [
        {
          title: "Legal Status",
          icon: "Shield",
          content: "Recreational cannabis has been legal in California since January 2018 for adults 21+. Proposition 64 established the framework for legal sales, possession, and cultivation. However, individual cities and counties can ban or restrict cannabis businesses—over 60% of California municipalities have some form of ban. Los Angeles, San Francisco, San Diego, Oakland, and Palm Springs are cannabis-friendly. Always check local ordinances.",
          variant: "default"
        },
        {
          title: "Age & Purchase Requirements",
          icon: "Users",
          content: "You must be 21+ with valid government ID (passport for international visitors). Daily purchase limits: 28.5 grams of flower, 8 grams of concentrates, or equivalent edibles. Medical patients (18+) with valid recommendation can purchase higher limits. Most dispensaries are cash-only, though some accept debit cards with fees. Expect 15-35% taxes on top of listed prices. First-time customer discounts are common—ask!",
          variant: "default"
        },
        {
          title: "Possession Limits",
          icon: "Scale",
          content: "Adults 21+ may possess up to 28.5 grams of flower and 8 grams of concentrates. At home, you may store unlimited amounts of cannabis you legally purchased or grew. Home cultivation: up to 6 plants per residence (not per person). Possession over limits is an infraction for under 1 oz over, misdemeanor for more. Gifting up to 28.5g to another adult is legal; selling without a license is a felony.",
          variant: "default"
        },
        {
          title: "Where to Consume",
          icon: "MapPin",
          content: "Public consumption is illegal statewide—this includes sidewalks, parks, beaches, and anywhere smoking tobacco is prohibited. Consumption is only legal in private residences where the owner permits it. Some cities have licensed cannabis lounges: West Hollywood's Original Cannabis Café, San Francisco's Barbary Coast. Many cannabis-friendly hotels and Airbnbs exist—search 'bud and breakfast' or '420-friendly lodging.'",
          variant: "accent"
        },
        {
          title: "Top Dispensaries by Region",
          icon: "Building2",
          content: "**Los Angeles**: MedMen (WeHo), Cookies (Melrose), LA Kush. **San Francisco**: Barbary Coast, SPARC, Harvest. **San Diego**: March and Ash, Torrey Holistics, Urbn Leaf. **Oakland**: Harborside, Magnolia Wellness, Blüm. **Palm Springs**: Coachella Valley dispensaries, Desert Hot Springs cultivation tours. Many offer delivery services—Eaze and Weedmaps are popular apps.",
          variant: "default"
        },
        {
          title: "Airport & Transportation",
          icon: "Plane",
          content: "TSA is a federal agency—cannabis is prohibited in airports and on flights, even within California. LAX technically allows up to legal limits through security, but other airports don't. Never fly with cannabis. Driving under the influence (DUI) laws apply—there's no legal THC limit, but impairment can be charged. Keep cannabis in sealed containers in the trunk when driving. Uber/Lyft policies prohibit cannabis but enforcement varies.",
          variant: "warning"
        },
        {
          title: "Best Cannabis Regions",
          icon: "MapPin",
          content: "**Emerald Triangle** (Humboldt, Mendocino, Trinity) - Legendary outdoor cultivation, farm tours. **Los Angeles** - Largest market, celebrity brands, consumption lounges. **San Francisco** - Progressive scene, historic dispensaries. **Palm Springs** - Desert retreats, 420-friendly resorts. **San Diego** - Craft cannabis, border proximity (never cross!). **Santa Cruz** - Organic focus, chill beach vibes.",
          variant: "accent"
        },
        {
          title: "Cannabis Tourism Experiences",
          icon: "Users",
          content: "Book cultivation tours in Humboldt County or Desert Hot Springs. Cannabis cooking classes in LA and SF teach infusion techniques. Yoga and cannabis retreats offer wellness experiences. Art and cannabis events happen weekly in major cities. Weedmaps and Leafly list local events. Cannabis-friendly comedy shows, concerts, and festivals are increasingly common—check 420-friendly event calendars.",
          variant: "gold"
        }
      ],
      safetyTips: [
        "California edibles are potent—standard dose is 10mg THC, start with 5mg or less",
        "Keep cannabis away from minors—heavy penalties apply",
        "Don't consume in rental cars—companies can charge cleaning fees",
        "Avoid 'trap' dispensaries without proper licensing",
        "Check Weedmaps reviews and verify licenses on cannabis.ca.gov",
        "Stay hydrated in California heat, especially if consuming",
        "Never cross into Mexico or Nevada with California cannabis"
      ]
    }
  },
  {
    id: "uruguay-legalization",
    title: "Uruguay: The First Legal Cannabis Nation",
    subtitle: "Deep dive into Uruguay's pioneering legalization model and what it means for cannabis travelers visiting South America.",
    excerpt: "Deep dive into Uruguay's pioneering legalization model and what it means for cannabis travelers visiting South America.",
    date: "Jan 5, 2025",
    readTime: "10 min read",
    author: "Emma Rodriguez",
    avatar: "🇺🇾",
    category: "Legal Updates",
    tags: ["Uruguay", "Legal", "History", "International"],
    image: "/blog-uruguay-new.jpg",
    content: {
      introduction: "In December 2013, Uruguay became the first country in modern history to fully legalize cannabis from seed to sale. Under President José Mujica, the small South American nation implemented a groundbreaking regulatory model that prioritizes public health over prohibition. While the system has unique restrictions for tourists, understanding Uruguay's approach offers valuable insights into cannabis policy worldwide.",
      disclaimer: "Uruguay's cannabis system is primarily designed for residents. Tourists face significant restrictions on legal access. Laws and regulations continue to evolve. This guide reflects information as of January 2025.",
      sections: [
        {
          title: "Legal Framework",
          icon: "Shield",
          content: "Uruguay's Law 19.172 legalized cannabis cultivation, distribution, and possession for Uruguayan citizens and permanent residents. The Institute for Regulation and Control of Cannabis (IRCCA) oversees the market. Three legal access pathways exist: pharmacy purchases, cannabis club membership, and home cultivation. Unfortunately, all three require Uruguayan residency, creating a complex situation for tourists.",
          variant: "default"
        },
        {
          title: "Tourist Access",
          icon: "Users",
          content: "Here's the reality: tourists cannot legally purchase cannabis in Uruguay. Pharmacy sales require Uruguayan ID and registration. Cannabis clubs only accept residents. Home cultivation requires residency permits. However, possession of up to 40 grams is decriminalized for everyone, and consumption is not penalized. This creates a gray area where tourists may possess cannabis without legal purchase options.",
          variant: "default"
        },
        {
          title: "Possession & Consumption",
          icon: "Scale",
          content: "All adults (18+) can possess up to 40 grams of cannabis flower. Consumption in private spaces is fully legal. Public consumption is discouraged but not heavily enforced. Driving under the influence is illegal with strict penalties. Growing up to 6 flowering plants is permitted for residents only. The focus is harm reduction rather than punishment.",
          variant: "default"
        },
        {
          title: "The Pharmacy System",
          icon: "Building2",
          content: "Registered users can purchase up to 40 grams monthly from licensed pharmacies at government-controlled prices (around $1.30 USD per gram—the world's cheapest legal cannabis). Only two strains are available: Alfa-1 (sativa-dominant) and Beta-1 (indica-dominant), both around 9% THC. The system prioritizes accessibility over variety. Pharmacies are located throughout Montevideo and major cities.",
          variant: "default"
        },
        {
          title: "Cannabis Clubs",
          icon: "Users",
          content: "Uruguay has over 200 cannabis clubs (clubes cannábicos) with 15-45 members each. Clubs can cultivate up to 99 plants collectively. Members receive higher quality and variety than pharmacies. However, membership requires Uruguayan citizenship or permanent residency. Clubs must register with IRCCA and follow strict regulations. This model inspired Spain's cannabis social clubs.",
          variant: "accent"
        },
        {
          title: "What Tourists Should Know",
          icon: "Plane",
          content: "While legal purchase isn't available, Uruguay remains cannabis-friendly. Possession is decriminalized, and consumption isn't penalized. Some tourists find cannabis through social connections—gifting is legal. Never buy from street dealers; quality and legality are questionable. The beach town of Punta del Este and capital Montevideo have relaxed atmospheres. Never attempt to transport cannabis across borders—Argentina and Brazil have strict laws.",
          variant: "warning"
        },
        {
          title: "Best Areas to Visit",
          icon: "MapPin",
          content: "**Montevideo** - Capital city, most pharmacies and clubs, vibrant nightlife. **Punta del Este** - Beach resort, international crowd, relaxed summer vibes. **Colonia del Sacramento** - Historic UNESCO site, day trip from Buenos Aires. **Cabo Polonio** - Off-grid beach community, hippie atmosphere. **Punta del Diablo** - Fishing village turned surf spot, backpacker favorite.",
          variant: "accent"
        },
        {
          title: "Cultural Context",
          icon: "Users",
          content: "Uruguay has a progressive, secular culture with strong social policies. Cannabis use is viewed as a personal choice, not a moral issue. The legalization was driven by harm reduction philosophy, not commercial interests. Uruguayans generally don't flaunt cannabis use—discretion is appreciated. The mate (yerba mate tea) culture is far more prominent than cannabis culture. Respect local norms and blend in.",
          variant: "gold"
        }
      ],
      safetyTips: [
        "Don't attempt to buy from street dealers—risks outweigh benefits",
        "Keep consumption private and discreet",
        "Never transport cannabis to Argentina or Brazil",
        "Uruguayan cannabis is lower THC than North American products",
        "Learn basic Spanish—English is less common outside tourist areas",
        "Uruguay is very safe, but use normal travel precautions",
        "Respect that the system is designed for residents, not tourism"
      ]
    }
  },
  {
    id: "canada-regulations",
    title: "Canada: Provincial Cannabis Laws Explained",
    subtitle: "Navigate provincial differences and cross-border regulations when traveling through Canada's diverse cannabis landscape.",
    excerpt: "Navigate provincial differences and cross-border regulations when traveling through Canada's diverse cannabis landscape.",
    date: "Dec 28, 2024",
    readTime: "14 min read",
    author: "Marcus Webb",
    avatar: "🍁",
    category: "Legal Updates",
    tags: ["Canada", "Legal", "Regulations", "Travel"],
    image: "/blog-canada.jpg",
    content: {
      introduction: "Canada made history on October 17, 2018, becoming the second country (after Uruguay) and first G7 nation to legalize recreational cannabis nationwide. The Cannabis Act establishes federal rules, but provinces have significant autonomy in implementation. This creates a patchwork of regulations that travelers must navigate. From British Columbia's private retailers to Quebec's government monopoly, understanding provincial differences is essential.",
      disclaimer: "While cannabis is legal throughout Canada, provincial and territorial regulations vary significantly. This guide covers key differences but cannot address every local bylaw. Always verify current rules for your specific destination. Never transport cannabis across international borders.",
      sections: [
        {
          title: "Federal Framework",
          icon: "Shield",
          content: "The Cannabis Act (Bill C-45) sets nationwide minimums: 19+ age in most provinces (18 in Alberta and Quebec), 30 grams public possession limit, and 4 plants per household for home cultivation. Edibles, extracts, and topicals became legal in October 2019 ('Cannabis 2.0'). Licensed producers must meet Health Canada standards. Provinces control retail, distribution, consumption locations, and can set stricter rules.",
          variant: "default"
        },
        {
          title: "Provincial Age Requirements",
          icon: "Users",
          content: "**18+**: Alberta, Quebec. **19+**: British Columbia, Saskatchewan, Manitoba, Ontario, New Brunswick, Nova Scotia, Prince Edward Island, Newfoundland and Labrador, Yukon, Northwest Territories, Nunavut. Quebec previously raised from 18 to 21, but courts struck this down. Always carry valid government ID—passport works for international visitors.",
          variant: "default"
        },
        {
          title: "Retail Models by Province",
          icon: "Building2",
          content: "**Private Retail**: British Columbia, Alberta, Saskatchewan, Manitoba, Ontario, Newfoundland. **Government Monopoly**: Quebec (SQDC), New Brunswick (Cannabis NB), Nova Scotia (NSLC), PEI (PEI Cannabis). **Hybrid**: Most provinces have online government sales plus physical stores. Ontario has the most private stores (1,500+). Quebec's SQDC offers lowest prices but limited selection.",
          variant: "default"
        },
        {
          title: "Possession Limits",
          icon: "Scale",
          content: "Federal maximum: 30 grams dried flower (or equivalent) in public. Equivalencies: 1g dried = 5g fresh = 15g edibles = 70g liquid = 0.25g concentrates = 1 seed. No limit on home storage of legally purchased cannabis. Quebec prohibits home cultivation entirely (challenged in courts). Other provinces allow 4 plants per residence, not per person.",
          variant: "default"
        },
        {
          title: "Where to Consume",
          icon: "MapPin",
          content: "Generally, consume where tobacco smoking is allowed—this varies significantly. **BC**: Private residences, some public spaces where smoking allowed. **Ontario**: Private residences, designated smoking areas, some patios. **Quebec**: Extremely restricted—private residences only, banned in most public spaces. **Alberta**: Private property, some public spaces. Cannabis lounges exist in Alberta and are expanding. Never consume in vehicles, even as a passenger.",
          variant: "accent"
        },
        {
          title: "Driving & Transportation",
          icon: "Plane",
          content: "Impaired driving laws are strict—Canada has per se limits of 2-5 ng/ml THC (summary offense) and 5+ ng/ml (criminal offense). Police can demand roadside saliva tests. Penalties include fines, license suspension, and criminal charges. Transport cannabis in original sealed packaging in the trunk. Never cross US border with cannabis—even to legal states. US border agents can ban Canadians for life for cannabis involvement.",
          variant: "warning"
        },
        {
          title: "Best Cities for Cannabis",
          icon: "MapPin",
          content: "**Vancouver, BC** - Progressive scene, beautiful setting, craft cannabis culture. **Toronto, ON** - Largest market, most dispensaries, diverse products. **Montreal, QC** - SQDC stores, great city but restrictive consumption laws. **Calgary, AB** - Cannabis lounges, 18+ age, business-friendly. **Halifax, NS** - East coast chill, NSLC stores. **Winnipeg, MB** - Underrated, good private retail scene.",
          variant: "accent"
        },
        {
          title: "Tips for Travelers",
          icon: "Users",
          content: "Download provincial cannabis apps (OCS, SQDC, etc.) for store locations and product info. Prices are standardized but vary by province—Alberta tends cheaper, Ontario mid-range. Licensed stores display the red cannabis symbol. Avoid unlicensed 'legacy' shops—they're illegal and products aren't tested. Edibles are capped at 10mg THC per package—lower than US products. Keep receipts as proof of legal purchase.",
          variant: "gold"
        }
      ],
      safetyTips: [
        "NEVER attempt to cross the US border with cannabis—lifetime bans are real",
        "Don't discuss cannabis use with US border agents, even past use",
        "Canadian edibles max at 10mg—adjust expectations from US products",
        "Check provincial rules before your trip—they vary significantly",
        "Keep cannabis in original packaging when traveling between provinces",
        "Don't consume in national parks—federal rules apply",
        "Use official government or licensed retail apps to find legal stores"
      ]
    }
  },
  {
    id: "spain-laws",
    title: "Spain Cannabis Scene: What You Need to Know",
    subtitle: "Understanding Barcelona's unique cannabis club culture and Spain's complex legal landscape for tourists.",
    excerpt: "Understanding Barcelona's unique cannabis club culture and Spain's complex legal landscape for tourists.",
    date: "Dec 20, 2024",
    readTime: "11 min read",
    author: "Sophie Laurent",
    avatar: "🇪🇸",
    category: "City Guide",
    tags: ["Spain", "Legal", "Barcelona", "Culture"],
    image: "/blog-spain.jpg",
    content: {
      introduction: "Spain occupies a fascinating gray zone in global cannabis policy. While not technically legal, private consumption and cultivation are decriminalized, giving rise to the famous 'cannabis social clubs' of Barcelona and beyond. These private, members-only associations operate in a legal loophole that has created Europe's most unique cannabis scene. Understanding how to navigate this system is essential for any cannabis-curious visitor.",
      disclaimer: "Cannabis remains illegal for commercial sale in Spain. Cannabis clubs operate in legal gray areas that vary by region. Catalonia (Barcelona) is most permissive; other regions have cracked down. Tourist access to clubs has become increasingly restricted. Laws can change rapidly.",
      sections: [
        {
          title: "Legal Status",
          icon: "Shield",
          content: "Spain decriminalized private cannabis use in 1974 but never legalized it. The constitution protects privacy, allowing home consumption and cultivation. Public possession and consumption remain illegal with fines of €601-30,000. No commercial sales are permitted. The 'cannabis club' model emerged from this loophole—private associations where members collectively grow and share cannabis without commercial transactions.",
          variant: "default"
        },
        {
          title: "Cannabis Club Model",
          icon: "Users",
          content: "Cannabis Social Clubs (CSCs) are non-profit associations where members pool resources to cultivate cannabis for collective personal use. Members pay fees (€20-50 annually) plus contributions for cannabis received. Clubs cannot profit, advertise, or sell to non-members. Spain has 800+ registered clubs, most in Catalonia. The model inspired similar systems in Uruguay, Belgium, and Malta.",
          variant: "default"
        },
        {
          title: "Tourist Access",
          icon: "Scale",
          content: "Here's the honest truth: tourist access has become very difficult. Barcelona cracked down in 2017-2023, closing clubs that admitted tourists too freely. Many clubs now require Spanish residency, existing member referrals, or proof of local address. Some still accept tourists but with waiting periods of 24-72 hours. Never trust street promoters offering 'instant membership'—these are often scams or illegal operations. Research legitimate clubs before arrival.",
          variant: "default"
        },
        {
          title: "Finding Legitimate Clubs",
          icon: "Building2",
          content: "Research clubs before your trip using forums like Reddit's r/Barcelona or cannabis travel sites. Legitimate clubs: require ID verification, have waiting periods, don't advertise publicly, and are located in discreet locations without prominent signage. Red flags: street promoters, instant membership, tourist-focused marketing, locations in tourist zones. Ask your accommodation host—locals often know reputable options.",
          variant: "accent"
        },
        {
          title: "Regional Differences",
          icon: "MapPin",
          content: "**Catalonia (Barcelona)**: Most clubs, most permissive historically, but increasing restrictions. **Basque Country (Bilbao, San Sebastián)**: Active scene, less tourist-focused. **Madrid**: Far fewer clubs, stricter enforcement. **Andalucía**: Conservative, limited scene. **Valencia**: Moderate scene, some tourist-friendly clubs. **Canary Islands**: Growing scene, good for winter visitors.",
          variant: "default"
        },
        {
          title: "Public Consumption & Fines",
          icon: "Plane",
          content: "Public consumption is illegal throughout Spain. Fines range from €601 minimum to €30,000 for aggravated cases. Police can issue fines on the spot. Smoking in parks, beaches, streets, or public squares all risk fines. Even rolling a joint in public can be penalized. Be extremely discreet. Consume only in private spaces—clubs, private residences, or secluded areas far from public view.",
          variant: "warning"
        },
        {
          title: "Barcelona Cannabis Scene",
          icon: "MapPin",
          content: "Barcelona remains Spain's cannabis capital despite restrictions. The Gràcia and Raval neighborhoods have the highest club concentration. Look for clubs with established reputations and years of operation. Prices in clubs: €8-15 per gram, with hash varieties also available. Many clubs offer comfortable lounge spaces, some with music, food, and events. The scene is social—clubs are gathering places, not just dispensaries.",
          variant: "accent"
        },
        {
          title: "Cultural Tips",
          icon: "Users",
          content: "Spanish cannabis culture values discretion and community. Clubs are social spaces—engage with other members. Don't take photos inside clubs without permission. Respect closing times and house rules. Tipping isn't expected but appreciated for good service. Learn basic Spanish—few club staff speak English. Don't discuss club locations publicly or on social media. The scene survives through discretion.",
          variant: "gold"
        }
      ],
      safetyTips: [
        "Never buy from street dealers—it's illegal and often poor quality",
        "Avoid tourist-trap 'clubs' with aggressive promoters",
        "Don't carry more cannabis than you need in public",
        "Be prepared for language barriers—learn basic Spanish",
        "Research specific clubs before arrival through trusted forums",
        "Don't consume in public under any circumstances",
        "Keep club memberships private—don't share locations publicly"
      ]
    }
  },
  {
    id: "microdosing-guide",
    title: "Beginner's Guide to Microdosing Cannabis",
    subtitle: "Low-dose cannabis use for wellness and productivity—learn how to microdose safely and effectively.",
    excerpt: "Low-dose cannabis use for wellness and productivity—learn how to microdose safely and effectively while traveling.",
    date: "Dec 15, 2024",
    readTime: "9 min read",
    author: "Dr. Alex Chen",
    avatar: "⚕️",
    category: "Education",
    tags: ["Wellness", "Microdosing", "Health", "Tips"],
    image: "/dest-3.jpg",
    content: {
      introduction: "Microdosing cannabis involves consuming very small amounts—typically 1-5mg of THC—to achieve subtle therapeutic benefits without significant intoxication. This approach has gained popularity among professionals, creatives, and wellness enthusiasts seeking the benefits of cannabis without impairment. Whether you're new to cannabis or seeking a more functional relationship with the plant, microdosing offers a controlled, intentional approach.",
      disclaimer: "This article is for educational purposes only and does not constitute medical advice. Cannabis affects everyone differently. Consult healthcare providers before using cannabis for medical purposes. Only use cannabis where legal.",
      sections: [
        {
          title: "What is Microdosing?",
          icon: "Info",
          content: "Microdosing means taking sub-perceptual or minimally perceptual doses of cannabis. Where a typical dose might be 10-25mg THC, a microdose is 1-5mg. The goal isn't to get 'high' but to achieve subtle effects: mild mood elevation, reduced anxiety, enhanced focus, or pain relief without cognitive impairment. Many users report being able to work, exercise, socialize, and function normally while microdosing.",
          variant: "default"
        },
        {
          title: "Benefits of Microdosing",
          icon: "Shield",
          content: "Research and anecdotal reports suggest microdosing may help with: **Anxiety relief** without sedation. **Mood enhancement** and stress reduction. **Pain management** for chronic conditions. **Focus and creativity** for work or artistic pursuits. **Sleep improvement** when taken in the evening. **Social comfort** without obvious intoxication. The key benefit is maintaining functionality while receiving therapeutic effects.",
          variant: "default"
        },
        {
          title: "Finding Your Dose",
          icon: "Scale",
          content: "Start with 1-2.5mg THC. Wait 2 hours before taking more (longer for edibles). Keep a journal tracking dose, time, effects, and duration. Increase by 0.5-1mg increments over days or weeks. Your optimal dose is where you notice subtle positive effects without impairment. Most microdosers settle between 2-5mg. CBD-inclusive products (1:1 or 2:1 CBD:THC) can provide benefits with less psychoactivity.",
          variant: "default"
        },
        {
          title: "Best Products for Microdosing",
          icon: "Building2",
          content: "**Low-dose edibles**: Many brands offer 2.5mg or 5mg portions. Look for accurately dosed products from licensed dispensaries. **Tinctures**: Allow precise dosing by the drop. Start with 1mg and adjust. **Vaporizers**: Harder to dose precisely, but one small puff from a low-THC product works. **Capsules**: Pre-measured doses, ideal for consistency. Avoid smoking for microdosing—it's difficult to control dose and harsh on lungs.",
          variant: "accent"
        },
        {
          title: "Microdosing Schedule",
          icon: "Users",
          content: "**Daily low-dose**: 1-2.5mg in the morning or as needed. Works for chronic conditions. **As-needed**: Microdose for specific situations—stressful events, creative work, social anxiety. **Evening only**: Some prefer microdosing only at night for sleep and recovery. **Cycling**: 5 days on, 2 days off to prevent tolerance. Avoid increasing dose to chase effects—that defeats the purpose. Take tolerance breaks if you notice diminishing effects.",
          variant: "default"
        },
        {
          title: "Microdosing While Traveling",
          icon: "Plane",
          content: "Only microdose in legal jurisdictions. Research local laws before traveling. Discreet products (tinctures, capsules, mints) are easiest for travel. Never fly with cannabis, even to legal destinations. Purchase locally from licensed dispensaries. Be extra cautious with dosing in unfamiliar settings. Account for time zone changes and travel fatigue—these can amplify effects. Always have regular meals and water.",
          variant: "warning"
        },
        {
          title: "Common Mistakes",
          icon: "AlertCircle",
          content: "**Taking too much**: Patience is key—wait before redosing. **Inconsistent products**: Use lab-tested products with accurate dosing. **Ignoring set and setting**: Even microdoses are affected by mood and environment. **Expecting immediate results**: Some benefits build over time. **Not tracking**: Without records, you can't optimize. **Mixing substances**: Avoid alcohol or other drugs while learning your dose.",
          variant: "default"
        },
        {
          title: "Who Should Avoid Microdosing",
          icon: "Users",
          content: "**Pregnant or breastfeeding individuals**: No safe level established. **Those with psychotic disorders**: Cannabis can exacerbate symptoms. **People on certain medications**: Consult doctors about interactions. **Those with cannabis use disorder history**: Risk of escalation. **Anyone who needs to drive or operate machinery**: Even microdoses can impair. **Under 25**: Brain development concerns. When in doubt, consult a cannabis-knowledgeable physician.",
          variant: "gold"
        }
      ],
      safetyTips: [
        "Start lower than you think necessary—1-2mg for complete beginners",
        "Never drive or operate machinery, even with microdoses",
        "Keep a detailed journal of doses and effects",
        "Use only lab-tested products from licensed sources",
        "Stay hydrated and don't skip meals",
        "Avoid mixing with alcohol or other substances",
        "If you feel too high, remember: it will pass, stay calm, hydrate"
      ]
    }
  },
  {
    id: "jamaica-ganja-culture",
    title: "Jamaica: Ganja Culture & Travel Guide 2025",
    subtitle: "Explore Jamaica's rich cannabis heritage, Rastafarian traditions, and what tourists need to know about ganja on the island.",
    excerpt: "Explore Jamaica's rich cannabis heritage, Rastafarian traditions, and what tourists need to know about ganja on the island.",
    date: "Nov 30, 2025",
    readTime: "11 min read",
    author: "Marcus Brown",
    avatar: "🇯🇲",
    category: "International",
    tags: ["Jamaica", "Caribbean", "Culture", "Travel"],
    image: "/blog-jamaica.jpg",
    content: {
      introduction: "Jamaica and cannabis are inseparable in popular imagination. The island's Rastafarian movement elevated ganja to a sacrament, and reggae music spread cannabis culture worldwide. In 2015, Jamaica decriminalized small amounts and created a framework for medical use and religious exemptions. While not fully legal, Jamaica offers a unique cannabis experience rooted in deep cultural traditions. This guide covers what travelers need to know.",
      disclaimer: "Cannabis remains technically illegal in Jamaica for recreational use. Decriminalization applies only to small amounts (2 ounces or less). Tourist access to legal dispensaries requires a medical recommendation. Laws and enforcement vary. Always respect local customs and legal boundaries.",
      sections: [
        { title: "Legal Status", icon: "Shield", content: "Jamaica's Dangerous Drugs Amendment Act (2015) decriminalized possession of up to 2 ounces (56.6 grams) of cannabis—reduced to a petty offense with a small fine. Rastafarians can use ganja for religious purposes. Medical cannabis is legal with a prescription. Cultivation of up to 5 plants for personal use is permitted. Commercial recreational sales remain illegal, though enforcement is relaxed in tourist areas.", variant: "default" },
        { title: "Tourist Access", icon: "Users", content: "Tourists can obtain a medical cannabis permit through licensed physicians at herb houses or clinics for around $10-20 USD. This allows purchase from licensed dispensaries. Many resorts have on-site herb houses. Without a permit, you may encounter informal sellers, but this remains technically illegal. Decriminalization means small amounts result in fines, not arrest, but discretion is advised.", variant: "default" },
        { title: "Where to Consume", icon: "MapPin", content: "Consumption is tolerated in private spaces, many resorts, and areas away from public view. Some licensed herb houses have consumption lounges. Public smoking is technically prohibited but enforcement varies—rural and beach areas are more relaxed than cities. Avoid smoking near schools, churches, or government buildings. Many all-inclusive resorts are cannabis-friendly—ask before booking.", variant: "accent" },
        { title: "Best Regions", icon: "Building2", content: "**Negril** - Most cannabis-friendly town, Seven Mile Beach, laid-back vibes. **Montego Bay** - Tourist hub with herb houses and resort access. **Ocho Rios** - Cruise port with nearby Rastafarian communities. **Kingston** - Capital city, Bob Marley Museum, authentic culture. **Portland** - Off the beaten path, organic farms, roots culture. **Blue Mountains** - Coffee and ganja farms, eco-tourism.", variant: "default" },
        { title: "Rastafarian Culture", icon: "Users", content: "For Rastafarians, ganja is the 'wisdom weed' used for meditation and spiritual connection. Visitors can experience authentic Rastafarian culture through community visits, reasoning sessions, and farm tours. Popular experiences include Rastafari Indigenous Village in Montego Bay and Ital (natural) cooking classes. Approach with respect—this is a living religion, not a tourist attraction.", variant: "gold" },
        { title: "Quality & Varieties", icon: "Scale", content: "Jamaica is famous for landrace sativa strains known for uplifting, creative effects. 'Lamb's Bread' (Bob Marley's favorite) and 'Jamaican Lion' are legendary. Quality from licensed sources is generally good; street quality varies widely. Prices: $3-10 USD per gram depending on source and quality. Hash and concentrates are less common than flower.", variant: "default" },
        { title: "Transportation & Safety", icon: "Plane", content: "Never attempt to leave Jamaica with cannabis—airport security is strict and penalties are severe. Don't transport cannabis between parishes in large amounts. Be cautious with informal sellers who may overcharge tourists or sell poor quality. Avoid isolated areas when purchasing. Jamaica is generally safe but use normal travel precautions. Driving under the influence is illegal.", variant: "warning" },
        { title: "Cannabis Tourism Experiences", icon: "MapPin", content: "**Herb house tours** - Visit licensed dispensaries with educational components. **Ganja farm tours** - See cultivation in Blue Mountains or rural areas. **Bob Marley experiences** - Museum in Kingston, birthplace in Nine Mile. **Cooking classes** - Learn to make cannabis-infused Jamaican cuisine. **Wellness retreats** - Yoga and ganja programs in Negril and Ocho Rios.", variant: "accent" }
      ],
      safetyTips: [
        "Obtain a medical permit for legal dispensary access",
        "Never attempt to leave Jamaica with any cannabis",
        "Be respectful when visiting Rastafarian communities",
        "Negotiate prices before purchasing to avoid overcharging",
        "Stay hydrated—tropical heat plus cannabis can dehydrate",
        "Don't drive under the influence—roads can be challenging",
        "Keep consumption discreet in public areas"
      ]
    }
  },
  {
    id: "tsa-cannabis-rules-2025",
    title: "TSA Cannabis Rules 2025: What You Can Bring Through Airport Security (By Airport)",
    subtitle: "A comprehensive guide to TSA cannabis policies, federal vs state law conflicts, and what actually happens at major US airports when cannabis is found.",
    excerpt: "The truth about flying with cannabis in 2025 - what the law says, what TSA does, and how enforcement differs dramatically between airports.",
    date: "Dec 1, 2025",
    readTime: "18 min read",
    author: "Sarah Mitchell",
    avatar: "✈️",
    category: "Legal Updates",
    tags: ["TSA", "Airport", "Legal", "Travel"],
    image: "/blog-tsa-security.jpg",
    content: {
      introduction: "Flying with cannabis is the most common dilemma for modern travelers. While 24+ states have legalized recreational use, the TSA remains a federal agency bound by prohibition laws. This creates a confusing reality where enforcement depends entirely on which airport you're in. This guide strips away the rumors to explain the specific risks at major US airports, the difference between 'legal' and 'tolerated,' and how to avoid a missed flight or a criminal record.",
      disclaimer: "Cannabis remains illegal under federal law (Schedule I). TSA agents are federal employees. This article tracks current enforcement trends but offers NO legal guarantees. The only 100% safe option is not to fly with cannabis.",
      sections: [
        {
          title: "The Federal vs State Conflict",
          icon: "Scale",
          content: "**Federal Law (TSA Jurisdiction)**: Cannabis is a Schedule I narcotic (illegal). TSA screening areas are federal territory. **State Law (Police Jurisdiction)**: In legal states (CA, CO, NY), possession is legal. **The Loophole**: TSA's job is safety, not drug enforcement. If they find weed, they must refer it to *local police*. If you are in a legal state and under the limit, local police often let you go or just confiscate it.",
          variant: "default"
        },
        {
          title: "Official TSA Policy",
          icon: "Shield",
          content: "TSA does not actively search for marijuana. Their scanners are designed for explosives and weapons. However, if they discover it during a bag check (for a water bottle or lighter), they are required to report it. **Medical Cards**: TSA does not recognize medical cards. **CBD**: FDA-approved CBD or hemp (<0.3% THC) is the ONLY federally legal exception.",
          variant: "warning"
        },
        {
          title: "High Risk Airports (Avoid)",
          icon: "AlertCircle",
          content: "**Dallas (DFW/IAH)**: Texas law is harsh. Arrests are common. **Atlanta (ATL)**: Strict enforcement, even for residue. **Miami (MIA)**: Zero tolerance, medical cards strictly scrutinized. **International Flights**: NEVER fly internationally with cannabis. This is drug trafficking and carries severe felony penalties.",
          variant: "warning"
        },
        {
          title: "Low Risk Airports (Tolerated)",
          icon: "Plane",
          content: "**Los Angeles (LAX)**: Policy explicitly allows passengers to possess up to 28.5g. TSA may still flag it, but airport police rarely cite. **Portland (PDX)**: Extremely lenient; often allows passengers to fly if under state limits. **New York (JFK/LGA)**: State police generally do not arrest for personal amounts, but confiscation is possible.",
          variant: "accent"
        },
        {
          title: "Edibles vs Flower vs Vapes",
          icon: "TrendingUp",
          content: "**Flower**: Most risky. Organic mass shows on scanners, and smell is a dead giveaway. **Edibles**: Hardest to detect. TSA is looking for bombs, not gummies. However, original packaging with THC warnings makes it obvious if searched. **Vapes**: Batteries show clearly on X-ray. If pulled for inspection, cartridges are easily identified.",
          variant: "default"
        },
        {
          title: "What Happens If You're Caught",
          icon: "Users",
          content: "1. **Confiscation**: Most common in legal states. You lose your weed, but make your flight. \n2. **Citation**: A ticket/fine ($100-$500). No arrest, but you might miss your flight. \n3. **Arrest**: Likely in illegal states (TX, FL) or for large quantities (intent to distribute). \n4. **Missed Flight**: The administrative delay often causes you to miss boarding, regardless of legal outcome.",
          variant: "gold"
        }
      ],
      safetyTips: [
        "Never fly internationally with cannabis (Felony risk)",
        "Don't bring cannabis to illegal states (Texas, Florida, etc.)",
        "Arrive early; if stopped, the delay will be significant",
        "TSA PreCheck status can be revoked for drug violations",
        "When in doubt, buy it at your destination",
        "Do not use checked bags to 'hide' it; they are randomly searched"
      ]
    }
  },
  {
    id: "colorado-420-friendly-rentals-2025",
    title: "Best 420-Friendly Vacation Rentals in Colorado 2025: Kushkations, Airbnb Alternatives & Hidden Gems",
    subtitle: "Complete comparison of luxury Kushkations properties, Bud & Breakfast platforms, and traditional Airbnb options for cannabis-friendly Colorado getaways.",
    excerpt: "The ultimate guide to booking 420-friendly vacation rentals in Colorado—from budget-friendly options to luxury mountain chalets that welcome cannabis enthusiasts.",
    date: "Dec 1, 2025",
    readTime: "16 min read",
    author: "Emma Rodriguez",
    avatar: "🏔️",
    category: "Travel Guide",
    tags: ["Colorado", "Rentals", "Accommodations", "420-Friendly"],
    image: "/blog-colorado-rentals.jpg",
    content: {
      introduction: "Colorado is the gold standard for cannabis tourism, but finding a place to smoke is harder than buying the product. Most hotels strictly ban smoking, and Airbnb hosts can be unpredictable. This guide compares the three main ways to stay: dedicated cannabis rentals (safest), 420-friendly Airbnbs (cheapest), and luxury cannabis resorts. We break down the costs, rules, and best locations so you can enjoy your vacation without the paranoia.",
      disclaimer: "Public consumption is illegal in Colorado. Property owners have the final say on smoking rules. '420-friendly' often means outdoor smoking only. Always verify the specific rules (indoor vs outdoor) before booking.",
      sections: [
        {
          title: "The 3 Types of Stays",
          icon: "Building2",
          content: "**1. Dedicated Platforms (Bud & Breakfast)**: Like Airbnb, but exclusively for cannabis users. Guaranteed friendly hosts. \n**2. Luxury Resorts (Kushkations)**: High-end homes with bongs, dab bars, and chef services included. \n**3. Traditional Rentals (Airbnb/VRBO)**: Hit or miss. You must filter carefully and ask hosts directly to avoid fines.",
          variant: "default"
        },
        {
          title: "Kushkations vs Airbnb",
          icon: "Scale",
          content: "**Kushkations**: \n• **Pros**: 100% legal indoor smoking often allowed. Luxury amenities (hot tubs, game rooms). \n• **Cons**: Expensive ($300-800/night). Limited availability. \n**Airbnb**: \n• **Pros**: Cheaper, huge selection. \n• **Cons**: Risk of 'smoking fees' if host isn't clear. Usually outdoor smoking only.",
          variant: "accent"
        },
        {
          title: "Top Locations",
          icon: "MapPin",
          content: "**Denver**: Best for city vibes and dispensary tours. Look for 'Capitol Hill' mansions. \n**Breckenridge/Aspen**: Best for ski trips. Luxury cabins are pricey but offer private mountain views. \n**Colorado Springs**: Cheaper rentals, near Garden of the Gods, but remember recreational sales are banned in city limits (must buy in Manitou Springs).",
          variant: "default"
        },
        {
          title: "Budget Breakdown",
          icon: "TrendingUp",
          content: "**Budget ($80-150)**: Private room in a shared 420-friendly house. Common on Bud & Breakfast. \n**Mid-Range ($200-400)**: Private condo or small cabin. Usually outdoor smoking only (balcony/patio). \n**Luxury ($500+)**: 'Kushkations' style large homes. Indoor vaping/smoking permitted. Chef services available.",
          variant: "gold"
        },
        {
          title: "Booking Strategy",
          icon: "Sparkles",
          content: "1. **Filter First**: On Airbnb, search for '420 friendly' in descriptions, but don't rely on it. \n2. **Message the Host**: 'Hi, is cannabis consumption allowed on the patio?' Get it in writing. \n3. **Check Cleaning Fees**: Some hosts charge $300+ cleaning fees if they smell smoke indoors. \n4. **Book Early**: The best 420 spots book out 3-6 months in advance for ski season.",
          variant: "warning"
        }
      ],
      safetyTips: [
        "Verify 'Indoor' vs 'Outdoor' smoking rules explicitly",
        "Don't smoke and drive (DUI laws are strict)",
        "Avoid smoking on balconies visible to public streets (illegal)",
        "Keep edibles away from kids/pets in rental properties",
        "Be a good guest: Ventilate rooms to avoid lingering smells",
        "Leave a review mentioning the 420-friendliness to help others"
      ]
    }
  },
  {
    id: "cannabis-dispensaries-denver",
    title: "Cannabis Dispensaries in Denver: Complete Guide 2025",
    subtitle: "Your complete guide to Denver's best cannabis shops, products, and shopping tips",
    excerpt: "Discover Denver's best cannabis dispensaries. Complete guide to top 10 shops, products, shopping tips, and laws. Plan your Denver cannabis trip.",
    date: "Dec 4, 2025",
    readTime: "15 min read",
    author: "BudQuest",
    avatar: "🏔️",
    category: "Cannabis Guides",
    tags: ["Denver", "Dispensaries", "Shopping", "Guide"],
    image: "/blog-denver-dispensaries.jpg",
    isExternalPage: true,
    externalUrl: "/blog/cannabis-dispensaries-denver",
    content: {
      introduction: "Denver is the cannabis capital of America with over 500 licensed dispensaries.",
      disclaimer: "Cannabis is legal for adults 21+ in Colorado. Always consume responsibly.",
      sections: [],
      safetyTips: []
    }
  },
  {
    id: "best-420-rentals-denver",
    title: "Best 420-Friendly Rentals in Denver: Complete Guide 2025",
    subtitle: "Find the perfect cannabis-friendly accommodation for your Denver trip",
    excerpt: "Discover Denver's top 420-friendly hotels, vacation rentals, and stays. Book verified cannabis-welcoming accommodations for your Colorado adventure.",
    date: "Dec 4, 2025",
    readTime: "12 min read",
    author: "BudQuest",
    avatar: "🏠",
    category: "Accommodation",
    tags: ["Denver", "Hotels", "420-Friendly", "Rentals"],
    image: "/blog-denver-rentals.jpg",
    isExternalPage: true,
    externalUrl: "/blog/best-420-rentals-denver",
    content: {
      introduction: "Denver offers excellent 420-friendly accommodations for cannabis travelers.",
      disclaimer: "Always verify property policies before booking.",
      sections: [],
      safetyTips: []
    }
  },
  {
    id: "420-rentals-boulder",
    title: "Best 420-Friendly Rentals in Boulder: Complete Guide 2025",
    subtitle: "Find the perfect cannabis-friendly mountain retreat near the iconic Flatirons",
    excerpt: "Discover Boulder's top 420-friendly hotels, vacation rentals, and mountain lodges. Book verified cannabis-welcoming accommodations near the Flatirons.",
    date: "Dec 4, 2025",
    readTime: "12 min read",
    author: "BudQuest",
    avatar: "🏔️",
    category: "Accommodation",
    tags: ["Boulder", "Hotels", "420-Friendly", "Rentals", "Mountain"],
    image: "/blog-boulder-rentals.jpg",
    isExternalPage: true,
    externalUrl: "/blog/best-420-rentals-boulder",
    content: {
      introduction: "Boulder offers stunning mountain lodges and vacation rentals for cannabis travelers.",
      disclaimer: "Always verify property policies before booking.",
      sections: [],
      safetyTips: []
    }
  },
  {
    id: "cannabis-dispensaries-boulder",
    title: "Cannabis Dispensaries in Boulder: Complete Guide 2025",
    subtitle: "Your complete guide to Boulder's craft cannabis scene and best dispensaries",
    excerpt: "Discover Boulder's best cannabis dispensaries. Complete guide to top shops, craft products, shopping tips, and local laws. Plan your Boulder cannabis experience.",
    date: "Dec 4, 2025",
    readTime: "10 min read",
    author: "BudQuest",
    avatar: "🏔️",
    category: "Cannabis Guides",
    tags: ["Boulder", "Dispensaries", "Shopping", "Guide"],
    image: "/blog-boulder-dispensaries.jpg",
    isExternalPage: true,
    externalUrl: "/blog/cannabis-dispensaries-boulder",
    content: {
      introduction: "Boulder offers a unique craft cannabis experience reflecting the city's health-conscious culture.",
      disclaimer: "Cannabis is legal for adults 21+ in Colorado. Always consume responsibly.",
      sections: [],
      safetyTips: []
    }
  },
  {
    id: "cannabis-dispensaries-aspen",
    title: "Best Cannabis Dispensaries in Aspen: Complete Guide 2025",
    subtitle: "Your guide to the best high-end cannabis shops in the luxury mountain town of Aspen, Colorado.",
    excerpt: "Discover Aspen's top cannabis dispensaries. Find premium flower, concentrates, and edibles for your luxury Colorado mountain getaway.",
    date: "Dec 8, 2025",
    readTime: "10 min read",
    author: "BudQuest",
    avatar: "🏔️",
    category: "Cannabis Guides",
    tags: ["Aspen", "Dispensaries", "Luxury", "Guide"],
    image: "/blog-aspen-dispensaries.jpg",
    isExternalPage: true,
    externalUrl: "/blog/cannabis-dispensaries-aspen",
    content: {
      introduction: "Aspen's cannabis scene offers a curated, boutique experience, focusing on premium products and personalized service.",
      disclaimer: "Cannabis is legal for adults 21+ in Colorado. Always consume responsibly.",
      sections: [],
      safetyTips: []
    }
  },
  {
    id: "where-can-you-smoke-weed-in-colorado-2025",
    title: "Where Can You Legally Smoke Weed in Colorado? (2025 Guide)",
    subtitle: "Stop wondering if you can smoke in public (you can't). Here's the complete guide to legal consumption spots, from private balconies to licensed lounges.",
    excerpt: "Confused about where you can legal consume cannabis in Colorado? This guide breaks down private property rules, consumption lounges, and why hotels are strictly off-limits.",
    date: "Dec 16, 2025",
    readTime: "8 min read",
    author: "BudQuest Team",
    avatar: "🏔️",
    category: "Legal Guide",
    tags: ["Colorado", "Consumption Laws", "Lounges", "Hotels", "Legal"],
    image: "/blog-colorado-consumption.png",
    isExternalPage: true,
    externalUrl: "/blog/where-can-you-smoke-weed-in-colorado-2025",
    content: {
      introduction: "",
      disclaimer: "",
      sections: [],
      safetyTips: []
    }
  },
  {
    id: "best-420-rentals-aspen",
    title: "Best 420-Friendly Rentals in Aspen: Luxury Guide 2025",
    subtitle: "Find the perfect cannabis-friendly luxury accommodation for your Aspen mountain adventure.",
    excerpt: "Discover Aspen's top 420-friendly luxury hotels, vacation rentals, and stays. Book verified cannabis-welcoming accommodations for your Colorado mountain getaway.",
    date: "Dec 8, 2025",
    readTime: "12 min read",
    author: "BudQuest",
    avatar: "🏔️",
    category: "Accommodation",
    tags: ["Aspen", "Rentals", "Hotels", "Luxury", "420-Friendly"],
    image: "/blog-aspen-rentals.jpg",
    isExternalPage: true,
    externalUrl: "/blog/best-420-rentals-aspen",
    content: {
      introduction: "Aspen's 420-friendly accommodation scene is high-end, private, and offers an unparalleled experience for the discerning cannabis traveler.",
      disclaimer: "Always verify property policies before booking.",
      sections: [],
      safetyTips: []
    }
  },
  {
    id: "cannabis-dispensaries-colorado-springs",
    title: "Cannabis Dispensaries in Colorado Springs: Medical Guide 2025",
    subtitle: "A guide for medical cardholders to the best dispensaries and products in Colorado Springs.",
    excerpt: "Your essential guide to medical cannabis dispensaries in Colorado Springs. Find top shops, products, and important legal information for cardholders.",
    date: "Dec 8, 2025",
    readTime: "10 min read",
    author: "BudQuest",
    avatar: "🏔️",
    category: "Cannabis Guides",
    tags: ["Colorado Springs", "Dispensaries", "Medical", "Guide"],
    image: "/blog-colorado-springs-dispensaries.jpg",
    isExternalPage: true,
    externalUrl: "/blog/cannabis-dispensaries-colorado-springs",
    content: {
      introduction: "Colorado Springs is unique among Colorado's major cities: recreational cannabis sales are prohibited. The city only allows medical marijuana dispensaries to operate.",
      disclaimer: "Cannabis is legal for adults 21+ in Colorado. Always consume responsibly.",
      sections: [],
      safetyTips: []
    }
  },
  {
    id: "best-420-rentals-colorado-springs",
    title: "Best 420-Friendly Rentals in Colorado Springs: Guide 2025",
    subtitle: "Find verified cannabis-friendly accommodation for your trip to the Pikes Peak region.",
    excerpt: "Discover Colorado Springs' top 420-friendly hotels, vacation rentals, and stays. Book verified cannabis-welcoming accommodations for your trip.",
    date: "Dec 8, 2025",
    readTime: "12 min read",
    author: "BudQuest",
    avatar: "🏔️",
    category: "Accommodation",
    tags: ["Colorado Springs", "Rentals", "Hotels", "420-Friendly"],
    image: "/blog-colorado-springs-rentals.jpg",
    isExternalPage: true,
    externalUrl: "/blog/best-420-rentals-colorado-springs",
    content: {
      introduction: "While the city has a unique stance on cannabis (medical-only sales), there are still verified 420-friendly accommodation options available for travelers.",
      disclaimer: "Always verify property policies before booking.",
      sections: [],
      safetyTips: []
    }
  },
  {
    id: "how-much-weed-can-you-buy-colorado-2025",
    title: "How Much Weed Can You Buy in Colorado? (2025 Guide)",
    subtitle: "Complete breakdown of Colorado's cannabis purchase limits for recreational and medical customers, including equivalency charts, possession rules, and first-time buyer tips.",
    excerpt: "In Colorado, recreational customers 21+ can buy up to 1 oz flower, 8g concentrates, or 800mg THC edibles per day. This guide covers everything first-time tourists need to know.",
    date: "Dec 16, 2025",
    readTime: "10 min read",
    author: "BudQuest",
    avatar: "🌿",
    category: "Legal Guide",
    tags: ["Colorado", "Purchase Limits", "Dispensary", "Legal", "First-Time"],
    image: "/blog-colorado-limits.png",
    isExternalPage: true,
    externalUrl: "/blog/how-much-weed-can-you-buy-colorado-2025",
    content: {
      introduction: "Colorado was the first state to legalize recreational cannabis, and it remains one of the most tourist-friendly destinations for cannabis enthusiasts. But one question comes up constantly: How much weed can you actually buy? Whether you're a first-time visitor or a returning traveler, understanding Colorado's purchase limits, possession rules, and equivalency system is essential for a stress-free experience. This comprehensive 2025 guide breaks down everything you need to know.",
      disclaimer: "Cannabis is legal for adults 21+ in Colorado. These limits apply statewide, though some municipalities may have additional restrictions. Never transport cannabis across state lines—even to other legal states. Laws are current as of December 2025 but may change.",
      sections: [],
      safetyTips: []
    }
  }
];

/* ---------- ARTICLE CARD ---------- */
const ArticleCard = ({ post, onClick }: { post: typeof BLOG_POSTS[0]; onClick: () => void }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
    onClick={onClick}
    className="group cursor-pointer h-full"
    data-article-id={post.id}
  >
    <Card className="h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 flex flex-col">
      <div className="h-48 sm:h-56 overflow-hidden relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <Badge className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-accent text-accent-foreground font-semibold text-xs">
          {post.category}
        </Badge>
      </div>

      <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground mb-2 sm:mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 sm:mb-4 flex-1">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
          {post.tags.slice(0, 2).map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs bg-background/50">
              <Tag className="w-2.5 h-2.5 mr-1" /> {tag}
            </Badge>
          ))}
        </div>

        <div className="border-t border-border/50 pt-3 sm:pt-4 flex items-center justify-between">
          <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 sm:gap-2">
            <span className="text-lg sm:text-xl">{post.avatar}</span>
            {post.author}
          </span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-accent group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Card>
  </motion.div>
);


/* ---------- ICON COMPONENT ---------- */
const IconComponent = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactNode> = {
    Shield: <Shield className="w-5 h-5 text-accent" />,
    Users: <Users className="w-5 h-5 text-accent" />,
    Scale: <Scale className="w-5 h-5 text-accent" />,
    MapPin: <MapPin className="w-5 h-5 text-accent" />,
    Building2: <Building2 className="w-5 h-5 text-accent" />,
    Plane: <Plane className="w-5 h-5 text-accent" />,
    AlertCircle: <AlertCircle className="w-5 h-5 text-red-400" />,
    Info: <Info className="w-5 h-5 text-accent" />,
    TrendingUp: <TrendingUp className="w-5 h-5 text-accent" />,
    Sparkles: <Sparkles className="w-5 h-5 text-accent" />,
  };
  return icons[name] || <Info className="w-5 h-5 text-accent" />;
};

/* ---------- ARTICLE DETAIL ---------- */
const ArticleDetail = ({ post, onBack }: { post: typeof BLOG_POSTS[0]; onBack: () => void }) => {
  const getCardVariant = (variant: string) => {
    switch (variant) {
      case "accent": return "bg-gradient-to-br from-accent/5 to-transparent border-accent/20";
      case "gold": return "bg-gradient-to-br from-gold/5 to-transparent border-gold/20";
      case "warning": return "bg-gradient-to-br from-red-500/5 to-transparent border-red-500/20";
      default: return "bg-card/50";
    }
  };

  // Find related articles based on shared tags and category
  const relatedArticles = useMemo(() => {
    return BLOG_POSTS
      .filter(article => article.id !== post.id) // Exclude current article
      .map(article => {
        // Calculate relevance score
        let score = 0;

        // Same category gets high score
        if (article.category === post.category) {
          score += 10;
        }

        // Shared tags get points
        const sharedTags = article.tags.filter(tag => post.tags.includes(tag));
        score += sharedTags.length * 5;

        return { article, score };
      })
      .filter(item => item.score > 0) // Only include articles with some relation
      .sort((a, b) => b.score - a.score) // Sort by relevance
      .slice(0, 3) // Take top 3
      .map(item => item.article);
  }, [post]);

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Back Button */}
        <div className="flex justify-between items-start mb-8">
          <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground gap-2">
            <ArrowLeft className="w-5 h-5" /> Back to Articles
          </Button>
          <Button size="icon" variant="outline" className="rounded-full">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="bg-accent text-accent-foreground font-semibold">
              {post.category}
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {post.date}
            </span>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.readTime}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
              {post.title}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">{post.subtitle}</p>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 rounded-2xl overflow-hidden"
        >
          <img src={post.image} alt={post.title} className="w-full h-64 sm:h-80 object-cover" />
        </motion.div>

        {/* Author Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <Card className="p-5 sm:p-6 bg-accent/5 border-accent/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-gold flex items-center justify-center text-xl">
                {post.avatar}
              </div>
              <div>
                <p className="font-semibold text-foreground">{post.author}</p>
                <p className="text-sm text-muted-foreground">Published {post.date}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-5 sm:p-6 bg-card/50 border-l-4 border-accent">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-accent">
              <Info className="w-5 h-5" /> Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {post.content.introduction}
            </p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
              <p className="text-xs text-amber-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span><strong>Important:</strong> {post.content.disclaimer}</span>
              </p>
            </div>
          </Card>
        </motion.section>

        {/* Content Sections */}
        <div className="space-y-6">
          {post.content.sections.map((section, index) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.05 }}
            >
              <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
                <IconComponent name={section.icon} />
                {section.title}
              </h2>
              <Card className={`p-5 sm:p-6 ${getCardVariant(section.variant)}`}>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </Card>
            </motion.section>
          ))}
        </div>

        {/* Safety Tips */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            Safety Tips & Warnings
          </h2>
          <Card className="p-5 sm:p-6 bg-gradient-to-br from-red-500/5 to-transparent border-red-500/20">
            <ul className="space-y-2">
              {post.content.safetyTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-red-400 font-bold mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 border-t border-border pt-10"
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-accent" />
              <h2 className="text-2xl md:text-3xl font-bold">
                <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Related Articles
                </span>
              </h2>
            </div>
            <p className="text-muted-foreground mb-6">Continue exploring cannabis travel guides and tips</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 + index * 0.1 }}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    // Small delay to allow scroll before content change
                    setTimeout(() => onBack(), 100);
                    setTimeout(() => {
                      const articleCard = document.querySelector(`[data-article-id="${relatedPost.id}"]`);
                      if (articleCard) {
                        (articleCard as HTMLElement).click();
                      }
                    }, 150);
                  }}
                  className="cursor-pointer group"
                >
                  <Card className="h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10">
                    <div className="h-40 overflow-hidden relative">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground font-semibold text-xs">
                        {relatedPost.category}
                      </Badge>
                    </div>

                    <div className="p-4 flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {relatedPost.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {relatedPost.readTime}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
                        {relatedPost.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-border/50">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <span className="text-base">{relatedPost.avatar}</span>
                          {relatedPost.author}
                        </span>
                        <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Back to Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-10"
        >
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to All Articles
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

/* ---------- BLOG COMPONENT ---------- */
export default function Blog() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeArticle, setActiveArticle] = useState<typeof BLOG_POSTS[0] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ["All", "City Guide", "Legal Updates", "Education"];
  const POSTS_PER_PAGE = 9;

  // Auto-open article from URL param
  useEffect(() => {
    const articleId = searchParams.get("article");
    if (articleId) {
      const article = BLOG_POSTS.find(post => post.id === articleId);
      if (article) {
        setActiveArticle(article);
        // Clear the URL param after opening
        setSearchParams({}, { replace: true });
      }
    }
  }, [searchParams, setSearchParams]);

  const filteredPosts = useMemo(() => {
    // First filter posts based on search and category
    const filtered = BLOG_POSTS.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = activeCategory === "All" || post.category === activeCategory;

      return matchesSearch && matchesCategory;
    });

    // Then sort by date (newest first)
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime(); // Descending order (newest first)
    });
  }, [searchTerm, activeCategory]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

  // Calculate pagination values
  const postsToShow = activeCategory === "All" && !searchTerm ? filteredPosts.slice(1) : filteredPosts;
  const totalPages = Math.ceil(postsToShow.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = postsToShow.slice(startIndex, endIndex);
  const totalResults = postsToShow.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Keyboard navigation for pages
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or if article detail is open
      if (activeArticle) return;
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowLeft' && currentPage > 1) {
        e.preventDefault();
        handlePageChange(currentPage - 1);
      } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
        e.preventDefault();
        handlePageChange(currentPage + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages, activeArticle]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <AnimatePresence mode="wait">
        {activeArticle ? (
          <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ArticleDetail post={activeArticle} onBack={() => setActiveArticle(null)} />
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* HERO SECTION */}
            <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background pointer-events-none" />
              <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[120px] animate-pulse" />
              <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="container mx-auto max-w-4xl text-center relative z-10"
              >
                <Badge className="mb-4 px-4 py-2 text-sm font-medium bg-accent/10 text-accent border-accent/30">
                  <Sparkles className="w-4 h-4 mr-2 inline animate-pulse" />
                  Expert Cannabis Travel Guides
                </Badge>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-4">
                  <span className="bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                    Cannabis Travel Blog
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  Your trusted source for cannabis travel guides, legal updates, and destination insights from around the world.
                </p>

                {/* SEARCH BAR */}
                <div className="max-w-xl mx-auto relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search articles, destinations, topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-6 text-base bg-card/50 border-border/50 focus:border-accent rounded-full"
                  />
                </div>
              </motion.div>
            </section>

            {/* CATEGORY FILTERS */}
            <section className="py-8 px-4">
              <div className="container mx-auto">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={activeCategory === category ? "default" : "outline"}
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-full px-5 ${activeCategory === category
                        ? "bg-accent text-accent-foreground"
                        : "hover:border-accent/50"
                        }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </section>

            {/* FEATURED ARTICLE */}
            {filteredPosts.length > 0 && activeCategory === "All" && !searchTerm && (
              <section className="py-8 px-4">
                <div className="container mx-auto">
                  <Link to={filteredPosts[0].isExternalPage && filteredPosts[0].externalUrl ? filteredPosts[0].externalUrl : `/blog/${filteredPosts[0].id}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="cursor-pointer group"
                    >
                      <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all">
                        <div className="grid md:grid-cols-2 gap-0">
                          <div className="h-64 md:h-80 overflow-hidden relative">
                            <img
                              src={filteredPosts[0].image}
                              alt={filteredPosts[0].title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/50 md:block hidden" />
                          </div>
                          <div className="p-6 sm:p-8 flex flex-col justify-center">
                            <Badge className="w-fit mb-4 bg-accent/10 text-accent border-accent/30">
                              <TrendingUp className="w-3 h-3 mr-1" /> Featured
                            </Badge>
                            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                              {filteredPosts[0].title}
                            </h2>
                            <p className="text-muted-foreground mb-4 line-clamp-2">
                              {filteredPosts[0].excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" /> {filteredPosts[0].date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" /> {filteredPosts[0].readTime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </Link>
                </div>
              </section>
            )}

            {/* ARTICLES GRID */}
            <section className="py-8 sm:py-12 px-4">
              <div className="container mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {activeCategory === "All" ? "Latest Articles" : activeCategory}
                  </h2>
                  <div className="flex flex-col items-start sm:items-end gap-1">
                    <span className="text-muted-foreground text-sm">
                      {totalResults > 0 && (
                        <>
                          Showing {startIndex + 1}-{Math.min(endIndex, totalResults)} of {totalResults} article{totalResults !== 1 ? "s" : ""}
                        </>
                      )}
                      {totalResults === 0 && "No articles"}
                    </span>
                    {totalPages > 1 && (
                      <span className="text-xs text-muted-foreground/70">
                        Use ← → keys to navigate pages
                      </span>
                    )}
                  </div>
                </div>

                {filteredPosts.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {currentPosts.map((post, i) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <ArticleCard post={post} onClick={() => {
                            if (post.isExternalPage && post.externalUrl) {
                              navigate(post.externalUrl);
                            } else {
                              setActiveArticle(post);
                            }
                          }} />
                        </motion.div>
                      ))}
                    </div>

                    {/* PAGINATION */}
                    {totalPages > 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center justify-center gap-2 mt-12"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="rounded-full px-4"
                        >
                          Previous
                        </Button>

                        <div className="flex items-center gap-1">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                            // Show first page, last page, current page, and pages around current
                            const showPage =
                              page === 1 ||
                              page === totalPages ||
                              (page >= currentPage - 1 && page <= currentPage + 1);

                            const showEllipsis =
                              (page === currentPage - 2 && currentPage > 3) ||
                              (page === currentPage + 2 && currentPage < totalPages - 2);

                            if (showEllipsis) {
                              return <span key={page} className="px-2 text-muted-foreground">...</span>;
                            }

                            if (!showPage) return null;

                            return (
                              <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => handlePageChange(page)}
                                className={`rounded-full w-10 h-10 p-0 ${currentPage === page
                                  ? "bg-accent text-accent-foreground"
                                  : "hover:border-accent/50"
                                  }`}
                              >
                                {page}
                              </Button>
                            );
                          })}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="rounded-full px-4"
                        >
                          Next
                        </Button>
                      </motion.div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-16 sm:py-20 px-4">
              <div className="container mx-auto">
                <Card className="p-8 sm:p-12 bg-gradient-to-br from-accent/10 via-card to-gold/5 border-accent/20 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <motion.img
                      src={greenGlobeLogo}
                      alt="BudQuest Logo"
                      className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                      Stay Updated on Cannabis Travel
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                      Get the latest guides, legal updates, and destination tips delivered to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="bg-background/50 border-border/50 rounded-full"
                      />
                      <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6">
                        Subscribe
                      </Button>
                    </div>
                  </motion.div>
                </Card>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
