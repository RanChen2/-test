import React, { useState } from 'react';
import { Wifi, CheckCircle2, RotateCcw, QrCode, Fingerprint, ScanLine } from 'lucide-react';
import { DeviceStatus } from '../types';

interface DeviceSetupProps {
  deviceStatus: DeviceStatus;
  onConnect: () => void;
}

export const DeviceSetup: React.FC<DeviceSetupProps> = ({ deviceStatus, onConnect }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');

  const handleWifiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    // Simulate connection delay
    setTimeout(() => {
      setStep(3);
      onConnect();
    }, 4000);
  };

  return (
    <div className="pt-6 px-4 animate-fade-in h-full flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-mystic-100 to-mystic-400 mb-2">
          {step === 1 && "灵脉契约"}
          {step === 2 && "视觉共鸣"}
          {step === 3 && "契约达成"}
        </h2>
        <p className="text-mystic-500 text-xs tracking-widest uppercase">
          {step === 1 && "第一步：注入能量 (Wi-Fi)"}
          {step === 2 && "第二步：图腾扫描"}
          {step === 3 && "连接完成"}
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center pb-20">
        
        {/* Step 1: Input (Inscribing) */}
        {step === 1 && (
          <div className="w-full max-w-xs relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-mystic-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative glass-card rounded-2xl p-8 border border-mystic-700/50">
              <form onSubmit={handleWifiSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-mystic-400 text-[10px] uppercase tracking-wider flex items-center gap-1">
                     <Wifi className="w-3 h-3" /> 灵脉名称 (Wi-Fi)
                  </label>
                  <input 
                    type="text" 
                    value={ssid}
                    onChange={e => setSsid(e.target.value)}
                    className="w-full bg-mystic-900/50 border-b border-mystic-700 rounded-t-lg p-2 text-white placeholder-mystic-800 focus:outline-none focus:border-mystic-400 transition-colors text-sm font-mono"
                    placeholder="SSID"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-mystic-400 text-[10px] uppercase tracking-wider flex items-center gap-1">
                    <Fingerprint className="w-3 h-3" /> 灵脉密咒 (Password)
                  </label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-mystic-900/50 border-b border-mystic-700 rounded-t-lg p-2 text-white placeholder-mystic-800 focus:outline-none focus:border-mystic-400 transition-colors text-sm font-mono"
                    placeholder="********"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-mystic-800 to-mystic-900 hover:from-mystic-700 hover:to-mystic-800 text-mystic-100 border border-mystic-600 py-3 rounded-lg mt-4 transition-all active:scale-95 text-xs tracking-widest uppercase shadow-lg shadow-mystic-900/50">
                  生成法阵
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Step 2: QR (Totem) */}
        {step === 2 && (
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in relative">
            <div className="relative p-6">
              {/* Scan Line Animation */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-mystic-400/50 blur-sm animate-[float_3s_ease-in-out_infinite]"></div>
              
              <div className="bg-white p-3 rounded-lg relative z-10 shadow-[0_0_30px_rgba(94,234,212,0.15)]">
                <QrCode className="w-48 h-48 text-black" strokeWidth={1.5} />
              </div>
              
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-mystic-500"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-mystic-500"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-mystic-500"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-mystic-500"></div>
            </div>
            
            <div className="space-y-2 max-w-xs">
              <div className="flex items-center justify-center gap-2 text-mystic-300 text-sm font-serif">
                <ScanLine className="w-4 h-4 animate-pulse" />
                <span>等待法器识别...</span>
              </div>
              <p className="text-mystic-600 text-xs font-light">
                请将此图腾对准小绿茶的天眼<br/>距离约一掌之隔 (15-20cm)
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Success (Bond) */}
        {step === 3 && (
          <div className="flex flex-col items-center text-center space-y-6 animate-fade-in">
             <div className="relative">
                <div className="absolute inset-0 bg-mystic-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <div className="w-24 h-24 rounded-full border border-mystic-400/50 flex items-center justify-center relative z-10 bg-mystic-900/40 backdrop-blur-sm">
                   <CheckCircle2 className="w-10 h-10 text-mystic-400" strokeWidth={1} />
                </div>
             </div>
             
             <div className="space-y-2">
               <h3 className="text-lg font-serif text-white tracking-widest">灵力连通</h3>
               <p className="text-mystic-500 text-xs">小绿茶已苏醒，随时恭候。</p>
             </div>

             <button 
                onClick={() => setStep(1)}
                className="text-mystic-600 text-xs flex items-center gap-1 hover:text-mystic-400 mt-8 border-b border-dashed border-mystic-800 pb-0.5"
             >
               <RotateCcw className="w-3 h-3" /> 重铸契约
             </button>
          </div>
        )}
      </div>
    </div>
  );
};