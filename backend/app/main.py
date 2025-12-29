from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import routes
import os

app = FastAPI(
    title="Automated Code Review System",
    description="A smart automated code review platform.",
    version="1.0.0"
)

# CORS Configuration
origins_env = os.getenv("FRONTEND_ORIGINS")
if origins_env:
    origins = [o.strip() for o in origins_env.split(",") if o.strip()]
else:
    origins = [
        "http://localhost:5173",
        "http://localhost:3000",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes.router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "Welcome to the Automated Code Review System API"}
