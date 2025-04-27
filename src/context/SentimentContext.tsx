import React, { createContext, useContext, useState, ReactNode } from 'react';
import { analyzeSentiment } from '../utils/sentimentAnalyzer';

export interface SentimentResult {
  id: string;
  text: string;
  score: number;
  comparative: number;
  result: 'positive' | 'negative' | 'neutral';
  tokens: string[];
  words: {
    positive: string[];
    negative: string[];
  };
  timestamp: number;
}

interface SentimentContextType {
  history: SentimentResult[];
  addAnalysis: (text: string) => SentimentResult;
  clearHistory: () => void;
}

const SentimentContext = createContext<SentimentContextType | undefined>(undefined);

export const useSentiment = () => {
  const context = useContext(SentimentContext);
  if (!context) {
    throw new Error('useSentiment must be used within a SentimentProvider');
  }
  return context;
};

interface SentimentProviderProps {
  children: ReactNode;
}

export const SentimentProvider: React.FC<SentimentProviderProps> = ({ children }) => {
  const [history, setHistory] = useState<SentimentResult[]>(() => {
    const savedHistory = localStorage.getItem('sentimentHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const saveHistory = (newHistory: SentimentResult[]) => {
    localStorage.setItem('sentimentHistory', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const addAnalysis = (text: string) => {
    const result = analyzeSentiment(text);
    const newHistory = [result, ...history];
    saveHistory(newHistory);
    return result;
  };

  const clearHistory = () => {
    saveHistory([]);
  };

  return (
    <SentimentContext.Provider value={{ history, addAnalysis, clearHistory }}>
      {children}
    </SentimentContext.Provider>
  );
};
