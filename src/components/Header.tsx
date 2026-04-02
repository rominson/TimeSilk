
import React from 'react';
import { 
  Calendar, 
  User, 
  LogOut, 
  LogIn, 
  Award,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Certificate } from '../types';

interface HeaderProps {
  birthDate: string;
  setBirthDate: (date: string) => void;
  user: any;
  isUserMenuOpen: boolean;
  setIsUserMenuOpen: (open: boolean) => void;
  allCertificates: Certificate[];
  setCurrentCertificateIndex: (index: number) => void;
  setIsCertificateModalOpen: (open: boolean) => void;
  handleLogout: () => void;
  setIsLoginModalOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  birthDate,
  setBirthDate,
  user,
  isUserMenuOpen,
  setIsUserMenuOpen,
  allCertificates,
  setCurrentCertificateIndex,
  setIsCertificateModalOpen,
  handleLogout,
  setIsLoginModalOpen,
}) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-stone-100 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-stone-200">
          <Calendar size={20} />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-lg font-serif font-bold text-stone-800 leading-tight">人生网格</h1>
          <p className="text-[10px] text-stone-400 uppercase tracking-widest font-medium">生命的编年史</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group">
          <input 
            type="date" 
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 transition-all cursor-pointer hover:bg-stone-100"
          />
          <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] text-stone-400 font-bold uppercase tracking-tighter">出生日期</div>
        </div>

        {user ? (
          <div className="relative">
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl px-3 py-2 transition-all"
            >
              <div className="w-6 h-6 bg-stone-200 rounded-full flex items-center justify-center text-stone-500 overflow-hidden">
                <User size={14} />
              </div>
              <span className="text-sm font-medium text-stone-700 hidden sm:block">{user.name}</span>
              <ChevronDown size={14} className={`text-stone-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isUserMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden z-20"
                  >
                    <div className="p-4 border-b border-stone-50 bg-stone-50/50">
                      <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mb-1">已登录为</p>
                      <p className="text-sm font-medium text-stone-800 truncate">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <button 
                        onClick={() => {
                          if (allCertificates.length > 0) {
                            setCurrentCertificateIndex(0);
                            setIsCertificateModalOpen(true);
                          }
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-stone-600 hover:bg-stone-50 rounded-xl transition-colors"
                      >
                        <Award size={16} className="text-stone-400" />
                        我的证书
                        {allCertificates.length > 0 && (
                          <span className="ml-auto bg-stone-100 text-stone-500 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                            {allCertificates.length}
                          </span>
                        )}
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <LogOut size={16} />
                        退出登录
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <button 
            onClick={() => setIsLoginModalOpen(true)}
            className="bg-stone-900 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-stone-800 transition-all shadow-lg shadow-stone-200 active:scale-95 flex items-center gap-2"
          >
            <LogIn size={16} />
            登录
          </button>
        )}
      </div>
    </header>
  );
};
