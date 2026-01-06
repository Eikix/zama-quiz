import { questions } from '../data/questions';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700 text-center">
      <div className="mb-6">
        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Zama Protocol Quiz</h1>
        <p className="text-gray-400">Put your Zama knowledge to the test</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8 text-left">
        <div className="bg-gray-700/50 rounded-xl p-4">
          <div className="text-2xl font-bold text-purple-400">{questions.length}</div>
          <div className="text-sm text-gray-400">Questions</div>
        </div>
        <div className="bg-gray-700/50 rounded-xl p-4">
          <div className="text-2xl font-bold text-blue-400">5</div>
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
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              {topic}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onStart}
        className="w-full px-6 py-4 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 hover:scale-[1.02]"
      >
        Start Quiz
      </button>
    </div>
  );
}
