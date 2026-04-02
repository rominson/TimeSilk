
import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const EmptyState: React.FC = () => (
  <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md"
    >
      <div className="w-20 h-20 bg-stone-50 rounded-3xl flex items-center justify-center text-stone-300 mx-auto mb-8 shadow-inner">
        <Compass size={40} strokeWidth={1} />
      </div>
      <h2 className="text-3xl font-serif font-bold text-stone-800 mb-4">开启你的旅程</h2>
      <p className="text-stone-500 leading-relaxed mb-10">
        在上方输入你的出生日期，可视化你的人生旅程，并开始通过时间隧道发送信息。
      </p>
      <div className="flex items-center justify-center gap-2 text-stone-300">
        <Sparkles size={16} />
        <span className="text-xs font-bold uppercase tracking-widest">静候你的到来</span>
        <Sparkles size={16} />
      </div>
    </motion.div>
  </div>
);
