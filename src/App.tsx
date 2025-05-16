import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import ResultsDisplay from './components/ResultsDisplay';
import { analyzeMultipleResumes } from './utils/api';
import { ResumeResult } from './types';
import { AlertOctagon } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [files, setFiles] = useState<File[]>([]);
  const [jobDescription, setJobDescription] = useState('');
  const [results, setResults] = useState<ResumeResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleFilesUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    setResults([]);
    setError(null);
  };

  const handleJobDescriptionChange = (description: string) => {
    setJobDescription(description);
    setResults([]);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (files.length === 0 || !jobDescription) {
      setError('Please upload at least one resume and enter a job description');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const analysisResults = await analyzeMultipleResumes(files, jobDescription);
      setResults(analysisResults);
    } catch (err) {
      console.error('Error during analysis:', err);
      setError('An error occurred during analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            AI Resume Shortlisting
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Upload multiple resumes and enter a job description to get AI-powered analysis and ranking of candidates.
          </p>
        </div>
        
        <UploadSection
          onFilesUpload={handleFilesUpload}
          onJobDescriptionChange={handleJobDescriptionChange}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
        />
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg flex items-center gap-2">
            <AlertOctagon className="h-5 w-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
        
        {results.map((result, index) => (
          <div key={result.id} className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center font-semibold">
                {index + 1}
              </div>
              <h2 className="text-xl font-semibold">{result.fileName}</h2>
            </div>
            <ResultsDisplay 
              results={result.result}
              fileName={result.fileName}
            />
          </div>
        ))}
      </main>
      
      <footer className="py-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>© 2025 ResuMatch | AI-powered resume analysis</p>
      </footer>
    </div>
  );
}

export default App;