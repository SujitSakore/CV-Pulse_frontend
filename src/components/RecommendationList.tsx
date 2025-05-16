import React from 'react';
import { CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';

interface RecommendationListProps {
  recommendations: string[];
}

const RecommendationList: React.FC<RecommendationListProps> = ({ recommendations }) => {
  // Determine icon by recommendation content
  const getIcon = (recommendation: string) => {
    const lowercaseRec = recommendation.toLowerCase();
    
    if (lowercaseRec.includes('provide') || lowercaseRec.includes('add') || lowercaseRec.includes('include')) {
      return <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />;
    } else if (lowercaseRec.includes('improve') || lowercaseRec.includes('enhance') || lowercaseRec.includes('detail')) {
      return <HelpCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />;
    } else {
      return <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recommendations</h2>
      
      <div className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <div 
            key={index}
            className="flex gap-3 items-start p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            {getIcon(recommendation)}
            <p className="text-sm text-gray-700 dark:text-gray-300">{recommendation}</p>
          </div>
        ))}
      </div>
      
      {recommendations.length === 0 && (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          <p>No recommendations available.</p>
        </div>
      )}
    </div>
  );
};

export default RecommendationList;