import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, BarChart2, History, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
          Welcome to <span className="text-blue-600 dark:text-blue-500">SentimentLens</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
          Analyze and visualize the sentiment of any text in seconds
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            title: 'Analyze Text',
            description: 'Upload text or paste it directly to analyze its sentiment',
            icon: <BarChart3 className="h-10 w-10 text-blue-500" />,
            color: 'bg-blue-50 dark:bg-blue-900/20',
            border: 'border-blue-200 dark:border-blue-800',
          },
          {
            title: 'Visual Results',
            description: 'Get beautiful visualizations of sentiment breakdown',
            icon: <BarChart2 className="h-10 w-10 text-emerald-500" />,
            color: 'bg-emerald-50 dark:bg-emerald-900/20',
            border: 'border-emerald-200 dark:border-emerald-800',
          },
          {
            title: 'Track History',
            description: 'Review past analyses and compare results over time',
            icon: <History className="h-10 w-10 text-purple-500" />,
            color: 'bg-purple-50 dark:bg-purple-900/20',
            border: 'border-purple-200 dark:border-purple-800',
          }
        ].map((feature, index) => (
          <div 
            key={index}
            className={`${feature.color} ${feature.border} border rounded-lg p-6 hover:shadow-md transition-all duration-300`}
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-8 shadow-lg mb-12">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <ol className="space-y-6">
          {[
            'Enter or upload the text you want to analyze',
            'Our algorithm processes the text and identifies sentiment patterns',
            'View a detailed breakdown with visual charts and word analysis',
            'Save your results for future reference'
          ].map((step, index) => (
            <li key={index} className="flex items-start">
              <span className="flex items-center justify-center bg-white text-blue-600 rounded-full w-8 h-8 font-bold mr-3 flex-shrink-0">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
      
      <div className="text-center">
        <Link
          to="/analyze"
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
