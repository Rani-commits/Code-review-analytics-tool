# API Reference

Base URL: `http://localhost:8000/api/v1`

## POST /review/text
Analyze code supplied as text.

Request:
```
{
  "code": "<source-code>",
  "language": "python|javascript|typescript|java|cpp",
  "file_name": "optional"
}
```

Response:
```
{
  "status": "success",
  "analysis": {
    "issues": [...],
    "metrics": {...},
    "summary": "Found N issues. Complexity analysis completed."
  },
  "ai_insight": {
    "summary": "...",
    "optimization_tips": "...",
    "best_practices": [...]
  }
}
```

## POST /review/file
Analyze code from an uploaded file.

Form fields:
- `file` (UploadFile)
- `language` (string, default: python)

Response shape is the same as `/review/text`.

