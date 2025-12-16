import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Globe, MapPin, X, AlertTriangle, ShieldCheck, ShoppingBag } from 'lucide-react';
import { getStatusHexColor } from '@/lib/legal-status-colors';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// FIX: Import from the file that actually exists in your directory
import { countryData, type CountryProfile } from '@/data/world_data';

const statusColors = {
  recreational: getStatusHexColor('recreational'),
  medical: getStatusHexColor('medical'),
  decriminalized: getStatusHexColor('decriminalized'),
  illegal: getStatusHexColor('illegal'),
  mixed: getStatusHexColor('mixed'),
};

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
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        width: rect.width,
        height: rect.height
      });
    }
  };

  const isCountryVisible = (code: string) => {
    const country = countryData[code];
    if (!country) return false;
    const matchesFilter = activeFilter === 'all' || country.overview.status === activeFilter;
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  };

  const handleCountryClick = (countryCode: string) => {
    const country = countryData[countryCode];
    if (country) {
      navigate(`/world/${country.region}/${country.slug}`);
    }
  };

  const getCountryPath = (code: string, path: string) => {
    const country = countryData[code];
    if (!country) return <path d={path} fill="#1a1a1a" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />;

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
          fill={statusColors[country.overview.status]} 
          opacity={isHovered ? 1 : isMuted ? 0.1 : 0.75}
          stroke={isHovered ? "#fff" : isMuted ? "transparent" : "rgba(255,255,255,0.2)"}
          strokeWidth={isHovered ? "2" : "0.5"}
          filter={isHovered ? "url(#glow)" : ""}
          className="transition-all duration-300"
        />
        {!isMuted && (
          <circle 
            cx={getCentroid(path).x} 
            cy={getCentroid(path).y} 
            r={isHovered ? 2 : 0} 
            fill="white"
            className="transition-all duration-300"
          />
        )}
      </g>
    );
  };

  const getCentroid = (d: string) => {
    const parts = d.split(' ');
    return { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
  };

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    return Object.entries(countryData)
      .filter(([_, data]) => data.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 5);
  }, [searchQuery]);

  const isRightSide = mousePos.x > mousePos.width * 0.6;
  const isBottomSide = mousePos.y > mousePos.height * 0.6;

  const getEnforcementIcon = (level: string) => {
    switch(level) {
      case 'relaxed': return <ShieldCheck className="w-3 h-3 text-green-400" />;
      case 'zero-tolerance': return <AlertTriangle className="w-3 h-3 text-red-500" />;
      default: return <ShieldCheck className="w-3 h-3 text-yellow-400" />;
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card/30 p-4 rounded-xl border border-white/5 backdrop-blur-sm shadow-xl">
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
                    <img src={data.overview.heroImage} alt={data.name} className="w-8 h-8 rounded object-cover" />
                    <div>
                      <div className="text-sm font-medium">{data.name}</div>
                      <div className="text-xs text-muted-foreground capitalize">{data.overview.status}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredCountry(null)}
        className="relative w-full aspect-[2/1] bg-[#050505] rounded-xl overflow-hidden border border-white/10 shadow-2xl group"
      >
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ 
            backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', 
            backgroundSize: '30px 30px' 
          }}
        />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-full h-[5px] bg-gradient-to-r from-transparent via-accent/30 to-transparent absolute top-0 animate-scan-line blur-sm" />
        </div>
        
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
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

          <g stroke="url(#grid-grad)" strokeWidth="0.5">
            {[...Array(10)].map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 50} x2="1000" y2={i * 50} />
            ))}
            {[...Array(20)].map((_, i) => (
              <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="500" />
            ))}
          </g>

          {getCountryPath('Canada', 'M 80 40 L 300 40 L 310 70 L 280 100 L 250 90 L 200 85 L 150 90 L 100 95 L 80 75 Z')}
          {getCountryPath('USA', 'M 100 100 L 250 105 L 280 150 L 265 195 L 205 215 L 150 195 L 100 175 Z')}
          {getCountryPath('Mexico', 'M 130 215 L 200 220 L 215 255 L 185 275 L 145 260 L 130 235 Z')}
          
          {getCountryPath('Guatemala', 'M 175 268 L 195 268 L 195 282 L 175 282 Z')}
          {getCountryPath('Belize', 'M 195 262 L 205 262 L 205 275 L 195 275 Z')}
          {getCountryPath('Honduras', 'M 195 275 L 220 275 L 220 288 L 195 288 Z')}
          {getCountryPath('ElSalvador', 'M 180 282 L 195 282 L 195 292 L 180 292 Z')}
          {getCountryPath('Nicaragua', 'M 195 288 L 220 288 L 220 305 L 195 305 Z')}
          {getCountryPath('CostaRica', 'M 200 305 L 218 305 L 218 318 L 200 318 Z')}
          {getCountryPath('Panama', 'M 218 308 L 245 308 L 245 320 L 218 320 Z')}

          {getCountryPath('Cuba', 'M 235 235 L 275 235 L 275 250 L 235 250 Z')}
          {getCountryPath('Jamaica', 'M 250 255 L 270 255 L 270 265 L 250 265 Z')}
          {getCountryPath('Bahamas', 'M 270 220 L 290 220 L 290 235 L 270 235 Z')}
          {getCountryPath('DominicanRepublic', 'M 280 245 L 310 245 L 310 260 L 280 260 Z')}
          {getCountryPath('PuertoRico', 'M 310 250 L 325 250 L 325 260 L 310 260 Z')}
          {getCountryPath('TrinidadTobago', 'M 315 290 L 330 290 L 330 302 L 315 302 Z')}
          {getCountryPath('Bermuda', 'M 320 195 L 332 195 L 332 205 L 320 205 Z')}

          {getCountryPath('Colombia', 'M 220 300 L 265 300 L 265 340 L 220 340 Z')}
          {getCountryPath('Venezuela', 'M 265 295 L 310 295 L 310 325 L 265 325 Z')}
          {getCountryPath('Ecuador', 'M 200 335 L 230 335 L 230 360 L 200 360 Z')}
          {getCountryPath('Peru', 'M 210 355 L 255 355 L 255 400 L 210 400 Z')}
          {getCountryPath('Brazil', 'M 255 310 L 340 310 L 340 390 L 280 420 L 255 400 Z')}
          {getCountryPath('Bolivia', 'M 245 380 L 280 380 L 280 410 L 245 410 Z')}
          {getCountryPath('Chile', 'M 235 400 L 255 400 L 255 470 L 235 470 Z')}
          {getCountryPath('Argentina', 'M 255 400 L 295 400 L 295 470 L 260 470 L 255 450 Z')}
          {getCountryPath('Uruguay', 'M 295 395 L 315 395 L 315 415 L 295 415 Z')}

          {getCountryPath('UK', 'M 450 95 L 470 95 L 470 130 L 450 130 Z')}
          {getCountryPath('Ireland', 'M 435 100 L 450 100 L 450 125 L 435 125 Z')}
          {getCountryPath('Portugal', 'M 430 160 L 445 160 L 445 190 L 430 190 Z')}
          {getCountryPath('Spain', 'M 445 155 L 490 155 L 490 190 L 445 190 Z')}
          {getCountryPath('France', 'M 470 125 L 510 125 L 510 160 L 470 160 Z')}
          {getCountryPath('Belgium', 'M 480 115 L 500 115 L 500 125 L 480 125 Z')}
          {getCountryPath('Netherlands', 'M 485 100 L 505 100 L 505 115 L 485 115 Z')}
          {getCountryPath('Germany', 'M 505 105 L 545 105 L 545 145 L 505 145 Z')}
          {getCountryPath('Luxembourg', 'M 490 130 L 500 130 L 500 140 L 490 140 Z')}
          {getCountryPath('Switzerland', 'M 495 145 L 520 145 L 520 160 L 495 160 Z')}
          {getCountryPath('Austria', 'M 520 140 L 555 140 L 555 155 L 520 155 Z')}
          {getCountryPath('Italy', 'M 505 155 L 540 155 L 540 210 L 515 210 L 505 180 Z')}
          {getCountryPath('Malta', 'M 515 210 L 525 210 L 525 218 L 515 218 Z')}
          {getCountryPath('CzechRepublic', 'M 530 125 L 560 125 L 560 140 L 530 140 Z')}
          {getCountryPath('Poland', 'M 545 100 L 590 100 L 590 130 L 545 130 Z')}
          {getCountryPath('Denmark', 'M 505 85 L 530 85 L 530 100 L 505 100 Z')}
          {getCountryPath('Sweden', 'M 530 50 L 555 50 L 555 95 L 530 95 Z')}
          {getCountryPath('Norway', 'M 500 45 L 530 45 L 545 75 L 530 90 L 500 75 Z')}
          {getCountryPath('Finland', 'M 555 50 L 590 50 L 590 90 L 555 90 Z')}
          {getCountryPath('Greece', 'M 555 175 L 590 175 L 590 205 L 555 205 Z')}
          {getCountryPath('Turkey', 'M 565 165 L 630 165 L 630 195 L 565 195 Z')}
          {getCountryPath('Hungary', 'M 550 145 L 580 145 L 580 165 L 550 165 Z')}
          {getCountryPath('Romania', 'M 570 150 L 610 150 L 610 175 L 570 175 Z')}
          {getCountryPath('Croatia', 'M 535 155 L 560 155 L 560 175 L 535 175 Z')}
          {getCountryPath('Ukraine', 'M 585 115 L 650 115 L 650 155 L 585 155 Z')}
          {getCountryPath('Russia', 'M 620 50 L 780 50 L 780 160 L 650 160 L 650 110 L 620 110 Z')}

          {getCountryPath('Morocco', 'M 440 200 L 480 200 L 480 235 L 440 235 Z')}
          {getCountryPath('Egypt', 'M 560 210 L 605 210 L 605 255 L 560 255 Z')}
          {getCountryPath('Nigeria', 'M 480 290 L 520 290 L 520 330 L 480 330 Z')}
          {getCountryPath('Ghana', 'M 455 300 L 480 300 L 480 330 L 455 330 Z')}
          {getCountryPath('Kenya', 'M 575 310 L 610 310 L 610 350 L 575 350 Z')}
          {getCountryPath('Rwanda', 'M 560 330 L 580 330 L 580 350 L 560 350 Z')}
          {getCountryPath('Malawi', 'M 580 355 L 600 355 L 600 385 L 580 385 Z')}
          {getCountryPath('Zimbabwe', 'M 555 370 L 590 370 L 590 400 L 555 400 Z')}
          {getCountryPath('SouthAfrica', 'M 530 400 L 595 400 L 595 450 L 530 450 Z')}
          {getCountryPath('Lesotho', 'M 565 420 L 580 420 L 580 435 L 565 435 Z')}

          {getCountryPath('Israel', 'M 575 200 L 590 200 L 590 225 L 575 225 Z')}
          {getCountryPath('Lebanon', 'M 580 190 L 595 190 L 595 205 L 580 205 Z')}
          {getCountryPath('UAE', 'M 645 230 L 680 230 L 680 255 L 645 255 Z')}

          {getCountryPath('India', 'M 680 200 L 750 200 L 750 290 L 700 300 L 680 270 Z')}
          {getCountryPath('Nepal', 'M 720 210 L 750 210 L 750 225 L 720 225 Z')}
          {getCountryPath('SriLanka', 'M 720 300 L 738 300 L 738 325 L 720 325 Z')}
          {getCountryPath('Thailand', 'M 755 250 L 785 250 L 785 305 L 755 305 Z')}
          {getCountryPath('Vietnam', 'M 785 250 L 810 250 L 810 310 L 785 310 Z')}
          {getCountryPath('Malaysia', 'M 770 310 L 810 310 L 810 335 L 770 335 Z')}
          {getCountryPath('Singapore', 'M 785 335 L 800 335 L 800 345 L 785 345 Z')}
          {getCountryPath('Indonesia', 'M 780 340 L 880 340 L 880 380 L 780 380 Z')}
          {getCountryPath('Philippines', 'M 840 270 L 875 270 L 875 320 L 840 320 Z')}
          {getCountryPath('China', 'M 750 140 L 870 140 L 870 230 L 750 230 Z')}
          {getCountryPath('Japan', 'M 875 145 L 920 145 L 920 210 L 875 210 Z')}
          {getCountryPath('SouthKorea', 'M 865 175 L 890 175 L 890 205 L 865 205 Z')}

          {getCountryPath('Australia', 'M 815 380 L 920 380 L 920 460 L 815 460 Z')}
          {getCountryPath('NewZealand', 'M 940 420 L 975 420 L 975 470 L 940 470 Z')}
          {getCountryPath('Fiji', 'M 960 380 L 980 380 L 980 400 L 960 400 Z')}
          {getCountryPath('Samoa', 'M 980 365 L 995 365 L 995 380 L 980 380 Z')}
          {getCountryPath('Vanuatu', 'M 950 400 L 965 400 L 965 420 L 950 420 Z')}
        </svg>

        <AnimatePresence>
          {hoveredCountry && countryData[hoveredCountry] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ 
                left: mousePos.x, 
                top: mousePos.y,
              }}
              className={`absolute z-50 w-80 pointer-events-none 
                ${isRightSide ? '-translate-x-full -ml-4' : 'ml-4'} 
                ${isBottomSide ? '-translate-y-full -mt-4' : 'mt-4'}
              `}
            >
              <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="relative h-28 w-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
                  <img 
                    src={countryData[hoveredCountry].overview.heroImage} 
                    alt={countryData[hoveredCountry].name}
                    className="w-full h-full object-cover"
                  />
                  <Badge 
                    className="absolute top-2 right-2 z-20 backdrop-blur-md shadow-sm border-none text-white capitalize"
                    style={{ backgroundColor: statusColors[countryData[hoveredCountry].overview.status] }}
                  >
                    {countryData[hoveredCountry].overview.status}
                  </Badge>
                </div>
                
                <div className="p-4 pt-2">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {countryData[hoveredCountry].name}
                    <Globe className="w-4 h-4 text-muted-foreground" />
                  </h3>
                  
                  <p className="text-xs text-gray-300 mt-2 leading-relaxed border-l-2 border-accent/50 pl-2">
                    {countryData[hoveredCountry].overview.shortDescription}
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="bg-white/5 rounded p-1.5 flex flex-col gap-0.5">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold flex items-center gap-1">
                        {getEnforcementIcon(countryData[hoveredCountry].legal.enforcement)}
                        Enforcement
                      </span>
                      <span className="text-xs text-white capitalize">{countryData[hoveredCountry].legal.enforcement.replace('-', ' ')}</span>
                    </div>
                    <div className="bg-white/5 rounded p-1.5 flex flex-col gap-0.5">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold flex items-center gap-1">
                        <ShoppingBag className="w-3 h-3" />
                        Access
                      </span>
                      <span className="text-xs text-white capitalize truncate">
                        {countryData[hoveredCountry].culture.purchaseMethods.slice(0, 1).join(', ') || 'None'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between text-[10px] text-accent font-mono border-t border-white/10 pt-2">
                     <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> VIEW GUIDE</span>
                     <span className="text-muted-foreground">Updated: {new Date(countryData[hoveredCountry].overview.lastUpdated).getFullYear()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
