from fastapi import APIRouter
from pydantic import BaseModel
import pickle
import numpy as np
from app.services.genai_service import generate_crop_summary  # ✅ Import the Gemini layer

router = APIRouter()

# ✅ Load ML model once
model = pickle.load(open("app/ml/model.pkl", "rb"))

# ✅ Request schema
class CropRequest(BaseModel):
    nitrogen: float
    phosphorus: float
    potassium: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

# ✅ Prediction route
@router.post("/api/predict")
def predict_crop(data: CropRequest):
    # Convert input to numpy array for prediction
    features = np.array([[data.nitrogen, data.phosphorus, data.potassium,
                          data.temperature, data.humidity, data.ph, data.rainfall]])
    
    # ML prediction
    prediction = model.predict(features)[0]

    # Convert request to dict for AI summary
    feature_dict = data.dict()

    # 🧠 Generate Gemini AI summary
    ai_summary = generate_crop_summary(prediction, feature_dict)

    # Final structured response
    return {
        "recommended_crop": prediction,
        "suitability_score": 92,  # Placeholder — can later come from model confidence
        "confidence": "High",
        "ai_summary": ai_summary
    }
