import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CountryData {
  name: string;
  status: 'recreational' | 'medical' | 'illegal' | 'decriminalized';
  description: string;
}

const countryData: Record<string, CountryData> = {
  'USA': { name: 'United States', status: 'recreational', description: 'Varies by state - 24 states recreational, 38 medical' },
  'Canada': { name: 'Canada', status: 'recreational', description: 'Fully legal nationwide since 2018' },
  'Mexico': { name: 'Mexico', status: 'decriminalized', description: 'Decriminalized for personal use' },
  'Uruguay': { name: 'Uruguay', status: 'recreational', description: 'First country to fully legalize in 2013' },
  'Netherlands': { name: 'Netherlands', status: 'decriminalized', description: 'Tolerated in coffee shops' },
  'Spain': { name: 'Spain', status: 'decriminalized', description: 'Legal in private cannabis clubs' },
  'Portugal': { name: 'Portugal', status: 'decriminalized', description: 'Decriminalized all drugs in 2001' },
  'Germany': { name: 'Germany', status: 'recreational', description: 'Legalized for recreational use in 2024' },
  'Switzerland': { name: 'Switzerland', status: 'medical', description: 'Medical use legal, recreational pilot programs' },
  'Czech Republic': { name: 'Czech Republic', status: 'medical', description: 'Medical legal, small amounts decriminalized' },
  'Jamaica': { name: 'Jamaica', status: 'decriminalized', description: 'Decriminalized, medical and religious use legal' },
  'Colombia': { name: 'Colombia', status: 'decriminalized', description: 'Personal use decriminalized' },
  'Argentina': { name: 'Argentina', status: 'decriminalized', description: 'Personal use decriminalized' },
  'Chile': { name: 'Chile', status: 'medical', description: 'Medical legal, personal cultivation allowed' },
  'Australia': { name: 'Australia', status: 'medical', description: 'Medical legal nationwide, ACT decriminalized' },
  'Thailand': { name: 'Thailand', status: 'medical', description: 'Medical legal since 2022' },
  'Israel': { name: 'Israel', status: 'medical', description: 'Medical legal, decriminalized for personal use' },
  'South Africa': { name: 'South Africa', status: 'decriminalized', description: 'Private use and cultivation legal' },
  'Malta': { name: 'Malta', status: 'recreational', description: 'First EU country to legalize recreational use' },
  'Luxembourg': { name: 'Luxembourg', status: 'recreational', description: 'Home cultivation legal since 2023' },
};

const statusColors = {
  recreational: '#22c55e', // green
  medical: '#eab308', // yellow
  decriminalized: '#3b82f6', // blue
  illegal: '#ef4444', // red
};

interface InteractiveWorldMapProps {
  className?: string;
}

const InteractiveWorldMap: React.FC<InteractiveWorldMapProps> = ({ className }) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleCountryClick = (countryCode: string) => {
    setSelectedCountry(countryCode === selectedCountry ? null : countryCode);
  };

  return (
    <div className={className}>
      <div className="relative w-full aspect-[2/1] bg-gray-950 rounded-2xl overflow-hidden border-2 border-accent/30 shadow-2xl shadow-accent/20">
        {/* Neon glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-gold/10 pointer-events-none" />
        
        {/* SVG World Map */}
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background */}
          <rect width="1000" height="500" fill="#0a0a0a" />
          
          {/* Simplified country shapes with approximate positions */}
          {/* North America */}
          <g id="USA" onClick={() => handleCountryClick('USA')} onMouseEnter={() => setHoveredCountry('USA')} onMouseLeave={() => setHoveredCountry(null)} className="cursor-pointer transition-all duration-300">
            <path d="M 100 100 L 250 100 L 280 150 L 260 200 L 200 220 L 150 200 L 100 180 Z" 
              fill={statusColors[countryData['USA'].status]} 
              opacity={hoveredCountry === 'USA' || selectedCountry === 'USA' ? 0.9 : 0.7}
              stroke="#fff" 
              strokeWidth={hoveredCountry === 'USA' || selectedCountry === 'USA' ? "2" : "1"}
              className="transition-all duration-300"
            />
          </g>
          
          <g id="Canada" onClick={() => handleCountryClick('Canada')} onMouseEnter={() => setHoveredCountry('Canada')} onMouseLeave={() => setHoveredCountry(null)} className="cursor-pointer">
            <path d="M 100 50 L 280 50 L 280 95 L 250 95 L 100 95 Z" 
              fill={statusColors[countryData['Canada'].status]} 
              opacity={hoveredCountry === 'Canada' || selectedCountry === 'Canada' ? 0.9 : 0.7}
              stroke="#fff" 
              strokeWidth={hoveredCountry === 'Canada' || selectedCountry === 'Canada' ? "2" : "1"}
            />
          </g>
          
          <g id="Mexico" onClick={() => handleCountryClick('Mexico')} onMouseEnter={() => setHoveredCountry('Mexico')} onMouseLeave={() => setHoveredCountry(null)} className="cursor-pointer">
            <path d="M 150 220 L 200 220 L 210 250 L 180 260 L 150 250 Z" 
              fill={statusColors[countryData['Mexico'].status]} 
              opacity={hoveredCountry === 'Mexico' || selectedCountry === 'Mexico' ? 0.9 : 0.7}
              stroke="#fff" 
              strokeWidth={hoveredCountry === 'Mexico' || selectedCountry === 'Mexico' ? "2" : "1"}
            />
          </g>
          
          {/* South America */}
          <g id="Colombia" onClick={() => handleCountryClick('Colombia')} onMouseEnter={() => setHoveredCountry('Colombia')} onMouseLeave={() => setHoveredCountry(null)} className="cursor-pointer">
            <path d="M 200 280 L 230 280 L 230 310 L 200 310 Z" 
              fill={statusColors[countryData['Colombia'].status]} 
              opacity={hoveredCountry === 'Colombia' || selectedCountry === 'Colombia' ? 0.9 : 0.7}
              stroke="#fff" 
              strokeWidth={hoveredCountry === 'Colombia' || selectedCountry === 'Colombia' ? "2" : "1"}
            />
          </g>
          
          <g id="Uruguay" onClick={() => handleCountryClick('Uruguay')} onMouseEnter={() => setHoveredCountry('Uruguay')} onMouseLeave={() => setHoveredCountry(null)} className="cursor-pointer">
            <path d="M 240 380 L 270 380 L 270 400 L 240 400 Z" 
              fill={statusColors[countryData['Uruguay'].status]} 
              opacity={hoveredCountry === 'Uruguay' || selectedCountry === 'Uruguay' ? 0.9 : 0.7}
              stroke="#fff" 
              strokeWidth={hoveredCountry === 'Uruguay' || selectedCountry === 'Uruguay' ? "2" : "1"}
            />
          </g>
          
          <g id="Argentina" onClick={() => handleCountryClick('Argentina')} onMouseEnter={() => setHoveredCountry('Argentina')} onMouseLeave={() => setHoveredCountry(null)} className="cursor-pointer">
            <path d="M 220 350 L 250 350 L 250 420 L 220 420 Z" 
              fill={statusColors[countryData['Argentina'].status]} 
              opacity={hoveredCountry === 'Argentina' || selectedCountry === 'Argentina' ? 0.9 : 0.7}
              stroke="#fff" 
              strokeWidth={hoveredCountry === 'Argentina' || selectedCountry === 'Argentina' ? "2" : "1"}
            />
          </g>
          
          <g id="Chile" onClick={() => handleCountryClick('Chile')} onMouseEnter={() => setHoveredCountry('Chile')} onMouseLeave={() => setHoveredCountry(null)} className="cursor-pointer">
            <path d="M 200 330 L 215 330 L 215 430 L 200 430 Z" 
              fill={statusColors[countryData['Chile'].status]} 
              opacity={hoveredCountry === 'Chile' || selectedCountry === 'Chile' ? 0.9 : 0.7}
              stroke="#fff" 
              strokeWidth={hoveredCountry === 'Chile' || selectedCountry === 'Chile' ? "2" : "1"}
            />
          </g>
          
          {/* Europe */}
          <g id="Netherlands" onClick={() => handleCountryClick('Netherlands')} onMouseEnter={() => setHoveredCountry('Netherlands')} onMouseLeave={() => setHoveredCountry(null)} className="cursor-pointer">
            <path d="M 480 110 L 495 110 L 495 125 L 480 125 Z" 
              fill={statusColors[countryData['Netherlands'].status]} 
              opacity={hoveredCountry === 'Netherlands' || selectedCountry === 'Netherlands' ? 0.9 : 0.7}
              stroke="#fff" 
              strokeWidth={hoveredCountry === 'Netherlands' || selectedCountry === 'Netherlands' ? "2" : "1"}
            />
          </g>
          
          <g id="Germany" onClick={() => handleCountryClick('Germany')} onMouseEnter={() => setHoveredCountry('Germany')} onMouseLeave={() => setHoveredCountry(null)} className="cursor-pointer">
            <path d="M 495 115 L 525 115 L 525 145 L 495 145 Z" 
              fill={statusColors[countryData['Germany'].status]} 
              opacity={hoveredCountry === 'Germany' || selectedCountry === 'Germany' ? 0.9 : 0.7}
              stroke="#fff" 
              strokeWidth={hoveredCountry === 'Germany' || selectedCountry === 'Germany' ? "2" : "1"}
            />
          </g>
          
          <g id="Spain" onClick={() => handleCountryClick('Spain')} onMouseEnter={() => setHoveredCountry('Spain')} onMouseLeave={() => setHoveredCountry(null)} className="cursor-pointer">
            <path d="M 450 160 L 490 160 L 490 185 L 450 185 Z" 
              fill={statusColors[countryData['Spain'].status]} 
              opacity={hoveredCountry === 'Spain' || selectedCountry === 'Spain' ? 0.9 : 0.7}
              stroke="#fff" 
              strokeWidth={hoveredCountry === 'Spain' || selectedCountry === 'Spain' ? "2" : "1"}
            />
          </g>
          
          <g id="Portugal" onClick={() => handleCountryClick('Portugal')} onMouseEnter={() => setHoveredCountry('Portugal')} onMouseLeave={() => setHoveredCountry(null)} className="cursor-pointer">
            <path d="M 435 160 L 450 160 L 450 185 L 435 185 Z" 
              fill={statusColors[countryData['Portugal'].status]} 
              opacity={hoveredCountry === 'Portugal' || selectedCountry === 'Portugal' ? 0.9 : 0.7}
              stroke="#fff" 
              strokeWidth={hoveredCountry === 'Portugal' || selectedCountry === 'Portugal' ? "2" : "1"}
            />
          </g>
          
          <g id="Switzerland" onClick={() => handleCountryClick('Switzerland')} onMouseEnter={() => setHoveredCountry('Switzerland')} onMouseLeave={() => setHoveredCountry(null)} className="cursor-pointer">
            <path d="M 500 145 L 515 145 L 515 160 L 500 160 Z" 
              fill={statusColors[countryData['Switzerland'].status]} 
              opacity={hoveredCountry === 'Switzerland' || selectedCountry === 'Switzerland' ? 0.9 : 0.7}
              stroke="#fff" 
              strokeWidth={hoveredCountry === 'Switzerland' || selectedCountry === 'Switzerland' ? "2" : "1"}
            />
          </g>
          
          <g id="Czech Republic" onClick={() => handleCountryClick('Czech Republic')} onMouseEnter={() => setHoveredCountry('Czech Republic')} onMouseLeave={() => setHoveredCountry(null)} className="cursor-pointer">
            <path d="M 525 125 L 545 125 L 545 140 L 525 140 Z" 
              fill={statusColors[countryData['Czech Republic'].status]} 
              opacity={hoveredCountry === 'Czech Republic' || selectedCountry === 'Czech Republic' ? 0.9 : 0.7}
              stroke="#fff" 
              strokeWidth={hoveredCountry === 'Czech Republic' || selectedCountry === 'Czech Republic' ? "2" : "1"}
            />
          </g>
          
          <g id="Malta" onClick={() => handleCountryClick('Malta')} onMouseEnter={() => setHoveredCountry('Malta')} onMouseLeave={() => setHoveredCountry(null)} className="cursor-pointer">
            <circle cx="510" cy="190" r="5" 
              fill={statusColors[countryData['Malta'].status]} 
              opacity={hoveredCountry === 'Malta' || selectedCountry === 'Malta' ? 0.9 : 0.7}
              stroke="#fff" 
              strokeWidth={hoveredCountry === 'Malta' || selectedCountry === 'Malta' ? "2" : "1"}
            />
          </g>
          
          <g id="Luxembourg" onClick={() => handleCountryClick('Luxembourg')} onMouseEnter={() => setHoveredCountry('Luxembourg')} onMouseLeave={() => setHoveredCountry(null)} className="cursor-pointer">
            <circle cx="490" cy="125" r="5" 
              fill={statusColors[countryData['Luxembourg'].status]} 
              opacity={hoveredCountry === 'Luxembourg' || selectedCountry === 'Luxembourg' ? 0.9 : 0.7}
              stroke="#fff" 
              strokeWidth={hoveredCountry === 'Luxembourg' || selectedCountry === 'Luxembourg' ? "2" : "1"}
            />
          </g>
          
          {/* Caribbean */}
          <g id="Jamaica" onClick={() => handleCountryClick('Jamaica')} onMouseEnter={() => setHoveredCountry('Jamaica')} onMouseLeave={() => setHoveredCountry(null)} className="cursor-pointer">
            <path d="M 240 240 L 255 240 L 255 250 L 240 250 Z" 
              fill={statusColors[countryData['Jamaica'].status]} 
              opacity={hoveredCountry === 'Jamaica' || selectedCountry === 'Jamaica' ? 0.9 : 0.7}
              stroke="#fff" 
              strokeWidth={hoveredCountry === 'Jamaica' || selectedCountry === 'Jamaica' ? "2" : "1"}
            />
          </g>
          
          {/* Africa */}
          <g id="South Africa" onClick={() => handleCountryClick('South Africa')} onMouseEnter={() => setHoveredCountry('South Africa')} onMouseLeave={() => setHoveredCountry(null)} className="cursor-pointer">
            <path d="M 530 380 L 570 380 L 570 420 L 530 420 Z" 
              fill={statusColors[countryData['South Africa'].status]} 
              opacity={hoveredCountry === 'South Africa' || selectedCountry === 'South Africa' ? 0.9 : 0.7}
              stroke="#fff" 
              strokeWidth={hoveredCountry === 'South Africa' || selectedCountry === 'South Africa' ? "2" : "1"}
            />
          </g>
          
          {/* Asia/Pacific */}
          <g id="Thailand" onClick={() => handleCountryClick('Thailand')} onMouseEnter={() => setHoveredCountry('Thailand')} onMouseLeave={() => setHoveredCountry(null)} className="cursor-pointer">
            <path d="M 720 240 L 745 240 L 745 270 L 720 270 Z" 
              fill={statusColors[countryData['Thailand'].status]} 
              opacity={hoveredCountry === 'Thailand' || selectedCountry === 'Thailand' ? 0.9 : 0.7}
              stroke="#fff" 
              strokeWidth={hoveredCountry === 'Thailand' || selectedCountry === 'Thailand' ? "2" : "1"}
            />
          </g>
          
          <g id="Israel" onClick={() => handleCountryClick('Israel')} onMouseEnter={() => setHoveredCountry('Israel')} onMouseLeave={() => setHoveredCountry(null)} className="cursor-pointer">
            <path d="M 570 200 L 585 200 L 585 215 L 570 215 Z" 
              fill={statusColors[countryData['Israel'].status]} 
              opacity={hoveredCountry === 'Israel' || selectedCountry === 'Israel' ? 0.9 : 0.7}
              stroke="#fff" 
              strokeWidth={hoveredCountry === 'Israel' || selectedCountry === 'Israel' ? "2" : "1"}
            />
          </g>
          
          <g id="Australia" onClick={() => handleCountryClick('Australia')} onMouseEnter={() => setHoveredCountry('Australia')} onMouseLeave={() => setHoveredCountry(null)} className="cursor-pointer">
            <path d="M 800 350 L 880 350 L 880 410 L 800 410 Z" 
              fill={statusColors[countryData['Australia'].status]} 
              opacity={hoveredCountry === 'Australia' || selectedCountry === 'Australia' ? 0.9 : 0.7}
              stroke="#fff" 
              strokeWidth={hoveredCountry === 'Australia' || selectedCountry === 'Australia' ? "2" : "1"}
            />
          </g>
        </svg>
        
        {/* Tooltip on hover */}
        {hoveredCountry && countryData[hoveredCountry] && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-900/95 backdrop-blur-xl border border-accent/50 rounded-xl px-6 py-4 shadow-2xl shadow-accent/30 z-10 max-w-sm"
          >
            <h3 className="text-lg font-bold text-white mb-1">{countryData[hoveredCountry].name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: statusColors[countryData[hoveredCountry].status] }}
              />
              <span className="text-sm text-gray-300 capitalize">{countryData[hoveredCountry].status}</span>
            </div>
            <p className="text-sm text-gray-400">{countryData[hoveredCountry].description}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InteractiveWorldMap;
