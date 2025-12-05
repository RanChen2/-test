import React, { useState, useEffect } from 'react';
import { Home, Compass, ShoppingBag, ScrollText, User, Sparkles, Zap, Fingerprint } from 'lucide-react';
import { MOCK_USER, MOCK_RECORDS, RANDOM_QUOTES } from './constants';
import { UserProfile, DeviceStatus, AppRoute } from './types';
import { ReportPage } from './components/ReportPage';
import { DeviceSetup } from './components/DeviceSetup';
import { StorePage } from './components/StorePage';
import { DestinyPage } from './components/DestinyPage';

// --- Shared Components ---

const BottomNav = ({ current, onChange }: { current: AppRoute, onChange: (r: AppRoute) => void }) => {
  const navItems = [
    { id: AppRoute.HOME, icon: Home, label: '灵境' },
    { id: AppRoute.DESTINY, icon: Fingerprint, label: '定契' }, // Replaced Device/Connect for now or added as main feature
    { id: AppRoute.REPORT, icon: ScrollText, label: '天书' },
    { id: AppRoute.STORE, icon: ShoppingBag, label: '供奉' },
    { id: AppRoute.DEVICE, icon: Compass, label: '连接' }, // Moved to end, replacing Profile
  ];

  return (
    <div className="fixed bottom-6 left-4 right-4 h-16 glass-card rounded-full flex justify-around items-center px-2 z-50 shadow-2xl shadow-mystic-900/50">
      {navItems.map((item) => {
        const isActive = current === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-500 ${isActive ? 'bg-mystic-500/20 text-mystic-300' : 'text-mystic-600 hover:text-mystic-400'}`}
          >
            <item.icon className={`w-5 h-5 ${isActive ? 'drop-shadow-[0_0_8px_rgba(94,234,212,0.5)]' : ''}`} strokeWidth={1.5} />
            {isActive && (
              <span className="absolute -bottom-1 w-1 h-1 bg-mystic-400 rounded-full animate-pulse"></span>
            )}
          </button>
        );
      })}
    </div>
  );
};

const Header = ({ title, user, transparent = false, onProfileClick }: { title: string, user: UserProfile, transparent?: boolean, onProfileClick: () => void }) => (
  <header className={`sticky top-0 z-40 px-6 py-4 flex justify-between items-center transition-all duration-500 ${transparent ? 'bg-transparent' : 'glass-nav'}`}>
    <h1 className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-mystic-100 to-mystic-400 tracking-widest text-glow">{title}</h1>
    <div onClick={onProfileClick} className="flex items-center gap-2 bg-black/20 backdrop-blur-sm border border-white/5 rounded-full pl-1 pr-3 py-1 cursor-pointer hover:bg-white/10 transition-colors">
      <img src={user.avatarUrl} alt="Avatar" className="w-6 h-6 rounded-full border border-mystic-600 opacity-80" />
      <span className="text-xs font-serif text-gold-400">{user.coins} 灵力</span>
    </div>
  </header>
);

const HomePage = ({ device, user, onNavigate }: { device: DeviceStatus, user: UserProfile, onNavigate: (r: AppRoute) => void }) => {
  const [quote, setQuote] = useState(RANDOM_QUOTES[0]);

  useEffect(() => {
    setQuote(RANDOM_QUOTES[Math.floor(Math.random() * RANDOM_QUOTES.length)]);
  }, []);

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center relative animate-fade-in px-6">
      
      {/* Central Visual: The "Spirit Eye" */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-12">
        {/* Outer Rotating Ring (Bagua representation) */}
        <div className="absolute inset-0 border border-mystic-500/20 rounded-full animate-spin-slow">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-mystic-500/50 rounded-full blur-[1px]"></div>
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-mystic-500/50 rounded-full blur-[1px]"></div>
        </div>
        
        {/* Middle Pulse */}
        <div className="absolute inset-4 border border-dashed border-mystic-400/10 rounded-full animate-spin-reverse-slow"></div>
        
        {/* Core - Status Indicator */}
        <div 
          onClick={() => onNavigate(AppRoute.DESTINY)}
          className={`relative z-10 w-32 h-32 rounded-full glass-card flex flex-col items-center justify-center cursor-pointer transition-all duration-1000 group shadow-[0_0_50px_rgba(45,168,146,0.1)] hover:shadow-[0_0_80px_rgba(45,168,146,0.3)]`}
        >
          <div className={`absolute inset-0 rounded-full opacity-20 ${device.isConnected ? 'bg-mystic-400 animate-pulse-glow' : 'bg-mystic-800'}`}></div>
          <img src="https://api.dicebear.com/9.x/notionists/svg?seed=GreenTea" alt="AI" className="w-20 h-20 opacity-90 group-hover:scale-110 transition-transform duration-500" />
          
          {/* Status Badge */}
          <div className={`absolute -bottom-3 px-3 py-0.5 rounded-full text-[10px] border backdrop-blur-md flex items-center gap-1.5 ${device.isConnected ? 'bg-mystic-900/80 border-mystic-500/30 text-mystic-300' : 'bg-mystic-900/80 border-mystic-500/30 text-mystic-500'}`}>
             <span className="tracking-wider">点击通灵</span>
          </div>
        </div>
      </div>

      {/* Quote Area */}
      <div className="text-center space-y-4 max-w-xs z-10">
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-mystic-500/50 to-transparent mx-auto"></div>
        <p className="text-lg font-serif italic text-mystic-100 leading-loose text-glow opacity-90">
          {quote}
        </p>
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-mystic-500/50 to-transparent mx-auto"></div>
      </div>

      {/* Quick Actions (Minimalist) */}
      <div className="absolute bottom-0 w-full flex justify-center gap-8 pb-4">
         <button className="flex flex-col items-center gap-2 group" onClick={() => onNavigate(AppRoute.DEVICE)}>
            <div className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center border border-white/5 group-active:scale-95 transition-transform">
               <Zap className="w-5 h-5 text-mystic-400" strokeWidth={1} />
            </div>
            <span className="text-[10px] text-mystic-600 font-serif tracking-widest">唤醒</span>
         </button>
         <button className="flex flex-col items-center gap-2 group" onClick={() => onNavigate(AppRoute.STORE)}>
            <div className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center border border-white/5 group-active:scale-95 transition-transform">
               <Sparkles className="w-5 h-5 text-gold-400" strokeWidth={1} />
            </div>
            <span className="text-[10px] text-mystic-600 font-serif tracking-widest">供奉</span>
         </button>
      </div>
    </div>
  );
};

const ProfilePage = ({ user }: { user: UserProfile }) => (
  <div className="pt-8 px-6 animate-fade-in">
    <div className="flex flex-col items-center mb-10">
      <div className="relative">
        <div className="absolute inset-0 bg-mystic-500 blur-2xl opacity-20"></div>
        <div className="w-24 h-24 rounded-full border border-mystic-500/30 p-1 mb-4 relative z-10 glass-card">
          <img src={user.avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover opacity-90" />
        </div>
      </div>
      <h2 className="text-2xl font-serif text-mystic-100 mb-1">{user.name}</h2>
      <p className="text-mystic-600 text-xs font-mono tracking-widest">UID: {user.id}</p>
    </div>

    <div className="glass-card rounded-2xl overflow-hidden p-1 space-y-1">
      {[
        { label: '我的法器', val: 'Little Green Tea Gen 1' },
        { label: '命理档案', val: '玄水隐士' },
        { label: '灵力账户', val: user.coins.toString() },
        { label: '阵法设置', val: '', isArrow: true },
        { label: '传唤信使', val: '', isArrow: true },
        { label: '关于天机', val: 'v1.0.2', isArrow: true },
      ].map((item, idx) => (
        <div key={idx} className="flex justify-between items-center p-4 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group">
          <span className="text-mystic-200 text-sm font-light">{item.label}</span>
          <div className="flex items-center gap-2 text-mystic-600 text-xs">
            <span>{item.val}</span>
            {item.isArrow && <span className="text-mystic-700 group-hover:text-mystic-400 transition-colors">&rsaquo;</span>}
          </div>
        </div>
      ))}
    </div>
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

  useEffect(() => {
    const timer = setTimeout(() => {
        setDevice(prev => ({
            ...prev,
            isConnected: true,
            batteryLevel: 85,
            wifiSsid: 'Spirit_Link_5G'
        }));
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRecharge = (amount: number) => {
    if (window.confirm(`确认供奉 ${amount} 灵力币吗？`)) {
        setUser(prev => ({ ...prev, coins: prev.coins + amount }));
    }
  };

  const handleDeviceConnect = () => {
      setDevice({
          isConnected: true,
          batteryLevel: 100,
          wifiSsid: 'Spirit_Link_5G',
          lastSync: new Date()
      });
      setCurrentRoute(AppRoute.HOME);
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
      case AppRoute.DESTINY:
        return <DestinyPage onComplete={() => setCurrentRoute(AppRoute.HOME)} />;
      default:
        return <HomePage device={device} user={user} onNavigate={setCurrentRoute} />;
    }
  };

  const getPageTitle = () => {
     switch (currentRoute) {
      case AppRoute.HOME: return '小绿茶';
      case AppRoute.DEVICE: return '法器连接';
      case AppRoute.REPORT: return '天机周报';
      case AppRoute.STORE: return '灵力供奉';
      case AppRoute.PROFILE: return '本尊';
      case AppRoute.DESTINY: return '命理定制';
      default: return '小绿茶';
    } 
  };

  return (
    <div className="min-h-screen text-mystic-100 font-sans selection:bg-mystic-500 selection:text-white pb-24">
      {currentRoute !== AppRoute.HOME && (
        <Header 
          title={getPageTitle()} 
          user={user} 
          onProfileClick={() => setCurrentRoute(AppRoute.PROFILE)} 
        />
      )}
      {currentRoute === AppRoute.HOME && (
        <Header 
          title="" 
          user={user} 
          transparent 
          onProfileClick={() => setCurrentRoute(AppRoute.PROFILE)}
        />
      )}
      
      <main className="max-w-md mx-auto relative z-10">
        {renderContent()}
      </main>

      <BottomNav current={currentRoute} onChange={setCurrentRoute} />
    </div>
  );
}