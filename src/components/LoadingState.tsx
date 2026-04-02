
import React from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'motion/react';

export const LoadingState: React.FC = () => (
  <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center">
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="text-stone-300"
    >
      <Clock size={48} strokeWidth={1} />
    </motion.div>
  </div>
);
