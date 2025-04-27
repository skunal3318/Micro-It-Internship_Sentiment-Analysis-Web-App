import React, { useState } from 'react';
import { useSentiment, SentimentResult } from '../context/SentimentContext';
import { Upload, Loader2 } from 'lucide-react';
import { readFileAsText } from '../utils/sentimentAnalyzer';

interface TextAnalyzerProps {
  onAnalysisComplete: (result: SentimentResult) => void;
}

const TextAnalyzer: React.FC<TextAnalyzerProps> = ({ onAnalysisComplete }) => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addAnalysis } = useSentiment();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setError(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const content = await readFileAsText(file);
      setText(content);
      setError(null);
    } catch (err) {
      setError('Failed to read file. Please try again.');
      console.error(err);
    }
  };

  const analyzeSentiment = async () => {
    if (!text.trim()) {
      setError('Please enter some text or upload a file first.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // Simulate processing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      const result = addAnalysis(text);
      onAnalysisComplete(result);
    } catch (err) {
      setError('An error occurred during analysis. Please try again.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Enter Text for Analysis
      </h2>
      
      <div className="mb-4">
        <textarea
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-300"
          rows={6}
          placeholder="Enter text to analyze sentiment..."
          value={text}
          onChange={handleTextChange}
          disabled={isAnalyzing}
        ></textarea>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
        <div className="relative">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".txt,.md,.csv"
            onChange={handleFileUpload}
            disabled={isAnalyzing}
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-300"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Text File
          </label>
        </div>
        
        <button
          onClick={analyzeSentiment}
          disabled={isAnalyzing || !text.trim()}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Analyze Sentiment'
          )}
        </button>
      </div>
      
      {error && (
        <div className="text-red-500 text-sm mt-2">{error}</div>
      )}
    </div>
  );
};

export default TextAnalyzer;