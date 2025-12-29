from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.core.analysis import analyze_code
from app.core.ai import get_ai_review

router = APIRouter()

class CodeSubmission(BaseModel):
    code: str
    language: str
    file_name: Optional[str] = None

@router.post("/review/text")
async def review_text(submission: CodeSubmission):
    try:
        # 1. Static Analysis
        analysis_results = await analyze_code(submission.code, submission.language)
        
        # 2. AI Insight
        ai_insight = await get_ai_review(submission.code, submission.language, analysis_results)
        
        return {
            "status": "success",
            "analysis": analysis_results,
            "ai_insight": ai_insight
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/review/file")
async def review_file(file: UploadFile = File(...), language: str = "python"):
    content = await file.read()
    code = content.decode("utf-8")
    
    # Reuse the logic
    # In a real app, we might detect language from extension
    analysis_results = await analyze_code(code, language)
    ai_insight = await get_ai_review(code, language, analysis_results)
    
    return {
        "status": "success",
        "file_name": file.filename,
        "analysis": analysis_results,
        "ai_insight": ai_insight
    }
