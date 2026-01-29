"""
Main module for the SleepyBot backend.
This module initializes the FastAPI application and defines the endpoints for the bot.
"""

from fastapi import FastAPI
import pandas as pd
from backend.src.strategy import calculate_volatility, decide_trade
from backend.src.executor import execute_trade
from backend.src.logger import log_trade
import json
from pathlib import Path

app = FastAPI()

LOG_FILE = Path("data/trade_logs.json")

"""
Root endpoint to verify the backend is running.
"""
@app.get("/")
def root():
    return {"message": "SleepyBot backend is running!"}

"""
Endpoint to execute a trade based on calculated volatility.
"""
@app.post("/trade")
def run_trade():
    # Load sample OHLC data from CSV file
    data = pd.read_csv("data/sample_data.csv")

    # Calculate volatility using the strategy module
    volatility = calculate_volatility(data)

    # Make a trade decision based on the calculated volatility
    decision = decide_trade(volatility)

    # Execute the trade and generate a trade payload
    trade_payload = execute_trade("EUR/USD", decision, 1.0850, 1.0900, volatility)

    # Log the trade payload to a JSON file
    log_trade(trade_payload)

    # Return the trade payload as the response
    return trade_payload

"""
Endpoint to retrieve trade logs.
"""
@app.get("/logs")
def get_logs():
    # Check if the log file exists
    if LOG_FILE.exists():
        # Read and return the contents of the log file
        with open(LOG_FILE, "r") as f:
            return json.load(f)
    # Return an empty list if no logs are found
    return []
