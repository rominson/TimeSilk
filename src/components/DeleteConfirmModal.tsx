
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
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
            className="relative z-10 bg-white w-full max-w-sm p-8 rounded-[2rem] shadow-2xl border border-stone-100"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-6">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-800 mb-2">{title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-8">{message}</p>
              
              <div className="flex flex-col w-full gap-3">
                <button 
                  onClick={onConfirm}
                  className="w-full py-4 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  永久删除
                </button>
                <button 
                  onClick={onClose}
                  className="w-full py-4 bg-transparent text-stone-400 rounded-2xl font-bold hover:text-stone-600 transition-all"
                >
                  取消
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
