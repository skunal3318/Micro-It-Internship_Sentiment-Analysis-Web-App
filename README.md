# Sentiment Analysis Web Application

A modern web application that analyzes and visualizes sentiment in text data. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Text Analysis**: Input text directly or upload text files for sentiment analysis
- **Visual Results**: View sentiment breakdown with interactive charts
- **History Tracking**: Save and review past analyses
- **Responsive Design**: Works beautifully on all devices from mobile to desktop
- **Dark/Light Mode**: Choose your preferred theme
- **Export Data**: Export your analysis results and history

## Technologies Used

- React 18 with TypeScript
- Tailwind CSS for styling
- Chart.js and react-chartjs-2 for visualizations
- Sentiment.js for JavaScript-based sentiment analysis
- Local Storage for persisting history
- Lucide React for beautiful icons

## Getting Started

### Prerequisites

- Node.js 14.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sentiment-analysis-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd sentiment-analysis-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to http://localhost:5173

## Usage

1. **Analyze Text**:
   - Type or paste text in the input area
   - Alternatively, upload a text file (.txt, .md, .csv)
   - Click "Analyze Sentiment" to process the text

2. **View Results**:
   - See the overall sentiment classification (positive, negative, or neutral)
   - Explore the detailed breakdown with charts
   - View positive and negative words identified in your text

3. **History**:
   - Access past analyses from the History page
   - Filter results by sentiment type
   - Export history as JSON for external analysis

## Building for Production

To build the application for production:

```bash
npm run build
```

The optimized build will be available in the `dist` directory, ready to be deployed to your preferred hosting platform.

## Future Enhancements

- Integration with more advanced sentiment analysis APIs
- User accounts for persistent history across devices
- Sentiment analysis for social media feeds
- Comparative analysis of multiple texts
- Time series analysis for tracking sentiment over time

## License

This project is licensed under the MIT License - see the LICENSE file for details.