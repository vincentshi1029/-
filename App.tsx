import React, { useState, useEffect, useMemo } from 'react';
import { Scenario, SolveResult } from './types';
import { SCENARIOS } from './constants';
import ScenarioSelector from './components/ScenarioSelector';
import SolverInput from './components/SolverInput';
import Visualization from './components/Visualization';
import EquationView from './components/EquationView';
import { BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState<Scenario>(SCENARIOS[0]);

  // Solver Logic
  const solveResult: SolveResult = useMemo(() => {
    const { heads, legs, item1, item2 } = currentScenario;
    
    // Safety check for basic inputs
    if (heads <= 0) {
        return { isValid: false, count1: 0, count2: 0, error: '总数必须是正整数' };
    }

    // Formula: y = (TotalVal - Heads * item1_val) / (item2_val - item1_val)
    
    const diffPerItem = item2.legs - item1.legs;
    if (diffPerItem === 0) {
         return { isValid: false, count1: 0, count2: 0, error: '两种对象特征值不能相同' };
    }

    const numerator = legs - (heads * item1.legs);
    
    // NOTE: For standard chicken/rabbit, numerator must be >= 0. 
    // But for penalty problems (negative values), numerator can be anything.
    // We just check divisibility.

    // Check Divisibility
    if (numerator % diffPerItem !== 0) {
         return { isValid: false, count1: 0, count2: 0, error: '数值无法整除，算出来不是整数。' };
    }

    const count2 = numerator / diffPerItem;
    const count1 = heads - count2;

    // Check Non-negative counts (you can't have negative chickens)
    if (count1 < 0 || count2 < 0) {
         return { isValid: false, count1: 0, count2: 0, error: `计算结果出现负数 (${count1}, ${count2})，请检查题目数值是否合理。` };
    }

    return { isValid: true, count1, count2 };
  }, [currentScenario]);

  const handleScenarioChange = (scenario: Scenario) => {
    setCurrentScenario(scenario);
  };

  const handleInputChange = (updates: Partial<Scenario>) => {
    setCurrentScenario(prev => ({ ...prev, ...updates, id: 'custom' }));
  };

  return (
    <div className="min-h-screen bg-[#ecf4f9] pb-12">
      {/* Header */}
      <header className="bg-white border-b border-blue-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
               <BookOpen size={24} />
            </div>
            <div>
                <h1 className="text-xl font-bold text-gray-800 tracking-tight">鸡兔同笼 <span className="text-blue-600">可视解题器</span></h1>
                <p className="text-xs text-gray-500">小学数学 | 假设法 & 方程法演示</p>
            </div>
          </div>
          <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full hidden sm:block">
            支持倒扣分题型
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Controls & Presets */}
          <div className="lg:col-span-4 space-y-6">
            <ScenarioSelector 
                currentId={currentScenario.id} 
                onSelect={handleScenarioChange} 
            />
            
            <SolverInput 
                scenario={currentScenario} 
                onChange={handleInputChange}
                error={solveResult.error}
            />

            <EquationView scenario={currentScenario} result={solveResult} />
          </div>

          {/* Right Column: Visualization */}
          <div className="lg:col-span-8 flex flex-col h-[600px] lg:h-auto lg:min-h-[700px]">
             <Visualization scenario={currentScenario} result={solveResult} />
          </div>

        </div>
      </main>

       <footer className="max-w-6xl mx-auto px-4 text-center text-gray-400 text-sm mt-8">
        <p>此工具由 AI 辅助生成，用于辅助理解数学概念。</p>
      </footer>
    </div>
  );
};

export default App;