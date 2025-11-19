import React from 'react';
import { AspectRatio } from '../types';
import { Square, RectangleHorizontal, RectangleVertical, LayoutTemplate } from 'lucide-react';

interface AspectRatioSelectorProps {
  selected: AspectRatio;
  onChange: (ratio: AspectRatio) => void;
}

const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ selected, onChange }) => {
  const options = [
    { value: AspectRatio.Square, label: 'Square (1:1)', icon: Square },
    { value: AspectRatio.Landscape, label: 'Landscape (16:9)', icon: RectangleHorizontal },
    { value: AspectRatio.Portrait, label: 'Portrait (9:16)', icon: RectangleVertical },
    { value: AspectRatio.Standard, label: 'Standard (4:3)', icon: LayoutTemplate },
    { value: AspectRatio.Tall, label: 'Tall (3:4)', icon: LayoutTemplate }, // Reusing icon for simplicity
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {options.map((option) => {
        const Icon = option.icon;
        const isSelected = selected === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200
              ${isSelected 
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750 hover:border-slate-600'
              }
            `}
            type="button"
          >
            <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-white' : 'text-slate-400'}`} 
                  // Rotate icon for portrait/tall if needed visually, though generic icons work well
                  style={option.value === AspectRatio.Portrait || option.value === AspectRatio.Tall ? { transform: 'rotate(90deg)' } : {}}
            />
            <span className="text-xs font-medium">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default AspectRatioSelector;