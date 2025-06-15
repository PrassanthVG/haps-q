interface QuizProgressProps {
  current: number;
  total: number;
  answered: number;
}

export default function QuizProgress({ current, total, answered }: QuizProgressProps) {
  const progressPercentage = (answered / total) * 100;

  return (
    <div className="bg-white rounded-xl p-4 mb-6">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Progress</span>
        <span>{answered}/{total} answered</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
