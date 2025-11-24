import React from 'react';
import { SCENARIOS } from '../constants';
import { Scenario } from '../types';

interface ScenarioSelectorProps {
  currentId: string;
  onSelect: (scenario: Scenario) => void;
}

const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({ currentId, onSelect }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 mb-6">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
        选择教案例题
      </h3>
      <div className="flex flex-wrap gap-2">
        {SCENARIOS.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => onSelect(scenario)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 
              ${
                currentId === scenario.id
                  ? 'bg-blue-600 text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-700'
              }`}
          >
            {scenario.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScenarioSelector;