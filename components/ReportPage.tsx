import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Sparkles, BrainCircuit, Share2 } from 'lucide-react';
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
    <div className="pb-24 pt-6 px-4 animate-fade-in">
      <h2 className="text-2xl font-bold text-tea-100 mb-6 flex items-center gap-2">
        <BrainCircuit className="w-6 h-6 text-tea-400" />
        灵性周报
      </h2>

      {/* Mood Chart */}
      <div className="bg-tea-900/50 rounded-2xl p-4 border border-tea-800 mb-6">
        <h3 className="text-sm font-medium text-tea-300 mb-4">心情能量波动</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={records}>
              <CartesianGrid strokeDasharray="3 3" stroke="#166534" vertical={false} />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#86efac', fontSize: 10 }} 
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => val.split('-').slice(1).join('/')}
              />
              <YAxis hide domain={[0, 100]} />
              <Tooltip 
                cursor={{fill: '#166534', opacity: 0.3}}
                contentStyle={{ backgroundColor: '#064e3b', borderColor: '#16a34a', color: '#fff' }}
              />
              <Bar dataKey="moodScore" fill="#4ade80" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Summary Section */}
      <div className="bg-gradient-to-b from-tea-900 to-black rounded-2xl p-1 border border-tea-700/50">
        <div className="bg-tea-950/80 rounded-xl p-5 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gold-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              小绿茶的解读
            </h3>
            {!report && !loading && (
              <button 
                onClick={handleGenerateReport}
                className="text-xs bg-tea-700 hover:bg-tea-600 text-white px-3 py-1.5 rounded-full transition-colors"
              >
                生成报告
              </button>
            )}
          </div>

          {loading ? (
            <div className="py-8 flex flex-col items-center justify-center text-tea-400 space-y-3">
              <Sparkles className="w-8 h-8 animate-spin text-gold-400" />
              <p className="text-sm animate-pulse">正在连接宇宙能量场...</p>
            </div>
          ) : report ? (
            <div className="animate-fade-in">
              <div className="text-tea-100 text-sm leading-relaxed whitespace-pre-line border-l-2 border-gold-500 pl-4 py-2">
                {report}
              </div>
              <div className="mt-4 flex justify-end">
                <button className="flex items-center gap-1 text-xs text-tea-400 hover:text-white transition-colors">
                  <Share2 className="w-3 h-3" />
                  分享报告
                </button>
              </div>
            </div>
          ) : (
            <p className="text-tea-500 text-sm italic">
              点击生成，让小绿茶为你总结这一周的运势起伏，并给出专属建议。
            </p>
          )}
        </div>
      </div>
    </div>
  );
};