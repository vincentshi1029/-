import React, { useState, useEffect } from 'react';
import { Scenario, SolveResult } from '../types';
import { RotateCcw, ArrowRight } from 'lucide-react';

interface VisualizationProps {
  scenario: Scenario;
  result: SolveResult;
}

const Visualization: React.FC<VisualizationProps> = ({ scenario, result }) => {
  const [step, setStep] = useState(0);

  // Reset step when scenario changes
  useEffect(() => {
    setStep(0);
  }, [scenario, result]);

  if (!result.isValid) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <span className="text-4xl mb-2">🤔</span>
        <p>请输入正确的数值以开始演示</p>
      </div>
    );
  }

  // Visualization logic variables
  const assumedTotalVal = scenario.heads * scenario.item1.legs;
  const totalDiff = scenario.legs - assumedTotalVal;
  const diffPerItem = scenario.item2.legs - scenario.item1.legs;
  
  // Determines if we are adding or removing value
  const isAddingValue = totalDiff > 0;
  const actionWord = isAddingValue ? '补' : '减';
  const diffColor = isAddingValue ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200';

  // Limiter for performance rendering
  const showVisuals = scenario.heads <= 80;
  const gridCols = scenario.heads > 25 ? 'grid-cols-10 sm:grid-cols-12' : 'grid-cols-5 sm:grid-cols-8';

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleReset = () => {
    setStep(0);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden flex flex-col h-full">
      <div className="p-4 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
        <h2 className="font-bold text-blue-900 flex items-center gap-2">
          <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">视</span>
          假设法演示
        </h2>
        
        <div className="flex gap-2">
           <button 
            onClick={handleReset}
            className="p-2 hover:bg-blue-200 rounded-full text-blue-600 transition-colors"
            title="重置"
          >
            <RotateCcw size={18} />
          </button>
          <button 
            onClick={handleNext}
            disabled={step === 3}
            className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-semibold transition-all
              ${step === 3 
                ? 'bg-green-100 text-green-700 cursor-default' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
          >
            {step === 3 ? '完成' : '下一步'}
            {step !== 3 && <ArrowRight size={16} />}
          </button>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="p-6 bg-gradient-to-b from-white to-slate-50 border-b border-slate-100 min-h-[140px]">
        {step === 0 && (
            <div className="animate-fade-in">
                <p className="text-lg text-gray-700 mb-2 font-medium">第一步：全体集合！</p>
                <p className="text-gray-500">
                    这里有 <span className="font-bold text-blue-600 text-xl">{scenario.heads}</span> {scenario.unitName}
                    {scenario.item1.name === '答对' ? '题目' : '动物/物体'}。
                    <br/>
                    我们要找出多少是{scenario.item1.name}，多少是{scenario.item2.name}。
                </p>
            </div>
        )}
        {step === 1 && (
            <div className="animate-fade-in">
                <p className="text-lg text-gray-700 mb-2 font-medium">第二步：假设全是{scenario.item1.name}</p>
                <p className="text-gray-500">
                    假设所有都按{scenario.item1.name}计算，总{scenario.valUnit}是：
                </p>
                <div className="mt-2 font-mono text-lg bg-yellow-50 inline-block px-3 py-1 rounded text-yellow-800 border border-yellow-200">
                    {scenario.heads} × {scenario.item1.legs} = {assumedTotalVal} ({scenario.valUnit})
                </div>
            </div>
        )}
        {step === 2 && (
            <div className="animate-fade-in">
                <p className="text-lg text-gray-700 mb-2 font-medium">第三步：找差距</p>
                <p className="text-gray-500">
                    实际是 {scenario.legs} {scenario.valUnit}，但我们假设算出 {assumedTotalVal} {scenario.valUnit}。
                    <br/>差距是多少？
                </p>
                <div className={`mt-2 font-mono text-lg inline-block px-3 py-1 rounded border ${diffColor}`}>
                    {scenario.legs} - {assumedTotalVal} = {totalDiff > 0 ? '+' : ''}{totalDiff}
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  (正数表示少算了，需要加；负数表示多算了，需要减)
                </p>
            </div>
        )}
        {step === 3 && (
            <div className="animate-fade-in">
                <p className="text-lg text-gray-700 mb-2 font-medium">第四步：{actionWord}差替换！</p>
                <p className="text-gray-500">
                    把一个{scenario.item1.name}换成{scenario.item2.name}，数值会变化 <span className="font-bold">{diffPerItem > 0 ? '+' : ''}{diffPerItem}</span>。
                    <br/>我们需要变化 <span className="font-bold">{totalDiff}</span>，所以要换几个？
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                    <div className="font-mono text-lg bg-green-50 px-3 py-1 rounded text-green-800 border border-green-200">
                        {scenario.item2.name}: {totalDiff} ÷ {diffPerItem} = {result.count2} ({scenario.unitName})
                    </div>
                    <div className="font-mono text-lg bg-blue-50 px-3 py-1 rounded text-blue-800 border border-blue-200">
                        {scenario.item1.name}: {scenario.heads} - {result.count2} = {result.count1} ({scenario.unitName})
                    </div>
                </div>
            </div>
        )}
      </div>

      {/* Visual Grid */}
      <div className="flex-1 p-4 bg-slate-100 overflow-y-auto min-h-[300px]">
        {showVisuals ? (
            <div className={`grid ${gridCols} gap-2`}>
            {Array.from({ length: scenario.heads }).map((_, index) => {
                // Determine current state of this specific unit based on step
                // The swap logic: we need to swap 'count2' items from item1 to item2.
                const isConverted = step === 3 && index < result.count2;
                
                let activeEmoji = '❓';
                let activeClass = 'bg-white border-gray-200';
                let currentVal = 0;

                if (step === 0) {
                    activeEmoji = '⚪';
                    activeClass = 'bg-gray-50 border-gray-300 text-gray-300';
                } else if (step >= 1 && step < 3) {
                    activeEmoji = scenario.item1.emoji; // Everyone is item1
                    activeClass = scenario.item1.color;
                    currentVal = scenario.item1.legs;
                } else if (step === 3) {
                    if (isConverted) {
                        activeEmoji = scenario.item2.emoji;
                        activeClass = scenario.item2.color + " ring-2 ring-offset-1 ring-blue-400 transform scale-105 transition-all duration-500";
                        currentVal = scenario.item2.legs;
                    } else {
                        activeEmoji = scenario.item1.emoji;
                        activeClass = scenario.item1.color + " opacity-40 scale-95 grayscale-[0.5]";
                        currentVal = scenario.item1.legs;
                    }
                }

                return (
                <div 
                    key={index} 
                    className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center shadow-sm relative transition-all duration-300 ${activeClass}`}
                >
                    <span className="text-2xl mb-1 filter drop-shadow-sm">{activeEmoji}</span>
                    {step > 0 && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.5rem] text-center
                          ${currentVal < 0 ? 'bg-red-100 text-red-600' : 'bg-white/90 text-gray-700'}
                        `}>
                            {currentVal}
                        </span>
                    )}
                    {/* Animation Effect for Swapping */}
                    {step === 3 && isConverted && (
                        <div className={`absolute -top-1 -right-1 text-white text-[10px] px-1 h-5 flex items-center justify-center rounded-full animate-bounce font-bold shadow-sm
                          ${diffPerItem > 0 ? 'bg-red-500' : 'bg-blue-500'}
                        `}>
                           {diffPerItem > 0 ? '+' : ''}{diffPerItem}
                        </div>
                    )}
                </div>
                );
            })}
            </div>
        ) : (
            <div className="flex items-center justify-center h-full text-gray-500 flex-col">
                <p className="mb-2 text-xl">🚀 数量太多啦！</p>
                <p className="text-sm">为了流畅体验，请查看上方的文字推演。</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Visualization;