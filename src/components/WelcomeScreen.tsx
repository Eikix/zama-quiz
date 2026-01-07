import { useState } from 'react';
import { questions, beginnerSections, advancedSections, businessSections } from '../data/questions';
import type { Difficulty } from '../types/quiz';

interface WelcomeScreenProps {
  onStart: (difficulty: Difficulty) => void;
}

const modeConfig: Record<Difficulty, { label: string; description: string; color: string; borderColor: string; bgColor: string; sections: string[] }> = {
  advanced: {
    label: 'Advanced',
    description: 'Internal architecture, implementation details, benchmarks',
    color: 'text-orange-400',
    borderColor: 'border-orange-500',
    bgColor: 'bg-orange-900/30',
    sections: advancedSections
  },
  beginner: {
    label: 'Beginner',
    description: 'FHE concepts, fhEVM basics, developer mental model',
    color: 'text-green-400',
    borderColor: 'border-green-500',
    bgColor: 'bg-green-900/30',
    sections: beginnerSections
  },
  business: {
    label: 'Business',
    description: 'Value proposition, trust assumptions, adoption drivers',
    color: 'text-blue-400',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-900/30',
    sections: businessSections
  }
};

const modeOrder: Difficulty[] = ['advanced', 'beginner', 'business'];

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [selectedMode, setSelectedMode] = useState<Difficulty>('advanced');
  
  const questionCount = questions.filter(q => q.difficulty === selectedMode).length;
  const sections = modeConfig[selectedMode].sections;

  return (
    <div className="bg-stone-800 rounded-2xl p-8 shadow-xl border border-stone-700 text-center">
      <div className="mb-6">
        <svg className="w-20 h-20 mx-auto mb-4" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#fb923c'}}/>
              <stop offset="100%" style={{stopColor:'#f59e0b'}}/>
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#logoGrad)"/>
          <path d="M32 8c-5 0-8 2-10 6-4 0-7 3-7 8 0 2 1 4 2 6-1 1-2 3-2 5 0 4 3 7 7 8v6h20v-6c4-1 7-4 7-8 0-2-1-4-2-5 1-2 2-4 2-6 0-5-3-8-7-8-2-4-5-6-10-6z" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <text x="32" y="35" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="bold" fill="white" textAnchor="middle">Z</text>
        </svg>
        <h1 className="text-3xl font-bold text-white mb-2">Zama Protocol Quiz</h1>
        <p className="text-gray-400">Test your FHE and fhEVM knowledge</p>
      </div>

      <div className="mb-6">
        <h3 className="text-white font-semibold mb-3 text-left">Select Mode</h3>
        <div className="grid grid-cols-3 gap-2">
          {modeOrder.map((mode) => {
            const config = modeConfig[mode];
            const count = questions.filter(q => q.difficulty === mode).length;
            const isSelected = selectedMode === mode;
            
            return (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                className={`p-3 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? `${config.borderColor} ${config.bgColor}`
                    : 'border-stone-600 bg-stone-700/50 hover:border-stone-500'
                }`}
              >
                <div className="flex items-center gap-1 mb-1">
                  <span className={`font-semibold text-sm ${isSelected ? config.color : 'text-white'}`}>
                    {config.label}
                  </span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {config.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {count} questions
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 text-left">
        <div className="bg-stone-700/50 rounded-xl p-4">
          <div className="text-2xl font-bold text-orange-400">{questionCount}</div>
          <div className="text-sm text-gray-400">Questions</div>
        </div>
        <div className="bg-stone-700/50 rounded-xl p-4">
          <div className="text-2xl font-bold text-amber-400">{sections.length}</div>
          <div className="text-sm text-gray-400">Sections</div>
        </div>
      </div>

      <div className="mb-6 text-left">
        <h3 className="text-white font-semibold mb-3">Topics Covered</h3>
        <ul className="space-y-2">
          {sections.map((topic, i) => (
            <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
              <span className={`w-1.5 h-1.5 rounded-full ${
                selectedMode === 'beginner' ? 'bg-green-500' : 
                selectedMode === 'business' ? 'bg-blue-500' : 'bg-orange-500'
              }`}></span>
              {topic}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => onStart(selectedMode)}
        className={`w-full px-6 py-4 rounded-xl font-semibold transition-all duration-200 text-white hover:scale-[1.02] ${
          selectedMode === 'beginner'
            ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400'
            : selectedMode === 'business'
            ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400'
            : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400'
        }`}
      >
        Start {modeConfig[selectedMode].label} Quiz
      </button>
    </div>
  );
}
