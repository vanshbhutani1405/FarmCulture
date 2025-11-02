# app/services/genai_service.py

import google.generativeai as genai
from app.core.config import settings

# ✅ Configure Gemini API with your key
genai.configure(api_key=settings.GOOGLE_API_KEY)

# ✅ Use latest model name
MODEL_NAME = "gemini-2.5-flash"

def generate_crop_summary(predicted_crop: str, data: dict):
    """
    Generates a detailed, farmer-friendly AI summary for the predicted crop
    using Gemini 1.5.
    """

    prompt = f"""
    You are an expert Indian agronomist and farm advisor.

    Based on the following soil and climate data:
    Nitrogen: {data.get('nitrogen')} mg/kg
    Phosphorus: {data.get('phosphorus')} mg/kg
    Potassium: {data.get('potassium')} mg/kg
    Temperature: {data.get('temperature')} °C
    Humidity: {data.get('humidity')} %
    Soil pH: {data.get('ph')}
    Rainfall: {data.get('rainfall')} mm

    The recommended crop is: **{predicted_crop}**

    Please provide a friendly, 300-word summary including:
    1. *Suitability Reasoning:* Why this crop fits well with the given soil and climate data (NPK, pH, rainfall, etc.).
    2. *Expected Yield Range (per hectare)* – approximate potential yield.
    3. *Required Climate Conditions* – ideal temperature, humidity, and rainfall range.
    4. *Soil & Fertilizer Guidance* – best fertilizer mix, irrigation frequency, and soil maintenance advice.
    5. *Tips for Maximizing Production (Organic-focused)* – sowing month, watering, and fertilizer schedule.
    6. *Risks or Challenges* – mention pest/disease risks or weather sensitivities.
    7. *Market Insight* – short info about current demand or profitability trends.

    End with:
    - A *final recommendation summary* suggesting the most profitable or sustainable crop overall.
    - A short *motivational note* encouraging the farmer about the benefits of data-driven farming.
    """

    try:
        model = genai.GenerativeModel(MODEL_NAME)
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print("❌ AI generation error:", e)
        return "Could not generate AI summary due to configuration error."
