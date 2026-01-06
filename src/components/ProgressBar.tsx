interface ProgressBarProps {
  current: number;
  total: number;
  answeredCount: number;
}

export function ProgressBar({ current, total, answeredCount }: ProgressBarProps) {
  const progress = ((current + 1) / total) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span>Question {current + 1} of {total}</span>
        <span>{answeredCount} answered</span>
      </div>
      <div className="h-2 bg-stone-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
