import { useState, useCallback, useEffect, useMemo } from 'react';
import { questions as originalQuestions } from './data/questions';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuestionCard } from './components/QuestionCard';
import { ProgressBar } from './components/ProgressBar';
import { NavigationButtons } from './components/NavigationButtons';
import { QuestionNav } from './components/QuestionNav';
import { Results } from './components/Results';
import type { ShuffledQuestion } from './types/quiz';

type Screen = 'welcome' | 'quiz' | 'results';

const STORAGE_KEY = 'zama-quiz-state';

interface SavedState {
  screen: Screen;
  currentQuestion: number;
  answers: (number | null)[];
  reviewMode: boolean;
  questionOrder: number[];
  optionOrders: number[][];
}

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function generateShuffleState(): { questionOrder: number[]; optionOrders: number[][] } {
  const questionOrder = shuffle(originalQuestions.map((_, i) => i));
  const optionOrders = originalQuestions.map(q => shuffle(q.options.map((_, i) => i)));
  return { questionOrder, optionOrders };
}

function loadSavedState(): SavedState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const state = JSON.parse(saved) as SavedState;
      if (state.answers.length === originalQuestions.length && 
          state.questionOrder?.length === originalQuestions.length) {
        return state;
      }
    }
  } catch {}
  return null;
}

function saveState(state: SavedState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

function clearSavedState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

function App() {
  const savedState = loadSavedState();
  const initialShuffle = savedState?.questionOrder 
    ? { questionOrder: savedState.questionOrder, optionOrders: savedState.optionOrders }
    : generateShuffleState();
  
  const [screen, setScreen] = useState<Screen>(savedState?.screen ?? 'welcome');
  const [currentQuestion, setCurrentQuestion] = useState(savedState?.currentQuestion ?? 0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    savedState?.answers ?? Array(originalQuestions.length).fill(null)
  );
  const [showExplanation, setShowExplanation] = useState(savedState?.reviewMode ?? false);
  const [reviewMode, setReviewMode] = useState(savedState?.reviewMode ?? false);
  const [questionOrder, setQuestionOrder] = useState<number[]>(initialShuffle.questionOrder);
  const [optionOrders, setOptionOrders] = useState<number[][]>(initialShuffle.optionOrders);

  const shuffledQuestions: ShuffledQuestion[] = useMemo(() => {
    return questionOrder.map(originalIndex => {
      const q = originalQuestions[originalIndex];
      const optionOrder = optionOrders[originalIndex];
      return {
        ...q,
        shuffledOptions: optionOrder.map(i => q.options[i]),
        shuffledCorrectAnswer: optionOrder.indexOf(q.correctAnswer),
        optionMapping: optionOrder,
      };
    });
  }, [questionOrder, optionOrders]);

  useEffect(() => {
    saveState({ screen, currentQuestion, answers, reviewMode, questionOrder, optionOrders });
  }, [screen, currentQuestion, answers, reviewMode, questionOrder, optionOrders]);

  const handleStart = useCallback(() => {
    const newShuffle = generateShuffleState();
    setQuestionOrder(newShuffle.questionOrder);
    setOptionOrders(newShuffle.optionOrders);
    setScreen('quiz');
    setCurrentQuestion(0);
    setAnswers(Array(originalQuestions.length).fill(null));
    setShowExplanation(false);
    setReviewMode(false);
  }, []);

  const handleReset = useCallback(() => {
    clearSavedState();
    const newShuffle = generateShuffleState();
    setQuestionOrder(newShuffle.questionOrder);
    setOptionOrders(newShuffle.optionOrders);
    setScreen('welcome');
    setCurrentQuestion(0);
    setAnswers(Array(originalQuestions.length).fill(null));
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
    handleStart();
  }, [handleStart]);

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
            onRestart={handleRestart}
            onReview={handleReview}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="w-20 hidden sm:block"></div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Zama Protocol Quiz</h1>
            <button
              onClick={handleReset}
              className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-lg bg-stone-700 text-gray-300 hover:bg-stone-600 hover:text-white transition-colors whitespace-nowrap"
            >
              Reset
            </button>
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
    </div>
  );
}

export default App;
