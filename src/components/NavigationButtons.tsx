interface NavigationButtonsProps {
  currentQuestion: number;
  totalQuestions: number;
  hasAnswered: boolean;
  showExplanation: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onCheck: () => void;
  onFinish: () => void;
}

export function NavigationButtons({
  currentQuestion,
  totalQuestions,
  hasAnswered,
  showExplanation,
  onPrevious,
  onNext,
  onCheck,
  onFinish,
}: NavigationButtonsProps) {
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="flex justify-between mt-8">
      <button
        onClick={onPrevious}
        disabled={currentQuestion === 0}
        className="px-6 py-3 rounded-xl font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed bg-stone-700 text-gray-200 hover:bg-stone-600"
      >
        Previous
      </button>

      <div className="flex gap-3">
        {!showExplanation && hasAnswered && (
          <button
            onClick={onCheck}
            className="px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-400 hover:to-amber-400"
          >
            Check Answer
          </button>
        )}

        {showExplanation && !isLastQuestion && (
          <button
            onClick={onNext}
            className="px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-400 hover:to-amber-400"
          >
            Next Question
          </button>
        )}

        {showExplanation && isLastQuestion && (
          <button
            onClick={onFinish}
            className="px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-500"
          >
            See Results
          </button>
        )}

        {!showExplanation && !hasAnswered && !isLastQuestion && (
          <button
            onClick={onNext}
            className="px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-stone-700 text-gray-200 hover:bg-stone-600"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
