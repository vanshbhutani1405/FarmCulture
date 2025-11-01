# main.py
from fastapi import FastAPI
from app.core.config import settings
from app.core.cors import setup_cors
from app.routes import health, predict
from app.ml.model_utils import load_model
from app.utils.logger import get_logger

logger = get_logger("main")

app = FastAPI(title=settings.PROJECT_NAME)

# CORS
origins = settings.allowed_origins_list()
setup_cors(app, origins)
logger.info("CORS origins: %s", origins)

# Load model at startup
try:
    load_model(settings.MODEL_PATH)
except Exception as e:
    logger.exception("Model failed to load at startup: %s", e)
    # don't crash here — predict endpoint will return an error if model not found

# Include routers
app.include_router(health.router, prefix="/api")
app.include_router(predict.router, prefix="/api")

@app.get("/")
def root():
    return {"message": f"{settings.PROJECT_NAME} API is running"}
