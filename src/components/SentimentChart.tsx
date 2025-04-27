import React, { useEffect, useMemo } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartOptions
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { SentimentResult } from '../context/SentimentContext';
import { useTheme } from '../context/ThemeContext';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface SentimentChartProps {
  result: SentimentResult;
  type?: 'pie' | 'bar';
}

const SentimentChart: React.FC<SentimentChartProps> = ({ result, type = 'pie' }) => {
  const { theme } = useTheme();
  
  const positiveCount = result.words.positive.length;
  const negativeCount = result.words.negative.length;
  const neutralCount = result.tokens.length - positiveCount - negativeCount;
  
  const chartData = useMemo(() => {
    return {
      labels: ['Positive', 'Negative', 'Neutral'],
      datasets: [
        {
          data: [positiveCount, negativeCount, neutralCount],
          backgroundColor: [
            'rgba(16, 185, 129, 0.7)',
            'rgba(239, 68, 68, 0.7)',
            'rgba(245, 158, 11, 0.7)'
          ],
          borderColor: [
            'rgba(16, 185, 129, 1)',
            'rgba(239, 68, 68, 1)',
            'rgba(245, 158, 11, 1)'
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [positiveCount, negativeCount, neutralCount]);
  
  const chartOptions = useMemo(() => {
    const options: ChartOptions<'pie' | 'bar'> = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: theme === 'dark' ? '#e5e7eb' : '#374151',
          },
        },
        title: {
          display: true,
          text: 'Sentiment Analysis',
          color: theme === 'dark' ? '#e5e7eb' : '#374151',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw as number;
              const total = positiveCount + negativeCount + neutralCount;
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      },
    };
    
    if (type === 'bar') {
      options.scales = {
        y: {
          beginAtZero: true,
          ticks: {
            color: theme === 'dark' ? '#e5e7eb' : '#374151',
          },
          grid: {
            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          }
        },
        x: {
          ticks: {
            color: theme === 'dark' ? '#e5e7eb' : '#374151',
          },
          grid: {
            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          }
        }
      };
    }
    
    return options;
  }, [theme, type, positiveCount, negativeCount, neutralCount]);
  
  // Update chart when theme changes
  useEffect(() => {
    ChartJS.defaults.color = theme === 'dark' ? '#e5e7eb' : '#374151';
  }, [theme]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors duration-300">
      <div className="h-64">
        {type === 'pie' ? (
          <Pie data={chartData} options={chartOptions} />
        ) : (
          <Bar data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
};

export default SentimentChart;