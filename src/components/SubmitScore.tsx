import { useState } from 'react';
import { submitScore } from '../lib/supabase';
import type { Difficulty } from '../types/quiz';

interface SubmitScoreProps {
  score: number;
  total: number;
  mode: Difficulty;
  onSubmitted: (username: string) => void;
}

export function SubmitScore({ score, total, mode, onSubmitted }: SubmitScoreProps) {
  const [username, setUsername] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const trimmedName = username.trim();
    if (!trimmedName) {
      setError('Please enter a username');
      return;
    }
    
    if (trimmedName.length < 2) {
      setError('Username must be at least 2 characters');
      return;
    }
    
    if (trimmedName.length > 20) {
      setError('Username must be 20 characters or less');
      return;
    }

    setSubmitting(true);
    setError('');
    
    const success = await submitScore(trimmedName, score, total, mode);
    
    if (success) {
      onSubmitted(trimmedName);
    } else {
      setError('Failed to submit score. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 rounded-2xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-x blur"></div>
      <div className="relative bg-stone-900 rounded-2xl p-8 border border-stone-700 shadow-2xl">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 mb-2">
            JOIN THE LEADERBOARD
          </h3>
          <p className="text-stone-400 font-medium text-lg">
            Immortalize your score of <span className="text-white font-bold">{score}/{total}</span>
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ENTER USERNAME"
              maxLength={20}
              className="w-full px-6 py-4 bg-stone-800 border-2 border-stone-700 rounded-xl text-white placeholder-stone-600 text-center font-bold text-xl tracking-wider focus:outline-none focus:border-orange-500 focus:bg-stone-800/50 transition-all uppercase"
              disabled={submitting}
            />
            {error && (
              <p className="absolute -bottom-6 left-0 right-0 text-center text-red-400 text-sm font-medium animate-pulse">{error}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 disabled:from-stone-700 disabled:to-stone-700 disabled:cursor-not-allowed text-stone-900 text-xl font-black uppercase tracking-widest rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/20"
          >
            {submitting ? 'SUBMITTING...' : 'SUBMIT SCORE'}
          </button>
        </form>
      </div>
    </div>
  );
}
