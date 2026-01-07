interface NavigationButtonsProps {
  currentQuestion: number;
  totalQuestions: number;
  hasAnswered: boolean;
  showExplanation: boolean;
  reviewMode: boolean;
  answers: (number | null)[];
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
  onGoToQuestion: (index: number) => void;
}

export function NavigationButtons({
  currentQuestion,
  totalQuestions,
  hasAnswered,
  showExplanation,
  reviewMode,
  answers,
  onPrevious,
  onNext,
  onFinish,
  onGoToQuestion,
}: NavigationButtonsProps) {
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const allAnswered = answers.every(a => a !== null);
  
  const nextUnansweredIndex = answers.findIndex((a, i) => a === null && i !== currentQuestion);
  const hasUnanswered = nextUnansweredIndex !== -1;

  return (
    <div className="flex justify-between mt-8">
      {reviewMode ? (
        <button
          onClick={onPrevious}
          disabled={currentQuestion === 0}
          className="px-6 py-3 rounded-xl font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed bg-stone-700 text-gray-200 hover:bg-stone-600"
        >
          Previous
        </button>
      ) : (
        <div></div>
      )}

      <div className="flex gap-3">
        {showExplanation && !reviewMode && hasUnanswered && (
          <button
            onClick={() => onGoToQuestion(nextUnansweredIndex)}
            className="px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-400 hover:to-amber-400"
          >
            Next
          </button>
        )}

        {showExplanation && !reviewMode && allAnswered && (
          <button
            onClick={onFinish}
            className="px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-500"
          >
            See Results
          </button>
        )}

        {showExplanation && reviewMode && !isLastQuestion && (
          <button
            onClick={onNext}
            className="px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-400 hover:to-amber-400"
          >
            Next Question
          </button>
        )}

        {showExplanation && reviewMode && isLastQuestion && (
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
