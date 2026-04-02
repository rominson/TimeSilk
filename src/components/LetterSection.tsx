
import React from 'react';
import { Feather, Mail, Lock, Unlock, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FutureLetter, Stats } from '../types';

interface LetterSectionProps {
  letters: FutureLetter[];
  stats: Stats | null;
  setIsWritingLetter: (val: boolean) => void;
  removeLetter: (id: string) => void;
  openLetter: (letter: FutureLetter) => void;
}

export const LetterSection: React.FC<LetterSectionProps> = ({
  letters,
  stats,
  setIsWritingLetter,
  removeLetter,
  openLetter,
}) => {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-stone-100 shadow-xl shadow-stone-100/50 flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-serif font-bold text-stone-800">时间胶囊</h2>
        <button 
          onClick={() => setIsWritingLetter(true)}
          className="flex items-center gap-2 text-stone-900 hover:text-stone-600 transition-colors"
        >
          <Feather size={18} />
          <span className="text-xs font-bold uppercase tracking-widest">写信</span>
        </button>
      </div>

      <div className="flex-1 overflow-auto pr-2 custom-scrollbar space-y-4">
        <AnimatePresence mode="popLayout">
          {letters.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-stone-50 rounded-[2rem]">
              <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center text-stone-200 mb-4">
                <Mail size={24} strokeWidth={1} />
              </div>
              <p className="text-sm text-stone-400">还没有寄往未来的信件。</p>
            </div>
          ) : (
            letters.sort((a, b) => a.age - b.age).map((letter) => {
              const isUnlocked = (stats?.yearsLived || 0) >= letter.age;
              
              return (
                <motion.div 
                  key={letter.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`
                    group relative p-5 rounded-[2rem] border transition-all cursor-pointer
                    ${isUnlocked 
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xl shadow-stone-200' 
                      : 'bg-stone-50 border-stone-100 hover:bg-white hover:border-stone-200'
                    }
                  `}
                  onClick={() => isUnlocked && openLetter(letter)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-10 h-10 rounded-2xl flex items-center justify-center
                        ${isUnlocked ? 'bg-white/10 text-white' : 'bg-white text-stone-300 shadow-sm'}
                      `}>
                        {isUnlocked ? <Unlock size={18} /> : <Lock size={18} />}
                      </div>
                      <div>
                        <p className={`text-[10px] font-bold uppercase tracking-widest ${isUnlocked ? 'text-white/50' : 'text-stone-400'}`}>
                          {letter.age} 岁解锁
                        </p>
                        <h3 className="text-sm font-serif font-bold">
                          {isUnlocked ? '来自过去的讯息' : '已锁定的时间胶囊'}
                        </h3>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeLetter(letter.id); }}
                      className={`p-2 transition-all ${isUnlocked ? 'text-white/30 hover:text-white' : 'text-stone-300 hover:text-red-400'}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  {!isUnlocked && (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-stone-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-stone-400 transition-all duration-1000" 
                          style={{ width: `${Math.min(100, ((stats?.yearsLived || 0) / letter.age) * 100)}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-stone-400 tabular-nums">
                        还剩 {Math.max(0, letter.age - (stats?.yearsLived || 0))} 年
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
