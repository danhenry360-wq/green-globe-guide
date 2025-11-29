import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search, ArrowLeft, Calendar, Clock, Share2, ArrowRight,
  Sparkles, Eye, Heart, Tag, Info, TrendingUp, Shield, Users,
  MapPin, Building2, AlertCircle, Landmark, Scale, Plane
} from "lucide-react";

/* ---------- FULL BLOG ARTICLES DATA ---------- */
const BLOG_POSTS = [
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
    image: "/blog-amsterdam.jpg",
    views: 12400,
    likes: 3200,
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
    image: "/blog-california.jpg",
    views: 18900,
    likes: 5100,
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
    image: "/blog-uruguay.jpg",
    views: 15600,
    likes: 4300,
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
    image: "/dest-canada-toronto.jpg",
    views: 14200,
    likes: 3800,
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
    image: "/dest-2.jpg",
    views: 9800,
    likes: 2400,
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
          content: "Spanish cannabis culture values discretion and community. Clubs are social spaces—engage with other members. Don't take photos inside clubs without explicit permission. Respect closing times and house rules. Tipping isn't expected but appreciated for good service. Learn basic Spanish—few club staff speak English. Don't discuss club locations publicly or on social media. The scene survives through discretion.",
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
    views: 11300,
    likes: 2900,
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
  }
];

/* ---------- ARTICLE CARD ---------- */
const ArticleCard = ({ post, onClick }: { post: typeof BLOG_POSTS[0]; onClick: () => void }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
    onClick={onClick}
    className="group cursor-pointer h-full"
  >
    <Card className="h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 flex flex-col">
      <div className="h-48 sm:h-52 overflow-hidden relative">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground font-semibold">
          {post.category}
        </Badge>
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 2).map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs bg-background/50">
              <Tag className="w-2.5 h-2.5 mr-1" /> {tag}
            </Badge>
          ))}
        </div>

        <div className="border-t border-border/50 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{post.avatar}</span>
            <div className="text-xs">
              <p className="text-foreground font-medium">{post.author}</p>
              <p className="text-muted-foreground flex items-center gap-1">
                <Eye className="w-3 h-3" /> {(post.views / 1000).toFixed(1)}k
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
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

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 border-t border-border pt-8 flex flex-col sm:flex-row gap-4"
        >
          <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
            <Heart className="w-4 h-4" /> Like ({post.likes.toLocaleString()})
          </Button>
          <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
            <Share2 className="w-4 h-4" /> Share
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

/* ---------- BLOG COMPONENT ---------- */
export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeArticle, setActiveArticle] = useState<typeof BLOG_POSTS[0] | null>(null);

  const categories = ["All", "City Guide", "Legal Updates", "Education"];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = activeCategory === "All" || post.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

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
                      className={`rounded-full px-5 ${
                        activeCategory === category 
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
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onClick={() => setActiveArticle(filteredPosts[0])}
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
                              <Eye className="w-4 h-4" /> {(filteredPosts[0].views / 1000).toFixed(1)}k views
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </section>
            )}

            {/* ARTICLES GRID */}
            <section className="py-8 sm:py-12 px-4">
              <div className="container mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {activeCategory === "All" ? "Latest Articles" : activeCategory}
                  </h2>
                  <span className="text-muted-foreground text-sm">
                    {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {filteredPosts.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(activeCategory === "All" && !searchTerm ? filteredPosts.slice(1) : filteredPosts).map((post, i) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <ArticleCard post={post} onClick={() => setActiveArticle(post)} />
                      </motion.div>
                    ))}
                  </div>
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
                    <div className="text-5xl mb-4">🌿</div>
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
