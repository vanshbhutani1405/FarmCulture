# app/core/cors.py
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from fastapi import FastAPI

def setup_cors(app: FastAPI, origins: List[str]):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins or ["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
