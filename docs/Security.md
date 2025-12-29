# Security

## Secret Management
- Do not store real API keys in code or version control
- Use environment variables: `GEMINI_API_KEY`, `OPENAI_API_KEY`
- `.env` must never be committed (see project `.gitignore`)

## Input Validation
- Backend validates and decodes uploaded files safely
- Avoid dynamic execution (`eval`, `exec`) flagged by analyzer

## CORS & Networking
- CORS whitelist in [main.py](file:///D:/minor%20project/backend/app/main.py#L11-L23)
- Restrict in production to known domains

## Dependencies
- Run `npm audit` regularly for frontend
- Use `flake8`, `mypy`, `bandit` for Python

## Logging
- Avoid printing secrets to console
- Prefer structured logging with appropriate log levels

