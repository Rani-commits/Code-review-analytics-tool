# Troubleshooting

## Frontend build fails (TypeScript errors)
- Remove unused imports
- Ensure `vite`, `typescript`, and `@vitejs/plugin-react` versions are compatible
- Run: `npm run build` for production and read error details

## Backend cannot access AI (Gemini)
- Ensure `GEMINI_API_KEY` is set in `backend/.env`
- Restart backend after changing environment
- Check network egress and proxy settings

## CORS Errors in Browser
- Update CORS whitelist in [main.py](file:///D:/minor%20project/backend/app/main.py#L11-L23) to include frontend origin

## Secret Scanning Alert on GitHub
- Rotate/revoke the leaked key
- Clean history using `purge_secret_history.bat` and force-push
- Verify alert is resolved under GitHub “Security → Secret scanning”

## Wiki does not show pages
- Ensure repository Wikis are enabled in GitHub settings
- Run [push_wiki.bat](file:///D:/minor%20project/push_wiki.bat) and authenticate when prompted
- Confirm pages exist under: `https://github.com/Rani-commits/Code-review-analytics-tool/wiki`

