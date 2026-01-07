import type { ShuffledQuestion } from '../types/quiz';
import { ReportButton } from './ReportButton';

interface QuestionCardProps {
  question: ShuffledQuestion;
  selectedAnswer: number | null;
  showExplanation: boolean;
  locked: boolean;
  onSelectAnswer: (index: number) => void;
}

export function QuestionCard({ 
  question, 
  selectedAnswer, 
  showExplanation,
  locked,
  onSelectAnswer 
}: QuestionCardProps) {
  const isCorrect = selectedAnswer === question.shuffledCorrectAnswer;
  const canSelect = !showExplanation && !locked;

  return (
    <div className="bg-stone-800 rounded-2xl p-8 shadow-xl border border-stone-700">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
          {question.section}
        </span>
        <ReportButton
          questionId={question.id}
          questionText={question.question}
          options={question.options}
          correctAnswerIndex={question.correctAnswer}
          section={question.section}
          explanation={question.explanation}
        />
      </div>
      
      <h2 className="text-xl font-semibold text-white mb-6 leading-relaxed select-text">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.shuffledOptions.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === question.shuffledCorrectAnswer;
          
          let buttonClass = "w-full p-4 rounded-xl text-left transition-all duration-200 border-2 ";
          
          if (showExplanation) {
            if (isCorrectOption) {
              buttonClass += "bg-green-900/50 border-green-500 text-green-100";
            } else if (isSelected && !isCorrectOption) {
              buttonClass += "bg-red-900/50 border-red-500 text-red-100";
            } else {
              buttonClass += "bg-stone-700/50 border-stone-600 text-gray-400";
            }
          } else if (isSelected) {
            buttonClass += "bg-orange-900/50 border-orange-500 text-orange-100";
          } else if (canSelect) {
            buttonClass += "bg-stone-700/50 border-stone-600 text-gray-200 hover:border-orange-500 hover:bg-stone-700";
          } else {
            buttonClass += "bg-stone-700/50 border-stone-600 text-gray-400 cursor-not-allowed";
          }

          return (
            <div
              key={index}
              onClick={() => canSelect && onSelectAnswer(index)}
              role="button"
              tabIndex={canSelect ? 0 : -1}
              onKeyDown={(e) => e.key === 'Enter' && canSelect && onSelectAnswer(index)}
              className={buttonClass + (canSelect ? ' cursor-pointer' : '')}
            >
              <span className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-stone-600 flex items-center justify-center text-sm font-medium select-none">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="select-text">{option}</span>
                {showExplanation && isCorrectOption && (
                  <span className="ml-auto text-green-400 select-none">✓</span>
                )}
                {showExplanation && isSelected && !isCorrectOption && (
                  <span className="ml-auto text-red-400 select-none">✗</span>
                )}
              </span>
            </div>
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
          <p className="text-gray-300 text-sm leading-relaxed select-text">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
