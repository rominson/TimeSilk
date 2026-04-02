
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, Unlock, Lock, Feather, X, RefreshCw } from 'lucide-react';
import { Stats } from '../types';
import { WRITING_PROMPTS } from '../constants';

interface WritingLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  newLetterContent: string;
  setNewLetterContent: (val: string) => void;
  newLetterAge: number | '';
  setNewLetterAge: (val: number | '') => void;
  newCenturyLetterContent: string;
  setNewCenturyLetterContent: (val: string) => void;
  letterError: string;
  setLetterError: (val: string) => void;
  addLetter: () => void;
  stats: Stats | null;
}

export const WritingLetterModal: React.FC<WritingLetterModalProps> = ({
  isOpen,
  onClose,
  newLetterContent,
  setNewLetterContent,
  newLetterAge,
  setNewLetterAge,
  newCenturyLetterContent,
  setNewCenturyLetterContent,
  letterError,
  setLetterError,
  addLetter,
  stats,
}) => {
  const [writingLetterType, setWritingLetterType] = useState<'general' | 'century'>('general');
  const [currentInspiration, setCurrentInspiration] = useState<string | null>(null);

  const ageIn2100 = stats ? (2100 - (new Date().getFullYear() - stats.yearsLived)) : 100;

  const getRandomInspiration = () => {
    const prompts = writingLetterType === 'general' ? WRITING_PROMPTS.general : WRITING_PROMPTS.century;
    const random = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentInspiration(random);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-10 bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-stone-100 overflow-hidden flex flex-col max-h-[90vh] md:scale-100 scale-[0.6] origin-center"
          >
            <div className="p-6 md:p-8 border-b border-stone-50 flex items-center justify-between bg-stone-50/30">
              <div className="flex items-center gap-3">
                <div>
                  <h2 className="text-xl font-serif font-bold text-stone-800">写给未来</h2>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">跨越时间的鸿沟</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                <X size={20} className="text-stone-400" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6 md:p-8">
              <div className="flex p-1 bg-stone-100 rounded-2xl mb-8 w-fit mx-auto">
                <button 
                  onClick={() => setWritingLetterType('general')}
                  className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${writingLetterType === 'general' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
                >
                  未来的自己
                </button>
                <button 
                  onClick={() => setWritingLetterType('century')}
                  className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${writingLetterType === 'century' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
                >
                  22世纪
                </button>
              </div>

              {writingLetterType === 'general' ? (
                <div className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">开启年龄</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="number" 
                        placeholder="例如：30" 
                        value={newLetterAge}
                        onChange={(e) => setNewLetterAge(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-24 bg-stone-50 border border-stone-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200"
                      />
                      <p className="text-xs text-stone-400 italic">
                        {newLetterAge ? `这封信将在你 ${newLetterAge} 岁时开启。` : '选择一个开启这封信的年龄。'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between ml-1">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">你的信息</label>
                      <button 
                        onClick={getRandomInspiration}
                        className="flex items-center gap-1.5 text-[10px] font-bold text-stone-400 hover:text-stone-600 transition-colors"
                      >
                        <RefreshCw size={10} />
                        获取灵感
                      </button>
                    </div>
                    
                    <AnimatePresence mode="wait">
                      {currentInspiration && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-stone-50 p-4 rounded-2xl border border-stone-100 text-xs text-stone-500 italic relative group"
                        >
                          "{currentInspiration}"
                          <button onClick={() => setCurrentInspiration(null)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <X size={12} />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <textarea 
                      placeholder="亲爱的未来的自己..." 
                      value={newLetterContent}
                      onChange={(e) => setNewLetterContent(e.target.value)}
                      className="w-full h-48 bg-stone-50 border border-stone-100 rounded-[2rem] px-6 py-5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 resize-none leading-relaxed"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-stone-900 rounded-[2rem] p-6 text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={16} className="text-stone-400" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">世纪旅人计划</span>
                      </div>
                      <h3 className="text-xl font-serif font-bold mb-2">见证 2100 年</h3>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        这条信息注定要传往下一个世纪。届时你大约 <span className="text-white font-bold">{ageIn2100} 岁</span>。 
                        我们将为你颁发一份特别的“世纪旅人”证书。
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between ml-1">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">给 2100 年的信息</label>
                      <button 
                        onClick={getRandomInspiration}
                        className="flex items-center gap-1.5 text-[10px] font-bold text-stone-400 hover:text-stone-600 transition-colors"
                      >
                        <RefreshCw size={10} />
                        获取灵感
                      </button>
                    </div>

                    <AnimatePresence mode="wait">
                      {currentInspiration && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-stone-50 p-4 rounded-2xl border border-stone-100 text-xs text-stone-500 italic"
                        >
                          "{currentInspiration}"
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <textarea 
                      placeholder="致 2100 年的世界..." 
                      value={newCenturyLetterContent}
                      onChange={(e) => setNewCenturyLetterContent(e.target.value)}
                      className="w-full h-48 bg-stone-50 border border-stone-100 rounded-[2rem] px-6 py-5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 resize-none leading-relaxed"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 md:p-8 border-t border-stone-50 bg-stone-50/30 flex flex-col gap-4">
              {letterError && <p className="text-red-400 text-[10px] font-bold uppercase text-center">{letterError}</p>}
              <button 
                onClick={addLetter}
                className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 transition-all shadow-xl shadow-stone-200 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Send size={18} />
                寄往未来
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
