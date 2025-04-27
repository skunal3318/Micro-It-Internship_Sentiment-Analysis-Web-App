import React, { useState } from 'react';
import TextAnalyzer from '../components/TextAnalyzer';
import SentimentCard from '../components/SentimentCard';
import SentimentChart from '../components/SentimentChart';
import { SentimentResult } from '../context/SentimentContext';
import { FileDown, BarChart, PieChart } from 'lucide-react';

const AnalyzeSentiment: React.FC = () => {
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie');

  const handleAnalysisComplete = (analysisResult: SentimentResult) => {
    setResult(analysisResult);
    // Scroll to results with smooth animation
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const exportResults = () => {
    if (!result) return;
    
    const resultData = JSON.stringify(result, null, 2);
    const blob = new Blob([resultData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sentiment-analysis-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-300">
        Analyze Sentiment
      </h1>
      
      <TextAnalyzer onAnalysisComplete={handleAnalysisComplete} />
      
      {result && (
        <div id="results" className="mt-8 animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-300">
              Analysis Results
            </h2>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setChartType('pie')}
                className={`p-2 rounded ${
                  chartType === 'pie' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                } transition-colors duration-300`}
                aria-label="Pie chart"
              >
                <PieChart size={20} />
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`p-2 rounded ${
                  chartType === 'bar' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                } transition-colors duration-300`}
                aria-label="Bar chart"
              >
                <BarChart size={20} />
              </button>
              <button
                onClick={exportResults}
                className="inline-flex items-center p-2 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300"
                aria-label="Export results"
              >
                <FileDown size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div>
              <SentimentCard result={result} showFullDetails={true} />
            </div>
            <div>
              <SentimentChart result={result} type={chartType} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzeSentiment;