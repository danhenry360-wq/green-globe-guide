import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Globe, MapPin, X } from 'lucide-react';
import { getStatusHexColor } from '@/lib/legal-status-colors';
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

// --- Full Data Set ---
const countryData: Record<string, CountryData> = {
  // NORTH AMERICA
  'USA': { name: 'United States', status: 'mixed', description: 'Varies by state - 24 states recreational, federally illegal', slug: 'united-states', region: 'north-america', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&q=80' },
  'Canada': { name: 'Canada', status: 'recreational', description: 'Fully legal nationwide since 2018', slug: 'canada', region: 'north-america', image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&q=80' },
  'Mexico': { name: 'Mexico', status: 'decriminalized', description: 'Decriminalized for personal use (<5g)', slug: 'mexico', region: 'north-america', image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=400&q=80' },
  
  // CENTRAL AMERICA
  'CostaRica': { name: 'Costa Rica', status: 'decriminalized', description: 'Personal consumption tolerated in private', slug: 'costa-rica', region: 'central-america', image: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=400&q=80' },
  'Panama': { name: 'Panama', status: 'medical', description: 'Medical cannabis legalized 2021', slug: 'panama', region: 'central-america', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80' },
  'Belize': { name: 'Belize', status: 'decriminalized', description: 'Up to 10g legal on private property', slug: 'belize', region: 'central-america', image: 'https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?w=400&q=80' },
  'Guatemala': { name: 'Guatemala', status: 'illegal', description: 'Prison sentences for possession', slug: 'guatemala', region: 'central-america', image: 'https://images.unsplash.com/photo-1591377035549-9bf5c53f96e7?w=400&q=80' },
  'ElSalvador': { name: 'El Salvador', status: 'illegal', description: 'State of Exception - Risk of arbitrary arrest', slug: 'el-salvador', region: 'central-america', image: 'https://images.unsplash.com/photo-1612362954221-c8b8f6b3c30c?w=400&q=80' },
  'Honduras': { name: 'Honduras', status: 'illegal', description: 'Prison sentences for possession', slug: 'honduras', region: 'central-america', image: 'https://images.unsplash.com/photo-1572176596507-d0a9c1b79c40?w=400&q=80' },
  'Nicaragua': { name: 'Nicaragua', status: 'illegal', description: 'Strictly illegal, severe penalties', slug: 'nicaragua', region: 'central-america', image: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=400&q=80' },
  
  // EUROPE
  'Netherlands': { name: 'Netherlands', status: 'decriminalized', description: 'Tolerated in coffee shops (5g limit)', slug: 'netherlands', region: 'europe', image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&q=80' },
  'Germany': { name: 'Germany', status: 'recreational', description: 'Legalized recreational use April 2024', slug: 'germany', region: 'europe', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&q=80' },
  'Spain': { name: 'Spain', status: 'decriminalized', description: 'Private cannabis clubs legal', slug: 'spain', region: 'europe', image: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=400&q=80' },
  'Portugal': { name: 'Portugal', status: 'decriminalized', description: 'Decriminalized all drugs in 2001', slug: 'portugal', region: 'europe', image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&q=80' },
  'Switzerland': { name: 'Switzerland', status: 'decriminalized', description: 'Low-THC (<1%) legal, civil fines', slug: 'switzerland', region: 'europe', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400&q=80' },
  'CzechRepublic': { name: 'Czech Republic', status: 'decriminalized', description: 'Medical legal, <15g civil fine', slug: 'czech-republic', region: 'europe', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=400&q=80' },
  'Italy': { name: 'Italy', status: 'decriminalized', description: 'Cannabis Light (low THC) sold openly', slug: 'italy', region: 'europe', image: 'https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=400&q=80' },
  'Austria': { name: 'Austria', status: 'decriminalized', description: 'Small amounts decriminalized', slug: 'austria', region: 'europe', image: 'https://images.unsplash.com/photo-1609856878074-cf31e21ccb6b?w=400&q=80' },
  'Belgium': { name: 'Belgium', status: 'decriminalized', description: '3g civil fine, lowest priority', slug: 'belgium', region: 'europe', image: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?w=400&q=80' },
  'Malta': { name: 'Malta', status: 'recreational', description: 'First EU country to legalize', slug: 'malta', region: 'europe', image: 'https://images.unsplash.com/photo-1555881400-69a8a0691b82?w=400&q=80' },
  'Luxembourg': { name: 'Luxembourg', status: 'recreational', description: 'Home cultivation legal since 2023', slug: 'luxembourg', region: 'europe', image: 'https://images.unsplash.com/photo-1577278219660-7fd07c82ea59?w=400&q=80' },
  'France': { name: 'France', status: 'illegal', description: 'On-the-spot fines (€200), strict', slug: 'france', region: 'europe', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80' },
  'UK': { name: 'United Kingdom', status: 'medical', description: 'Medical only, Class B drug', slug: 'uk', region: 'europe', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80' },
  'Ireland': { name: 'Ireland', status: 'medical', description: 'Medical pilot program only', slug: 'ireland', region: 'europe', image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=400&q=80' },
  'Denmark': { name: 'Denmark', status: 'medical', description: 'Christiania enforcement, medical only', slug: 'denmark', region: 'europe', image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=400&q=80' },
  'Sweden': { name: 'Sweden', status: 'illegal', description: 'Zero tolerance culture', slug: 'sweden', region: 'europe', image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=400&q=80' },
  'Norway': { name: 'Norway', status: 'medical', description: 'Medical only, recreational prohibited', slug: 'norway', region: 'europe', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80' },
  'Finland': { name: 'Finland', status: 'medical', description: 'Medical only, recreational prohibited', slug: 'finland', region: 'europe', image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=400&q=80' },
  'Poland': { name: 'Poland', status: 'medical', description: 'Medical prescription only', slug: 'poland', region: 'europe', image: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=400&q=80' },
  'Greece': { name: 'Greece', status: 'medical', description: 'Medical only, enjoy islands', slug: 'greece', region: 'europe', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=80' },
  'Turkey': { name: 'Turkey', status: 'illegal', description: 'Strict penalties, avoid completely', slug: 'turkey', region: 'europe', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&q=80' },
  'Russia': { name: 'Russia', status: 'illegal', description: 'Severe penalties, political hostages', slug: 'russia', region: 'europe', image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=400&q=80' },
  'Ukraine': { name: 'Ukraine', status: 'medical', description: 'Medical legal, wartime caution', slug: 'ukraine', region: 'europe', image: 'https://images.unsplash.com/photo-1561542320-9a18cd340469?w=400&q=80' },
  'Croatia': { name: 'Croatia', status: 'medical', description: 'Medical only, Adriatic coast', slug: 'croatia', region: 'europe', image: 'https://images.unsplash.com/photo-1555990538-1e6c5549c81c?w=400&q=80' },
  'Hungary': { name: 'Hungary', status: 'medical', description: 'Medical only, thermal baths', slug: 'hungary', region: 'europe', image: 'https://images.unsplash.com/photo-1551867633-194f125bddfa?w=400&q=80' },
  'Romania': { name: 'Romania', status: 'medical', description: 'Medical only, Dracula castles', slug: 'romania', region: 'europe', image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=400&q=80' },
  
  // SOUTH AMERICA
  'Uruguay': { name: 'Uruguay', status: 'recreational', description: 'First country to fully legalize (2013)', slug: 'uruguay', region: 'south-america', image: 'https://images.unsplash.com/photo-1603057448655-d51ec3c8c1dc?w=400&q=80' },
  'Argentina': { name: 'Argentina', status: 'medical', description: 'REPROCANN medical program', slug: 'argentina', region: 'south-america', image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=400&q=80' },
  'Chile': { name: 'Chile', status: 'medical', description: 'Medical legal, personal cultivation', slug: 'chile', region: 'south-america', image: 'https://images.unsplash.com/photo-1565013844965-b1eaeb2dcbb0?w=400&q=80' },
  'Colombia': { name: 'Colombia', status: 'medical', description: 'Medical legal, decriminalized <20g', slug: 'colombia', region: 'south-america', image: 'https://images.unsplash.com/photo-1533699224246-a1e9a5bc8bfb?w=400&q=80' },
  'Brazil': { name: 'Brazil', status: 'decriminalized', description: 'Decriminalized 40g (2024 ruling)', slug: 'brazil', region: 'south-america', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&q=80' },
  'Peru': { name: 'Peru', status: 'medical', description: 'Medical only, Machu Picchu', slug: 'peru', region: 'south-america', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400&q=80' },
  'Ecuador': { name: 'Ecuador', status: 'medical', description: 'Medical only, Galápagos', slug: 'ecuador', region: 'south-america', image: 'https://images.unsplash.com/photo-1570442296287-6e8ba16d0b2e?w=400&q=80' },
  'Bolivia': { name: 'Bolivia', status: 'medical', description: 'Medical only, Altiplano', slug: 'bolivia', region: 'south-america', image: 'https://images.unsplash.com/photo-1591133524085-f1a61c1f47ac?w=400&q=80' },
  'Venezuela': { name: 'Venezuela', status: 'illegal', description: 'Crisis zone, avoid travel', slug: 'venezuela', region: 'south-america', image: 'https://images.unsplash.com/photo-1568291607791-6a26c2de9e08?w=400&q=80' },
  
  // CARIBBEAN
  'Jamaica': { name: 'Jamaica', status: 'decriminalized', description: 'Decriminalized, medical & Rasta legal', slug: 'jamaica', region: 'caribbean', image: 'https://images.unsplash.com/photo-1580995583564-3f47c0ab6d9e?w=400&q=80' },
  'Bahamas': { name: 'Bahamas', status: 'illegal', description: 'Strictly illegal, paradise beaches', slug: 'bahamas', region: 'caribbean', image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=400&q=80' },
  'Cuba': { name: 'Cuba', status: 'illegal', description: 'Strictly illegal, salsa & cigars', slug: 'cuba', region: 'caribbean', image: 'https://images.unsplash.com/photo-1500759285222-a95626b934cb?w=400&q=80' },
  'DominicanRepublic': { name: 'Dominican Republic', status: 'illegal', description: 'Strictly illegal, resort island', slug: 'dominican-republic', region: 'caribbean', image: 'https://images.unsplash.com/photo-1504391975026-8f7ca1e4c7c0?w=400&q=80' },
  'PuertoRico': { name: 'Puerto Rico', status: 'medical', description: 'Medical only, US territory', slug: 'puerto-rico', region: 'caribbean', image: 'https://images.unsplash.com/photo-1569402928262-a88b4a36e7cd?w=400&q=80' },
  'TrinidadTobago': { name: 'Trinidad & Tobago', status: 'decriminalized', description: 'Decriminalized 2019, carnival', slug: 'trinidad-tobago', region: 'caribbean', image: 'https://images.unsplash.com/photo-1593882898826-89a4e9c2a54a?w=400&q=80' },
  'Bermuda': { name: 'Bermuda', status: 'recreational', description: 'Legalized 2022, home grow only', slug: 'bermuda', region: 'caribbean', image: 'https://images.unsplash.com/photo-1574068468760-e9d9f3eb4ca4?w=400&q=80' },
  
  // ASIA
  'Thailand': { name: 'Thailand', status: 'medical', description: 'Medical legal, recreational restricted 2024', slug: 'thailand', region: 'asia', image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&q=80' },
  'Japan': { name: 'Japan', status: 'illegal', description: 'Strict prohibition - Travel Warning', slug: 'japan', region: 'asia', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80' },
  'SouthKorea': { name: 'South Korea', status: 'medical', description: 'Strict medical only', slug: 'south-korea', region: 'asia', image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&q=80' },
  'China': { name: 'China', status: 'illegal', description: 'Zero tolerance, severe penalties', slug: 'china', region: 'asia', image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=400&q=80' },
  'India': { name: 'India', status: 'mixed', description: 'Bhang legal, varies by state - complex laws', slug: 'india', region: 'asia', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80' },
  'Indonesia': { name: 'Indonesia', status: 'illegal', description: 'Death penalty possible, avoid', slug: 'indonesia', region: 'asia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80' },
  'Malaysia': { name: 'Malaysia', status: 'illegal', description: 'Death penalty, mandatory sentences', slug: 'malaysia', region: 'asia', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=400&q=80' },
  'Singapore': { name: 'Singapore', status: 'illegal', description: 'Death penalty, zero tolerance', slug: 'singapore', region: 'asia', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=80' },
  'Philippines': { name: 'Philippines', status: 'illegal', description: 'Harsh penalties, drug war', slug: 'philippines', region: 'asia', image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=400&q=80' },
  'Vietnam': { name: 'Vietnam', status: 'illegal', description: 'Illegal but varied enforcement', slug: 'vietnam', region: 'asia', image: 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=400&q=80' },
  'UAE': { name: 'UAE', status: 'illegal', description: 'Zero tolerance, prison sentences', slug: 'uae', region: 'asia', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80' },
  'Israel': { name: 'Israel', status: 'medical', description: 'Medical legal, decriminalized personal', slug: 'israel', region: 'asia', image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=400&q=80' },
  'Lebanon': { name: 'Lebanon', status: 'medical', description: 'Medical cultivation legal 2020', slug: 'lebanon', region: 'asia', image: 'https://images.unsplash.com/photo-1560797257-dcf33a9c2d35?w=400&q=80' },
  'Nepal': { name: 'Nepal', status: 'illegal', description: 'Illegal but culturally present', slug: 'nepal', region: 'asia', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80' },
  'SriLanka': { name: 'Sri Lanka', status: 'medical', description: 'Medical legal since 2023', slug: 'sri-lanka', region: 'asia', image: 'https://images.unsplash.com/photo-1586423702687-0e29e1a5e577?w=400&q=80' },
  
  // AFRICA
  'SouthAfrica': { name: 'South Africa', status: 'decriminalized', description: 'Private use and cultivation legal', slug: 'south-africa', region: 'africa', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&q=80' },
  'Morocco': { name: 'Morocco', status: 'illegal', description: 'Major hash producer (Kief tolerated)', slug: 'morocco', region: 'africa', image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=400&q=80' },
  'Lesotho': { name: 'Lesotho', status: 'medical', description: 'First African medical license', slug: 'lesotho', region: 'africa', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80' },
  'Malawi': { name: 'Malawi', status: 'medical', description: 'Cultivation for medical/export legal', slug: 'malawi', region: 'africa', image: 'https://images.unsplash.com/photo-1613467656395-e32f94f21c5a?w=400&q=80' },
  'Zimbabwe': { name: 'Zimbabwe', status: 'medical', description: 'Medical cannabis legal since 2018', slug: 'zimbabwe', region: 'africa', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80' },
  'Rwanda': { name: 'Rwanda', status: 'medical', description: 'Medical cannabis legal since 2021', slug: 'rwanda', region: 'africa', image: 'https://images.unsplash.com/photo-1628263118393-f6cdf3f5d0c9?w=400&q=80' },
  'Kenya': { name: 'Kenya', status: 'illegal', description: 'Illegal but widely available', slug: 'kenya', region: 'africa', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80' },
  'Egypt': { name: 'Egypt', status: 'illegal', description: 'Strictly illegal, harsh penalties', slug: 'egypt', region: 'africa', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&q=80' },
  'Nigeria': { name: 'Nigeria', status: 'illegal', description: 'Illegal but discussions ongoing', slug: 'nigeria', region: 'africa', image: 'https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=400&q=80' },
  'Ghana': { name: 'Ghana', status: 'illegal', description: 'Illegal, narcotics law applies', slug: 'ghana', region: 'africa', image: 'https://images.unsplash.com/photo-1598890777032-6b7f7cc6a0a3?w=400&q=80' },
  
  // OCEANIA
  'Australia': { name: 'Australia', status: 'mixed', description: 'Medical nationwide, ACT recreational - varies by state', slug: 'australia', region: 'oceania', image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400&q=80' },
  'NewZealand': { name: 'New Zealand', status: 'medical', description: 'Medical legal since 2020', slug: 'new-zealand', region: 'oceania', image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=400&q=80' },
  'Fiji': { name: 'Fiji', status: 'illegal', description: 'Strictly illegal, island paradise', slug: 'fiji', region: 'oceania', image: 'https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?w=400&q=80' },
  'Samoa': { name: 'Samoa', status: 'medical', description: 'Medical cannabis legal since 2023', slug: 'samoa', region: 'oceania', image: 'https://images.unsplash.com/photo-1579023154615-c3e3e39c4e50?w=400&q=80' },
  'Vanuatu': { name: 'Vanuatu', status: 'medical', description: 'Medical cannabis legal since 2023', slug: 'vanuatu', region: 'oceania', image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400&q=80' },
};

const statusColors = {
  recreational: getStatusHexColor('recreational'),
  medical: getStatusHexColor('medical'),
  decriminalized: getStatusHexColor('decriminalized'),
  illegal: getStatusHexColor('illegal'),
  mixed: getStatusHexColor('mixed'),
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
          opacity={isHovered ? 1 : isMuted ? 0.1 : 0.75}
          stroke={isHovered ? "#fff" : isMuted ? "transparent" : "rgba(255,255,255,0.2)"}
          strokeWidth={isHovered ? "2" : "0.5"}
          filter={isHovered ? "url(#glow)" : ""}
          className="transition-all duration-300"
        />
        {/* Render a connection node dot for aesthetic if visible */}
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card/30 p-4 rounded-xl border border-white/5 backdrop-blur-sm shadow-xl">
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

          {/* NORTH AMERICA */}
          {getCountryPath('Canada', 'M 80 40 L 300 40 L 310 70 L 280 100 L 250 90 L 200 85 L 150 90 L 100 95 L 80 75 Z')}
          {getCountryPath('USA', 'M 100 100 L 250 105 L 280 150 L 265 195 L 205 215 L 150 195 L 100 175 Z')}
          {getCountryPath('Mexico', 'M 130 215 L 200 220 L 215 255 L 185 275 L 145 260 L 130 235 Z')}
          
          {/* CENTRAL AMERICA */}
          {getCountryPath('Guatemala', 'M 175 268 L 195 268 L 195 282 L 175 282 Z')}
          {getCountryPath('Belize', 'M 195 262 L 205 262 L 205 275 L 195 275 Z')}
          {getCountryPath('Honduras', 'M 195 275 L 220 275 L 220 288 L 195 288 Z')}
          {getCountryPath('ElSalvador', 'M 180 282 L 195 282 L 195 292 L 180 292 Z')}
          {getCountryPath('Nicaragua', 'M 195 288 L 220 288 L 220 305 L 195 305 Z')}
          {getCountryPath('CostaRica', 'M 200 305 L 218 305 L 218 318 L 200 318 Z')}
          {getCountryPath('Panama', 'M 218 308 L 245 308 L 245 320 L 218 320 Z')}

          {/* CARIBBEAN */}
          {getCountryPath('Cuba', 'M 235 235 L 275 235 L 275 250 L 235 250 Z')}
          {getCountryPath('Jamaica', 'M 250 255 L 270 255 L 270 265 L 250 265 Z')}
          {getCountryPath('Bahamas', 'M 270 220 L 290 220 L 290 235 L 270 235 Z')}
          {getCountryPath('DominicanRepublic', 'M 280 245 L 310 245 L 310 260 L 280 260 Z')}
          {getCountryPath('PuertoRico', 'M 310 250 L 325 250 L 325 260 L 310 260 Z')}
          {getCountryPath('TrinidadTobago', 'M 315 290 L 330 290 L 330 302 L 315 302 Z')}
          {getCountryPath('Bermuda', 'M 320 195 L 332 195 L 332 205 L 320 205 Z')}

          {/* SOUTH AMERICA */}
          {getCountryPath('Colombia', 'M 220 300 L 265 300 L 265 340 L 220 340 Z')}
          {getCountryPath('Venezuela', 'M 265 295 L 310 295 L 310 325 L 265 325 Z')}
          {getCountryPath('Ecuador', 'M 200 335 L 230 335 L 230 360 L 200 360 Z')}
          {getCountryPath('Peru', 'M 210 355 L 255 355 L 255 400 L 210 400 Z')}
          {getCountryPath('Brazil', 'M 255 310 L 340 310 L 340 390 L 280 420 L 255 400 Z')}
          {getCountryPath('Bolivia', 'M 245 380 L 280 380 L 280 410 L 245 410 Z')}
          {getCountryPath('Chile', 'M 235 400 L 255 400 L 255 470 L 235 470 Z')}
          {getCountryPath('Argentina', 'M 255 400 L 295 400 L 295 470 L 260 470 L 255 450 Z')}
          {getCountryPath('Uruguay', 'M 295 395 L 315 395 L 315 415 L 295 415 Z')}

          {/* EUROPE */}
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

          {/* AFRICA */}
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

          {/* MIDDLE EAST / WEST ASIA */}
          {getCountryPath('Israel', 'M 575 200 L 590 200 L 590 225 L 575 225 Z')}
          {getCountryPath('Lebanon', 'M 580 190 L 595 190 L 595 205 L 580 205 Z')}
          {getCountryPath('UAE', 'M 645 230 L 680 230 L 680 255 L 645 255 Z')}

          {/* ASIA */}
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

          {/* OCEANIA */}
          {getCountryPath('Australia', 'M 815 380 L 920 380 L 920 460 L 815 460 Z')}
          {getCountryPath('NewZealand', 'M 940 420 L 975 420 L 975 470 L 940 470 Z')}
          {getCountryPath('Fiji', 'M 960 380 L 980 380 L 980 400 L 960 400 Z')}
          {getCountryPath('Samoa', 'M 980 365 L 995 365 L 995 380 L 980 380 Z')}
          {getCountryPath('Vanuatu', 'M 950 400 L 965 400 L 965 420 L 950 420 Z')}
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
              className="absolute z-50 w-72 pointer-events-none" 
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

        {/* 5. Static Legend (Bottom Right) */}
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
