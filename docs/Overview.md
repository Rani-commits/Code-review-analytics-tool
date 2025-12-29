# Code Review Analytics Tool — Overview

A modern, automated code review system that combines static analysis with AI insights (Google Gemini 2.0 Flash) to deliver actionable feedback on code quality, security, performance, and maintainability.

## Goals
- Accelerate review cycles with automated checks and clear recommendations
- Improve code consistency via standards and style enforcement
- Detect risks early (security, complexity, smells)
- Provide architecture-aware AI guidance for refactoring and best practices

## Core Capabilities
- Multi-language analysis: Python, JavaScript/TypeScript, Java, C++
- Static analysis: AST (Python) and smart regex rules (others)
- AI insights: Architectural feedback, optimization tips, best practices
- Visualizations: Issue breakdowns, metrics, trends
- Modern UI/UX: Glassmorphism, dark mode, animations

## High-Level Flow
1. User inputs or uploads code via the frontend
2. Backend performs static analysis
3. AI layer augments results with deeper guidance
4. Frontend presents findings and suggested fixes

## Key Modules
- Frontend: React + Vite, Monaco Editor, Tailwind, Framer Motion
- Backend: FastAPI, Uvicorn, httpx, AST-based analysis, Gemini AI

