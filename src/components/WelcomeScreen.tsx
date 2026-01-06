import { questions } from '../data/questions';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700 text-center">
      <div className="mb-6">
        <svg className="w-20 h-20 mx-auto mb-4" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#fb923c'}}/>
              <stop offset="100%" style={{stopColor:'#f59e0b'}}/>
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#logoGrad)"/>
          <path d="M32 10c-4 0-7 2-9 5-3 0-6 3-6 7 0 2 1 4 2 5-1 1-2 3-2 5 0 4 3 7 7 7v8h16v-8c4 0 7-3 7-7 0-2-1-4-2-5 1-1 2-3 2-5 0-4-3-7-6-7-2-3-5-5-9-5z" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M32 15v24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M24 22c3 0 5 2 5 4M22 30c4 0 6 2 6 4" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M40 22c-3 0-5 2-5 4M42 30c-4 0-6 2-6 4" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <h1 className="text-3xl font-bold text-white mb-2">Zama Protocol Quiz</h1>
        <p className="text-gray-400">Put your Zama knowledge to the test</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8 text-left">
        <div className="bg-gray-700/50 rounded-xl p-4">
          <div className="text-2xl font-bold text-orange-400">{questions.length}</div>
          <div className="text-sm text-gray-400">Questions</div>
        </div>
        <div className="bg-gray-700/50 rounded-xl p-4">
          <div className="text-2xl font-bold text-amber-400">5</div>
          <div className="text-sm text-gray-400">Sections</div>
        </div>
      </div>

      <div className="mb-8 text-left">
        <h3 className="text-white font-semibold mb-3">Topics Covered</h3>
        <ul className="space-y-2">
          {[
            'Architecture & Components',
            'Data Flow & Encryption',
            'Decryption Mechanisms',
            'Service Interactions',
            'Advanced Concepts'
          ].map((topic, i) => (
            <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              {topic}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onStart}
        className="w-full px-6 py-4 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-400 hover:to-amber-400 hover:scale-[1.02]"
      >
        Start Quiz
      </button>
    </div>
  );
}
