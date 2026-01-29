import uuid
from datetime import datetime

# executor.py
# This module handles the execution of trades and generates trade payloads.

# Function to execute a trade based on the provided details
def execute_trade(asset: str, decision: str, stop_loss: float, take_profit: float, volatility: float):
    """
    Mock trade execution — returns a trade payload dictionary.
    """
    trade_payload = {
        "trade_id": str(uuid.uuid4()),
        "timestamp": datetime.utcnow().isoformat(),
        "asset": asset,
        "volatility_score": round(volatility, 4),
        "decision": decision,
        "stop_loss": stop_loss,
        "take_profit": take_profit,
        "rationale": "Volatility below threshold, safe trade opportunity." if decision == "BUY" else "No trade executed."
    }
    return trade_payload
