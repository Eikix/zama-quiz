import { useState } from 'react';
import type { ShuffledQuestion, SectionScore, Difficulty } from '../types/quiz';
import { beginnerSections, advancedSections } from '../data/questions';
import { SubmitScore } from './SubmitScore';
import { Leaderboard } from './Leaderboard';

interface ResultsProps {
  questions: ShuffledQuestion[];
  answers: (number | null)[];
  mode: Difficulty;
  onRestart: () => void;
  onReview: () => void;
}

export function Results({ questions, answers, mode, onRestart, onReview }: ResultsProps) {
  const [submittedUsername, setSubmittedUsername] = useState<string | null>(null);
  
  const correctCount = answers.reduce<number>((acc, answer, index) => {
    return answer === questions[index].shuffledCorrectAnswer ? acc + 1 : acc;
  }, 0);

  const percentage = Math.round((correctCount / questions.length) * 100);

  const sections = mode === 'beginner' ? beginnerSections : advancedSections;
  const sectionScores: SectionScore[] = sections.map(section => {
    const sectionQuestions = questions.filter(q => q.section === section);
    const correct = sectionQuestions.filter((q) => {
      const questionIndex = questions.findIndex(qq => qq.id === q.id);
      return answers[questionIndex] === q.shuffledCorrectAnswer;
    }).length;
    return { name: section, correct, total: sectionQuestions.length };
  });

  const getGrade = () => {
    if (percentage >= 92) return { emoji: '🏆', label: 'Expert', color: 'text-yellow-400' };
    if (percentage >= 76) return { emoji: '🥇', label: 'Advanced', color: 'text-orange-400' };
    if (percentage >= 60) return { emoji: '🥈', label: 'Intermediate', color: 'text-gray-300' };
    if (percentage >= 40) return { emoji: '🥉', label: 'Beginner', color: 'text-amber-600' };
    return { emoji: '📚', label: 'Keep Studying', color: 'text-red-400' };
  };

  const grade = getGrade();

  return (
    <div className="bg-stone-800 rounded-2xl p-8 shadow-xl border border-stone-700">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">{grade.emoji}</div>
        <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
        <p className={`text-xl font-semibold ${grade.color}`}>{grade.label}</p>
      </div>

      <div className="flex justify-center mb-10">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-stone-700"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeDasharray={2 * Math.PI * 70}
              strokeDashoffset={2 * Math.PI * 70 * (1 - percentage / 100)}
              className="text-orange-500 transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white">{percentage}%</span>
            <span className="text-sm text-gray-400">{correctCount}/{questions.length}</span>
          </div>
        </div>
      </div>

      <div className="mb-10">
        {!submittedUsername ? (
          <SubmitScore
            score={correctCount}
            total={questions.length}
            mode={mode}
            onSubmitted={setSubmittedUsername}
          />
        ) : (
          <Leaderboard
            currentUserScore={{ score: correctCount, total: questions.length }}
            highlightUsername={submittedUsername}
            mode={mode}
          />
        )}
      </div>

      <div className="flex gap-4 mb-10">
        <button
          onClick={onReview}
          className="flex-1 px-6 py-4 rounded-xl font-medium transition-all duration-200 bg-stone-700 text-gray-200 hover:bg-stone-600 hover:text-white border border-transparent hover:border-stone-500"
        >
          Review Answers
        </button>
        <button
          onClick={onRestart}
          className="flex-1 px-6 py-4 rounded-xl font-medium transition-all duration-200 bg-stone-700 text-gray-200 hover:bg-stone-600 hover:text-white border border-transparent hover:border-stone-500"
        >
          Start Over
        </button>
      </div>

      <div className="space-y-4 pt-8 border-t border-stone-700/50">
        <h3 className="text-sm font-bold text-stone-500 uppercase tracking-widest text-center mb-6">Performance Breakdown</h3>
        {sectionScores.map((section) => (
          <div key={section.name} className="bg-stone-700/30 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300 text-sm">{section.name}</span>
              <span className="text-white font-medium">{section.correct}/{section.total}</span>
            </div>
            <div className="h-2 bg-stone-600 rounded-full overflow-hidden">
              <div 
                className="h-full bg-stone-400 transition-all duration-500"
                style={{ width: `${(section.correct / section.total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
