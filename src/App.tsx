import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AnalyzeSentiment from './pages/AnalyzeSentiment';
import History from './pages/History';
import { ThemeProvider } from './context/ThemeContext';
import { SentimentProvider } from './context/SentimentContext';

function App() {
  return (
    <ThemeProvider>
      <SentimentProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analyze" element={<AnalyzeSentiment />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </Layout>
        </Router>
      </SentimentProvider>
    </ThemeProvider>
  );
}

export default App;