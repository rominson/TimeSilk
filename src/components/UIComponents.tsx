
import React from 'react';

interface MiniStatCardProps {
  title: string;
  value: string | number | undefined;
  icon: React.ReactNode;
  color: string;
}

export const MiniStatCard: React.FC<MiniStatCardProps> = ({ title, value, icon, color }) => (
  <div className="bg-white p-4 rounded-2xl border border-stone-100 shadow-sm flex flex-col gap-1">
    <div className="flex items-center gap-2 text-stone-400">
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-wider">{title}</span>
    </div>
    <div className={`text-xl font-serif font-bold ${color}`}>{value ?? '--'}</div>
  </div>
);

export const LegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-2 h-2 rounded-full ${color}`} />
    <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{label}</span>
  </div>
);
