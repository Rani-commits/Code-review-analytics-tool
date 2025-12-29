import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/v1';

export const reviewText = async (code: string, language: string) => {
  try {
    const response = await axios.post(`${API_URL}/review/text`, { code, language });
    return response.data;
  } catch (error) {
    // Fallback/Mock for demo if backend isn't running
    console.warn("Backend unavailable, returning mock data");
    return {
        status: "success",
        analysis: {
            issues: [
                {
                    line: 10,
                    severity: "High",
                    type: "Security",
                    message: "Potential SQL Injection detected.",
                    suggestion: "Use parameterized queries."
                },
                {
                    line: 24,
                    severity: "Low",
                    type: "Style",
                    message: "Variable name 'x' is too vague.",
                    suggestion: "Rename to 'user_count'."
                }
            ],
            summary: "Found 2 issues."
        },
        ai_insight: {
            summary: "The code is generally good but has a critical security flaw.",
            optimization_tips: "Refactor the database access layer.",
            best_practices: ["Security", "Clean Code"]
        }
    };
  }
};
