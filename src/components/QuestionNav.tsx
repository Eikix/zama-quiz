interface QuestionNavProps {
  totalQuestions: number;
  currentQuestion: number;
  answers: (number | null)[];
  correctAnswers: number[];
  reviewMode: boolean;
  onSelectQuestion: (index: number) => void;
}

export function QuestionNav({ 
  totalQuestions, 
  currentQuestion, 
  answers, 
  correctAnswers,
  reviewMode,
  onSelectQuestion 
}: QuestionNavProps) {
  return (
    <div className="bg-stone-800 rounded-2xl p-4 shadow-xl border border-stone-700">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">Questions</h3>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const isAnswered = answers[i] !== null;
          const isCurrent = i === currentQuestion;
          const isCorrect = isAnswered && answers[i] === correctAnswers[i];
          const isWrong = isAnswered && answers[i] !== correctAnswers[i];
          
          const isClickable = reviewMode || !isAnswered || isCurrent;

          let buttonClass = "w-full aspect-square rounded-lg text-sm font-medium transition-all duration-200 ";
          
          if (isCurrent) {
            buttonClass += "ring-2 ring-orange-500 ring-offset-2 ring-offset-stone-800 ";
          }

          if (isCorrect) {
            buttonClass += "bg-green-600 text-white";
            if (!reviewMode && !isCurrent) {
              buttonClass += " cursor-not-allowed";
            }
          } else if (isWrong) {
            buttonClass += "bg-red-600 text-white";
            if (!reviewMode && !isCurrent) {
              buttonClass += " cursor-not-allowed";
            }
          } else {
            buttonClass += "bg-stone-700 text-gray-400 hover:bg-stone-600";
          }

          return (
            <button
              key={i}
              onClick={() => isClickable && onSelectQuestion(i)}
              disabled={!isClickable}
              className={buttonClass}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
