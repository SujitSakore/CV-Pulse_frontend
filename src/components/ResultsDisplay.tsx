import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { ResumeAnalysisResult } from '../types';
import { Code, Briefcase, Target, FileText, Award } from 'lucide-react';

interface ResultsDisplayProps {
  results: ResumeAnalysisResult | null;
  fileName: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, fileName }) => {
  const reportRef = useRef<HTMLDivElement>(null);

  const handleDownloadReport = () => {
    if (reportRef.current) {
      html2pdf()
        .set({
          margin: 0.5,
          filename: `${fileName}_report.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        })
        .from(reportRef.current)
        .save();
    }
  };

  if (!results) return null;

  return (
    <div
      ref={reportRef}
      className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
    >
      {/* Header Info */}
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
        <p><strong>File:</strong> {fileName}</p>
        <p><strong>Generated On:</strong> {new Date().toLocaleDateString()}</p>
      </div>

      {/* Overall Score */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          Resume Analysis Report
        </h2>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Overall Score:</span>
          <div className="px-2 py-1 rounded-md bg-white dark:bg-gray-800 text-sm font-semibold">
            <span
              className={
                results.overall_score >= 7
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : results.overall_score >= 4
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-red-600 dark:text-red-400'
              }
            >
              {results.overall_score}/10
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Technical Skills */}
        <div className="p-4 rounded-lg border dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-300 font-semibold">
            <Code className="h-5 w-5" />
            Technical Skills — {results.technical_skills.score}/10
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {results.technical_skills.feedback}
          </p>
        </div>

        {/* Work Experience */}
        <div className="p-4 rounded-lg border dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-purple-700 dark:text-purple-300 font-semibold">
            <Briefcase className="h-5 w-5" />
            Work Experience — {results.work_experience.score}/10
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {results.work_experience.feedback}
          </p>
        </div>

        {/* Relevance */}
        <div className="p-4 rounded-lg border dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-amber-700 dark:text-amber-300 font-semibold">
            <Target className="h-5 w-5" />
            Relevance to Role — {results.relevance_to_software_engineering.score}/10
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {results.relevance_to_software_engineering.feedback}
          </p>
        </div>

        {/* Structure & Clarity */}
        <div className="p-4 rounded-lg border dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-emerald-700 dark:text-emerald-300 font-semibold">
            <Award className="h-5 w-5" />
            Structure & Clarity — {results.clarity_and_structure.score}/10
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {results.clarity_and_structure.feedback}
          </p>
        </div>
      </div>

      {/* Summary Recommendations */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          Summary Recommendations
        </h3>
        <ul className="list-disc list-inside text-sm text-gray-800 dark:text-gray-200">
          {results.recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>

      {/* Download Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleDownloadReport}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md transition-colors duration-200 text-sm font-medium"
        >
          Download Full Report
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
