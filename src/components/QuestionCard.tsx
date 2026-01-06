import type { Question } from '../types/quiz';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  showExplanation: boolean;
  onSelectAnswer: (index: number) => void;
}

export function QuestionCard({ 
  question, 
  selectedAnswer, 
  showExplanation,
  onSelectAnswer 
}: QuestionCardProps) {
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700">
      <div className="mb-2">
        <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
          {question.section}
        </span>
      </div>
      
      <h2 className="text-xl font-semibold text-white mb-6 leading-relaxed">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === question.correctAnswer;
          
          let buttonClass = "w-full p-4 rounded-xl text-left transition-all duration-200 border-2 ";
          
          if (showExplanation) {
            if (isCorrectOption) {
              buttonClass += "bg-green-900/50 border-green-500 text-green-100";
            } else if (isSelected && !isCorrectOption) {
              buttonClass += "bg-red-900/50 border-red-500 text-red-100";
            } else {
              buttonClass += "bg-gray-700/50 border-gray-600 text-gray-400";
            }
          } else if (isSelected) {
            buttonClass += "bg-orange-900/50 border-orange-500 text-orange-100";
          } else {
            buttonClass += "bg-gray-700/50 border-gray-600 text-gray-200 hover:border-orange-500 hover:bg-gray-700";
          }

          return (
            <button
              key={index}
              onClick={() => !showExplanation && onSelectAnswer(index)}
              disabled={showExplanation}
              className={buttonClass}
            >
              <span className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-600 flex items-center justify-center text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
                {showExplanation && isCorrectOption && (
                  <span className="ml-auto text-green-400">✓</span>
                )}
                {showExplanation && isSelected && !isCorrectOption && (
                  <span className="ml-auto text-red-400">✗</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className={`mt-6 p-4 rounded-xl ${isCorrect ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <span className="text-green-400 font-semibold">Correct!</span>
            ) : (
              <span className="text-amber-400 font-semibold">Not quite right</span>
            )}
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
