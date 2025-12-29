import os
import httpx
import json
from typing import Dict, Any

# Google Gemini API Configuration
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

async def get_ai_review(code: str, language: str, analysis_results: Dict[str, Any]) -> Dict[str, Any]:
    """
    AI Insight Layer.
    Uses Google Gemini 2.0 Flash to provide deeper insights.
    """
    
    # Securely retrieve API key from environment variables
    gemini_api_key = os.getenv("GEMINI_API_KEY")

    if not gemini_api_key:
        print("Warning: GEMINI_API_KEY not found in environment variables.")
        # Fallback to simulation will happen in the exception/fallback block below
    
    try:
        if not gemini_api_key:
            raise ValueError("Missing API Key")

        prompt = f"""
        You are a senior code reviewer. Analyze the following {language} code.
        Static analysis found {len(analysis_results.get('issues', []))} issues.
        
        Code:
        {code}
        
        Provide a valid JSON response (no markdown formatting) with the following keys:
        - summary: A brief summary of the code quality.
        - optimization_tips: Specific tips to improve performance.
        - best_practices: A list of best practices followed or violated.
        """

        payload = {
            "contents": [{
                "parts": [{"text": prompt}]
            }]
        }

        headers = {
            "Content-Type": "application/json",
            "x-goog-api-key": gemini_api_key
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(GEMINI_API_URL, json=payload, headers=headers, timeout=30.0)
            
            if response.status_code == 200:
                data = response.json()
                # Extract text from Gemini response
                try:
                    text_content = data['candidates'][0]['content']['parts'][0]['text']
                    # Clean potential markdown code blocks if Gemini adds them
                    text_content = text_content.replace("```json", "").replace("```", "").strip()
                    
                    ai_result = json.loads(text_content)
                    return ai_result
                except (KeyError, json.JSONDecodeError) as e:
                    print(f"Parsing Error: {e}")
                    return {
                        "summary": "AI analysis completed but returned unstructured text.",
                        "optimization_tips": "Review manually.",
                        "best_practices": ["Could not parse AI response"]
                    }
            else:
                print(f"Gemini API Error: {response.status_code} - {response.text}")

    except Exception as e:
        print(f"AI Error: {e}")
        pass

    # Fallback to mock/simulation if API fails
    issues_count = len(analysis_results.get("issues", []))
    
    if issues_count == 0:
        summary = "Great job! Your code looks clean and follows best practices. (AI Simulation Mode)"
        optimization = "No major optimizations needed."
    else:
        summary = f"I found {issues_count} potential improvements. Focusing on security and readability would be beneficial. (AI Simulation Mode)"
        optimization = "Consider refactoring long functions and using safer alternatives to 'eval'."
        
    return {
        "summary": summary,
        "optimization_tips": optimization,
        "best_practices": [
            "Always validate user input.",
            "Use meaningful variable names.",
            "Add comments for complex logic."
        ]
    }
