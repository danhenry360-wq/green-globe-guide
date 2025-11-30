import React from 'react';
import { motion } from 'framer-motion';
import { getStatusHexColor, getStatusLabel } from '@/lib/legal-status-colors';

const legendItems = [
  { status: 'recreational', label: 'Recreational', description: 'Fully legal for adult use' },
  { status: 'medical', label: 'Medical Only', description: 'Legal with prescription' },
  { status: 'decriminalized', label: 'Decriminalized', description: 'Not criminal offense' },
  { status: 'mixed', label: 'Mixed', description: 'Varies by region' },
  { status: 'illegal', label: 'Illegal', description: 'Prohibited by law' },
];

const MapLegend: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8"
    >
      {legendItems.map((item, index) => {
        const color = getStatusHexColor(item.status);
        return (
          <motion.div
            key={item.status}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-center gap-2 group"
          >
            <div
              className="w-4 h-4 rounded-full transition-all duration-300 group-hover:scale-125 shadow-lg"
              style={{ 
                backgroundColor: color,
                boxShadow: `0 0 15px ${color}60`
              }}
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">{item.label}</span>
              <span className="text-xs text-gray-400 hidden md:block">{item.description}</span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default MapLegend;