# app/schemas/request_schemas.py
from pydantic import BaseModel, Field
from typing import Optional

class PredictRequest(BaseModel):
    nitrogen: float = Field(..., ge=0)
    phosphorus: float = Field(..., ge=0)
    potassium: float = Field(..., ge=0)
    temperature: float = Field(..., description="Average temperature in °C")
    humidity: float = Field(..., ge=0, le=100, description="Relative humidity %")
    ph: float = Field(..., ge=0, le=14, description="Soil pH")
    rainfall: float = Field(..., ge=0, description="Rainfall in mm")

    # If you have extra fields (state/location), add them as optional e.g.
    # location: Optional[str] = None
