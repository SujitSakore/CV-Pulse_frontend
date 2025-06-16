🔍 Overview:
This is a full-stack AI-powered web application designed to help HR professionals efficiently shortlist candidates by analyzing uploaded resumes against a given job description (JD). The system uses a LangChain agent powered by OpenAI to score each resume, extract relevant strengths and weaknesses, and generate a final ranked shortlist of candidates.

🌐 Live Demo
Frontend (React, Vite, deployed on Netlify):
🔗 https://resume-score-frontend.netlify.app/

Backend (Node.js with Express, deployed on Render):
🔗 https://resume-backend-3lhr.onrender.com

🧑‍💻 Tech Stack:
Frontend: React (Vite)
Backend: Node.js + Express
AI Agent: LangChain (JavaScript) + OpenAI API
File Parsing: pdf-parse for extracting text from resumes
Deployment: Netlify (frontend) & Render (backend)
Optional/Stretch: MongoDB or Supabase integration for persistent analysis (in progress)

✅ Core Features:
1. Upload Multiple Resumes
Supports PDF format
Drag-and-drop or file picker
2. Paste Job Description
Textarea to input the JD against which resumes are evaluated
3. AI-Powered Resume Analysis
Match Score (1–100)
Good Points (skills/experiences matching the JD)
Bad Points (missing or weak areas)
Final Shortlist (sorted descending by score)
4. Results Dashboard
Sortable table view of all analyzed resumes
Each entry shows score, strengths, and weaknesses

🧠 LangChain Agent (Zero-Shot React Description)
Utilizes prompt chaining with OpenAI to:
Analyze and score resumes
Identify matching and missing skills
Return structured JSON with score, good points, and bad points

🔙 Backend Components
API Endpoint:
POST /analyze
Accepts bulk resumes and a job description. Returns JSON analysis for each resume.
File Parsing:
Uses pdf-parse to extract text content for AI analysis.

📁 Sample Data
Included in /sample-data/ directory:
📄 sample-resume.pdf
📝 sample-job-description.txt
These can be used for quick testing and demonstration.

📌 Submission & Deployment Compliance
✅ Frontend and backend are deployed on free-tier services (Netlify + Render)
✅ Code is hosted on private GitHub repositories
✅ Access granted to dev@heliverse.com on both repos
✅ README includes detailed setup and deployment instructions
✅ Sample data provided
✅ All core features implemented and functional

🚀 Future Enhancements (Bonus & Stretch Goals)
 PDF Report Generation for HR download
 Save analyses to Supabase or MongoDB
 User Authentication (Auth0/Clerk)
 LangGraph-based multi-agent modular system
 Filter/sort dashboard by score or skill match
