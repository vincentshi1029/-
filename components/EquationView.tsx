import React, { useState, useEffect } from 'react';
import { Scenario, SolveResult } from '../types';
import { Calculator, CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react';

interface EquationViewProps {
  scenario: Scenario;
  result: SolveResult;
}

const EquationView: React.FC<EquationViewProps> = ({ scenario, result }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
  }, [scenario, result]);

  if (!result.isValid) return null;

  // Logic for equation steps
  const eq1 = `x + y = ${scenario.heads}`;
  const eq2 = `${scenario.item1.legs < 0 ? '('+scenario.item1.legs+')' : scenario.item1.legs}x + ${scenario.item2.legs < 0 ? '('+scenario.item2.legs+')' : scenario.item2.legs}y = ${scenario.legs}`;
  
  const derivedEq1 = `x = ${scenario.heads} - y`;
  
  // Substitution: A(Total - y) + By = Target
  const subStep1 = `${scenario.item1.legs} × (${scenario.heads} - y) + ${scenario.item2.legs}y = ${scenario.legs}`;
  
  // Expand: A*Total - Ay + By = Target
  const term1 = scenario.item1.legs * scenario.heads;
  const subStep2 = `${term1} - ${scenario.item1.legs}y + ${scenario.item2.legs}y = ${scenario.legs}`;
  
  // Combine Y: (B - A)y = Target - A*Total
  const diffLegs = scenario.item2.legs - scenario.item1.legs;
  const rhs = scenario.legs - term1;
  const subStep3 = `${diffLegs}y = ${rhs}`;
  
  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const reset = () => setStep(0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden mt-6 flex flex-col">
       <div className="p-3 bg-purple-50 border-b border-purple-100 flex justify-between items-center">
        <h2 className="font-bold text-purple-900 flex items-center gap-2 text-sm uppercase tracking-wider">
          <Calculator size={16} />
          方程法互动演示
        </h2>
        <div className="flex gap-1">
           <button onClick={reset} className="p-1 text-purple-400 hover:bg-purple-100 rounded"><RotateCcw size={14}/></button>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col gap-4">
        
        {/* Step 0: Define Variables */}
        <div 
            className={`transition-all duration-500 cursor-pointer p-3 rounded-lg border ${step === 0 ? 'bg-purple-50 border-purple-200 ring-1 ring-purple-300' : 'bg-white border-gray-100 opacity-60'}`}
            onClick={() => setStep(0)}
        >
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-purple-700 text-sm">1. 设未知数</h3>
                {step > 0 && <CheckCircle2 size={16} className="text-green-500" />}
            </div>
            <div className="font-mono text-sm text-gray-700">
                <p>设 <span className="font-bold">{scenario.item1.name}</span> 为 x {scenario.unitName}</p>
                <p>设 <span className="font-bold">{scenario.item2.name}</span> 为 y {scenario.unitName}</p>
            </div>
            {step === 0 && (
                <button onClick={(e) => { e.stopPropagation(); nextStep(); }} className="mt-3 text-xs bg-purple-600 text-white px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-purple-700 transition-colors">
                    列方程 <ChevronRight size={12} />
                </button>
            )}
        </div>

        {/* Step 1: Formulate Equations */}
        {step >= 1 && (
            <div 
                className={`transition-all duration-500 cursor-pointer p-3 rounded-lg border ${step === 1 ? 'bg-purple-50 border-purple-200 ring-1 ring-purple-300' : 'bg-white border-gray-100 opacity-60'}`}
                onClick={() => setStep(1)}
            >
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-purple-700 text-sm">2. 列方程组</h3>
                    {step > 1 && <CheckCircle2 size={16} className="text-green-500" />}
                </div>
                <div className="flex items-center gap-3 font-mono text-sm text-gray-800">
                    <span className="text-3xl text-gray-300 font-light">{'{'}</span>
                    <div>
                        <p>① {eq1}</p>
                        <p>② {eq2}</p>
                    </div>
                </div>
                 {step === 1 && (
                    <button onClick={(e) => { e.stopPropagation(); nextStep(); }} className="mt-3 text-xs bg-purple-600 text-white px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-purple-700 transition-colors">
                        开始求解 <ChevronRight size={12} />
                    </button>
                )}
            </div>
        )}

        {/* Step 2: Substitution */}
        {step >= 2 && (
            <div 
                className={`transition-all duration-500 cursor-pointer p-3 rounded-lg border ${step === 2 ? 'bg-purple-50 border-purple-200 ring-1 ring-purple-300' : 'bg-white border-gray-100 opacity-60'}`}
                onClick={() => setStep(2)}
            >
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-purple-700 text-sm">3. 代入消元</h3>
                    {step > 2 && <CheckCircle2 size={16} className="text-green-500" />}
                </div>
                <div className="font-mono text-xs sm:text-sm text-gray-700 space-y-2">
                    <p>由 ① 得：<span className="bg-yellow-100 px-1 rounded">{derivedEq1}</span></p>
                    <p>代入 ②：</p>
                    <p className="pl-2 border-l-2 border-purple-200">{subStep1}</p>
                </div>
                 {step === 2 && (
                    <button onClick={(e) => { e.stopPropagation(); nextStep(); }} className="mt-3 text-xs bg-purple-600 text-white px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-purple-700 transition-colors">
                        化简计算 <ChevronRight size={12} />
                    </button>
                )}
            </div>
        )}

        {/* Step 3: Solve Y */}
        {step >= 3 && (
            <div 
                className={`transition-all duration-500 cursor-pointer p-3 rounded-lg border ${step === 3 ? 'bg-purple-50 border-purple-200 ring-1 ring-purple-300' : 'bg-white border-gray-100 opacity-60'}`}
                onClick={() => setStep(3)}
            >
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-purple-700 text-sm">4. 解出 Y</h3>
                    {step > 3 && <CheckCircle2 size={16} className="text-green-500" />}
                </div>
                <div className="font-mono text-xs sm:text-sm text-gray-700 space-y-1">
                    <p>展开：{subStep2}</p>
                    <p>合并：{subStep3}</p>
                    <p className="mt-2 font-bold text-purple-800 bg-purple-100 inline-block px-2 rounded">
                        y = {result.count2}
                    </p>
                </div>
                 {step === 3 && (
                    <button onClick={(e) => { e.stopPropagation(); nextStep(); }} className="mt-3 text-xs bg-purple-600 text-white px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-purple-700 transition-colors">
                        算出 X <ChevronRight size={12} />
                    </button>
                )}
            </div>
        )}

        {/* Step 4: Final Result */}
        {step >= 4 && (
            <div className="animate-fade-in bg-green-50 border border-green-200 p-4 rounded-lg text-center">
                <h3 className="font-bold text-green-800 mb-2">✅ 最终答案</h3>
                 <div className="font-mono text-lg text-green-900">
                    <p>{scenario.item1.name} (x) = {result.count1} {scenario.unitName}</p>
                    <p>{scenario.item2.name} (y) = {result.count2} {scenario.unitName}</p>
                 </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default EquationView;