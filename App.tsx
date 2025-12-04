import React, { useState, useEffect } from 'react';
import { Home, Settings, ShoppingBag, BarChart2, Radio, Battery, Wifi, MessageCircle, User } from 'lucide-react';
import { MOCK_USER, MOCK_RECORDS, RANDOM_QUOTES } from './constants';
import { UserProfile, DeviceStatus, AppRoute } from './types';
import { ReportPage } from './components/ReportPage';
import { DeviceSetup } from './components/DeviceSetup';
import { StorePage } from './components/StorePage';

// --- Components inline for simplicity in this file structure, normally would be separate ---

const BottomNav = ({ current, onChange }: { current: AppRoute, onChange: (r: AppRoute) => void }) => {
  const navItems = [
    { id: AppRoute.HOME, icon: Home, label: '首页' },
    { id: AppRoute.DEVICE, icon: Radio, label: '设备' },
    { id: AppRoute.REPORT, icon: BarChart2, label: '报告' },
    { id: AppRoute.STORE, icon: ShoppingBag, label: '充值' },
    { id: AppRoute.PROFILE, icon: User, label: '我的' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-tea-950/90 backdrop-blur-md border-t border-tea-800 pb-safe pt-2 px-6 flex justify-between items-end z-50 h-[80px]">
      {navItems.map((item) => {
        const isActive = current === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`flex flex-col items-center gap-1 w-12 transition-all duration-300 ${isActive ? '-translate-y-2' : ''}`}
          >
            <div className={`p-2 rounded-2xl transition-all ${isActive ? 'bg-tea-600 text-white shadow-lg shadow-tea-600/40' : 'text-tea-400'}`}>
              <item.icon className="w-6 h-6" />
            </div>
            <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-tea-300' : 'text-tea-600'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

const Header = ({ title, user }: { title: string, user: UserProfile }) => (
  <header className="sticky top-0 z-40 bg-tea-950/80 backdrop-blur-sm px-4 py-3 flex justify-between items-center border-b border-tea-900/50">
    <h1 className="text-lg font-bold text-tea-100 tracking-wide">{title}</h1>
    <div className="flex items-center gap-2 bg-tea-900/60 rounded-full pl-1 pr-3 py-1">
      <img src={user.avatarUrl} alt="Avatar" className="w-6 h-6 rounded-full border border-tea-600" />
      <span className="text-xs font-mono text-gold-400 font-bold">{user.coins} 币</span>
    </div>
  </header>
);

const HomePage = ({ device, user, onNavigate }: { device: DeviceStatus, user: UserProfile, onNavigate: (r: AppRoute) => void }) => {
  const [quote, setQuote] = useState(RANDOM_QUOTES[0]);

  useEffect(() => {
    // Rotate quotes randomly on mount
    setQuote(RANDOM_QUOTES[Math.floor(Math.random() * RANDOM_QUOTES.length)]);
  }, []);

  return (
    <div className="pb-24 pt-4 px-4 space-y-6 animate-fade-in">
      {/* Device Status Card */}
      <div 
        onClick={() => onNavigate(AppRoute.DEVICE)}
        className="bg-gradient-to-br from-tea-900 to-tea-950 rounded-2xl p-5 border border-tea-800 shadow-xl relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Radio className="w-24 h-24 text-tea-400" />
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-tea-100 font-bold text-lg">小绿茶 AI</h2>
              <p className="text-tea-500 text-xs font-mono mt-1">ID: LGT-8842</p>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-bold flex items-center gap-1 ${device.isConnected ? 'bg-tea-500/20 text-tea-300' : 'bg-red-500/10 text-red-400'}`}>
              <div className={`w-2 h-2 rounded-full ${device.isConnected ? 'bg-tea-400 animate-pulse' : 'bg-red-500'}`}></div>
              {device.isConnected ? '在线' : '离线'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-tea-400">
              <Battery className={`w-4 h-4 ${device.batteryLevel < 20 ? 'text-red-400' : 'text-tea-400'}`} />
              <span className="text-sm font-mono">{device.batteryLevel}%</span>
            </div>
            <div className="flex items-center gap-2 text-tea-400">
              <Wifi className="w-4 h-4" />
              <span className="text-sm truncate max-w-[80px]">{device.isConnected ? (device.wifiSsid || 'Unknown') : '--'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Quote / Fortune */}
      <div className="bg-tea-800/20 rounded-2xl p-6 text-center border border-tea-700/30">
        <h3 className="text-tea-500 text-xs tracking-widest uppercase mb-3">今日绿茶语录</h3>
        <p className="text-tea-100 text-lg font-serif italic leading-relaxed">
          "{quote}"
        </p>
        <button className="mt-4 text-xs text-tea-400 border border-tea-700 rounded-full px-4 py-1 hover:bg-tea-700/50 transition-colors">
          抽取今日签
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-tea-900/40 p-4 rounded-xl border border-tea-800 flex flex-col items-center justify-center gap-2 hover:bg-tea-800/40 transition-colors">
          <MessageCircle className="w-6 h-6 text-gold-400" />
          <span className="text-tea-200 text-sm font-bold">开始对话</span>
        </button>
        <button 
            onClick={() => onNavigate(AppRoute.STORE)}
            className="bg-tea-900/40 p-4 rounded-xl border border-tea-800 flex flex-col items-center justify-center gap-2 hover:bg-tea-800/40 transition-colors"
        >
          <ShoppingBag className="w-6 h-6 text-tea-400" />
          <span className="text-tea-200 text-sm font-bold">补充灵力</span>
        </button>
      </div>
    </div>
  );
};

const ProfilePage = ({ user }: { user: UserProfile }) => (
  <div className="pb-24 pt-6 px-4 animate-fade-in">
    <div className="flex flex-col items-center mb-8">
      <div className="w-20 h-20 rounded-full border-2 border-tea-500 p-1 mb-3">
        <img src={user.avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
      </div>
      <h2 className="text-xl font-bold text-white">{user.name}</h2>
      <p className="text-tea-400 text-sm">UID: {user.id}</p>
    </div>

    <div className="bg-tea-900/30 rounded-xl overflow-hidden divide-y divide-tea-800/50 border border-tea-800">
      {[
        { label: '我的设备', val: 'Little Green Tea Gen 1' },
        { label: '累计占卜', val: '42 次' },
        { label: '绑定手机', val: '138****8888' },
        { label: '系统设置', val: '', isArrow: true },
        { label: '联系客服', val: '', isArrow: true },
        { label: '关于我们', val: 'v1.0.2', isArrow: true },
      ].map((item, idx) => (
        <div key={idx} className="flex justify-between items-center p-4 hover:bg-tea-800/30 active:bg-tea-800/50 cursor-pointer">
          <span className="text-tea-200 text-sm">{item.label}</span>
          <div className="flex items-center gap-2 text-tea-500 text-sm">
            <span>{item.val}</span>
            {item.isArrow && <span>&rsaquo;</span>}
          </div>
        </div>
      ))}
    </div>
    
    <button className="w-full mt-8 py-3 rounded-lg text-red-400 bg-tea-900/30 text-sm font-medium hover:bg-red-900/20 transition-colors">
      退出登录
    </button>
  </div>
);

// --- Main App ---

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [device, setDevice] = useState<DeviceStatus>({
    isConnected: false,
    batteryLevel: 0,
    wifiSsid: null,
    lastSync: new Date()
  });

  // Simulation of initial device connection check
  useEffect(() => {
    const timer = setTimeout(() => {
        setDevice(prev => ({
            ...prev,
            isConnected: true,
            batteryLevel: 85,
            wifiSsid: 'Home_5G'
        }));
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRecharge = (amount: number) => {
    if (window.confirm(`确认充值 ${amount} 灵力币吗？`)) {
        setUser(prev => ({ ...prev, coins: prev.coins + amount }));
        alert('充值成功！');
    }
  };

  const handleDeviceConnect = () => {
      setDevice({
          isConnected: true,
          batteryLevel: 100,
          wifiSsid: 'My_iPhone_Hotspot',
          lastSync: new Date()
      });
  };

  const renderContent = () => {
    switch (currentRoute) {
      case AppRoute.HOME:
        return <HomePage device={device} user={user} onNavigate={setCurrentRoute} />;
      case AppRoute.DEVICE:
        return <DeviceSetup deviceStatus={device} onConnect={handleDeviceConnect} />;
      case AppRoute.REPORT:
        return <ReportPage records={MOCK_RECORDS} />;
      case AppRoute.STORE:
        return <StorePage user={user} onRecharge={handleRecharge} />;
      case AppRoute.PROFILE:
        return <ProfilePage user={user} />;
      default:
        return <HomePage device={device} user={user} onNavigate={setCurrentRoute} />;
    }
  };

  const getPageTitle = () => {
     switch (currentRoute) {
      case AppRoute.HOME: return '灵卜 AI';
      case AppRoute.DEVICE: return '设备管理';
      case AppRoute.REPORT: return '运势报告';
      case AppRoute.STORE: return '灵力补给';
      case AppRoute.PROFILE: return '个人中心';
      default: return '小绿茶';
    } 
  };

  return (
    <div className="min-h-screen bg-tea-950 text-tea-50 font-sans selection:bg-tea-500 selection:text-white">
      <Header title={getPageTitle()} user={user} />
      
      <main className="max-w-md mx-auto min-h-[calc(100vh-60px)] relative">
        {renderContent()}
      </main>

      <BottomNav current={currentRoute} onChange={setCurrentRoute} />
    </div>
  );
}