import { ApiResponse, ResumeResult } from '../types';

export const analyzeResume = async (file: File, jobDescription: string): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);
    
    const response = await fetch('http://localhost:3001/api/analyze', {
      method: 'POST',
      body: formData,
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw error;
  }
};

export const analyzeMultipleResumes = async (
  files: File[],
  jobDescription: string
): Promise<ResumeResult[]> => {
  try {
    const results = await Promise.all(
      files.map(async (file) => {
        const response = await analyzeResume(file, jobDescription);
        return {
          id: crypto.randomUUID(),
          fileName: file.name,
          result: response.result,
          uploadTime: new Date(),
        };
      })
    );

    // Sort results by overall score in descending order
    return results.sort((a, b) => b.result.overall_score - a.result.overall_score);
  } catch (error) {
    console.error('Error analyzing multiple resumes:', error);
    throw error;
  }
};