import React, { useState, useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';

interface UploadSectionProps {
  onFilesUpload: (files: File[]) => void;
  onJobDescriptionChange: (description: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const UploadSection: React.FC<UploadSectionProps> = ({
  onFilesUpload,
  onJobDescriptionChange,
  onAnalyze,
  isLoading
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      onFilesUpload([...files, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...newFiles]);
      onFilesUpload([...files, ...newFiles]);
    }
  };

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJobDescription(value);
    onJobDescriptionChange(value);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesUpload(newFiles);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Job Description</h2>
        <textarea
          placeholder="Paste job description here..."
          className="w-full h-40 p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          value={jobDescription}
          onChange={handleJobDescriptionChange}
        ></textarea>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
          <span>Characters: {jobDescription.length}</span>
          <span>Recommended: 100-500 characters</span>
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Resume Upload</h2>
        
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`min-h-40 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
            isDragging 
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
              : 'border-gray-300 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-600'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx"
            multiple
          />
          
          {files.length > 0 ? (
            <div className="w-full p-4">
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/50 p-2 rounded-md"
                  >
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[200px] truncate">
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        ({(file.size / 1024).toFixed(2)} KB)
                      </span>
                    </div>
                    <button
                      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                    >
                      <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Click or drag to add more resumes
                </p>
              </div>
            </div>
          ) : (
            <>
              <Upload className="h-8 w-8 text-gray-400 dark:text-gray-500 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                <span className="font-medium text-indigo-600 dark:text-indigo-400">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                PDF, DOC, or DOCX (max 5MB per file)
              </p>
            </>
          )}
        </div>

        <button
          className={`mt-4 w-full py-2 px-4 rounded-md font-medium text-white transition-all duration-300 ${
            files.length > 0 && jobDescription
              ? 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={files.length === 0 || !jobDescription || isLoading}
          onClick={onAnalyze}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Resumes...
            </div>
          ) : (
            `Analyze ${files.length} Resume${files.length !== 1 ? 's' : ''}`
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadSection