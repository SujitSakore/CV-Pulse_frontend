import React, { useEffect, useState } from 'react';

interface ScoreCardProps {
  title: string;
  score: number;
  feedback: string;
  color: string;
  icon: React.ReactNode;
  delay?: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ 
  title, 
  score, 
  feedback, 
  color, 
  icon,
  delay = 0
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore(prev => {
          if (prev >= score) {
            clearInterval(interval);
            return score;
          }
          return prev + 0.1;
        });
      }, 20);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [score, delay]);

  // Convert score to a color gradient (1 = red, 10 = green)
  const getGradientColor = () => {
    if (score <= 3) return 'from-red-500 to-red-400';
    if (score <= 6) return 'from-amber-500 to-amber-400';
    return 'from-emerald-500 to-emerald-400';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
      <div className={`p-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2 ${color}`}>
        {icon}
        <h3 className="font-medium">{title}</h3>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Score</span>
          <span className="text-lg font-semibold">{Math.floor(animatedScore)}/10</span>
        </div>
        
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-4 overflow-hidden">
          <div 
            className={`h-full rounded-full bg-gradient-to-r ${getGradientColor()}`}
            style={{ width: `${animatedScore * 10}%`, transition: 'width 0.5s ease-out' }}
          ></div>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300">{feedback}</p>
      </div>
    </div>
  );
};

export default ScoreCard;