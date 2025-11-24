import { Scenario } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'classic-1',
    name: '经典例题 (10头 26腿)',
    heads: 10,
    legs: 26,
    unitName: '只',
    valUnit: '条腿',
    item1: { name: '鸡', emoji: '🐔', legs: 2, color: 'bg-yellow-100 border-yellow-400 text-yellow-800' },
    item2: { name: '兔', emoji: '🐰', legs: 4, color: 'bg-pink-100 border-pink-400 text-pink-800' },
  },
  {
    id: 'quiz-penalty',
    name: '倒扣分题 (20题 72分)',
    heads: 20,
    legs: 72,
    unitName: '道',
    valUnit: '分',
    item1: { name: '答对', emoji: '✅', legs: 5, color: 'bg-green-100 border-green-400 text-green-800' },
    item2: { name: '答错', emoji: '❌', legs: -2, color: 'bg-red-100 border-red-400 text-red-800' },
  },
  {
    id: 'vehicles',
    name: '停车场 (32车 108轮)',
    heads: 32,
    legs: 108,
    unitName: '辆',
    valUnit: '个轮',
    item1: { name: '摩托车', emoji: '🏍️', legs: 2, color: 'bg-blue-100 border-blue-400 text-blue-800' },
    item2: { name: '小轿车', emoji: '🚗', legs: 4, color: 'bg-red-100 border-red-400 text-red-800' },
  },
  {
    id: 'money',
    name: '人民币 (100张 800元)',
    heads: 100,
    legs: 800,
    unitName: '张',
    valUnit: '元',
    item1: { name: '5元', emoji: '💴', legs: 5, color: 'bg-green-100 border-green-400 text-green-800' },
    item2: { name: '10元', emoji: '💵', legs: 10, color: 'bg-emerald-100 border-emerald-400 text-emerald-800' },
  },
  {
    id: 'camels',
    name: '骆驼 (23匹 60峰)',
    heads: 23,
    legs: 60,
    unitName: '匹',
    valUnit: '个峰',
    item1: { name: '单峰驼', emoji: '🐪', legs: 1, color: 'bg-orange-100 border-orange-400 text-orange-800' },
    item2: { name: '双峰驼', emoji: '🐫', legs: 2, color: 'bg-amber-100 border-amber-400 text-amber-800' },
  }
];