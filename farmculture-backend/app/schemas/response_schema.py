# app/schemas/response_schema.py
from pydantic import BaseModel
from typing import Any, Dict

class PredictResponse(BaseModel):
    recommended_crop: Any
    # Additional optional info (profit estimate, suitability score etc.)
    details: Dict[str, Any] | None = None
