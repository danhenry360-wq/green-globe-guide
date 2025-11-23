import React, { useState } from 'react';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Timer, AlertTriangle, Briefcase, Leaf, MapPin, Truck, Utensils, Hotel } from "lucide-react";

// Types for better scalability
interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  readTime?: string;
  author?: string;
  tags?: string[];
}

// Interface for the full article content
interface FullBlogPost extends BlogPost {
    content: string[];
    retailerRecommendations?: RetailerRecommendation[];
    hotelRecommendations?: HotelRecommendation[];
    guideSections?: GuideSection[]; // New structure for guide-style content
}

interface RetailerRecommendation {
    name: string;
    policy: string;
    menuLink: string;
    license: string;
}

interface HotelRecommendation {
    name: string;
    description: string;
    bookingLink: string;
    amenities: string[];
}

interface GuideSection {
    icon: string; // E.g., 'Leaf', 'AlertTriangle'
    title: string;
    points: (string | string[])[]; // Can be a string or a list of strings
}

// Helper function to create a clean URL slug from the title
const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
};

// --- ICON MAPPER for dynamically rendering Lucide icons ---
const IconMap = {
    'AlertTriangle': AlertTriangle,
    'Briefcase': Briefcase,
    'Leaf': Leaf,
    'MapPin': MapPin,
    'Truck': Truck,
    'Utensils': Utensils,
    'Hotel': Hotel,
};

// --- START: FULL POST DATA SOURCE (Simulating API/CMS fetch) ---
const fullPostData: FullBlogPost[] = [
    {
        title: "Is Weed Legal in California in 2025?",
        excerpt: "Complete guide to California's recreational cannabis laws, possession limits, and travel tips for tourists.",
        image: "/blog-california.jpg",
        date: "Jan 15, 2025",
        category: "Legal Guide",
        readTime: "5 min read",
        author: "Alex Morgan",
        content: [
            "California has been at the forefront of cannabis legalization, and as we move into 2025, the laws remain largely consistent with previous years, offering both residents and tourists a clear framework for recreational use.",
            "For adults 21 and over, it is legal to possess up to 28.5 grams (one ounce) of cannabis flower or up to 8 grams of concentrated cannabis. You can also grow up to six cannabis plants at home for personal use. These limits are strictly enforced, and exceeding them can lead to significant penalties.",
            "Purchasing cannabis must be done through licensed dispensaries. Look for dispensaries displaying their state license to ensure you're buying safe, tested products. Many dispensaries also offer delivery services within their operational zones."
        ],
        guideSections: [
            {
                icon: 'Briefcase',
                title: 'Possession Limits & Rules',
                points: [
                    "Adults 21+ can possess up to **1 oz (28.5g) of flower** or **8g of concentrate**.",
                    "You can grow up to **6 living plants** at home for personal use.",
                    "Public consumption results in a **$100 fine**."
                ]
            },
            {
                icon: 'AlertTriangle',
                title: 'Safety Tips & Warnings',
                points: [
                    "**Driving under influence** is DUI. Use Uber/Lyft; LAPD does sobriety checkpoints.",
                    "Only buy from **licensed dispensaries** (check Bureau of Cannabis Control website).",
                    "Beach and park enforcement (lifeguards and park rangers) will **cite for consumption**.",
                    "Some LA neighborhoods (e.g., Pasadena, Beverly Hills) have strict local ordinances – research before visiting."
                ]
            }
        ],
        retailerRecommendations: [
            { name: "The Pottery - Los Angeles", policy: "Premium dispensary in Mid-City known for its curated selection and stylish atmosphere.", menuLink: "https://thepottery.la/menu", license: "C10-0000001-LIC" },
            { name: "Barbary Coast - San Francisco", policy: "Historic San Francisco dispensary with a luxurious lounge experience.", menuLink: "https://barbarycoastdispensary.org/menu", license: "C10-0000002-LIC" }
        ]
    },
    {
        title: "Best 420-Friendly Hotels in Amsterdam",
        excerpt: "Discover the top cannabis-friendly accommodations in Amsterdam for an unforgettable experience.",
        image: "/blog-amsterdam.jpg",
        date: "Jan 10, 2025",
        category: "Travel",
        readTime: "4 min read",
        author: "Sarah Chen",
        content: [
            "Amsterdam remains a global beacon for cannabis tourism, renowned for its liberal coffee shop culture. While coffee shops are plentiful, finding truly 420-friendly accommodation can enhance your stay significantly. It’s important to distinguish between 'tolerated' use and explicit 'friendly' policies.",
            "Many hotels have strict no-smoking policies, which can include cannabis. However, a growing number of establishments are becoming more accommodating, often providing private balconies, designated smoking areas, or even specialized ventilation. Always confirm the hotel's policy directly when booking."
        ],
        guideSections: [
            {
                icon: 'Hotel',
                title: 'Consumption Rules',
                points: [
                    "Consumption is strictly limited to **private property** or the smoking area of a **licensed coffee shop**.",
                    "Public consumption, including in parks and near schools, is illegal.",
                    "Hotels that permit smoking often require it on **private balconies** or **designated rooms**."
                ]
            }
        ],
        hotelRecommendations: [
            { name: "The Bulldog Hotel Amsterdam", description: "Directly linked to the famous Bulldog Coffee Shop, this hotel is truly 420-friendly and central.", bookingLink: "https://www.bulldoghotel.com/en/", amenities: ["Designated smoking areas", "Central location", "Bar & Cafe"] },
            { name: "Smoke Palace Hotel", description: "Located near many coffee shops, offering a relaxed environment for cannabis enthusiasts.", bookingLink: "https://www.booking.com/hotel/nl/smoke-palace", amenities: ["Private rooms", "Near city center", "Friendly staff"] }
        ]
    },
    {
        title: "Uruguay Cannabis Laws: What Tourists Need to Know",
        excerpt: "Navigate Uruguay's unique cannabis regulations and discover what makes it a special destination.",
        image: "/blog-uruguay.jpg",
        date: "Jan 5, 2025",
        category: "Legal Guide",
        readTime: "6 min read",
        author: "Carlos Rodriguez",
        content: [
            "Uruguay made history as the first country to fully legalize cannabis in 2013, implementing a state-controlled market for production, distribution, and sale. However, what's legal for citizens isn't always available to tourists.",
            "For non-residents, purchasing cannabis from pharmacies or registered clubs is not permitted. The law explicitly limits sales to **Uruguayan citizens and permanent residents** who are registered with the government. This means tourists cannot legally buy cannabis through these official channels.",
            "The best way to experience cannabis in Uruguay as a tourist is through **private social invitations** or 420-friendly private accommodations where local hosts might share. Always respect local customs and laws."
        ],
        guideSections: [
            {
                icon: 'Briefcase',
                title: 'Key Tourist Restrictions',
                points: [
                    "**Tourists CANNOT legally purchase** cannabis from pharmacies or registered clubs.",
                    "Personal possession and consumption are **tolerated in private** residences.",
                    "**Exporting cannabis** from Uruguay is strictly prohibited."
                ]
            },
            {
                icon: 'AlertTriangle',
                title: 'Safety Tips',
                points: [
                    "Avoid black market purchases.",
                    "Do not attempt to sell or share cannabis with locals who are not registered users.",
                    "Consumption in public spaces is generally discouraged."
                ]
            }
        ],
        retailerRecommendations: [
            { name: "Uruguay Cannabis Tour Guides", policy: "Connects tourists with local experts for educational insights into cannabis culture (no sales).", menuLink: "https://www.example.com/uruguay-tours", license: "N/A - Information Service" }
        ]
    },
    // ... other fullPostData entries (kept for context)
    {
        title: "Dispensaries Near LAX: The Ultimate Guide for Arrivals",
        excerpt: "Just landed in LA? Find out which verified dispensaries are closest to the airport and offer the quickest pickup.",
        image: "/blog-lax-dispensary.jpg",
        date: "Feb 5, 2025",
        category: "Local LA",
        readTime: "3 min read",
        author: "Alex Morgan",
        content: [
            "Welcome to Los Angeles! Landing at **LAX** can be overwhelming, but finding a legal, verified dispensary shouldn't be. Your first priority should be safety and compliance. Remember that cannabis consumption is **illegal in public places** in California, including federal property like the airport. Do not consume in your rental car or airport parking lot.",
            "Our guide focuses on locations in **Hawthorne and Inglewood**, which are just outside the immediate airport radius and offer quick access via ride-share. These retailers are perfect for a fast stop before heading to your 420-friendly accommodation. Always have your **valid government ID** ready—tourists must show an ID confirming they are 21 or older.",
            "We highly recommend checking the live menus before you go. Prices and inventory change frequently, and pre-ordering online is the fastest way to get in and out, minimizing your travel downtime."
        ],
        retailerRecommendations: [
            { name: "MedMen LAX", policy: "This location is the **closest major dispensary** to the airport and the rental car center area. Perfect for a quick, efficient purchase on your way out of the area.", menuLink: "https://www.medmen.com/menu/lax", license: "C10-0000123-LIC" },
            { name: "The Artist Tree - Hawthorne", policy: "A great stop if you are heading south toward Orange County or are looking for a **wider variety** of local California flower strains. Excellent customer service.", menuLink: "https://www.leafly.com/dispensary/artist-tree-hawthorne", license: "C10-0000456-LIC" },
             { name: "Cookies Inglewood", policy: "Known for its **powerful brand name** and exclusive genetics. A solid choice for experienced users who know what strains they are looking for.", menuLink: "https://weedmaps.com/dispensaries/cookies-inglewood", license: "C10-0000789-LIC" }
        ]
    },
    {
        title: "LA's Best Edibles: Shopping for First-Timers & Low-Dose Users",
        excerpt: "A guide to finding safe, tested, and enjoyable edibles in Los Angeles, including dosage tips and menu links.",
        image: "/blog-la-edibles.jpg",
        date: "Feb 1, 2025",
        category: "Strains",
        readTime: "6 min read",
        author: "Jamie Taylor",
        content: [
            "Los Angeles is a hub for innovative cannabis edibles, offering a vast array of options for every preference. For first-timers and those new to edibles, starting with a low dose is crucial to ensure a positive experience.",
            "The golden rule for edibles is 'start low and go slow.' A typical beginner dose is 2.5-5mg of THC. It can take anywhere from 30 minutes to 2 hours to feel the full effects, so resist the urge to take more too quickly.",
            "Look for edibles from licensed dispensaries that provide clear dosing information and are tested for potency and purity. Popular options include gummies, chocolates, infused beverages, and baked goods. Always check the packaging for the exact THC content per serving.",
            "Many LA dispensaries offer a wide selection of low-dose edibles specifically designed for controlled consumption. Don't hesitate to ask your budtender for recommendations tailored to your experience level. They are a great resource for navigating the extensive product offerings.",
            "Remember to store edibles safely and out of reach of children and pets. The effects of edibles can be more intense and longer-lasting than inhaled cannabis, so plan your environment accordingly. Enjoy the journey responsibly!"
        ],
        retailerRecommendations: [
            { name: "Sweet Flower - Arts District", policy: "Known for its extensive edible selection and knowledgeable staff in a vibrant neighborhood.", menuLink: "https://sweetflower.com/pages/arts-district-menu", license: "C10-0000420-LIC" },
            { name: "ERBA Markets - Beverly Hills", policy: "Offers a curated selection of premium edibles, perfect for discerning customers.", menuLink: "https://erbabevelyhills.com/menu", license: "C10-0000555-LIC" }
        ]
    },
    {
        title: "The Night Owl Guide: Finding Dispensaries Open After 10 PM in Hollywood",
        excerpt: "Everything you need to know about late-night cannabis shopping and legal delivery options across Hollywood and WeHo.",
        image: "/blog-hollywood-nightlife.jpg",
        date: "Jan 28, 2025",
        category: "Local LA",
        readTime: "4 min read",
        author: "Sarah Chen",
        content: [
            "Hollywood and West Hollywood are known for their vibrant nightlife, and sometimes, the desire for cannabis hits after most dispensaries have closed. While many dispensaries close around 9-10 PM, a few gems offer later hours or reliable delivery services to cater to the night owls.",
            "Finding a dispensary open past 10 PM requires a bit of planning. It's always best to check their online menus (via Weedmaps, Leafly, or their direct website) for the most up-to-date operating hours before you head out. Call ahead if you're unsure.",
            "Several dispensaries in and around Hollywood and WeHo cater to late-night customers. Many also offer legal cannabis delivery, which can be a convenient option if you're settled in for the evening. Ensure the delivery service is licensed and that you have valid ID ready upon delivery.",
            "Remember that even with late hours, sales typically cut off around 9:45 PM for in-store purchases and deliveries to comply with state regulations. Always complete your transaction before midnight.",
            "For those exploring Hollywood's post-activity scene, having access to these later options ensures your experience is seamless. Whether you're unwinding after a show or enjoying a late-night stroll, responsible and legal access is key."
        ],
        retailerRecommendations: [
            { name: "Essence WeHo", policy: "Open late with a wide selection, conveniently located in West Hollywood.", menuLink: "https://essence.la/weho-menu", license: "C10-0000678-LIC" },
            { name: "Mankind Dispensary - Hollywood", policy: "Offers competitive pricing and often has late-night deals, check their menu for current hours.", menuLink: "https://mankindcannabis.com/hollywood-menu", license: "C10-0000789-LIC" }
        ]
    },
    { title: "Top 10 Cannabis Strains for Creative Work", excerpt: "Explore the best sativa strains that can enhance your creativity and focus.", image: "/blog-strains.jpg", date: "Dec 28, 2024", category: "Strains", readTime: "7 min read", author: "Jamie Taylor", tags: ["strains", "sativa", "creativity", "productivity"] , content: ["Full article content is coming soon for Top 10 Cannabis Strains for Creative Work.", "Stay tuned for an in-depth look at strains that can spark your imagination and boost focus."]},
    { title: "Cannabis and Meditation: A Perfect Pairing", excerpt: "How incorporating cannabis into your meditation practice can deepen your mindfulness experience.", image: "/blog-meditation.jpg", date: "Dec 22, 2024", category: "Wellness", readTime: "8 min read", author: "Maya Patel", tags: ["wellness", "meditation", "mindfulness", "health"] , content: ["Full article content is coming soon for Cannabis and Meditation: A Perfect Pairing.", "Discover how mindfulness and cannabis can work together for enhanced well-being."]},
    { title: "420-Friendly Activities in Denver", excerpt: "From cannabis tours to consumption-friendly events, discover what to do in the Mile High City.", image: "/blog-denver.jpg", date: "Dec 18, 2024", category: "Travel", readTime: "5 min read", author: "Mike Johnson", tags: ["denver", "activities", "tours", "colorado"] , content: ["Full article content is coming soon for 420-Friendly Activities in Denver.", "Get ready to explore the Mile High City's best cannabis experiences."]},

];
// --- END: FULL POST DATA SOURCE ---

// The list of all posts (used for the grid view)
const blogPosts: BlogPost[] = [
    { title: "Is Weed Legal in California in 2025?", excerpt: "Complete guide to California's recreational cannabis laws, possession limits, and travel tips for tourists.", image: "/blog-california.jpg", date: "Jan 15, 2025", category: "Legal Guide", readTime: "5 min read", author: "Alex Morgan", tags: ["california", "legal", "travel", "recreational"] },
    { title: "Best 420-Friendly Hotels in Amsterdam", excerpt: "Discover the top cannabis-friendly accommodations in Amsterdam for an unforgettable experience.", image: "/blog-amsterdam.jpg", date: "Jan 10, 2025", category: "Travel", readTime: "4 min read", author: "Sarah Chen", tags: ["amsterdam", "hotels", "accommodation", "coffee-shops"] },
    { title: "Uruguay Cannabis Laws: What Tourists Need to Know", excerpt: "Navigate Uruguay's unique cannabis regulations and discover what makes it a special destination.", image: "/blog-uruguay.jpg", date: "Jan 5, 2025", category: "Legal Guide", readTime: "6 min read", author: "Carlos Rodriguez", tags: ["uruguay", "legal", "south-america", "regulations"] },
    { title: "Top 10 Cannabis Strains for Creative Work", excerpt: "Explore the best sativa strains that can enhance your creativity and focus.", image: "/blog-strains.jpg", date: "Dec 28, 2024", category: "Strains", readTime: "7 min read", author: "Jamie Taylor", tags: ["strains", "sativa", "creativity", "productivity"] },
    { title: "Cannabis and Meditation: A Perfect Pairing", excerpt: "How incorporating cannabis into your meditation practice can deepen your mindfulness experience.", image: "/blog-meditation.jpg", date: "Dec 22, 2024", category: "Wellness", readTime: "8 min read", author: "Maya Patel", tags: ["wellness", "meditation", "mindfulness", "health"] },
    { title: "420-Friendly Activities in Denver", excerpt: "From cannabis tours to consumption-friendly events, discover what to do in the Mile High City.", image: "/blog-denver.jpg", date: "Dec 18, 2024", category: "Travel", readTime: "5 min read", author: "Mike Johnson", tags: ["denver", "activities", "tours", "colorado"] },
    { title: "Dispensaries Near LAX: The Ultimate Guide for Arrivals", excerpt: "Just landed in LA? Find out which verified dispensaries are closest to the airport and offer the quickest pickup.", image: "/blog-lax-dispensary.jpg", date: "Feb 5, 2025", category: "Local LA", readTime: "3 min read", author: "Alex Morgan", tags: ["LAX", "los-angeles", "airport", "dispensary"] },
    { title: "LA's Best Edibles: Shopping for First-Timers & Low-Dose Users", excerpt: "A guide to finding safe, tested, and enjoyable edibles in Los Angeles, including dosage tips and menu links.", image: "/blog-la-edibles.jpg", date: "Feb 1, 2025", category: "Strains", readTime: "6 min read", author: "Jamie Taylor", tags: ["edibles", "low-dose", "safety", "LA"] },
    { title: "The Night Owl Guide: Finding Dispensaries Open After 10 PM in Hollywood", excerpt: "Everything you need to know about late-night cannabis shopping and legal delivery options across Hollywood and WeHo.", image: "/blog-hollywood-nightlife.jpg", date: "Jan 28, 2025", category: "Local LA", readTime: "4 min read", author: "Sarah Chen", tags: ["hollywood", "late-night", "delivery", "weho"] },
];

// --- NEW COMPONENT: Guide Section Card ---
const GuideSectionCard = ({ icon, title, points }: GuideSection) => {
    const IconComponent = IconMap[icon as keyof typeof IconMap] || Leaf;

    return (
        <div className="bg-card p-5 rounded-lg border border-border/50 space-y-3">
            <h3 className="flex items-center text-lg font-semibold text-foreground">
                <IconComponent className="w-5 h-5 mr-2 text-accent" />
                {title}
            </h3>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                {points.map((point, index) => (
                    // Handle nested lists or simple strings
                    <li key={index} className="text-sm">
                        {Array.isArray(point) ? (
                            <>
                                {point[0]}
                                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                                    {point.slice(1).map((subPoint, subIndex) => (
                                        <li key={subIndex} className="text-xs text-muted-foreground/80">{subPoint}</li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            point
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};


const BlogPostDetail = ({ slug, onBack }: { slug: string | null, onBack: () => void }) => {
    if (!slug) return null;

    const post = fullPostData.find(p => slugify(p.title) === slug);
    const originalPost = blogPosts.find(p => slugify(p.title) === slug);
    const displayPost = post || originalPost;

    if (!displayPost) return null;

    const content = post?.content || ["The full article content is coming soon! Check back later for details on this popular topic.", "In the meantime, feel free to browse our other guides or return to the list."];
    const guideSections = post?.guideSections || [];
    const retailerRecommendations = post?.retailerRecommendations || [];
    const hotelRecommendations = post?.hotelRecommendations || [];


    return (
        <main className="pt-24 sm:pt-28 pb-16 sm:pb-20">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                
                {/* Back Button */}
                <button onClick={onBack} className="text-sm text-accent hover:text-accent-foreground mb-8 flex items-center">
                    &larr; Back to all Articles
                </button>
                
                {/* Header and Metadata */}
                <header className="text-center mb-10">
                    <Badge className="bg-primary/10 text-primary border-primary/30 mb-4">{displayPost.category}</Badge>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">{displayPost.title}</h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{displayPost.excerpt}</p>
                    
                    {/* Meta Line */}
                    <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground mt-4 flex-wrap">
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-accent" /> <time dateTime={displayPost.date}>{displayPost.date}</time></span>
                        <span className="flex items-center gap-1"><Timer className="w-4 h-4 text-accent" /> {displayPost.readTime}</span>
                        <span>By {displayPost.author}</span>
                    </div>
                </header>
                
                {/* Featured Image */}
                <div className="aspect-video bg-muted overflow-hidden rounded-lg mb-10">
                    <img src={displayPost.image} alt={displayPost.title} className="w-full h-full object-cover" />
                </div>

                {/* Article Content */}
                <article className="max-w-none text-foreground space-y-6">
                    {content.map((paragraph, index) => (
                        <p key={index} className="text-lg leading-relaxed">{paragraph}</p>
                    ))}
                </article>

                {/* --- Guide Sections (New BudQuest Style) --- */}
                {guideSections.length > 0 && (
                    <section className="mt-12 space-y-6">
                        <h2 className="text-3xl font-bold pt-6 text-foreground">🚨 Quick Guide: Key Rules</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {guideSections.map((section, index) => (
                                <GuideSectionCard key={index} {...section} />
                            ))}
                        </div>
                    </section>
                )}
                
                {/* Legal Notice - Style replicated from image_dd3fef.png */}
                <div className="mt-12 p-5 bg-card border border-amber-500/50 rounded-lg text-sm">
                    <h3 className="text-lg font-bold text-amber-500 mb-2">Important Legal Notice</h3>
                    <p className="text-muted-foreground">
                        Information is educational only and laws change frequently. Last updated: November 23, 2025. Always verify current laws with official sources before traveling or making any legal decisions.
                    </p>
                </div>

                {/* Retailer Recommendations (Monetization Section) */}
                {retailerRecommendations.length > 0 && (
                    <section className="mt-12">
                        <hr className="my-10 border-border/50" />
                        <h2 className="text-3xl font-bold mb-6 text-foreground">🛍️ Verified Retailers Mentioned</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {retailerRecommendations.map((retailer, index) => (
                                <Card key={index} className="bg-gradient-card p-6 border border-border/50 shadow-lg flex flex-col">
                                    <h3 className="text-xl font-semibold mb-2 text-accent">{retailer.name}</h3>
                                    <p className="text-muted-foreground text-sm mb-4 flex-1">{retailer.policy}</p>
                                    
                                    <a
                                        href={retailer.menuLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                                    >
                                        View Live Menu & Order
                                    </a>
                                    
                                    <div className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border/30">
                                        <Badge variant="secondary" className="bg-green-100/10 text-green-400 border-green-400/30">
                                            Verified License
                                        </Badge>
                                        <span className="ml-2">CA DCC: **{retailer.license}**</span>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {/* Hotel Recommendations */}
                {hotelRecommendations.length > 0 && (
                    <section className="mt-12">
                        <hr className="my-10 border-border/50" />
                        <h2 className="text-3xl font-bold mb-6 text-foreground">🏨 420-Friendly Hotels</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {hotelRecommendations.map((hotel, index) => (
                                <Card key={index} className="bg-gradient-card p-6 border border-border/50 shadow-lg flex flex-col">
                                    <h3 className="text-xl font-semibold mb-2 text-accent">{hotel.name}</h3>
                                    <p className="text-muted-foreground text-sm mb-4 flex-1">{hotel.description}</p>
                                    
                                    <div className="mb-4">
                                        <p className="text-xs font-semibold text-foreground mb-1">Amenities:</p>
                                        <ul className="list-disc list-inside text-xs text-muted-foreground">
                                            {hotel.amenities.map((amenity, idx) => (
                                                <li key={idx}>{amenity}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <a
                                        href={hotel.bookingLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors mt-auto"
                                    >
                                        Book Now
                                    </a>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
};


const Blog = () => {
    const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);

    const getGridColumns = () => {
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
    };

  // Blog post card component for reusability
  const BlogPostCard = ({ post, index }: { post: BlogPost; index: number }) => {
        const handleCardClick = () => {
            const slug = slugify(post.title);
            setSelectedPostSlug(slug);
        };

        return (
            <Card 
                className="overflow-hidden bg-gradient-card border-border/50 hover:border-accent/50 hover:shadow-glow-subtle transition-all duration-300 cursor-pointer group h-full flex flex-col"
                role="article"
                aria-label={`Blog post: ${post.title}`}
                onClick={handleCardClick}
            >
                <div className="aspect-video bg-muted overflow-hidden flex-shrink-0">
                    <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading={index < 3 ? "eager" : "lazy"}
                    />
                </div>
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <Badge 
                            variant="outline" 
                            className="text-xs bg-primary/5"
                            aria-label={`Category: ${post.category}`}
                        >
                            {post.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground flex-nowrap">
                            <Calendar className="w-3 h-3 flex-shrink-0 text-accent" aria-hidden="true" />
                            <time dateTime={post.date}>{post.date}</time>
                        </div>
                        {post.readTime && (
                            <span className="text-xs text-muted-foreground ml-auto flex-shrink-0">
                                {post.readTime}
                            </span>
                        )}
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-3">
                        {post.excerpt}
                    </p>

                    {post.author && (
                        <div className="mt-4 pt-3 border-t border-border/50">
                            <p className="text-xs text-muted-foreground">
                                By {post.author}
                            </p>
                        </div>
                    )}
                </div>
            </Card>
        );
    };

    // Conditional Rendering Logic
    if (selectedPostSlug) {
        return (
            <div className="min-h-screen bg-background">
                <Navigation />
                <BlogPostDetail 
                    slug={selectedPostSlug} 
                    onBack={() => setSelectedPostSlug(null)} 
                />
                <Footer />
            </div>
        );
    }
    
    // Default Blog List View
    return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 sm:pt-28 pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Header Section */}
          <section className="text-center mb-12 sm:mb-16 px-2">
            <Badge 
              className="bg-accent/20 text-accent border-accent/30 mb-4 text-sm"
              aria-label="Blog section"
            >
              Blog
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-foreground leading-tight">
              Cannabis Travel Insights
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Expert guides, legal updates, and travel tips for cannabis enthusiasts worldwide.
            </p>
          </section>

          {/* Blog Posts Grid */}
          <section aria-label="Blog posts" className="mb-12">
            <div className={getGridColumns()}>
              {blogPosts.map((post, index) => (
                <BlogPostCard 
                  key={`${post.title}-${index}`}
                  post={post}
                  index={index}
                />
              ))}
            </div>
          </section>

          {/* Load More Section - For future pagination */}
          <section className="text-center" aria-label="Load more posts">
            <button
              className="px-6 sm:px-8 py-3 bg-accent text-accent-foreground rounded-full font-semibold hover:bg-accent/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              onClick={() => {/* Pagination logic to be implemented */}}
              aria-label="Load more blog posts"
            >
              Load More Articles
            </button>
            <p className="text-sm text-muted-foreground mt-4">
              Showing {blogPosts.length} of 24 articles
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
