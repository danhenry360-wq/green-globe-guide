import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, ExternalLink, Globe, Building, Compass, Map } from "lucide-react";
import { useState } from "react";

const Hotels = () => {
  const [activeTab, setActiveTab] = useState("hotels");
  
  const guides = [
    {
      id: 1,
      icon: Building,
      title: "USA Guide",
      description: "State-by-state regulations & 420-friendly hotels",
      stats: ["120+ Cities", "50 States"],
      color: "blue"
    },
    {
      id: 2,
      icon: Globe,
      title: "World Guide",
      description: "Global cannabis-friendly travel destinations",
      stats: ["300+ Destinations", "94% Coverage"],
      color: "green"
    }
  ];

  const hotels = [
    {
      id: 1,
      name: "Green Valley Resort",
      city: "Denver",
      state: "CO",
      rating: 4.8,
      is_420_friendly: true,
      policies: "Cannabis consumption allowed in designated areas. Pet-friendly rooms available.",
      website: "https://example.com"
    },
    {
      id: 2,
      name: "Leaf & Rest Boutique",
      city: "Los Angeles",
      state: "CA",
      rating: 4.7,
      is_420_friendly: true,
      policies: "Complimentary smoking lounge. 24-hour room service.",
      website: "https://example.com"
    },
    {
      id: 3,
      name: "Mountain High Lodge",
      city: "Portland",
      state: "OR",
      rating: 4.9,
      is_420_friendly: true,
      policies: "Private balconies perfect for consumption. Eco-friendly amenities.",
      website: "https://example.com"
    },
    {
      id: 4,
      name: "Urban Chill Hotel",
      city: "Seattle",
      state: "WA",
      rating: 4.6,
      is_420_friendly: true,
      policies: "420-friendly suites with premium ventilation systems.",
      website: "https://example.com"
    },
    {
      id: 5,
      name: "Pacific Retreat",
      city: "San Francisco",
      state: "CA",
      rating: 4.8,
      is_420_friendly: true,
      policies: "Rooftop lounge for guests. Wellness packages available.",
      website: "https://example.com"
    },
    {
      id: 6,
      name: "Desert Oasis Inn",
      city: "Phoenix",
      state: "AZ",
      rating: 4.5,
      is_420_friendly: true,
      policies: "Poolside relaxation zones. Cannabis concierge service.",
      website: "https://example.com"
    }
  ];

  const tours = [
    {
      id: 1,
      name: "Cannabis City Tour",
      city: "Denver, CO",
      duration: "4 hours",
      rating: 4.8,
      price: "$89"
    },
    {
      id: 2,
      name: "Dispensary Hop Experience",
      city: "Los Angeles, CA",
      duration: "6 hours",
      rating: 4.7,
      price: "$129"
    },
    {
      id: 3,
      name: "420-Friendly Nature Walk",
      city: "Portland, OR",
      duration: "3 hours",
      rating: 4.9,
      price: "$79"
    },
    {
      id: 4,
      name: "Strain Tasting Tour",
      city: "Seattle, WA",
      duration: "5 hours",
      rating: 4.6,
      price: "$99"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="pt-12 pb-8 px-3 sm:px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">

          {/* HEADER */}
          <div className="max-w-3xl mx-auto mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 leading-tight text-white">
              420-Friendly Stays & Experiences
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-400">
              Verified cannabis-friendly accommodations and tours worldwide.
            </p>
          </div>

          {/* GUIDES SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {guides.map((guide) => {
              const IconComponent = guide.icon;
              const bgColor = guide.color === "blue" ? "bg-blue-900/30" : "bg-green-900/30";
              const iconColor = guide.color === "blue" ? "text-blue-400" : "text-green-400";
              
              return (
                <Card 
                  key={guide.id}
                  className="p-4 sm:p-5 hover:shadow-md transition-all cursor-pointer border border-gray-700 bg-gray-900/50 hover:bg-gray-800/50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`${bgColor} p-2 rounded-lg flex-shrink-0`}>
                      <IconComponent className={`h-5 w-5 sm:h-6 sm:w-6 ${iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold mb-0.5 text-white">{guide.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-400 mb-1 line-clamp-1">
                        {guide.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-1 text-xs text-gray-500">
                        {guide.stats.map((stat, idx) => (
                          <span key={idx}>
                            {stat}
                            {idx < guide.stats.length - 1 && <span className="mx-1">•</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* TABS */}
          <div className="mb-5">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                { id: "hotels", label: "Hotels", icon: Building },
                { id: "tours", label: "Tours", icon: Compass },
                { id: "map", label: "Interactive Map", icon: Map }
              ].map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? "bg-green-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <TabIcon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* HOTELS TAB */}
          {activeTab === "hotels" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {hotels.map((hotel) => (
                <Card
                  key={hotel.id}
                  className="overflow-hidden hover:shadow-lg transition-all rounded-xl flex flex-col border border-gray-700 bg-gray-900/50 hover:bg-gray-800/50"
                >
                  <div className="aspect-video bg-gradient-to-br from-green-900/30 to-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />
                  </div>

                  <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1">
                    <div className="flex items-start justify-between gap-2 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold leading-tight line-clamp-1 flex-1 text-white">
                        {hotel.name}
                      </h3>
                      {hotel.is_420_friendly && (
                        <Badge className="bg-green-600 text-white whitespace-nowrap flex-shrink-0 text-xs">
                          420 Friendly
                        </Badge>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-gray-400 line-clamp-1">
                      {hotel.city}, {hotel.state}
                    </p>

                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                      <span className="text-sm font-medium text-white">{hotel.rating}</span>
                    </div>

                    {hotel.policies && (
                      <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 flex-1">
                        {hotel.policies}
                      </p>
                    )}

                    {hotel.website && (
                      <a
                        href={hotel.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm text-green-400 hover:text-green-300 mt-1"
                      >
                        Visit Website <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* TOURS TAB */}
          {activeTab === "tours" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {tours.map((tour) => (
                <Card
                  key={tour.id}
                  className="overflow-hidden hover:shadow-lg transition-all rounded-xl flex flex-col border border-gray-700 bg-gray-900/50 hover:bg-gray-800/50"
                >
                  <div className="aspect-square bg-gradient-to-br from-green-900/30 to-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Compass className="h-10 w-10 text-green-400" />
                  </div>

                  <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1">
                    <h3 className="text-base font-semibold leading-tight line-clamp-2 text-white">
                      {tour.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-400 line-clamp-1">
                      {tour.city}
                    </p>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{tour.duration}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-white">{tour.rating}</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-2 border-t border-gray-700">
                      <p className="text-lg font-bold text-green-400">{tour.price}</p>
                      <Button className="w-full mt-2 h-8 text-xs bg-green-600 hover:bg-green-700 text-white">
                        Book Tour
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* MAP TAB */}
          {activeTab === "map" && (
            <Card className="p-4 md:p-6 overflow-hidden border border-gray-700 bg-gray-900/50">
              <div className="w-full h-96 md:h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-700">
                <div className="text-center px-4">
                  <Map className="h-12 w-12 mx-auto text-green-400 mb-3" />
                  <p className="text-gray-200 font-medium mb-2">Interactive Map</p>
                  <p className="text-xs sm:text-sm text-gray-400 max-w-sm">
                    Explore 420-friendly hotels and tours on an interactive map. Integration with mapping service coming soon.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                {[
                  { label: "120+ Cities", icon: Building },
                  { label: "500+ Destinations", icon: MapPin },
                  { label: "300+ Hotels", icon: Building },
                  { label: "94% Coverage", icon: Globe }
                ].map((stat, idx) => (
                  <div key={idx} className="p-3 bg-gray-800 rounded-lg text-center border border-gray-700">
                    <p className="text-base sm:text-lg font-bold text-green-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hotels;
