interface QuestionNavProps {
  totalQuestions: number;
  currentQuestion: number;
  answers: (number | null)[];
  correctAnswers: number[];
  showResults: boolean;
  onSelectQuestion: (index: number) => void;
}

export function QuestionNav({ 
  totalQuestions, 
  currentQuestion, 
  answers, 
  correctAnswers,
  showResults,
  onSelectQuestion 
}: QuestionNavProps) {
  return (
    <div className="bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-700">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">Questions</h3>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const isAnswered = answers[i] !== null;
          const isCurrent = i === currentQuestion;
          const isCorrect = showResults && answers[i] === correctAnswers[i];
          const isWrong = showResults && isAnswered && answers[i] !== correctAnswers[i];

          let buttonClass = "w-full aspect-square rounded-lg text-sm font-medium transition-all duration-200 ";
          
          if (isCurrent) {
            buttonClass += "ring-2 ring-orange-500 ring-offset-2 ring-offset-gray-800 ";
          }

          if (showResults) {
            if (isCorrect) {
              buttonClass += "bg-green-600 text-white";
            } else if (isWrong) {
              buttonClass += "bg-red-600 text-white";
            } else {
              buttonClass += "bg-gray-700 text-gray-400";
            }
          } else if (isAnswered) {
            buttonClass += "bg-orange-500 text-white";
          } else {
            buttonClass += "bg-gray-700 text-gray-400 hover:bg-gray-600";
          }

          return (
            <button
              key={i}
              onClick={() => onSelectQuestion(i)}
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
