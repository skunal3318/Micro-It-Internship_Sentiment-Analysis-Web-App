import React from 'react';
import { ThumbsUp, ThumbsDown, MinusCircle } from 'lucide-react';
import { SentimentResult } from '../context/SentimentContext';
import { formatDate } from '../utils/formatters';

interface SentimentCardProps {
  result: SentimentResult;
  showFullDetails?: boolean;
}

const SentimentCard: React.FC<SentimentCardProps> = ({ result, showFullDetails = false }) => {
  const { text, score, result: sentimentResult, timestamp } = result;
  
  const getIcon = () => {
    switch (sentimentResult) {
      case 'positive':
        return <ThumbsUp className="h-6 w-6 text-emerald-500" />;
      case 'negative':
        return <ThumbsDown className="h-6 w-6 text-red-500" />;
      case 'neutral':
        return <MinusCircle className="h-6 w-6 text-amber-500" />;
    }
  };
  
  const getBgColor = () => {
    switch (sentimentResult) {
      case 'positive':
        return 'bg-emerald-50 dark:bg-emerald-900/20';
      case 'negative':
        return 'bg-red-50 dark:bg-red-900/20';
      case 'neutral':
        return 'bg-amber-50 dark:bg-amber-900/20';
    }
  };
  
  const getBorderColor = () => {
    switch (sentimentResult) {
      case 'positive':
        return 'border-emerald-200 dark:border-emerald-800';
      case 'negative':
        return 'border-red-200 dark:border-red-800';
      case 'neutral':
        return 'border-amber-200 dark:border-amber-800';
    }
  };

  return (
    <div className={`rounded-lg border ${getBorderColor()} ${getBgColor()} p-4 mb-4 transition-all duration-300 hover:shadow-md`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">{getIcon()}</div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white capitalize">
              {sentimentResult} Sentiment
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(timestamp)}
            </span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            {text.length > 100 && !showFullDetails ? `${text.substring(0, 100)}...` : text}
          </p>
          
          {showFullDetails && (
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Score</p>
                <p className="text-gray-600 dark:text-gray-400">{score}</p>
              </div>
              
              {result.words.positive.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Positive Words</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {result.words.positive.map((word, index) => (
                      <span key={index} className="px-2 py-1 bg-emerald-100 dark:bg-emerald-800/50 text-emerald-800 dark:text-emerald-200 text-xs rounded">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {result.words.negative.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Negative Words</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {result.words.negative.map((word, index) => (
                      <span key={index} className="px-2 py-1 bg-red-100 dark:bg-red-800/50 text-red-800 dark:text-red-200 text-xs rounded">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SentimentCard;