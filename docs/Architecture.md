# Architecture

The system follows a modular Client–Server design.

## Frontend (React)
- UI: Tailwind CSS, Framer Motion, Monaco Editor
- Pages: Home, Dashboard, Review
- Data: Axios client to backend API
- State: Minimal local state; can be extended to global store

## Backend (FastAPI)
- API Router: [routes.py](file:///D:/minor%20project/backend/app/api/routes.py)
- Static Analysis: [analysis.py](file:///D:/minor%20project/backend/app/core/analysis.py)
- AI Layer: [ai.py](file:///D:/minor%20project/backend/app/core/ai.py)
- App Entrypoint: [main.py](file:///D:/minor%20project/backend/app/main.py)

## Data Flow
1. Frontend sends code + language to `/api/v1/review/text`
2. Backend runs static analysis
3. Backend queries Gemini AI (if GEMINI_API_KEY is set) or uses simulation fallback
4. Backend returns consolidated JSON to frontend
5. Frontend renders insights, issues, and metrics

## API Endpoints
- POST `/api/v1/review/text`: Analyze inline code
- POST `/api/v1/review/file`: Analyze uploaded file

