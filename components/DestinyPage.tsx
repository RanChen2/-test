import React, { useState } from 'react';
import { Sparkles, Calendar, MapPin, User, ArrowRight, RefreshCcw, Fingerprint } from 'lucide-react';
import { BarChart, Bar, XAxis, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';

interface DestinyPageProps {
  onComplete: () => void;
}

export const DestinyPage: React.FC<DestinyPageProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'input' | 'calculating' | 'result'>('input');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [location, setLocation] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('calculating');
    // Simulate mystical calculation
    setTimeout(() => {
      setStep('result');
    }, 3500);
  };

  // Mock data for the result
  const soulData = [
    { subject: '金 (Metal)', A: 80, fullMark: 100 },
    { subject: '木 (Wood)', A: 65, fullMark: 100 },
    { subject: '水 (Water)', A: 90, fullMark: 100 },
    { subject: '火 (Fire)', A: 40, fullMark: 100 },
    { subject: '土 (Earth)', A: 70, fullMark: 100 },
  ];

  return (
    <div className="pt-6 px-4 animate-fade-in h-full flex flex-col relative">
      
      {/* Background Ambience specifically for this page */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-mystic-500/10 rounded-full blur-[80px] animate-pulse-glow"></div>
         <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold-500/10 rounded-full blur-[80px] animate-pulse-glow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="text-center mb-6 relative z-10">
        <h2 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-mystic-100 to-gold-200 mb-1">
          {step === 'input' && "命理定契"}
          {step === 'calculating' && "五行流转"}
          {step === 'result' && "灵体共生"}
        </h2>
        <p className="text-mystic-500 text-[10px] tracking-[0.3em] uppercase">
          {step === 'input' && "Inscribing Your Destiny"}
          {step === 'calculating' && "Harmonizing Elements"}
          {step === 'result' && "Soul Resonance Established"}
        </p>
      </div>

      <div className="flex-1 relative z-10">
        {step === 'input' && (
          <div className="glass-card rounded-2xl p-6 border border-mystic-500/20">
            <form onSubmit={handleCalculate} className="space-y-6">
              
              {/* Gender Selector */}
              <div className="flex justify-center gap-6 mb-8">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${gender === 'male' ? 'border-mystic-400 bg-mystic-500/20 shadow-[0_0_20px_rgba(94,234,212,0.3)]' : 'border-mystic-800 opacity-50'}`}
                >
                  <span className="text-xl font-serif text-mystic-100">乾</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${gender === 'female' ? 'border-gold-400 bg-gold-500/20 shadow-[0_0_20px_rgba(251,191,36,0.3)]' : 'border-mystic-800 opacity-50'}`}
                >
                   <span className="text-xl font-serif text-gold-100">坤</span>
                </button>
              </div>

              {/* Date Input */}
              <div className="space-y-2 group">
                <label className="text-mystic-400 text-[10px] uppercase tracking-wider flex items-center gap-2">
                   <Calendar className="w-3 h-3" /> 生辰 (Date)
                </label>
                <input 
                  type="date" 
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full bg-transparent border-b border-mystic-700 py-2 text-white placeholder-mystic-700 focus:outline-none focus:border-mystic-400 transition-colors text-sm font-serif"
                />
              </div>

              {/* Time Input */}
              <div className="space-y-2 group">
                <label className="text-mystic-400 text-[10px] uppercase tracking-wider flex items-center gap-2">
                   <Sparkles className="w-3 h-3" /> 时辰 (Time)
                </label>
                <input 
                  type="time" 
                  required
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="w-full bg-transparent border-b border-mystic-700 py-2 text-white placeholder-mystic-700 focus:outline-none focus:border-mystic-400 transition-colors text-sm font-serif"
                />
              </div>

              {/* Location Input */}
              <div className="space-y-2 group">
                <label className="text-mystic-400 text-[10px] uppercase tracking-wider flex items-center gap-2">
                   <MapPin className="w-3 h-3" /> 降生之地 (Location)
                </label>
                <input 
                  type="text" 
                  placeholder="例如: 中国 上海"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent border-b border-mystic-700 py-2 text-white placeholder-mystic-700 focus:outline-none focus:border-mystic-400 transition-colors text-sm font-serif"
                />
              </div>

              <button type="submit" className="w-full mt-8 bg-gradient-to-r from-mystic-800 to-mystic-900 hover:from-mystic-700 hover:to-mystic-800 border border-mystic-600 text-mystic-100 py-3 rounded-lg flex items-center justify-center gap-2 group transition-all">
                <span className="tracking-[0.2em] font-serif">推演命盘</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        )}

        {step === 'calculating' && (
          <div className="h-full flex flex-col items-center justify-center -mt-10">
             {/* Five Elements Animation */}
             <div className="relative w-64 h-64 animate-[spin_10s_linear_infinite]">
                {[0, 72, 144, 216, 288].map((deg, i) => (
                  <div 
                    key={i}
                    className="absolute top-0 left-1/2 -ml-3 w-6 h-6 rounded-full blur-md"
                    style={{
                      transform: `rotate(${deg}deg) translateY(-80px)`,
                      backgroundColor: ['#d1fae5', '#fca5a5', '#fde047', '#e5e7eb', '#93c5fd'][i]
                    }}
                  ></div>
                ))}
                {/* Central Core */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-mystic-500/30 animate-pulse flex items-center justify-center">
                    <span className="text-4xl font-serif text-mystic-200 animate-pulse">命</span>
                </div>
             </div>
             
             <div className="mt-8 text-center space-y-2">
               <p className="text-mystic-300 text-xs tracking-widest animate-pulse">正在解析天干地支...</p>
               <p className="text-mystic-500 text-[10px] tracking-widest delay-75">五行能量聚合中...</p>
             </div>
          </div>
        )}

        {step === 'result' && (
          <div className="animate-fade-in space-y-6">
            {/* Soul Identity Card */}
            <div className="glass-card rounded-2xl p-0 overflow-hidden relative border border-gold-500/30">
               <div className="bg-gradient-to-b from-mystic-800 to-mystic-950 p-6 flex flex-col items-center text-center relative">
                  <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
                  
                  <div className="w-24 h-24 rounded-full border-2 border-gold-500/50 p-1 mb-4 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                    <img src={`https://api.dicebear.com/9.x/notionists/svg?seed=${name || 'Destiny'}`} className="w-full h-full rounded-full bg-mystic-900" alt="Soul" />
                  </div>
                  
                  <h3 className="text-2xl font-serif text-gold-300 mb-1">玄水隐士</h3>
                  <p className="text-[10px] text-gold-500/70 tracking-[0.2em] uppercase mb-4">Water Element Sage</p>
                  
                  <p className="text-mystic-200 text-xs leading-relaxed font-light px-4">
                    "生于{birthDate.split('-')[1]}月，水木相生。你的灵魂深处藏着古老的智慧，如同深林中的静潭，外表波澜不惊，内里包罗万象。"
                  </p>
               </div>
            </div>

            {/* Five Elements Chart */}
            <div className="glass-card rounded-xl p-4">
               <h4 className="text-xs font-serif text-mystic-400 mb-4 text-center tracking-widest">五行能量分布</h4>
               <div className="h-48 w-full -ml-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={soulData}>
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#99f6e4', fontSize: 10 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name="Soul"
                        dataKey="A"
                        stroke="#2da892"
                        strokeWidth={2}
                        fill="#2da892"
                        fillOpacity={0.4}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
               </div>
            </div>

            <button 
              onClick={onComplete}
              className="w-full py-4 text-xs text-mystic-500 hover:text-mystic-300 flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCcw className="w-3 h-3" />
              重新推演
            </button>
          </div>
        )}
      </div>
    </div>
  );
};