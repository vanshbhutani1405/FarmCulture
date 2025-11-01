# app/routes/health.py
from fastapi import APIRouter
from app.utils.logger import get_logger

logger = get_logger("health")
router = APIRouter()

@router.get("/health")
def health_check():
    logger.info("Health check requested")
    return {"status": "ok"}
