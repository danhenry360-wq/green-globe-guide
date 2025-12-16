import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Globe, MapPin, X } from 'lucide-react';
import { getStatusHexColor } from '@/lib/legal-status-colors';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// --- Types ---
interface CountryData {
  name: string;
  status: 'recreational' | 'medical' | 'illegal' | 'decriminalized' | 'mixed';
  description: string;
  slug: string;
  region: string;
  image: string;
}

// --- Data (Condensed for brevity - assume same data as before) ---
const countryData: Record<string, CountryData> = {
  // ... [Keep your existing countryData object here] ... 
  // For the demo to work, ensure at least a few countries are populated:
  'USA': { name: 'United States', status: 'mixed', description: 'Varies by state - 24 states recreational', slug: 'united-states', region: 'north-america', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&q=80' },
  'Canada': { name: 'Canada', status: 'recreational', description: 'Fully legal nationwide since 2018', slug: 'canada', region: 'north-america', image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&q=80' },
  'Thailand': { name: 'Thailand', status: 'medical', description: 'Medical legal, recreational restricted 2024', slug: 'thailand', region: 'asia', image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&q=80' },
  'Germany': { name: 'Germany', status: 'recreational', description: 'Legalized recreational use April 2024', slug: 'germany', region: 'europe', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&q=80' },
  'Japan': { name: 'Japan', status: 'illegal', description: 'Strict prohibition - Travel Warning', slug: 'japan', region: 'asia', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80' },
  // ... add the rest of your list
};

const statusColors = {
  recreational: getStatusHexColor('recreational'), // #22c55e
  medical: getStatusHexColor('medical'),         // #3b82f6
  decriminalized: getStatusHexColor('decriminalized'), // #a855f7
  illegal: getStatusHexColor('illegal'),         // #ef4444
  mixed: getStatusHexColor('mixed'),             // #f59e0b
};

// --- Filters Configuration ---
const filters = [
  { id: 'all', label: 'All Regions' },
  { id: 'recreational', label: 'Recreational', color: statusColors.recreational },
  { id: 'medical', label: 'Medical', color: statusColors.medical },
  { id: 'decriminalized', label: 'Decriminalized', color: statusColors.decriminalized },
];

interface InteractiveWorldMapProps {
  className?: string;
}

const InteractiveWorldMap: React.FC<InteractiveWorldMapProps> = ({ className }) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Mouse Move for Tooltip
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Filter Logic
  const isCountryVisible = (code: string) => {
    const country = countryData[code];
    if (!country) return false;
    
    const matchesFilter = activeFilter === 'all' || country.status === activeFilter;
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  };

  // Navigation
  const handleCountryClick = (countryCode: string) => {
    const country = countryData[countryCode];
    if (country) {
      navigate(`/world/${country.region}/${country.slug}`);
    }
  };

  // Render SVG Path Helper
  const getCountryPath = (code: string, path: string) => {
    const country = countryData[code];
    if (!country) return null;

    const isVisible = isCountryVisible(code);
    const isHovered = hoveredCountry === code;
    const isMuted = !isVisible && (activeFilter !== 'all' || searchQuery !== '');

    return (
      <g 
        id={code} 
        onClick={() => handleCountryClick(code)} 
        onMouseEnter={() => setHoveredCountry(code)} 
        onMouseLeave={() => setHoveredCountry(null)} 
        className={`cursor-pointer transition-all duration-500 ${isMuted ? 'pointer-events-none' : ''}`}
      >
        <path 
          d={path}
          fill={statusColors[country.status]} 
          opacity={isHovered ? 1 : isMuted ? 0.1 : 0.6}
          stroke={isHovered ? "#fff" : isMuted ? "transparent" : "rgba(255,255,255,0.1)"}
          strokeWidth={isHovered ? "2" : "0.5"}
          filter={isHovered ? "url(#glow)" : ""}
          className="transition-all duration-300"
        />
        {/* Render a connection node dot for aesthetic if visible */}
        {!isMuted && (
          <circle 
            cx={getCentroid(path).x} 
            cy={getCentroid(path).y} 
            r={isHovered ? 2 : 0} // Only show dot on hover or create static nodes
            fill="white"
            className="transition-all duration-300"
          />
        )}
      </g>
    );
  };

  // Simple helper to guess centroid for visual dots (approximate based on path start)
  const getCentroid = (d: string) => {
    const parts = d.split(' ');
    // Very rough approximation taking the first M coordinates
    return { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
  };

  // Filtered list for search results
  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    return Object.entries(countryData)
      .filter(([_, data]) => data.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 5);
  }, [searchQuery]);

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* --- Controls Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card/30 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 border ${
                activeFilter === filter.id 
                  ? 'bg-accent/20 border-accent text-accent shadow-[0_0_10px_rgba(34,197,94,0.2)]' 
                  : 'bg-secondary/30 border-transparent text-muted-foreground hover:bg-secondary/50'
              }`}
            >
              {filter.color && (
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: filter.color }} />
              )}
              {filter.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Find a country..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background/50 border-white/10 focus:border-accent"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          
          {/* Quick Search Dropdown */}
          <AnimatePresence>
            {searchQuery && searchResults.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute top-full mt-2 left-0 right-0 bg-popover/95 backdrop-blur-xl border border-border rounded-lg shadow-xl z-20 overflow-hidden"
              >
                {searchResults.map(([code, data]) => (
                  <div 
                    key={code}
                    onClick={() => {
                      handleCountryClick(code);
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-accent/10 cursor-pointer transition-colors border-b border-border/50 last:border-0"
                  >
                    <img src={data.image} alt={data.name} className="w-8 h-8 rounded object-cover" />
                    <div>
                      <div className="text-sm font-medium">{data.name}</div>
                      <div className="text-xs text-muted-foreground capitalize">{data.status}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- Map Container --- */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredCountry(null)}
        className="relative w-full aspect-[2/1] bg-[#050505] rounded-xl overflow-hidden border border-white/10 shadow-2xl group"
      >
        {/* 1. Animated Grid Background */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ 
            backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', 
            backgroundSize: '30px 30px' 
          }}
        />

        {/* 2. Radar Scan Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-full h-[5px] bg-gradient-to-r from-transparent via-accent/30 to-transparent absolute top-0 animate-scan-line blur-sm" />
        </div>
        
        {/* 3. SVG Map */}
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Defs for Glow Filters */}
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          {/* Grid Lines */}
          <g stroke="url(#grid-grad)" strokeWidth="0.5">
            {[...Array(10)].map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 50} x2="1000" y2={i * 50} />
            ))}
            {[...Array(20)].map((_, i) => (
              <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="500" />
            ))}
          </g>

          {/* Render Countries (Using your paths) */}
          {/* NORTH AMERICA */}
          {getCountryPath('Canada', 'M 80 40 L 300 40 L 310 70 L 280 100 L 250 90 L 200 85 L 150 90 L 100 95 L 80 75 Z')}
          {getCountryPath('USA', 'M 100 100 L 250 105 L 280 150 L 265 195 L 205 215 L 150 195 L 100 175 Z')}
          
          {/* ... [INSERT ALL OTHER getCountryPath CALLS HERE] ... */}
          
          {/* ASIA (Example for demo) */}
          {getCountryPath('Japan', 'M 875 145 L 920 145 L 920 210 L 875 210 Z')}
          {getCountryPath('Thailand', 'M 755 250 L 785 250 L 785 305 L 755 305 Z')}
          
          {/* EUROPE (Example for demo) */}
          {getCountryPath('Germany', 'M 505 105 L 545 105 L 545 145 L 505 145 Z')}

        </svg>

        {/* 4. Mouse-Following Floating Tooltip */}
        <AnimatePresence>
          {hoveredCountry && countryData[hoveredCountry] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ 
                left: mousePos.x + 20, 
                top: mousePos.y + 20,
              }}
              className="absolute z-50 w-72 pointer-events-none" // pointer-events-none prevents flickering
            >
              <div className="bg-gray-900/90 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                {/* Header Image */}
                <div className="relative h-24 w-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
                  <img 
                    src={countryData[hoveredCountry].image} 
                    alt={countryData[hoveredCountry].name}
                    className="w-full h-full object-cover"
                  />
                  <Badge 
                    className="absolute top-2 right-2 z-20 backdrop-blur-md shadow-sm border-none text-white"
                    style={{ backgroundColor: statusColors[countryData[hoveredCountry].status] }}
                  >
                    {countryData[hoveredCountry].status}
                  </Badge>
                </div>
                
                {/* Content */}
                <div className="p-4 pt-2">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {countryData[hoveredCountry].name}
                    <Globe className="w-3 h-3 text-muted-foreground" />
                  </h3>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed border-l-2 border-accent/50 pl-2">
                    {countryData[hoveredCountry].description}
                  </p>
                  
                  <div className="mt-3 flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
                    <MapPin className="w-3 h-3" />
                    CLICK TO EXPLORE GUIDE
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. Static Legend (Bottom Right now, clearer) */}
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10 text-xs">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {Object.entries(statusColors).map(([status, color]) => (
              <div key={status} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full shadow-[0_0_5px]" style={{ backgroundColor: color, boxShadow: `0 0 5px ${color}` }} />
                <span className="capitalize text-gray-300">{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveWorldMap;
