import Sentiment from 'sentiment';

// Determine sentiment result based on score
function getSentimentResult(score: number): 'positive' | 'negative' | 'neutral' {
  if (score > 0) return 'positive';
  if (score < 0) return 'negative';
  return 'neutral';
}

// Generate a unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function analyzeSentiment(text: string) {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(text);
  
  return {
    id: generateId(),
    text,
    score: result.score,
    comparative: result.comparative,
    result: getSentimentResult(result.score),
    tokens: result.tokens,
    words: {
      positive: result.positive,
      negative: result.negative
    },
    timestamp: Date.now()
  };
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}