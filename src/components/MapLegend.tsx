import React from 'react';
import { motion } from 'framer-motion';

const legendItems = [
  { status: 'Recreational', color: '#22c55e', description: 'Fully legal for adult use' },
  { status: 'Medical Only', color: '#eab308', description: 'Legal with prescription' },
  { status: 'Decriminalized', color: '#3b82f6', description: 'Not criminal offense' },
  { status: 'Illegal', color: '#ef4444', description: 'Prohibited by law' },
];

const MapLegend: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8"
    >
      {legendItems.map((item, index) => (
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
              backgroundColor: item.color,
              boxShadow: `0 0 15px ${item.color}60`
            }}
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">{item.status}</span>
            <span className="text-xs text-gray-400 hidden md:block">{item.description}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MapLegend;
