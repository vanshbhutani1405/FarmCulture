# app/utils/logger.py
import logging
import sys

def get_logger(name: str = __name__):
    logger = logging.getLogger(name)
    if not logger.handlers:
        fmt = logging.Formatter("%(asctime)s — %(levelname)s — %(name)s — %(message)s")
        handler = logging.StreamHandler(sys.stdout)
        handler.setFormatter(fmt)
        logger.addHandler(handler)
        logger.setLevel(logging.INFO)
    return logger
