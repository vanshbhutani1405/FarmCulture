# app/ml/model_utils.py
import joblib
from pathlib import Path
from typing import Dict, Any, List
import pandas as pd
from app.utils.logger import get_logger

logger = get_logger("model_utils")

MODEL = None
MODEL_PATH = None
FEATURE_ORDER: List[str] | None = None
# If your model expects a fixed column order, fill FEATURE_ORDER = ["nitrogen","phosphorus",...]
# FEATURE_ORDER = ["nitrogen","phosphorus","potassium","temperature","humidity","ph","rainfall"]

def load_model(path: str):
    global MODEL, MODEL_PATH
    if MODEL is None:
        p = Path(path)
        if not p.exists():
            logger.error("Model file not found at: %s", p.resolve())
            raise FileNotFoundError(f"Model file not found at: {p}")
        MODEL = joblib.load(p)
        MODEL_PATH = str(p)
        logger.info("Model loaded from %s", p.resolve())
    return MODEL

def predict_crop(input_data: Dict[str, Any]):
    """
    input_data: dict mapping feature name -> numeric value
    returns: single prediction (string or numeric depending on model)
    """
    global MODEL
    if MODEL is None:
        raise RuntimeError("Model not loaded. Call load_model() first.")

    # Build DataFrame for single sample
    df = pd.DataFrame([input_data])

    # If FEATURE_ORDER is set, reorder and possibly add missing columns
    if FEATURE_ORDER:
        # ensure all FEATURE_ORDER present; fill missing with 0 or NaN
        for col in FEATURE_ORDER:
            if col not in df.columns:
                df[col] = 0
        df = df[FEATURE_ORDER]

    # If model expects scaled/preprocessed inputs, include preprocessing here (not included)
    try:
        pred = MODEL.predict(df)
    except Exception as e:
        logger.exception("Model prediction failed: %s", e)
        raise

    # Return first result
    return pred[0]
