import React from 'react';
import { Sparkles, Zap, Diamond, Crown } from 'lucide-react';
import { RECHARGE_PACKAGES } from '../constants';
import { UserProfile } from '../types';

interface StorePageProps {
  user: UserProfile;
  onRecharge: (amount: number) => void;
}

export const StorePage: React.FC<StorePageProps> = ({ user, onRecharge }) => {
  return (
    <div className="pt-6 px-4 animate-fade-in">
      
      {/* Balance Card - Abstract Design */}
      <div className="glass-card rounded-2xl p-6 mb-10 relative overflow-hidden group">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-mystic-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gold-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <p className="text-mystic-400 text-xs tracking-[0.2em] uppercase mb-2">当前灵力</p>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-5xl font-serif text-white text-glow">{user.coins}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-900/20">
             <Crown className="w-3 h-3 text-gold-400" />
             <span className="text-[10px] text-gold-300 tracking-wider">VIP Lv.{user.vipLevel}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="h-px bg-mystic-800 flex-1"></div>
        <h2 className="text-sm font-serif text-mystic-300 flex items-center gap-2">
          <Sparkles className="w-3 h-3" />
          选择供奉
        </h2>
        <div className="h-px bg-mystic-800 flex-1"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {RECHARGE_PACKAGES.map((pkg, idx) => (
          <button
            key={pkg.id}
            onClick={() => onRecharge(pkg.coins)}
            className="group relative glass-card rounded-xl p-0 transition-all duration-300 hover:bg-white/5 active:scale-95 overflow-hidden"
          >
            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-mystic-500/0 to-mystic-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            {pkg.tag && (
              <div className="absolute top-0 right-0 bg-gold-600/90 text-white text-[9px] px-2 py-0.5 rounded-bl-lg font-medium z-20">
                {pkg.tag}
              </div>
            )}

            <div className="p-5 flex flex-col items-center gap-3 z-10 relative">
               {/* Icon based on tier */}
               <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${idx === 3 ? 'border-gold-500/40 bg-gold-500/10' : 'border-mystic-500/30 bg-mystic-500/10'}`}>
                  {idx === 3 ? <Diamond className="w-4 h-4 text-gold-400" /> : <Zap className="w-4 h-4 text-mystic-400" />}
               </div>

               <div className="text-center">
                 <div className="text-2xl font-serif text-mystic-100 group-hover:text-white transition-colors">
                   {pkg.coins} <span className="text-xs font-sans text-mystic-500 font-normal">灵石</span>
                 </div>
                 <div className="text-gold-400/80 text-sm font-medium mt-1">¥ {pkg.price}</div>
               </div>
            </div>
            
            {/* Decorative bottom line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-mystic-500/30 to-transparent"></div>
          </button>
        ))}
      </div>

      <p className="text-center text-[10px] text-mystic-600 mt-8 leading-relaxed px-8">
        供奉说明：灵力用于开启天眼、深度占卜及语音交互。<br/>心诚则灵，理性消费。
      </p>
    </div>
  );
};