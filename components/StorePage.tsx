import React from 'react';
import { CreditCard, Sparkles, Zap } from 'lucide-react';
import { RECHARGE_PACKAGES } from '../constants';
import { UserProfile } from '../types';

interface StorePageProps {
  user: UserProfile;
  onRecharge: (amount: number) => void;
}

export const StorePage: React.FC<StorePageProps> = ({ user, onRecharge }) => {
  return (
    <div className="pb-24 pt-6 px-4 animate-fade-in">
      <div className="bg-gradient-to-r from-tea-800 to-tea-900 rounded-2xl p-6 mb-8 text-white shadow-lg border border-tea-700 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-tea-200 text-sm mb-1">当前灵力值 (余额)</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold font-mono">{user.coins}</span>
            <span className="text-sm">灵力币</span>
          </div>
          <div className="mt-4 flex gap-2">
             <span className="px-2 py-1 bg-gold-600/20 text-gold-400 text-xs rounded border border-gold-600/50">
               VIP Lv.{user.vipLevel}
             </span>
          </div>
        </div>
        <Zap className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-tea-700/30 rotate-12" />
      </div>

      <h2 className="text-xl font-bold text-tea-100 mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-gold-400" />
        灵力充值
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {RECHARGE_PACKAGES.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => onRecharge(pkg.coins)}
            className="relative bg-tea-900/50 border border-tea-700 hover:border-tea-500 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all active:scale-95 group"
          >
            {pkg.tag && (
              <span className="absolute top-0 right-0 bg-gold-600 text-white text-[10px] px-2 py-1 rounded-bl-lg rounded-tr-lg font-bold">
                {pkg.tag}
              </span>
            )}
            <div className="text-2xl font-bold text-tea-100 group-hover:text-tea-300">
              {pkg.coins} <span className="text-sm font-normal">币</span>
            </div>
            <div className="text-gold-400 font-medium">¥ {pkg.price}</div>
          </button>
        ))}
      </div>

      <div className="mt-8 bg-tea-900/30 rounded-xl p-4 border border-tea-800">
        <h3 className="text-sm font-bold text-tea-300 mb-2">服务说明</h3>
        <ul className="text-xs text-tea-400 space-y-1 list-disc list-inside">
          <li>灵力币用于驱动小绿茶AI进行深度占卜和语音交互。</li>
          <li>每次普通对话消耗1币，深度塔罗牌阵消耗10币。</li>
          <li>充值遇到问题请联系客服。</li>
        </ul>
      </div>
      
      <button className="w-full mt-6 py-3 rounded-full border border-tea-700 text-tea-300 text-sm flex items-center justify-center gap-2 hover:bg-tea-800 transition-colors">
        <CreditCard className="w-4 h-4" />
        查看消费记录
      </button>
    </div>
  );
};