import React, { useState } from 'react';
import { Wifi, Smartphone, CheckCircle2, RotateCcw, QrCode } from 'lucide-react';
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
    }, 3000);
  };

  return (
    <div className="pb-24 pt-6 px-4 animate-fade-in h-full flex flex-col">
      <h2 className="text-2xl font-bold text-tea-100 mb-2">连接小绿茶</h2>
      <p className="text-tea-400 text-sm mb-8">请确保玩具已开机并处于配网模式（长按背部按钮3秒）。</p>

      <div className="flex-1 flex flex-col items-center justify-center">
        {step === 1 && (
          <div className="w-full max-w-md bg-tea-900/50 rounded-2xl p-6 border border-tea-800">
            <form onSubmit={handleWifiSubmit} className="space-y-4">
              <div>
                <label className="block text-tea-300 text-xs mb-1">Wi-Fi 名称 (2.4G)</label>
                <input 
                  type="text" 
                  value={ssid}
                  onChange={e => setSsid(e.target.value)}
                  placeholder="输入 Wi-Fi 名称"
                  className="w-full bg-black/30 border border-tea-700 rounded-lg p-3 text-white placeholder-tea-700 focus:outline-none focus:border-tea-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-tea-300 text-xs mb-1">密码</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="输入 Wi-Fi 密码"
                  className="w-full bg-black/30 border border-tea-700 rounded-lg p-3 text-white placeholder-tea-700 focus:outline-none focus:border-tea-500 transition-colors"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-tea-600 hover:bg-tea-500 text-white font-bold py-3 rounded-xl mt-4 transition-colors">
                生成配网二维码
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center text-center space-y-6 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-tea-500 blur-xl opacity-20 animate-pulse"></div>
              <div className="bg-white p-4 rounded-xl relative z-10">
                <QrCode className="w-48 h-48 text-black" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">请扫描二维码</h3>
              <p className="text-tea-400 text-sm max-w-xs">将此二维码对准小绿茶的摄像头（约 15-20 厘米距离），直到听到"嘀"的一声。</p>
            </div>
            <div className="flex gap-2 text-tea-500 text-xs items-center">
              <div className="w-2 h-2 rounded-full bg-tea-500 animate-ping"></div>
              正在等待设备连接...
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center text-center space-y-6 animate-scale-in">
             <div className="w-24 h-24 bg-tea-600/20 rounded-full flex items-center justify-center border border-tea-500/50">
                <CheckCircle2 className="w-12 h-12 text-tea-400" />
             </div>
             <h3 className="text-xl font-bold text-white">连接成功！</h3>
             <p className="text-tea-400 text-sm">小绿茶已经上线，可以开始占卜了。</p>
             <button 
                onClick={() => setStep(1)}
                className="text-tea-500 text-sm flex items-center gap-1 hover:text-tea-300"
             >
               <RotateCcw className="w-4 h-4" /> 重新配置
             </button>
          </div>
        )}
      </div>
      
      {/* Help Footer */}
      <div className="mt-8 flex justify-center gap-6 text-xs text-tea-600">
        <span className="cursor-pointer hover:text-tea-400">无法连接？</span>
        <span className="cursor-pointer hover:text-tea-400">使用热点连接</span>
      </div>
    </div>
  );
};