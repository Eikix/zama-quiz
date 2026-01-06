import { useState, useCallback, useEffect } from 'react';
import { questions } from './data/questions';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuestionCard } from './components/QuestionCard';
import { ProgressBar } from './components/ProgressBar';
import { NavigationButtons } from './components/NavigationButtons';
import { QuestionNav } from './components/QuestionNav';
import { Results } from './components/Results';

type Screen = 'welcome' | 'quiz' | 'results';

const STORAGE_KEY = 'zama-quiz-state';

interface SavedState {
  screen: Screen;
  currentQuestion: number;
  answers: (number | null)[];
  reviewMode: boolean;
}

function loadSavedState(): SavedState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const state = JSON.parse(saved) as SavedState;
      if (state.answers.length === questions.length) {
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
  
  const [screen, setScreen] = useState<Screen>(savedState?.screen ?? 'welcome');
  const [currentQuestion, setCurrentQuestion] = useState(savedState?.currentQuestion ?? 0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    savedState?.answers ?? Array(questions.length).fill(null)
  );
  const [showExplanation, setShowExplanation] = useState(savedState?.reviewMode ?? false);
  const [reviewMode, setReviewMode] = useState(savedState?.reviewMode ?? false);

  useEffect(() => {
    saveState({ screen, currentQuestion, answers, reviewMode });
  }, [screen, currentQuestion, answers, reviewMode]);

  const handleStart = useCallback(() => {
    setScreen('quiz');
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(null));
    setShowExplanation(false);
    setReviewMode(false);
  }, []);

  const handleReset = useCallback(() => {
    clearSavedState();
    setScreen('welcome');
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(null));
    setShowExplanation(false);
    setReviewMode(false);
  }, []);

  const handleSelectAnswer = useCallback((index: number) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = index;
      return newAnswers;
    });
  }, [currentQuestion]);

  const handleCheck = useCallback(() => {
    setShowExplanation(true);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowExplanation(reviewMode);
      scrollToTop();
    }
  }, [currentQuestion, reviewMode, scrollToTop]);

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
            questions={questions}
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
              total={questions.length}
              answeredCount={answeredCount}
            />
            
            <QuestionCard
              question={questions[currentQuestion]}
              selectedAnswer={answers[currentQuestion]}
              showExplanation={showExplanation}
              onSelectAnswer={handleSelectAnswer}
            />

            <NavigationButtons
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              hasAnswered={answers[currentQuestion] !== null}
              showExplanation={showExplanation}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onCheck={handleCheck}
              onFinish={handleFinish}
            />
          </div>

          <div className="lg:col-span-1">
            <QuestionNav
              totalQuestions={questions.length}
              currentQuestion={currentQuestion}
              answers={answers}
              correctAnswers={questions.map(q => q.correctAnswer)}
              showResults={reviewMode}
              onSelectQuestion={handleSelectQuestion}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
