// src/pages/Dispensary.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Dispensary() {
  const dispensaries = [
    {
      country: "USA",
      slug: "usa",
      states: [
        {
          stateName: "California",
          slug: "california",
          dispensaries: [
            { id: 101, name: "Golden State Greens", location: "San Diego" },
            { id: 102, name: "MedMen Beverly Hills", location: "Los Angeles" },
          ],
        },
        {
          stateName: "Colorado",
          slug: "colorado",
          dispensaries: [
            { id: 201, name: "Native Roots", location: "Denver" },
            { id: 202, name: "The Green Solution", location: "Aurora" },
          ],
        },
      ],
    },
    {
      country: "Canada",
      slug: "canada",
      states: [
        {
          stateName: "Ontario",
          slug: "ontario",
          dispensaries: [
            { id: 301, name: "Tokyo Smoke", location: "Toronto" },
            { id: 302, name: "Superette", location: "Ottawa" },
          ],
        },
        {
          stateName: "British Columbia",
          slug: "bc",
          dispensaries: [
            { id: 401, name: "Dutch Love", location: "Vancouver" },
            { id: 402, name: "City Cannabis Co.", location: "Victoria" },
          ],
        },
      ],
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = dispensaries
    .map((country) => ({
      ...country,
      states: country.states.map((state) => ({
        ...state,
        dispensaries: state.dispensaries.filter((disp) =>
          disp.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })),
    }))
    .filter((country) =>
      country.states.some((state) => state.dispensaries.length > 0)
    );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Spacer so the fixed search bar doesn't overlap content */}
      <div className="h-[120px]" />

      {/* 🔥 FIXED SEARCH BAR */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-3">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search dispensaries by name..."
              className="w-full bg-transparent text-gray-700 text-sm focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Dispensaries</h1>

        {filteredData.length === 0 ? (
          <p className="text-gray-500">No dispensaries found.</p>
        ) : (
          filteredData.map((country) => (
            <section key={country.slug} className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">{country.country}</h2>

              {country.states.map(
                (state) =>
                  state.dispensaries.length > 0 && (
                    <div key={state.slug} className="mb-6">
                      <h3 className="text-xl font-medium mb-2">
                        {state.stateName}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {state.dispensaries.map((disp) => (
                          <Card
                            key={disp.id}
                            className="p-4 hover:shadow-lg transition"
                          >
                            <CardContent>
                              <h4 className="font-semibold text-lg">
                                {disp.name}
                              </h4>
                              <p className="text-gray-600 text-sm">
                                {disp.location}
                              </p>
                              <Badge className="mt-2">Cannabis Dispensary</Badge>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </section>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}
