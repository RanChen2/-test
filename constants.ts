import { FortuneRecord, RechargePackage, UserProfile } from './types';

export const MOCK_USER: UserProfile = {
  id: 'u123',
  name: '迷途的旅人',
  coins: 120,
  vipLevel: 1,
  avatarUrl: 'https://picsum.photos/100/100',
};

export const MOCK_RECORDS: FortuneRecord[] = [
  { id: '1', date: '2023-10-20', topic: '事业', summary: '近期工作会有变动，保持耐心。', moodScore: 65 },
  { id: '2', date: '2023-10-21', topic: '感情', summary: '旧人可能会联系，切勿冲动。', moodScore: 40 },
  { id: '3', date: '2023-10-22', topic: '运势', summary: '财运亨通，适合小额投资。', moodScore: 85 },
  { id: '4', date: '2023-10-23', topic: '健康', summary: '注意休息，多喝热水。', moodScore: 60 },
  { id: '5', date: '2023-10-24', topic: '事业', summary: '贵人相助，项目推进顺利。', moodScore: 90 },
];

export const RECHARGE_PACKAGES: RechargePackage[] = [
  { id: 'p1', coins: 10, price: 6, tag: '新手特惠' },
  { id: 'p2', coins: 50, price: 28 },
  { id: 'p3', coins: 100, price: 50, tag: '最受欢迎' },
  { id: 'p4', coins: 500, price: 200, tag: '尊享版' },
];

export const RANDOM_QUOTES = [
  "凡事发生，必有其因。缘起缘灭，皆是天意。",
  "今日宜：喝茶，发呆，想我。",
  "不要急着要答案，有时候问题本身就是答案。",
  "星光不问赶路人，时光不负有心人。",
  "心诚则灵，但也要记得给小绿茶充电哦。",
];