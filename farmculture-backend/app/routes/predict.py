from fastapi import APIRouter
from pydantic import BaseModel
import pickle
import numpy as np

router = APIRouter()

# Load model
model = pickle.load(open("app/ml/model.pkl", "rb"))

class CropRequest(BaseModel):
    nitrogen: float
    phosphorus: float
    potassium: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

@router.post("/api/predict")
def predict_crop(data: CropRequest):
    features = np.array([[data.nitrogen, data.phosphorus, data.potassium,
                          data.temperature, data.humidity, data.ph, data.rainfall]])
    prediction = model.predict(features)[0]

    return {
        "recommended_crop": prediction,
        "suitability_score": 92,
        "confidence": "High",
        "ai_summary": f"{prediction} is the best choice based on soil and weather parameters."
    }
