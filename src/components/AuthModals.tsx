
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Award, Check, X, LogIn, Mail, Lock, Sparkles } from 'lucide-react';

interface AuthModalsProps {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (val: boolean) => void;
  isOnboardingModalOpen: boolean;
  setIsOnboardingModalOpen: (val: boolean) => void;
  loginEmail: string;
  setLoginEmail: (val: string) => void;
  loginPassword: string;
  setLoginPassword: (val: string) => void;
  loginError: string | null;
  isLoggingIn: boolean;
  handleEmailLogin: (e: React.FormEvent) => void;
  handleEmailSignUp: (e: React.FormEvent) => void;
  onboardingName: string;
  setOnboardingName: (val: string) => void;
  updateUserName: (name: string) => void;
  isUpdatingName: boolean;
}

export const AuthModals: React.FC<AuthModalsProps> = ({
  isLoginModalOpen,
  setIsLoginModalOpen,
  isOnboardingModalOpen,
  setIsOnboardingModalOpen,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  loginError,
  isLoggingIn,
  handleEmailLogin,
  handleEmailSignUp,
  onboardingName,
  setOnboardingName,
  updateUserName,
  isUpdatingName,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isLoginModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl border border-stone-100 overflow-hidden"
            >
              <div className="p-8 pb-0 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-stone-800">{isSignUp ? '加入人生网格' : '欢迎回来'}</h2>
                  <p className="text-sm text-stone-400 mt-1">你的时空之旅仍在继续。</p>
                </div>
                <button onClick={() => setIsLoginModalOpen(false)} className="p-2 hover:bg-stone-50 rounded-full transition-colors">
                  <X size={20} className="text-stone-300" />
                </button>
              </div>

              <div className="p-8">
                <form onSubmit={isSignUp ? handleEmailSignUp : handleEmailLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">手机号或邮箱</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                      <input 
                        type="email" 
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 transition-all"
                        placeholder="手机号或邮箱"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">密码</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                      <input 
                        type="password" 
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  {loginError && (
                    <p className="text-red-500 text-xs font-medium text-center bg-red-50 py-2 rounded-lg">{loginError}</p>
                  )}

                  <button 
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 transition-all shadow-xl shadow-stone-200 active:scale-[0.98] disabled:opacity-50"
                  >
                    {isLoggingIn ? '处理中...' : (isSignUp ? '创建账户' : '登录')}
                  </button>
                </form>

                <p className="text-center mt-8 text-sm text-stone-400">
                  {isSignUp ? '已有账户？' : "还没有账户？"}
                  <button 
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="ml-2 text-stone-800 font-bold hover:underline"
                  >
                    {isSignUp ? '登录' : '注册'}
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOnboardingModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 bg-white w-full max-w-md rounded-[3rem] shadow-2xl border border-stone-100 overflow-hidden"
            >
              <div className="p-10 text-center">
                <div className="w-20 h-20 bg-stone-900 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-stone-200">
                  <Sparkles size={40} />
                </div>
                <h2 className="text-3xl font-serif font-bold text-stone-800 mb-2">欢迎，旅人</h2>
                <p className="text-stone-400 text-sm mb-10 leading-relaxed">
                  在开始你的人生网格之旅前，我们该如何称呼你？
                </p>

                <div className="space-y-6">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">你的名字</label>
                    <input 
                      type="text" 
                      value={onboardingName}
                      onChange={(e) => setOnboardingName(e.target.value)}
                      placeholder="例如：张三"
                      className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 transition-all text-center font-medium"
                    />
                  </div>

                  <button 
                    onClick={() => updateUserName(onboardingName)}
                    disabled={!onboardingName.trim() || isUpdatingName}
                    className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 transition-all shadow-xl shadow-stone-200 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isUpdatingName ? '保存中...' : '开始旅程'}
                    <Check size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
