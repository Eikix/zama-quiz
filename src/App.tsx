import { useState, useCallback, useEffect, useMemo } from 'react';
import { questions as allQuestions } from './data/questions';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuestionCard } from './components/QuestionCard';
import { ProgressBar } from './components/ProgressBar';
import { NavigationButtons } from './components/NavigationButtons';
import { QuestionNav } from './components/QuestionNav';
import { Results } from './components/Results';
import { Leaderboard } from './components/Leaderboard';
import type { ShuffledQuestion, Difficulty } from './types/quiz';

type Screen = 'welcome' | 'quiz' | 'results';

const STORAGE_KEY = 'zama-quiz-state';

function LeaderboardModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-md max-h-[80vh] overflow-hidden bg-stone-800 rounded-2xl shadow-2xl border border-stone-700" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-10"
          aria-label="Close leaderboard"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="p-2">
           <Leaderboard showTabs />
        </div>
      </div>
    </div>
  );
}

interface SavedState {
  screen: Screen;
  currentQuestion: number;
  answers: (number | null)[];
  reviewMode: boolean;
  questionOrder: number[];
  optionOrders: number[][];
  mode: Difficulty;
}

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function generateShuffleState(questions: typeof allQuestions): { questionOrder: number[]; optionOrders: number[][] } {
  const questionOrder = shuffle(questions.map((_, i) => i));
  const optionOrders = questions.map(q => shuffle(q.options.map((_, i) => i)));
  return { questionOrder, optionOrders };
}

function loadSavedState(): SavedState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const state = JSON.parse(saved) as SavedState;
      const filteredQuestions = allQuestions.filter(q => q.difficulty === state.mode);
      if (state.answers.length === filteredQuestions.length && 
          state.questionOrder?.length === filteredQuestions.length) {
        return state;
      }
    }
  } catch { /* localStorage unavailable or corrupted state - ignore */ }
  return null;
}

function saveState(state: SavedState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* localStorage unavailable - ignore */ }
}

function clearSavedState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch { /* localStorage unavailable - ignore */ }
}

function App() {
  const savedState = loadSavedState();
  const [mode, setMode] = useState<Difficulty>(savedState?.mode ?? 'beginner');
  
  const filteredQuestions = useMemo(() => 
    allQuestions.filter(q => q.difficulty === mode),
    [mode]
  );
  
  const initialShuffle = savedState?.questionOrder 
    ? { questionOrder: savedState.questionOrder, optionOrders: savedState.optionOrders }
    : generateShuffleState(filteredQuestions);
  
  const [screen, setScreen] = useState<Screen>(savedState?.screen ?? 'welcome');
  const [currentQuestion, setCurrentQuestion] = useState(savedState?.currentQuestion ?? 0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    savedState?.answers ?? Array(filteredQuestions.length).fill(null)
  );
  const [showExplanation, setShowExplanation] = useState(savedState?.reviewMode ?? false);
  const [reviewMode, setReviewMode] = useState(savedState?.reviewMode ?? false);
  const [questionOrder, setQuestionOrder] = useState<number[]>(initialShuffle.questionOrder);
  const [optionOrders, setOptionOrders] = useState<number[][]>(initialShuffle.optionOrders);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const shuffledQuestions: ShuffledQuestion[] = useMemo(() => {
    return questionOrder.map(originalIndex => {
      const q = filteredQuestions[originalIndex];
      if (!q) return null;
      const optionOrder = optionOrders[originalIndex];
      return {
        ...q,
        shuffledOptions: optionOrder.map(i => q.options[i]),
        shuffledCorrectAnswer: optionOrder.indexOf(q.correctAnswer),
        optionMapping: optionOrder,
      };
    }).filter((q): q is ShuffledQuestion => q !== null);
  }, [questionOrder, optionOrders, filteredQuestions]);

  useEffect(() => {
    saveState({ screen, currentQuestion, answers, reviewMode, questionOrder, optionOrders, mode });
  }, [screen, currentQuestion, answers, reviewMode, questionOrder, optionOrders, mode]);

  const handleStart = useCallback((selectedMode: Difficulty) => {
    setMode(selectedMode);
    const questions = allQuestions.filter(q => q.difficulty === selectedMode);
    const newShuffle = generateShuffleState(questions);
    setQuestionOrder(newShuffle.questionOrder);
    setOptionOrders(newShuffle.optionOrders);
    setScreen('quiz');
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(null));
    setShowExplanation(false);
    setReviewMode(false);
  }, []);

  const handleReset = useCallback(() => {
    clearSavedState();
    setMode('beginner');
    setScreen('welcome');
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    setReviewMode(false);
  }, []);

  const handleSelectAnswer = useCallback((index: number) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = index;
      return newAnswers;
    });
    setShowExplanation(true);
  }, [currentQuestion]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNext = useCallback(() => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowExplanation(reviewMode);
      scrollToTop();
    }
  }, [currentQuestion, reviewMode, scrollToTop, shuffledQuestions.length]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setShowExplanation(reviewMode);
      scrollToTop();
    }
  }, [currentQuestion, reviewMode, scrollToTop]);

  const handleSelectQuestion = useCallback((index: number) => {
    setCurrentQuestion(index);
    setShowExplanation(reviewMode || answers[index] !== null);
    scrollToTop();
  }, [reviewMode, answers, scrollToTop]);

  const handleFinish = useCallback(() => {
    setScreen('results');
  }, []);

  const handleReview = useCallback(() => {
    setReviewMode(true);
    setShowExplanation(true);
    setCurrentQuestion(0);
    setScreen('quiz');
  }, []);

  const handleRestart = useCallback(() => {
    handleStart(mode);
  }, [handleStart, mode]);

  const answeredCount = answers.filter(a => a !== null).length;

  if (screen === 'welcome') {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <WelcomeScreen onStart={handleStart} />
        </div>
      </div>
    );
  }

  if (screen === 'results') {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <Results 
            questions={shuffledQuestions}
            answers={answers}
            mode={mode}
            onRestart={handleRestart}
            onReview={handleReview}
          />
        </div>
      </div>
    );
  }

  const modeLabel = mode === 'beginner' ? 'Beginner' : 'Advanced';
  const modeColor = mode === 'beginner' ? 'text-green-400 bg-green-600/20' : 'text-orange-400 bg-orange-600/20';

  return (
    <div className="min-h-screen bg-stone-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="w-20 hidden sm:flex justify-start">
              <button 
                onClick={() => setShowLeaderboard(true)}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 transition-all duration-200"
                title="View Leaderboard"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
                <span className="text-sm font-medium hidden lg:inline">Leaderboard</span>
              </button>
            </div>
            <div className="flex-1 text-center">
              <h1 className="text-xl sm:text-2xl font-bold text-white">Zama Protocol Quiz</h1>
              <span className={`inline-block px-2 py-0.5 text-xs rounded-full mt-1 ${modeColor}`}>
                {modeLabel}
              </span>
            </div>
            <div className="w-20 flex justify-end">
              <button
                onClick={handleReset}
                className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-lg bg-stone-700 text-gray-300 hover:bg-stone-600 hover:text-white transition-colors whitespace-nowrap"
              >
                Reset
              </button>
            </div>
          </div>
          {reviewMode && (
            <div className="text-center">
              <span className="inline-block px-3 py-1 bg-amber-600/20 text-amber-400 text-sm rounded-full">
                Review Mode
              </span>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ProgressBar 
              current={currentQuestion} 
              total={shuffledQuestions.length}
              answeredCount={answeredCount}
            />
            
            <QuestionCard
              question={shuffledQuestions[currentQuestion]}
              selectedAnswer={answers[currentQuestion]}
              showExplanation={showExplanation}
              locked={!reviewMode && answers[currentQuestion] !== null}
              onSelectAnswer={handleSelectAnswer}
            />

            <NavigationButtons
              currentQuestion={currentQuestion}
              totalQuestions={shuffledQuestions.length}
              hasAnswered={answers[currentQuestion] !== null}
              showExplanation={showExplanation}
              reviewMode={reviewMode}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onFinish={handleFinish}
            />
          </div>

          <div className="lg:col-span-1">
            <QuestionNav
              totalQuestions={shuffledQuestions.length}
              currentQuestion={currentQuestion}
              answers={answers}
              correctAnswers={shuffledQuestions.map(q => q.shuffledCorrectAnswer)}
              showResults={reviewMode}
              reviewMode={reviewMode}
              onSelectQuestion={handleSelectQuestion}
            />
          </div>
        </div>
      </div>
      
      {showLeaderboard && <LeaderboardModal onClose={() => setShowLeaderboard(false)} />}
    </div>
  );
}

export default App;
