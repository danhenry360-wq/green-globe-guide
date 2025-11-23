// src/pages/Dispensary.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, ExternalLink, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import dispensaryDataRaw from "@/data/dispensary_data";
import { useState, useMemo } from "react";

interface Dispensary {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  rating: number;
  image: string;
  website?: string;
}

export default function Dispensary() {
  const processedData: Dispensary[] = useMemo(() => {
    const list: Dispensary[] = [];
    Object.values(dispensaryDataRaw).forEach((stateItem: any) => {
      Object.values(stateItem.cities).forEach((cityObj: any) => {
        cityObj.dispensaries.forEach((d: any) => {
          list.push({ ...d, city: cityObj.city, state: stateItem.stateName });
        });
      });
    });
    return list;
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const states = useMemo(() => {
    return Array.from(new Set(processedData.map((d) => d.state)));
  }, [processedData]);

  const filteredDispensaries = useMemo(() => {
    let result = processedData;

    if (selectedState) {
      result = result.filter((d) => d.state === selectedState);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q) ||
          d.state.toLowerCase().includes(q)
      );
    }

    return result;
  }, [processedData, searchQuery, selectedState]);

  const totalPages = Math.ceil(filteredDispensaries.length / itemsPerPage);
  const currentPageData = filteredDispensaries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearFilters = () => {
    setSelectedState(null);
    setSearchQuery("");
  };

  return (
    <>
      <Navigation />

      {/* Sticky search bar */}
      <div className="fixed top-[70px] left-0 w-full z-40 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city or dispensary..."
              className="w-full px-12 py-3 rounded-xl bg-gray-100 border focus:ring-2 focus:ring-accent focus:outline-none"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-28 pb-10">
        {/* Filters */}
        <div className="flex items-center justify-between mb-4 mt-4">
          <h2 className="text-2xl font-bold">Dispensaries</h2>

          <div className="flex gap-2 items-center">
            {selectedState && (
              <Badge className="bg-accent text-white px-3 py-1">{selectedState}</Badge>
            )}

            {(selectedState || searchQuery) && (
              <button
                onClick={clearFilters}
                className="text-sm bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1"
              >
                <Filter size={14} /> Reset
              </button>
            )}
          </div>
        </div>

        {/* State Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {states.map((s) => (
            <button
              key={s}
              onClick={() => {
                setSelectedState(s === selectedState ? null : s);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full border whitespace-nowrap transition ${
                selectedState === s ? "bg-accent text-white border-accent" : "bg-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-4">
          Showing <span className="font-bold">{filteredDispensaries.length}</span> results
        </p>

        {/* List */}
        <div className="grid md:grid-cols-3 gap-6">
          {currentPageData.map((d) => (
            <Card key={d.id} className="p-4 border rounded-xl shadow-sm">
              <img
                src={d.image}
                alt={d.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />

              <h3 className="text-lg font-semibold mb-1">{d.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{d.description}</p>

              <div className="flex items-center gap-1 text-gray-700 text-sm mb-3">
                <MapPin size={16} /> {d.city}, {d.state}
              </div>

              {d.website && (
                <a
                  href={d.website}
                  target="_blank"
                  className="text-accent flex items-center gap-1 text-sm hover:underline"
                >
                  Visit Site <ExternalLink size={14} />
                </a>
              )}
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2 border rounded disabled:opacity-50"
            >
              <ChevronLeft />
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2 border rounded disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
