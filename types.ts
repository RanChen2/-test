export interface UserProfile {
  id: string;
  name: string;
  coins: number;
  vipLevel: number;
  avatarUrl: string;
}

export interface DeviceStatus {
  isConnected: boolean;
  batteryLevel: number;
  wifiSsid: string | null;
  lastSync: Date;
}

export interface FortuneRecord {
  id: string;
  date: string;
  topic: string; // e.g., 'Career', 'Love', 'Daily'
  summary: string;
  moodScore: number; // 0-100
}

export enum AppRoute {
  HOME = 'HOME',
  DEVICE = 'DEVICE',
  REPORT = 'REPORT',
  STORE = 'STORE',
  PROFILE = 'PROFILE'
}

export interface RechargePackage {
  id: string;
  coins: number;
  price: number;
  tag?: string;
}