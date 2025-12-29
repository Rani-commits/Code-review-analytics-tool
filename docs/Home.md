# Code Review Analytics Tool — Wiki Home

Welcome to the project wiki. This knowledge base covers concepts, architecture, setup, security, and APIs, including process diagrams and best practices.

## Quick Links
- Overview: [[Overview]]  
- Architecture: [[Architecture]]  
- Flowcharts: [[Flowcharts]]  
- Setup & Deployment: [[Setup]]  
- Security: [[Security]]  
- API Reference: [[API]]  
- Troubleshooting: [[Troubleshooting]]  

## System Diagram
```mermaid
graph TD
  FE[Frontend (React/Vite)] --> API[(Axios)]
  API --> BE[(FastAPI)]
  BE --> ANA[Static Analysis (AST/Regex)]
  BE --> AI[Gemini 2.0 Flash]
  ANA --> RES[Results]
  AI --> RES
  RES --> FE
```

## Principles
- Secure by default (no secrets in code or history)
- Deterministic analysis and clear AI recommendations
- Modular architecture and clean separation of concerns
- Accessible UI and multi-language support

