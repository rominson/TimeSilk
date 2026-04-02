
import React from 'react';
import { Plus, Target, Check, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LifeGoal } from '../types';

interface GoalListProps {
  goals: LifeGoal[];
  newGoalTitle: string;
  setNewGoalTitle: (val: string) => void;
  newGoalAge: number | '';
  setNewGoalAge: (val: number | '') => void;
  addGoal: () => void;
  goalError: string;
  toggleGoalCompletion: (id: string) => void;
  removeGoal: (id: string) => void;
}

export const GoalList: React.FC<GoalListProps> = ({
  goals,
  newGoalTitle,
  setNewGoalTitle,
  newGoalAge,
  setNewGoalAge,
  addGoal,
  goalError,
  toggleGoalCompletion,
  removeGoal,
}) => {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-stone-100 shadow-xl shadow-stone-100/50 flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-serif font-bold text-stone-800">人生里程碑</h2>
        <span className="bg-stone-50 text-stone-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          {goals.length} 个目标
        </span>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="你想要实现什么目标？" 
            value={newGoalTitle}
            onChange={(e) => setNewGoalTitle(e.target.value)}
            className="flex-1 bg-stone-50 border border-stone-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 transition-all"
          />
          <input 
            type="number" 
            placeholder="年龄" 
            value={newGoalAge}
            onChange={(e) => setNewGoalAge(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-20 bg-stone-50 border border-stone-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 transition-all"
          />
          <button 
            onClick={addGoal}
            className="bg-stone-900 text-white p-3 rounded-2xl hover:bg-stone-800 transition-all shadow-lg shadow-stone-200 active:scale-95"
          >
            <Plus size={20} />
          </button>
        </div>
        {goalError && <p className="text-red-400 text-[10px] font-bold uppercase ml-2">{goalError}</p>}
      </div>

      <div className="flex-1 overflow-auto pr-2 custom-scrollbar space-y-3">
        <AnimatePresence mode="popLayout">
          {goals.sort((a, b) => a.age - b.age).map((goal) => (
            <motion.div 
              key={goal.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`
                group flex items-center justify-between p-4 rounded-2xl border transition-all
                ${goal.completed 
                  ? 'bg-emerald-50/30 border-emerald-100' 
                  : 'bg-white border-stone-50 hover:border-stone-200 hover:shadow-md hover:shadow-stone-100/50'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleGoalCompletion(goal.id)}
                  className={`
                    w-6 h-6 rounded-lg flex items-center justify-center transition-all
                    ${goal.completed 
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' 
                      : 'bg-stone-50 text-stone-300 hover:bg-stone-100'
                    }
                  `}
                >
                  {goal.completed ? <Check size={14} strokeWidth={3} /> : <Target size={14} />}
                </button>
                <div>
                  <h3 className={`text-sm font-medium transition-all ${goal.completed ? 'text-stone-400 line-through' : 'text-stone-700'}`}>
                    {goal.title}
                  </h3>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">目标年龄: {goal.age}</p>
                </div>
              </div>
              <button 
                onClick={() => removeGoal(goal.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-stone-300 hover:text-red-400 transition-all"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
