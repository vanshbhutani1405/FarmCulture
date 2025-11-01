# app/core/config.py

from pydantic_settings import BaseSettings  # ✅ Correct import for Pydantic v2
from pydantic import AnyHttpUrl
from typing import List


class Settings(BaseSettings):
    """
    Centralized configuration settings for the FarmCulture backend.
    Reads environment variables from .env file automatically.
    """

    PROJECT_NAME: str = "FarmCulture"
    MODEL_PATH: str = "app/ml/model.pkl"
    ALLOWED_ORIGINS: str = "http://localhost:5173"

    def allowed_origins_list(self) -> List[str]:
        """
        Converts comma-separated origins string into a list for CORS setup.
        Example: "http://localhost:5173,http://127.0.0.1:5173"
        """
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",") if o.strip()]

    class Config:
        env_file = ".env"             # Load variables from .env file
        env_file_encoding = "utf-8"   # Support for UTF-8 encoded env files


# Create a single settings instance used throughout the app
settings = Settings()
