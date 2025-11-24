import React from 'react';
import { Scenario } from '../types';
import { Settings } from 'lucide-react';

interface SolverInputProps {
  scenario: Scenario;
  onChange: (updates: Partial<Scenario>) => void;
  error?: string;
}

const SolverInput: React.FC<SolverInputProps> = ({ scenario, onChange, error }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg border border-blue-100">
      <div className="flex items-center gap-2 mb-4 text-blue-900 font-bold">
        <Settings size={20} />
        <h2>题目数据</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            总个体数 (头/张/题)
          </label>
          <input
            type="number"
            min="1"
            value={scenario.heads}
            onChange={(e) => onChange({ heads: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg font-mono font-bold text-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            总特征值 (腿/元/分)
          </label>
          <input
            type="number"
            value={scenario.legs}
            onChange={(e) => onChange({ legs: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg font-mono font-bold text-gray-800"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
            <div className={`p-2 rounded border flex flex-col items-center ${scenario.item1.color}`}>
                <span className="text-xs font-bold opacity-70 mb-1">{scenario.item1.name}</span>
                <span className="text-2xl">{scenario.item1.emoji}</span>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs font-mono bg-white/50 px-2 rounded">
                    {scenario.item1.legs > 0 ? '+' : ''}{scenario.item1.legs} {scenario.valUnit}
                  </span>
                </div>
            </div>
            <div className={`p-2 rounded border flex flex-col items-center ${scenario.item2.color}`}>
                <span className="text-xs font-bold opacity-70 mb-1">{scenario.item2.name}</span>
                <span className="text-2xl">{scenario.item2.emoji}</span>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs font-mono bg-white/50 px-2 rounded">
                     {scenario.item2.legs > 0 ? '+' : ''}{scenario.item2.legs} {scenario.valUnit}
                  </span>
                </div>
            </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded text-red-700 text-sm animate-pulse">
            <p className="font-bold">无解提示：</p>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolverInput;