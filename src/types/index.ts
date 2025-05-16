export interface ResumeAnalysisResult {
  overall_score: number;
  technical_skills: CategoryResult;
  work_experience: CategoryResult;
  relevance_to_software_engineering: CategoryResult;
  clarity_and_structure: CategoryResult;
  recommendations: string[];
}

export interface CategoryResult {
  score: number;
  feedback: string;
}

export interface ApiResponse {
  result: ResumeAnalysisResult;
}

export interface JobDescription {
  title: string;
  description: string;
}

export interface ResumeResult {
  id: string;
  fileName: string;
  result: ResumeAnalysisResult;
  uploadTime: Date;
}