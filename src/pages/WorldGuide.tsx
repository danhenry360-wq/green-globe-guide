import { useState } from "react"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Search } from "lucide-react"

// WORLD DATA (ALL INSIDE ONE FILE — NO EXTERNAL IMPORTS)
const COUNTRIES = [
  {
    country: "United States",
    description: "A diverse country with major cities, tech hubs, and tourism hotspots.",
    cities: ["New York", "Los Angeles", "Miami", "Chicago", "Houston"],
  },
  {
    country: "Canada",
    description: "Known for safety, nature, and multicultural major cities.",
    cities: ["Toronto", "Vancouver", "Montreal", "Calgary"],
  },
  {
    country: "United Kingdom",
    description: "Historic cities, financial centers, and strong tourism.",
    cities: ["London", "Manchester", "Birmingham", "Liverpool"],
  },
  {
    country: "Japan",
    description: "Advanced technology, clean cities, and strong cultural tourism.",
    cities: ["Tokyo", "Osaka", "Kyoto", "Fukuoka"],
  },
  {
    country: "Germany",
    description: "Strong economy, engineering hub, and modern infrastructure.",
    cities: ["Berlin", "Munich", "Frankfurt", "Hamburg"],
  },
  {
    country: "Australia",
    description: "Tourism, beaches, multicultural cities, and outdoor lifestyle.",
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth"],
  },
]

export default function WorldGuide() {
  const [query, setQuery] = useState("")

  // FILTER BASED ON COUNTRIES + CITIES
  const filteredCountries = COUNTRIES.filter((c) => {
    const q = query.toLowerCase()
    return (
      c.country.toLowerCase().includes(q) ||
      c.cities.some((city) => city.toLowerCase().includes(q))
    )
  })

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAVIGATION */}
      <Navigation />

      {/* FIXED SEARCH BAR */}
      <div className="fixed top-20 left-0 w-full z-50 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-card/90 backdrop-blur-lg border border-border p-3 rounded-xl shadow-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search countries or cities..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-accent outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT WITH TOP PADDING (IMPORTANT!) */}
      <main className="pt-40 pb-20 px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          {filteredCountries.map((item, index) => (
            <section
              key={index}
              className="p-6 border border-border rounded-xl bg-card shadow-sm"
            >
              <h2 className="text-3xl font-bold mb-3">{item.country}</h2>
              <p className="text-muted-foreground mb-4">{item.description}</p>

              <h3 className="text-xl font-semibold mb-2">Major Cities</h3>
              <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
                {item.cities.map((city, cityIndex) => (
                  <li key={cityIndex}>{city}</li>
                ))}
              </ul>
            </section>
          ))}

          {filteredCountries.length === 0 && (
            <p className="text-center text-muted-foreground mt-10">
              No matching country or city found.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
