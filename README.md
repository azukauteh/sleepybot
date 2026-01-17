# SleepyBot

## Overview
SleepyBot is a lightweight trading bot designed to operate during low-volatility hours. It prioritizes safety, reproducibility, and audit-friendly documentation.

## Features
- **Volatility Filtering**: Trades only during low-volatility periods.
- **Audit-Friendly Logging**: JSON-based trade logs for transparency.
- **Modular Design**: Easy to extend and maintain.

## Setup

### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the FastAPI server:
   ```bash
   uvicorn src.main:app --host 0.0.0.0 --port 8000
   ```

### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Example Trade Log
```json
{
    "timestamp": "2026-01-01T00:00:00Z",
    "asset": "BTC/USD",
    "volatility_score": 0.3,
    "decision": "buy",
    "stop_loss": 1.0,
    "take_profit": 1.2,
    "rationale": "Low volatility detected."
}
```

## Future Improvements
- Sentiment analysis integration.
- Real-time dashboard for monitoring.
- Enhanced trading strategies.
