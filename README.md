# SleepyBot

## Overview
SleepyBot is a cutting-edge trading bot designed to operate during low-volatility hours, ensuring safe and efficient trading. Built with a focus on safety, reproducibility, and audit-friendly documentation, SleepyBot is the ideal solution for traders looking to automate their strategies during calm market conditions.

## Features
- **Volatility Filtering**: Trades only during low-volatility periods, minimizing risks.
- **Audit-Friendly Logging**: JSON-based trade logs provide complete transparency and traceability.
- **Modular Design**: Highly extensible and easy to maintain, making it suitable for diverse trading strategies.

## Tools and Technologies
SleepyBot leverages the following tools and technologies:

### Backend
- **Python**: Core programming language for backend logic.
- **FastAPI**: Framework for building the RESTful API.
- **Uvicorn**: ASGI server for running the FastAPI application.
- **PyYAML**: For configuration management.
- **Logging**: Built-in Python logging for detailed trade logs.

### Frontend
- **React**: JavaScript library for building the user interface.
- **Vite**: Build tool for fast development.
- **Axios**: For API communication.

### Additional Tools
- **Docker**: Containerization for consistent deployment.
- **Git**: Version control for collaborative development.

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
- **Sentiment Analysis Integration**: Incorporate market sentiment data to enhance decision-making.
- **Real-Time Dashboard**: Develop a live dashboard for monitoring trades and performance.
- **Enhanced Trading Strategies**: Introduce advanced algorithms for better profitability.

## About
SleepyBot is built for **Derive AI**, combining the power of artificial intelligence with robust trading principles to deliver a reliable and efficient trading solution.
