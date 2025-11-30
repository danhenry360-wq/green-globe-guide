import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Globe2 } from 'lucide-react';
import { getStatusHexColor, getStatusLabel } from '@/lib/legal-status-colors';

interface ContinentData {
  name: string;
  icon: string;
  countries: Array<{
    name: string;
    status: 'recreational' | 'medical' | 'illegal' | 'decriminalized';
    description: string;
  }>;
}

const continents: Record<string, ContinentData> = {
  americas: {
    name: 'Americas',
    icon: '🌎',
    countries: [
      { name: 'United States', status: 'recreational', description: 'Varies by state - 24 states recreational, 38 medical' },
      { name: 'Canada', status: 'recreational', description: 'Fully legal nationwide since 2018' },
      { name: 'Mexico', status: 'decriminalized', description: 'Decriminalized for personal use' },
      { name: 'Uruguay', status: 'recreational', description: 'First country to fully legalize in 2013' },
      { name: 'Jamaica', status: 'decriminalized', description: 'Decriminalized, medical and religious use legal' },
      { name: 'Colombia', status: 'decriminalized', description: 'Personal use decriminalized' },
      { name: 'Argentina', status: 'decriminalized', description: 'Personal use decriminalized' },
      { name: 'Chile', status: 'medical', description: 'Medical legal, personal cultivation allowed' },
    ],
  },
  europe: {
    name: 'Europe',
    icon: '🇪🇺',
    countries: [
      { name: 'Netherlands', status: 'decriminalized', description: 'Tolerated in coffee shops' },
      { name: 'Spain', status: 'decriminalized', description: 'Legal in private cannabis clubs' },
      { name: 'Portugal', status: 'decriminalized', description: 'Decriminalized all drugs in 2001' },
      { name: 'Germany', status: 'recreational', description: 'Legalized for recreational use in 2024' },
      { name: 'Switzerland', status: 'medical', description: 'Medical use legal, recreational pilot programs' },
      { name: 'Czech Republic', status: 'medical', description: 'Medical legal, small amounts decriminalized' },
      { name: 'Malta', status: 'recreational', description: 'First EU country to legalize recreational use' },
      { name: 'Luxembourg', status: 'recreational', description: 'Home cultivation legal since 2023' },
    ],
  },
  asia: {
    name: 'Asia',
    icon: '🌏',
    countries: [
      { name: 'Thailand', status: 'medical', description: 'Medical legal since 2022' },
      { name: 'Israel', status: 'medical', description: 'Medical legal, decriminalized for personal use' },
      { name: 'Lebanon', status: 'medical', description: 'Medical use legalized in 2020' },
      { name: 'India', status: 'illegal', description: 'Illegal but culturally tolerated in some regions' },
    ],
  },
  africa: {
    name: 'Africa',
    icon: '🌍',
    countries: [
      { name: 'South Africa', status: 'decriminalized', description: 'Private use and cultivation legal' },
      { name: 'Lesotho', status: 'medical', description: 'Medical cannabis legal for export' },
      { name: 'Zimbabwe', status: 'medical', description: 'Medical cannabis legal since 2018' },
      { name: 'Morocco', status: 'illegal', description: 'Illegal but major producer' },
    ],
  },
  oceania: {
    name: 'Oceania',
    icon: '🏝️',
    countries: [
      { name: 'Australia', status: 'medical', description: 'Medical legal nationwide, ACT decriminalized' },
      { name: 'New Zealand', status: 'medical', description: 'Medical legal, recreational narrowly rejected in 2020' },
    ],
  },
};

const statusColors = {
  recreational: getStatusHexColor('recreational'),
  medical: getStatusHexColor('medical'),
  decriminalized: getStatusHexColor('decriminalized'),
  illegal: getStatusHexColor('illegal'),
};

const statusLabels = {
  recreational: getStatusLabel('recreational'),
  medical: 'Medical Only',
  decriminalized: getStatusLabel('decriminalized'),
  illegal: getStatusLabel('illegal'),
};

const ContinentSelector: React.FC = () => {
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!selectedContinent ? (
          <motion.div
            key="selector"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-2 gap-4"
          >
            {Object.entries(continents).map(([key, continent]) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  onClick={() => setSelectedContinent(key)}
                  className="p-6 bg-gray-900/80 border-2 border-accent/30 hover:border-accent hover:shadow-xl hover:shadow-accent/20 cursor-pointer transition-all duration-300 backdrop-blur-xl"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{continent.icon}</div>
                    <h3 className="text-lg font-bold text-white">{continent.name}</h3>
                    <p className="text-xs text-gray-400 mt-1">{continent.countries.length} countries</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{continents[selectedContinent].icon}</span>
                <h3 className="text-2xl font-bold text-white">{continents[selectedContinent].name}</h3>
              </div>
              <button
                onClick={() => setSelectedContinent(null)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300 text-sm border border-gray-700"
              >
                ← Back
              </button>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {continents[selectedContinent].countries.map((country, index) => (
                <motion.div
                  key={country.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-4 bg-gray-900/60 border border-gray-800 hover:border-accent/50 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0 shadow-lg"
                        style={{ 
                          backgroundColor: statusColors[country.status],
                          boxShadow: `0 0 10px ${statusColors[country.status]}80`
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-white text-sm">{country.name}</h4>
                          <span 
                            className="text-xs px-2 py-1 rounded-full font-medium flex-shrink-0"
                            style={{ 
                              backgroundColor: `${statusColors[country.status]}20`,
                              color: statusColors[country.status],
                              border: `1px solid ${statusColors[country.status]}40`
                            }}
                          >
                            {statusLabels[country.status]}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">{country.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.5);
        }
      `}</style>
    </div>
  );
};

export default ContinentSelector;
