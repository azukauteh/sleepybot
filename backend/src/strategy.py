import pandas as pd
import numpy as np

# strategy.py
# This module contains the logic for calculating volatility and making trade decisions.

# Function to calculate volatility based on OHLC data
def calculate_volatility(data: pd.DataFrame, window: int = 5) -> float:
    """
    Calculate rolling standard deviation of closing prices.
    """
    return data['close'].rolling(window=window).std().iloc[-1]

# Function to decide whether to buy, sell, or hold based on volatility
def decide_trade(volatility: float, threshold: float = 0.15) -> str:
    """
    Decide whether to BUY or SELL based on volatility threshold.
    """
    if volatility < threshold:
        return "BUY"
    else:
        return "HOLD"
