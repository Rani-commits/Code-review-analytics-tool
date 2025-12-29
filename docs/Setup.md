# Setup & Deployment

## Prerequisites
- Node.js v18+
- Python 3.11+

## Quick Start on Windows
1. Double-click [run.bat](file:///D:/minor%20project/run.bat)
2. Frontend starts on `http://localhost:5173`
3. Backend starts on `http://localhost:8000`

## Manual Setup
### Backend
```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Update GEMINI_API_KEY in .env
uvicorn app.main:app --reload
```

### Frontend
```
cd frontend
npm install
npm run dev
```

## GitHub Deployment
### Code Repository
1. Ensure remote is set:
```
git remote add origin https://github.com/Rani-commits/Code-review-analytics-tool.git
```
2. Push using the helper script:
- Double-click [push_to_github.bat](file:///D:/minor%20project/push_to_github.bat)

### Wiki
1. Use the helper script to publish wiki (will prompt for login):
- Double-click `push_wiki.bat` (after it is generated)

