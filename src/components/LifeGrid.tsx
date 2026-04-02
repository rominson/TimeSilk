
import React from 'react';
import { motion } from 'motion/react';
import { Target, Check } from 'lucide-react';
import { LegendItem } from './UIComponents';
import { LifeGoal, Stats } from '../types';

interface LifeGridProps {
  birthDate: string;
  gridItems: boolean[];
  goalMap: Map<number, LifeGoal[]>;
  stats: Stats | null;
}

export const LifeGrid: React.FC<LifeGridProps> = ({
  birthDate,
  gridItems,
  goalMap,
  stats,
}) => {
  return (
    <div className="flex-[2] bg-white rounded-[2.5rem] p-6 md:p-10 border border-stone-100 shadow-xl shadow-stone-100/50 flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-800">人生网格</h2>
          <p className="text-sm text-stone-400">每个方格代表你百年人生旅程中的一个月。</p>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <LegendItem color="bg-stone-800" label="已度过" />
          <LegendItem color="bg-stone-50" label="未来" />
          <LegendItem color="bg-emerald-400" label="目标" />
        </div>
      </div>

      <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(12px,1fr))] gap-1.5 md:gap-2">
          {gridItems.map((isLived, i) => {
            const goalsAtMonth = goalMap.get(i);
            const hasGoal = goalsAtMonth && goalsAtMonth.length > 0;
            const allCompleted = hasGoal && goalsAtMonth?.every(g => g.completed);

            return (
              <motion.div
                key={i}
                initial={false}
                animate={{ 
                  scale: isLived ? 1 : 0.95,
                  opacity: isLived ? 1 : 0.5
                }}
                className={`
                  aspect-square rounded-[3px] md:rounded-sm transition-all duration-500 relative group
                  ${hasGoal 
                    ? (allCompleted ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-emerald-400') 
                    : (isLived ? 'bg-stone-800' : 'bg-stone-50 hover:bg-stone-100')
                  }
                `}
              >
                {hasGoal && (
                  <div className="absolute inset-0 flex items-center justify-center text-white pointer-events-none">
                    {allCompleted ? <Check size={8} strokeWidth={4} /> : <Target size={8} strokeWidth={3} />}
                  </div>
                )}
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-stone-900 text-white text-[10px] rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {Math.floor(i / 12)}岁 {i % 12}个月
                  {hasGoal && goalsAtMonth?.map(g => (
                    <div key={g.id} className="mt-1 flex items-center gap-1">
                      <div className={`w-1 h-1 rounded-full ${g.completed ? 'bg-emerald-400' : 'bg-white'}`} />
                      {g.title}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
