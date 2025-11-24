export interface Scenario {
  id: string;
  name: string;
  heads: number;
  legs: number;
  unitName: string; // e.g., "只", "辆"
  valUnit: string; // e.g., "腿", "元", "分"
  item1: {
    name: string;
    emoji: string;
    legs: number; // This represents value/score/wheels
    color: string;
  };
  item2: {
    name: string;
    emoji: string;
    legs: number;
    color: string;
  };
}

export interface SolveResult {
  isValid: boolean;
  count1: number; // Count of item1
  count2: number; // Count of item2
  error?: string;
}