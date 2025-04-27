import React, { useState } from 'react';
import { useSentiment, SentimentResult } from '../context/SentimentContext';
import SentimentCard from '../components/SentimentCard';
import { Trash2, Filter, FileDown } from 'lucide-react';

type SentimentFilter = 'all' | 'positive' | 'negative' | 'neutral';

const History: React.FC = () => {
  const { history, clearHistory } = useSentiment();
  const [filter, setFilter] = useState<SentimentFilter>('all');
  const [selectedResult, setSelectedResult] = useState<SentimentResult | null>(null);

  const filteredHistory = history.filter(item => {
    if (filter === 'all') return true;
    return item.result === filter;
  });

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history? This action cannot be undone.')) {
      clearHistory();
      setSelectedResult(null);
    }
  };

  const exportHistory = () => {
    const data = JSON.stringify(history, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sentiment-history-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0 transition-colors duration-300">
          Analysis History
        </h1>
        
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              <Filter className="mr-2 h-4 w-4" />
              <span>Filter: {filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
            </button>
            <div className="absolute z-10 mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              {['all', 'positive', 'negative', 'neutral'].map((option) => (
                <button
                  key={option}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                  onClick={() => setFilter(option as SentimentFilter)}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={exportHistory}
            disabled={history.length === 0}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            <FileDown className="mr-2 h-4 w-4" />
            Export All
          </button>
          
          <button
            onClick={handleClearHistory}
            disabled={history.length === 0}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </button>
        </div>
      </div>
      
      {history.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center transition-colors duration-300">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            No analysis history found. Try analyzing some text first!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white transition-colors duration-300">
              {filteredHistory.length} {filter === 'all' ? 'Total' : filter} Result{filteredHistory.length !== 1 ? 's' : ''}
            </h2>
            
            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredHistory.map((item) => (
                <div
                  key={item.id}
                  className={`cursor-pointer transform transition-transform duration-300 hover:scale-[1.02] ${
                    selectedResult?.id === item.id ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900' : ''
                  }`}
                  onClick={() => setSelectedResult(item)}
                >
                  <SentimentCard result={item} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-fit sticky top-4 transition-colors duration-300">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
              {selectedResult ? 'Detailed Analysis' : 'Select an analysis to view details'}
            </h2>
            
            {selectedResult ? (
              <SentimentCard result={selectedResult} showFullDetails={true} />
            ) : (
              <p className="text-gray-600 dark:text-gray-300 text-center py-8 transition-colors duration-300">
                Click on an analysis from the list to view its details
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;