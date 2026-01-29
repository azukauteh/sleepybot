""" 
logger.py
This module is responsible for logging trade details in a JSON format for audit purposes.
 """

import json
from pathlib import Path

LOG_FILE = Path("data/trade_logs.json")

def log_trade(trade_payload: dict):
    """
    Append trade payload to JSON log file.
    """
    if LOG_FILE.exists():
        with open(LOG_FILE, "r") as f:
            logs = json.load(f)
    else:
        logs = []

    logs.append(trade_payload)

    with open(LOG_FILE, "w") as f:
        json.dump(logs, f, indent=4)
