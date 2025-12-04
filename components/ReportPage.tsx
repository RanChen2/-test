import React, { useState } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Sparkles, ScrollText, Share2, Loader2 } from 'lucide-react';
import { FortuneRecord } from '../types';
import { generateWeeklyReport } from '../services/aiService';

interface ReportPageProps {
  records: FortuneRecord[];
}

export const ReportPage: React.FC<ReportPageProps> = ({ records }) => {
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    setLoading(true);
    const result = await generateWeeklyReport(records);
    setReport(result);
    setLoading(false);
  };

  return (
    <div className="pt-6 px-4 animate-fade-in space-y-8">
      
      {/* Chart Section */}
      <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-serif text-mystic-300 tracking-wider">灵场波动</h3>
          <span className="text-[10px] text-mystic-600 bg-mystic-900/40 px-2 py-0.5 rounded-full border border-mystic-800">近7日</span>
        </div>
        
        <div className="h-40 w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={records}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(45, 168, 146, 0.1)" vertical={false} />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#5eead4', fontSize: 9, opacity: 0.6 }} 
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => val.split('-').slice(2).join('')}
              />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                contentStyle={{ backgroundColor: '#02120e', borderColor: '#13675a', color: '#ccfbf1', borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: '#5eead4' }}
              />
              <Bar 
                dataKey="moodScore" 
                fill="url(#barGradient)" 
                radius={[2, 2, 0, 0]} 
                barSize={12} 
                animationDuration={1500}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5eead4" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#13675a" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Report Section */}
      <div className="relative">
        {/* Decorative corner accents */}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-gold-500/30 rounded-tl-lg"></div>
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-gold-500/30 rounded-tr-lg"></div>
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-gold-500/30 rounded-bl-lg"></div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-gold-500/30 rounded-br-lg"></div>

        <div className="glass-card rounded-xl p-6 min-h-[200px] flex flex-col">
          <div className="flex justify-between items-center mb-4 border-b border-mystic-500/10 pb-3">
            <h3 className="text-lg font-serif font-bold text-gold-400 flex items-center gap-2">
              <ScrollText className="w-4 h-4" />
              天机解读
            </h3>
            {!report && !loading && (
              <button 
                onClick={handleGenerateReport}
                className="text-xs bg-mystic-800/80 hover:bg-mystic-700 text-mystic-200 px-4 py-1.5 rounded-full border border-mystic-600/50 transition-colors tracking-wide"
              >
                开启卷轴
              </button>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {loading ? (
              <div className="py-8 flex flex-col items-center justify-center text-mystic-400 space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping opacity-20 bg-mystic-400 rounded-full"></div>
                  <Loader2 className="w-8 h-8 animate-spin text-gold-400" />
                </div>
                <p className="text-xs animate-pulse tracking-widest text-mystic-500">观星象中...</p>
              </div>
            ) : report ? (
              <div className="animate-fade-in relative">
                <div className="text-mystic-100/90 text-sm leading-8 font-serif whitespace-pre-line tracking-wide">
                  {report}
                </div>
                <div className="mt-6 pt-4 border-t border-dashed border-mystic-500/20 flex justify-end">
                  <button className="flex items-center gap-2 text-xs text-gold-500/80 hover:text-gold-400 transition-colors">
                    <Share2 className="w-3 h-3" />
                    泄露天机
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-mystic-600 text-xs italic text-center leading-loose">
                "万物皆有灵，数据亦有命。<br/>点击开启卷轴，查看本周运势总结。"
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};