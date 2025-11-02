# app/core/config.py
from pydantic_settings import BaseSettings
from typing import List
from functools import lru_cache

class Settings(BaseSettings):
    PROJECT_NAME: str = "FarmCulture"
    MODEL_PATH: str = "app/ml/model.pkl"
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:5173"]
    GOOGLE_API_KEY: str

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

    # ✅ Helper to return allowed origins cleanly
    def allowed_origins_list(self) -> List[str]:
        return self.BACKEND_CORS_ORIGINS

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()
